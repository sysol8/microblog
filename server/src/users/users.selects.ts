import { Prisma } from '@prisma/client';

// Определяем возвращаемые сущности

// Полный и безопасный вариант User со всеми полями, кроме хеша пароля. Пример использования: профиль пользователя на отдельной странице приложения.
const user = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    username: true,
    createdAt: true,
    posts: {
      select: {
        id: true,
        createdAt: true,
        imageUrls: true,
        textContent: true,
        likes: {
          select: {
            userId: true,
          },
        },
        likesCount: true,
      },
    },
    likes: true,
    likesCount: true,
    avatarUrl: true,
  },
});
type TUser = Prisma.UserGetPayload<typeof user>;

// Минимальный User для случаев, когда сама сущность не является "центральной". Пример: всплывающая подсказка об авторе публикации.
const userCompact = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    username: true,
    avatarUrl: true,
  },
});
type TUserCompact = Prisma.UserGetPayload<typeof userCompact>;

// User для авторизации/аутентификации (id + username для подписи JWT)
const userAuth = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    username: true,
  },
});
type TUserAuth = Prisma.UserGetPayload<typeof userAuth>;

export { user, userCompact, userAuth };
export type { TUser, TUserCompact, TUserAuth };
