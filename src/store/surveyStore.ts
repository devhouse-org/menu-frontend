import { create } from 'zustand';

type StateType = {
  comment: string;
  name: string;
  email: string;
  phone: string;
  setComment: (comment: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
};

export const useSurveyStore = create<StateType>((set) => ({
  comment: "",
  name: "",
  email: "",
  phone: "",
  setComment: (comment) => set(() => ({ comment })),
  setName: (name) => set(() => ({ name })),
  setEmail: (email) => set(() => ({ email })),
  setPhone: (phone) => set(() => ({ phone })),
}));
