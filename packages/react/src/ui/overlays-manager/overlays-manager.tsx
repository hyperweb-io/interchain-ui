import * as React from "react";
import { useRef, useEffect } from "react";
import { overlays } from "./overlays";
import { OverlaysManagerProps } from "./overlays-manager.types";

function OverlaysManager(props: OverlaysManagerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const ownerDocument = containerRef.current.ownerDocument;
      const overlayRoot = overlays.getOrCreateOverlayRoot(ownerDocument);

      // Append children to the overlay root
      while (containerRef.current.firstChild) {
        overlayRoot.appendChild(containerRef.current.firstChild);
      }
      let zIndexCounter = 1;

      // Function to apply styles to direct children
      const applyStylesToChildren = () => {
        Array.from(overlayRoot.children).forEach((child, index) => {
          if (child instanceof HTMLElement) {
            child.style.position = "relative";
            child.style.zIndex = (index + 1).toString();
          }
        });
        zIndexCounter = overlayRoot.children.length + 1;
      };

      // Apply initial styles
      applyStylesToChildren();

      // Set up MutationObserver to watch for changes in children
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            applyStylesToChildren();
          }
        });
      });
      observer.observe(overlayRoot, {
        childList: true,
      });

      // Cleanup function
      cleanupRef.current = () => {
        observer.disconnect();
        if (!containerRef.current) {
          return;
        }
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      };
    }
  }, []);

  useEffect(() => {
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "none",
      }}
    />
  );
}

export default OverlaysManager;
