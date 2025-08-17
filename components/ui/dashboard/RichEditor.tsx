"use client";

import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  KeyboardEvent,
  ComponentProps,
} from "react";
import {
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  ChevronDown,
  List,
  ListOrdered,
} from "lucide-react";
import clsx, { ClassValue } from "clsx";

interface RichEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: ClassValue;
}

export default function RichEditor({
  value = "",
  onChange,
  placeholder = "Start typing...",
  className,
}: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState<string>(value);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [isRTL, setIsRTL] = useState<boolean>(false);

  // Function to detect Arabic text
  const isArabicText = useCallback((text: string): boolean => {
    // Arabic Unicode range: \u0600-\u06FF, \u0750-\u077F, \u08A0-\u08FF
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    return arabicRegex.test(text);
  }, []);

  // Function to get predominant text direction
  const detectTextDirection = useCallback((text: string): 'rtl' | 'ltr' => {
    const cleanText = text.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const arabicChars = (cleanText.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g) || []).length;
    const latinChars = (cleanText.match(/[a-zA-Z]/g) || []).length;
    
    return arabicChars > latinChars ? 'rtl' : 'ltr';
  }, []);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
      setContent(value);
      
      // Update text direction based on content
      const direction = detectTextDirection(value);
      setIsRTL(direction === 'rtl');
    }
  }, [value, detectTextDirection]);

  const updateActiveFormats = useCallback(() => {
    const formats: string[] = [];
    const selection = window.getSelection();

    if (document.queryCommandState("bold")) formats.push("bold");
    if (document.queryCommandState("italic")) formats.push("italic");
    if (document.queryCommandState("underline")) formats.push("underline");

    // Check if selection is inside a list
    if (selection && selection.rangeCount > 0) {
      const parentElement =
        selection.getRangeAt(0).commonAncestorContainer.parentElement;
      if (parentElement) {
        const closestList = parentElement.closest("ul, ol");
        if (closestList) {
          // Only add list format if we're actually in a list item
          const listItem = parentElement.closest("li");
          if (listItem) {
            if (closestList.nodeName === "UL") {
              formats.push("unorderedList");
            } else if (closestList.nodeName === "OL") {
              formats.push("orderedList");
            }
          }
        }
      }
    }

    setActiveFormats(formats);
  }, []);

  const executeCommand = useCallback(
    (command: string, value: string | null = null) => {
      document.execCommand(command, false, value as string);
      editorRef.current?.focus();

      const newContent = editorRef.current?.innerHTML || "";
      setContent(newContent);
      onChange?.(newContent);
      updateActiveFormats();

      // Update text direction after content change
      const direction = detectTextDirection(newContent);
      setIsRTL(direction === 'rtl');
    },
    [onChange, updateActiveFormats, detectTextDirection]
  );

  const applyFontSize = useCallback(
    (size: string) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      if (!selectedText) return;

      const span = document.createElement("span");
      span.style.fontSize = `${size}px`;
      span.textContent = selectedText;

      range.deleteContents();
      range.insertNode(span);

      const newContent = editorRef.current?.innerHTML || "";
      setContent(newContent);
      onChange?.(newContent);
      updateActiveFormats();

      // Update text direction after content change
      const direction = detectTextDirection(newContent);
      setIsRTL(direction === 'rtl');
    },
    [onChange, updateActiveFormats, detectTextDirection]
  );

  const applyLink = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) return;

    const url = prompt("Enter a URL:");
    if (!url) return;

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.textContent = selectedText;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";

    range.deleteContents();
    range.insertNode(anchor);

    const newContent = editorRef.current?.innerHTML || "";
    setContent(newContent);
    onChange?.(newContent);
    updateActiveFormats();

    // Update text direction after content change
    const direction = detectTextDirection(newContent);
    setIsRTL(direction === 'rtl');
  }, [onChange, updateActiveFormats, detectTextDirection]);

  const handleInput = useCallback(() => {
    const newContent = editorRef.current?.innerHTML || "";
    setContent(newContent);
    onChange?.(newContent);
    updateActiveFormats();

    // Update text direction dynamically as user types
    const direction = detectTextDirection(newContent);
    setIsRTL(direction === 'rtl');
  }, [onChange, updateActiveFormats, detectTextDirection]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault();
            executeCommand("bold");
            break;
          case "i":
            e.preventDefault();
            executeCommand("italic");
            break;
          case "u":
            e.preventDefault();
            executeCommand("underline");
            break;
        }
      }

      // Handle Enter key only when not in lists
      if (e.key === "Enter") {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const parentElement =
            selection.getRangeAt(0).commonAncestorContainer.parentElement;
          const inList =
            parentElement?.closest("ul") || parentElement?.closest("ol");

          if (!inList) {
            e.preventDefault();
            executeCommand("insertHTML", "<br><br>");
          }
        }
      }
    },
    [executeCommand]
  );

  const isActive = (format: string) => activeFormats.includes(format);

  return (
    <div className="w-full relative">
      <div className={clsx("border border-gray-500 rounded-lg", className)}>
        {/* Toolbar */}
        <div className="border-b border-gray-500 p-2">
          <div className={clsx("flex items-center gap-1 relative", {
            "flex-row-reverse": isRTL
          })}>
            {/* Bold */}
            <button
              onClick={() => executeCommand("bold")}
              className={`p-2 rounded transition-colors ${
                isActive("bold")
                  ? "bg-white text-black"
                  : "text-white hover:bg-gray-200 hover:text-black hover:bg-opacity-20 cursor-pointer"
              }`}
              title={isRTL ? "عريض (Ctrl+B)" : "Bold (Ctrl+B)"}
              type="button"
            >
              <Bold className="w-4 h-4" />
            </button>

            {/* Italic */}
            <button
              onClick={() => executeCommand("italic")}
              className={`p-2 rounded transition-colors ${
                isActive("italic")
                  ? "bg-white text-black"
                  : "text-white hover:bg-gray-200 hover:bg-opacity-20 hover:text-black cursor-pointer"
              }`}
              title={isRTL ? "مائل (Ctrl+I)" : "Italic (Ctrl+I)"}
              type="button"
            >
              <Italic className="w-4 h-4" />
            </button>

            {/* Underline */}
            <button
              onClick={() => executeCommand("underline")}
              className={`p-2 rounded transition-colors ${
                isActive("underline")
                  ? "bg-white text-black"
                  : "text-white hover:bg-gray-200 hover:bg-opacity-20 hover:text-black cursor-pointer"
              }`}
              title={isRTL ? "تحته خط (Ctrl+U)" : "Underline (Ctrl+U)"}
              type="button"
            >
              <Underline className="w-4 h-4" />
            </button>

            {/* Link */}
            <button
              onClick={applyLink}
              className="p-2 rounded transition-colors text-white hover:bg-gray-200 hover:bg-opacity-20 hover:text-black cursor-pointer"
              title={isRTL ? "إدراج رابط" : "Insert Link"}
              type="button"
            >
              <LinkIcon className="w-4 h-4" />
            </button>

            {/* Unordered List */}
            <button
              onClick={() => executeCommand("insertUnorderedList")}
              className={`p-2 rounded transition-colors ${
                isActive("unorderedList")
                  ? "bg-white text-black"
                  : "text-white hover:bg-gray-200 hover:bg-opacity-20 hover:text-black cursor-pointer"
              }`}
              title={isRTL ? "قائمة نقطية" : "Bullet List"}
              type="button"
            >
              <List className="w-4 h-4" />
            </button>

            {/* Ordered List */}
            <button
              onClick={() => executeCommand("insertOrderedList")}
              className={`p-2 rounded transition-colors ${
                isActive("orderedList")
                  ? "bg-white text-black"
                  : "text-white hover:bg-gray-200 hover:bg-opacity-20 hover:text-black cursor-pointer"
              }`}
              title={isRTL ? "قائمة مرقمة" : "Numbered List"}
              type="button"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            {/* Font Size Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSizeDropdown((prev) => !prev)}
                className="p-2 rounded transition-colors text-white hover:bg-gray-200 hover:text-black hover:bg-opacity-20 cursor-pointer flex items-center gap-1"
                title={isRTL ? "حجم الخط" : "Font Size"}
                type="button"
              >
                <span className="text-sm font-semibold">A</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showSizeDropdown && (
                <div className={clsx("absolute mt-1 bg-zinc-800 border border-gray-600 rounded shadow-lg z-10", {
                  "right-0": isRTL,
                  "left-0": !isRTL
                })}>
                  {[12, 14, 16, 18, 20, 24, 32].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        applyFontSize(size.toString());
                        setShowSizeDropdown(false);
                      }}
                      className={clsx("w-full px-4 py-1 text-sm text-white hover:bg-gray-700", {
                        "text-right": isRTL,
                        "text-left": !isRTL
                      })}
                    >
                      {size}px
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          className="min-h-32 p-4 focus:outline-none text-white relative placeholder-editor"
          style={{
            fontFamily: isRTL ? "Tahoma, Arial, sans-serif" : "Arial, sans-serif",
            fontSize: "14px",
            lineHeight: "1.5",
            direction: isRTL ? 'rtl' : 'ltr',
            textAlign: isRTL ? 'right' : 'left',
          }}
          dir={isRTL ? 'rtl' : 'ltr'}
          suppressContentEditableWarning={true}
          data-placeholder={placeholder}
        />
      </div>

      {/* Add global styles for lists with RTL support */}
      <style jsx global>{`
        [contenteditable] ul {
          list-style-type: disc;
          padding-left: ${isRTL ? '0' : '1.5rem'};
          padding-right: ${isRTL ? '1.5rem' : '0'};
          margin: 0.5rem 0;
        }
        [contenteditable] ol {
          list-style-type: decimal;
          padding-left: ${isRTL ? '0' : '1.5rem'};
          padding-right: ${isRTL ? '1.5rem' : '0'};
          margin: 0.5rem 0;
        }
        [contenteditable] li {
          margin: 0.25rem 0;
          direction: ${isRTL ? 'rtl' : 'ltr'};
        }
        [contenteditable][dir="rtl"] ul {
          list-style-type: disc;
          padding-left: 0;
          padding-right: 1.5rem;
        }
        [contenteditable][dir="rtl"] ol {
          list-style-type: arabic-indic;
          padding-left: 0;
          padding-right: 1.5rem;
        }
      `}</style>
    </div>
  );
}