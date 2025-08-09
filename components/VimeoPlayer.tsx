"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play, X } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

interface VimeoPlayerProps {
  videoId: string;
  className?: ClassValue;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  responsive?: boolean;
  width?: number;
  height?: number;
  title?: string;
  byline?: boolean;
  portrait?: boolean;
  color?: string;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (error: any) => void;
}

const VimeoPlayerCore: React.FC<VimeoPlayerProps> = ({
  videoId,
  className,
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  responsive = true,
  width = 640,
  height = 360,
  title = true,
  byline = true,
  portrait = true,
  color = "00adef",
  onReady,
  onPlay,
  onPause,
  onEnded,
  onError,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [player, setPlayer] = useState<any>(null);

  // Construct Vimeo embed URL with parameters
  const getVimeoUrl = () => {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      loop: loop ? "1" : "0",
      muted: muted ? "1" : "0",
      controls: controls ? "1" : "0",
      title: title ? "1" : "0",
      byline: byline ? "1" : "0",
      portrait: portrait ? "1" : "0",
      color: color.replace("#", ""),
    });

    return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
  };

  // Initialize Vimeo Player API if available
  useEffect(() => {
    // Check if Vimeo Player API is available
    if (typeof window !== "undefined" && (window as any).Vimeo) {
      const VimeoPlayer = (window as any).Vimeo.Player;

      if (iframeRef.current) {
        const playerInstance = new VimeoPlayer(iframeRef.current);

        playerInstance
          .ready()
          .then(() => {
            setIsLoading(false);
            setPlayer(playerInstance);
            onReady?.();
          })
          .catch((error: any) => {
            setHasError(true);
            setIsLoading(false);
            onError?.(error);
          });

        // Event listeners
        if (onPlay) playerInstance.on("play", onPlay);
        if (onPause) playerInstance.on("pause", onPause);
        if (onEnded) playerInstance.on("ended", onEnded);

        return () => {
          playerInstance.destroy();
        };
      }
    } else {
      // Fallback: just show the iframe
      setIsLoading(false);
    }
  }, [videoId, onReady, onPlay, onPause, onEnded, onError]);

  // Handle iframe load
  const handleIframeLoad = () => {
    if (!player) {
      setIsLoading(false);
    }
  };

  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.({ message: "Failed to load Vimeo video" });
  };

  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 rounded-lg",
          className
        )}
      >
        <div className="text-center p-8">
          <div className="text-gray-400 mb-2">
            <svg
              className="w-12 h-12 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-gray-600 text-sm">Failed to load video</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", responsive && "aspect-video", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={getVimeoUrl()}
        width={responsive ? "100%" : width}
        height={responsive ? "100%" : height}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={`Vimeo video ${videoId}`}
        className={cn(
          "rounded-lg",
          responsive ? "w-full h-full" : "",
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-300"
        )}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
    </div>
  );
};

interface VimeoModalPlayerProps extends Omit<VimeoPlayerProps, "className"> {
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  containerClassName?: ClassValue;
  triggerClassName?: ClassValue;
  modalClassName?: ClassValue;
  playIconClassName?: ClassValue;
  children?: React.ReactNode;
}

export const VimeoModalPlayer: React.FC<VimeoModalPlayerProps> = ({
  videoId,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  containerClassName,
  triggerClassName,
  modalClassName,
  playIconClassName,
  children,
  autoplay = true, // Auto play when modal opens
  ...vimeoProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    thumbnailSrc || null
  );

  // Fetch Vimeo thumbnail if not provided
  useEffect(() => {
    if (!thumbnailSrc && videoId) {
      const fetchThumbnail = async () => {
        try {
          const response = await fetch(
            `https://vimeo.com/api/v2/video/${videoId}.json`
          );
          const data = await response.json();
          if (data && data[0] && data[0].thumbnail_large) {
            setThumbnailUrl(data[0].thumbnail_large);
          }
        } catch (error) {
          console.error("Failed to fetch Vimeo thumbnail:", error);
          // Fallback to a default thumbnail URL pattern
          setThumbnailUrl(`https://vumbnail.com/${videoId}.jpg`);
        }
      };

      fetchThumbnail();
    }
  }, [videoId, thumbnailSrc]);

  return (
    <div className={cn("relative", containerClassName)}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            className={cn(
              "absolute inset-0 z-10 group cursor-pointer",
              "flex items-center justify-center",
              "bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300",
              "overflow-hidden",
              triggerClassName
            )}
            aria-label="Play video"
          >
            {children}
            {/* Thumbnail Background */}
            {thumbnailUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${thumbnailUrl})` }}
              />
            )}

            {/* Play Button Overlay */}
            <div
              className={cn(
                "relative z-20 flex items-center justify-center",
                "w-20 h-20 bg-black bg-opacity-0 border border-white  hover:bg-opacity-50",
                "rounded-full shadow-lg",
                "transform group-hover:scale-110 transition-all duration-300",
                playIconClassName
              )}
            >
              <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
            </div>

            {/* Optional gradient overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </button>
        </DialogTrigger>

        <DialogContent
          className={cn(
            "max-w-4xl w-[95vw] p-0 bg-transparent border-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            modalClassName
          )}
        >
          <DialogTitle></DialogTitle>
          <div className="relative bg-black rounded-lg overflow-hidden">
            <VimeoPlayerCore
              videoId={videoId}
              autoplay={autoplay}
              className="w-full aspect-video"
              responsive={true}
              {...vimeoProps}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Children content (the actual content behind the trigger) */}
    </div>
  );
};
