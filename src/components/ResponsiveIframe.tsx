import React from "react";

export interface ResponsiveIframeProps
  extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  /**
   * The source URL for the iframe.
   * Defaults to 'https://example.com'
   */
  src?: string;
  /**
   * Accessible title for the iframe content.
   */
  title?: string;
  /**
   * Optional custom classes for the iframe element itself.
   */
  iframeClassName?: string;
  /**
   * Optional custom classes for the outer wrapper element.
   */
  wrapperClassName?: string;
}

/**
 * ResponsiveIframe Component
 *
 * A highly reusable, responsive iframe wrapper that stretches to perfectly fill its parent's width and height.
 * It removes all default iframe styles, borders, and scrollbars, leaving a sleek, borderless content frame.
 */
export function ResponsiveIframe({
  src = "https://example.com",
  title = "Responsive Content Frame",
  iframeClassName = "",
  wrapperClassName = "",
  ...props
}: ResponsiveIframeProps) {
  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-transparent select-none ${wrapperClassName}`}
      style={{
        // Prevents any parent/layout overflow artifacts
        WebkitOverflowScrolling: "touch",
      }}
    >
      <iframe
        src={src}
        title={title}
        className={`w-full h-full absolute inset-0 block border-0 m-0 p-0 ${iframeClassName}`}
        style={{
          border: "none",
          outline: "none",
          // Removes scrollbar appearance in multiple browsers while maintaining standard standard attributes
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
        // Standard iframe layout properties for compatibility
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        {...props}
      />

      {/* Embedded CSS trick to ensure scrollbars are hidden for child documents if browser allows */}
      <style>{`
        iframe::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>
    </div>
  );
}

export default ResponsiveIframe;
