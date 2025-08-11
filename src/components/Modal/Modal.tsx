import styles from "./Modal.module.css";
import { useCallback, useEffect, useRef, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "../../store/modal";
import CancelIcon from "../../assets/icons/cancel.svg?react";

function Modal() {
  const isOpen = useModalStore((s) => s.isOpen);
  const content = useModalStore((s) => s.content);
  const close = useModalStore((s) => s.close);

  const dialogRef = useRef<HTMLDivElement>(null);

  const closeByOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  const onEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    },
    [close],
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", onEsc);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onEsc]);

  const modalContainer = document.getElementById("root");
  if (!modalContainer || !isOpen || !content) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={closeByOverlayClick}>
      <div
        ref={dialogRef}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <button
          className={styles.close}
          type="button"
          onClick={close}
          aria-label="Закрыть"
        >
          <CancelIcon className={styles.icon} />
        </button>
        <div className={styles.modalContent}>{content}</div>
      </div>
    </div>,
    modalContainer,
  );
}

export default Modal;
