import styles from './ImageModal.module.css';
import ArrowIcon from '../../../assets/icons/arrow.svg?react';
import { useCallback, useEffect, useState } from "react";

type ImageModalProps = {
  urls: string[];
  start?: number;
};

function ImageModal({ urls, start = 0 }: ImageModalProps) {
  const [i, setI] = useState(Math.min(Math.max(start, 0), urls.length - 1));
  const prev = useCallback(() => setI((v) => (v - 1 + urls.length) % urls.length), [urls.length]);
  const next = useCallback(() => setI((v) => (v + 1) % urls.length), [urls.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <div className={styles.viewer}>
      <img src={urls[i]} alt="Изображение в модальном окне" className={styles.image} />
      {urls.length > 1 && (
        <>
          <button className={`${styles.button} ${styles.buttonLeft}`} onClick={prev} aria-label="Назад">
            <ArrowIcon className={`${styles.arrow} ${styles.arrowLeft}`} />
          </button>
          <button className={`${styles.button} ${styles.buttonRight}`} onClick={next} aria-label="Вперёд">
            <ArrowIcon className={`${styles.arrow} ${styles.arrowRight}`} />
          </button>
        </>
      )}
    </div>
  );
}

export default ImageModal;