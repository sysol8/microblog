interface FallbackProps {
  error: unknown;
  resetErrorBoundary: () => void;
}

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>то-то пошло не так</p>
      <pre>{error instanceof Error ? error.message : null}</pre>
      <button onClick={resetErrorBoundary}>Повторить</button>
    </div>
  );
}

export default Fallback;