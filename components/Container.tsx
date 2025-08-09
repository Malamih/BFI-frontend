import React from "react";

export default function Container({
  children,
  className,
  style,
}: {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`container  mx-auto px-8 transition-all duration-300 ${className}`}
      style={style ? { ...style } : undefined}
    >
      {children}
    </div>
  );
}
