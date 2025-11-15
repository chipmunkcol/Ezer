import { create } from "zustand";

type Option = {
  label: string;
  value: string;
};

interface AddFamilyState {
  husband: Option;
  wife: Option;
  setHusband: (option: Option) => void;
  setWife: (option: Option) => void;
}

export const useAddFamilyStore = create<AddFamilyState>((set) => ({
  husband: {
    label: "",
    value: "",
  },
  wife: {
    label: "",
    value: "",
  },
  setHusband: (option: Option) => set(() => ({ husband: option })),
  setWife: (option: Option) => set(() => ({ wife: option })),
}));
