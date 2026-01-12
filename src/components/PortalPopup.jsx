"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function PortalPopup({
  children,
  overlayColor = "rgba(0, 0, 0, 0.8)",
  onOutsideClick,
  zIndex = 100,
}) {
  const overlayRef = useRef(null);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current && onOutsideClick) {
      onOutsideClick();
    }
  };

  if (typeof window === "undefined") return null;

  let portalsDiv = document.getElementById("portals");
  if (!portalsDiv) {
    portalsDiv = document.createElement("div");
    portalsDiv.setAttribute("id", "portals");
    document.body.appendChild(portalsDiv);
  }

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex, backgroundColor: overlayColor }}
    >
      <div className="max-w-[90%] max-h-[90%] overflow-auto">{children}</div>
    </div>,
    portalsDiv
  );
}
