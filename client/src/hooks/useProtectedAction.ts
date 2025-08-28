import { useAuthStore } from "../store/authStore.ts";

export function useProtectedAction() {
  const user = useAuthStore(state => state.user);
  return {
    post: {
      edit: (authorId: string) => user?.id === authorId,
      delete: (authorId: string) => user?.id == authorId,
      like: () => !!user,
    }
  }
}