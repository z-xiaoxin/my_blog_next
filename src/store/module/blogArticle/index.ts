import { create } from "zustand";

interface IArticleState {
  user: { id: number; name: string } | null;
  setUser: (user: IArticleState["user"]) => void;
  clearUser: () => void;
}

export const useArticleStore = create<IArticleState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
