export const alertMessages = {
  post: {
    addSuccess: "Пост успешно опубликован",
    addError: "Не удалось опубликовать пост",
  },
  auth: {
    authRequired: (action: string) =>`Войдите или зарегистрируйтесь, чтобы ${action}`,
  },
  common: {
    network: "Ошибка сети. Повторите попытку позже",
    notFound: "Запрашиваемый ресурс не существует"
  }
} as const;