import styles from "./Toaster.module.css";
import { createPortal } from "react-dom";
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

  if (!toasterContainer) return null;

  return createPortal(
    <div className={styles.toaster}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>,
    toasterContainer,
  );
}

export default Toaster;
