"use client";
import React from "react";

interface VimeoPlayerProps {
  videoId: string;
  aspectRatio?: number; // width / height ratio, default 16/9 = 1.777...
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

const VimeoPlayer: React.FC<VimeoPlayerProps> = ({
  videoId,
  aspectRatio = 16 / 9,
  autoplay = false,
  loop = false,
  muted = false,
}) => {
  const src = `https://player.vimeo.com/video/${videoId}?autoplay=${
    autoplay ? 1 : 0
  }&loop=${loop ? 1 : 0}&muted=${muted ? 1 : 0}`;

  return (
    <div
      style={{
        position: "relative",
        paddingBottom: `${100 / aspectRatio}%`, // height based on width and ratio
        height: 0,
        overflow: "hidden",
        width: "100%",
        borderRadius: 8,
      }}
    >
      <iframe
        src={src}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: 0,
          borderRadius: 8,
        }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={`Vimeo Video ${videoId}`}
      />
    </div>
  );
};

export default VimeoPlayer;
