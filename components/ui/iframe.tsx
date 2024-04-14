import React from "react";

interface IframeProps {
  src: string;
  title: string;
  allow: string;
  width?: string;
  height?: string;
  className?: string;
}

const Iframe: React.FC<IframeProps> = ({
  src,
  title,
  allow,
  width = "100%",
  height = "200px",
  className,
}) => {
  return (
    <div>
      <iframe
        src={src}
        allow={allow}
        title={title}
        width={width}
        height={height}
        className={className}
        loading="lazy"
        allowFullScreen

      />
    </div>
  );
};

export default Iframe;
