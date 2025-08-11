import { useState, useEffect, useMemo, type ReactNode } from 'react';

interface ImagePreviewProps {
  file: File;
  containerClassName?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  alt?: string;
  children?: ReactNode;
}

function ImagePreview({ file, containerClassName, imageClassName, fallbackClassName, alt = "", children }: ImagePreviewProps) {
  const isImage = useMemo(() => /^image\//.test(file.type), [file.type]);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isImage) return;

    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
      setUrl(null);
    };
  }, [file, isImage]);

  if (!isImage || !url) {
    return <span className={fallbackClassName}>{file.name}</span>;
  }

  return (
    <div className={containerClassName}>
      <img src={url} alt={alt || file.name} className={imageClassName} />
      {children}
    </div>
  )
}

export default ImagePreview;