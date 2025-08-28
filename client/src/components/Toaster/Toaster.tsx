import styles from "./Toaster.module.css";
import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import type { ReactNode } from "react";

export interface ToasterItem {
  id: string;
}

export interface ToastProps<T extends ToasterItem> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

function Toaster<T extends ToasterItem>({ items, renderItem }: ToastProps<T>) {
  const toasterContainer = document.getElementById("toaster-root");
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, [items.length])

  if (!toasterContainer) return null;

  return createPortal(
    <div className={styles.toaster}>
      <ul className={styles.list} ref={listRef}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>,
    toasterContainer,
  );
}

export default Toaster;
