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
    // HACK: Простая обработка с выбрасыванием человекочитаемых ошибок.
    //  В данном случае такой обработки достаточно, но при расширении проекта можно вынести
    //  обработку в отдельную сущность и сделать более универсальной
    if (response.status === 400) throw new Error("Введены некорректные данные");
    if (response.status === 401) throw new Error("Неверный логин или пароль");
    if (response.status === 409) throw new Error("Пользователь с таким именем уже существует");
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`)
  }
  return response;
}

export { BASE_URL, parseJson, ensureOk }