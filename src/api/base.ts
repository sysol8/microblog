const BASE_URL = "http://localhost:8000"

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`)
  }
  const data = await response.json();
  return data as T;
}

async function ensureOk(response: Response): Promise<Response> {
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`)
  }
  return response;
}

export { BASE_URL, parseJson, ensureOk }