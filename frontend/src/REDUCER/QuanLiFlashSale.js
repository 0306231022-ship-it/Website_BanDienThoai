import { create } from "zustand";
export const useFlashSaleStore = create((set) => ({
    sanPham: [],
    setSanPham: (newSanPham) => set({ sanPham: newSanPham }),
}));