"use client";
import { BackIcon } from "@/imagecomponents";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface CPModalProps {
  children: ReactNode;
  isOpen?: boolean;
  backgroundAction?: () => void;
  width?: number;
  height?: number;
  minHeight?: number;
  mobileTitle?: string;
  mobileBackAction?: () => void;
  zIndex?: number; // Add z-index prop for stacking
}

function CPModal({
  children,
  isOpen = true,
  backgroundAction = () => {},
  width = 840,
  height,
  minHeight,
  mobileTitle,
  mobileBackAction = backgroundAction,
  zIndex = 50,
}: CPModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle click outside - only trigger on direct backdrop clicks
  useEffect(() => {
    if (!isOpen || !isMounted) return;

    function handleBackdropClick(event: MouseEvent) {
      // Only trigger if the click is directly on the backdrop element
      if (event.target === backdropRef.current) {
        backgroundAction();
      }
    }

    // Use click instead of mousedown for better control
    document.addEventListener("click", handleBackdropClick);
    return () => {
      document.removeEventListener("click", handleBackdropClick);
    };
  }, [isOpen, backgroundAction, isMounted]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !isMounted) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        // Only close if this is the topmost modal
        const allModals = document.querySelectorAll('[role="dialog"]');
        const thisModal = modalRef.current?.closest('[role="dialog"]');
        const topModal = allModals[allModals.length - 1];

        if (thisModal === topModal) {
          backgroundAction();
        }
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, backgroundAction, isMounted]);

  // Handle body scroll and focus management
  useEffect(() => {
    if (!isOpen || !isMounted) return;

    // Store the currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Prevent body scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // Focus the modal
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      // Restore body scroll
      document.body.style.overflow = originalStyle;

      // Restore focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, isMounted]);

  // Don't render anything on server side or when not open
  if (!isMounted || !isOpen) return null;

  const modalContent = (
    <div
      ref={backdropRef}
      className="fixed inset-0 flex justify-center items-center p-6"
      style={{
        backdropFilter: "blur(12px)",
        zIndex: zIndex,
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={mobileTitle ? "modal-title" : undefined}
    >
      <div
        ref={modalRef}
        className="flex flex-col gap-2 max-w-full max-h-[80vh] focus:outline-none"
        style={{
          width: width,
          height: height ? height : "auto",
          minHeight: minHeight ? minHeight : "400px",
        }}
        tabIndex={-1}
      >
        {mobileTitle && (
          <div className="bg-white w-full p-3.5 careershadow rounded-2xl block sm:hidden flex-shrink-0">
            <button
              onClick={mobileBackAction}
              className="flex gap-2 items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              <BackIcon />
              <span
                id="modal-title"
                className="text-[#050505] font-bold capitalize"
              >
                {mobileTitle}
              </span>
            </button>
          </div>
        )}
        <div className="bg-white border border-[#F1F5F9] max-w-full rounded-2xl careershadow flex-1 flex flex-col min-h-0 overflow-scroll">
          {children}
        </div>
      </div>
    </div>
  );

  // Use portal to render modal at document body level (only on client side)
  return createPortal(modalContent, document.body);
}

export default CPModal;
