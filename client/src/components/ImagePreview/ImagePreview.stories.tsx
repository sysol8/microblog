import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import ImagePreview from "./ImagePreview.tsx";
import styles from "./ImagePreview.mock.module.css";
import ClearIcon from "../../assets/icons/cancel.svg?react";

const meta: Meta<typeof ImagePreview> = {
  title: "Image Preview",
  tags: ["autodocs"],
  loaders: [() => imageLoader("/joker.jpeg")],
  component: ImagePreview,
};

export default meta;
type Story = StoryObj<typeof meta>;

const imageLoader = async (fileUrl: string) => {
  const response = await fetch(fileUrl);
  const blob = await response.blob();
  const file = new File([blob], fileUrl.split("/").pop() || "file", {
    type: blob.type,
  });
  return { file };
};

export const Default: Story = {
  loaders: [() => imageLoader("/joker.jpeg")],

  render: (_args, { loaded }) => (
    <ImagePreview
      file={loaded.file}
      containerClassName={styles.attachedImageContainer}
      imageClassName={styles.attachedImage}
      fallbackClassName={styles.fileName}
      alt="Превью изображения"
    />
  ),
};

export const WithButton: Story = {
  loaders: [() => imageLoader("/joker.jpeg")],

  render: (_args, { loaded }) => (
    <ImagePreview
      file={loaded.file}
      containerClassName={styles.attachedImageContainer}
      imageClassName={styles.attachedImage}
      fallbackClassName={styles.fileName}
      alt="Превью изображения"
    >
      <button
        type="button"
        className={styles.remove}
        onClick={fn()}
        aria-label={`Удалить файл ${loaded.file.name}`}
      >
        <ClearIcon className={styles.icon} />
      </button>
    </ImagePreview>
  ),
};

// TODO: переделать после переделки самого компонента для отображения нативного alt
export const ErrorOnLoading: Story = {
  render: () => {
    const brokenFile = new File([], "broken.txt", { type: "text/plain" });

    return (
      <ImagePreview
        file={brokenFile}
        containerClassName={styles.attachedImageContainer}
        imageClassName={styles.attachedImage}
        fallbackClassName={styles.fileName}
        alt={`Превью изображения ${brokenFile.name}`}
      />
    );
  }
}
