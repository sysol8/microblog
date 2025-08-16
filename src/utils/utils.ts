const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function formatLikes(likes: string[]): string {
  const count = likes.length;

  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }

  return count.toString();
}

function getCookie(name: string | undefined) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

// функция, которая принимает функцию или промис, и используется для действий с уведомлением

type MaybePromise<T> = T | Promise<T>;

async function withAlert<T>(
  action: () => MaybePromise<T>,
  options: { onSuccess?: () => void; onError?: (error: unknown) => void } = {},
): Promise<T> {
  try {
    const res = await action();
    options.onSuccess?.();
    return res;
  } catch (error) {
    options.onError?.(error);
    throw error;
  }
}

export { scrollToTop, formatLikes, getCookie, withAlert };
