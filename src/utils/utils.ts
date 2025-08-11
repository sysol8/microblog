const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatLikes(likes: string[]): string {
  const count = likes.length;

  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }

  return count.toString();
}


export { scrollToTop, formatLikes };