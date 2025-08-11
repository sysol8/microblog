import styles from "./Toast.module.css";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

export interface ToastItem {
  id: string;
}

export interface ToastProps<T extends ToastItem> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

function Toast<T extends ToastItem>({ items, renderItem }: ToastProps<T>) {
  return createPortal(
    <div className={styles.toast}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>,
    document.body,
  );
}

export default Toast;
