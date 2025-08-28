export const alertMessages = {
  post: {
    addSuccess: "Пост успешно опубликован",
    addError: "Не удалось опубликовать пост",
  },
  auth: {
    authRequired: "Войдите или зарегистрируйтесь, чтобы выполнить действие",
  },
  common: {
    network: "Ошибка сети. Повторите попытку позже",
    notFound: "Запрашиваемый ресурс не существует"
  }
} as const;