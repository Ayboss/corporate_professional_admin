import { TUser } from "@/types/users";
import { create } from "zustand";

type UserState = {
  user: TUser | null;
  setUser: (data: TUser) => void;
};

const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (data: TUser) => set({ user: data }),
}));

export default useUser;
