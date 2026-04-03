import { create } from "zustand";

export const useThongTinDonHang = create((set) => ({
  ThongTinDatDon: {
    ThongTin_KhachHang: {
      HoTen: "",
      SDT: "",
      DiaChi_GiaoHang: "",
    },
  },
  setThongTinDatDon: (updates) =>
  set((state) => ({
    ThongTinDatDon: {
      ...state.ThongTinDatDon,
      ThongTin_KhachHang: {
        ...state.ThongTinDatDon.ThongTin_KhachHang,
        ...updates.ThongTin_KhachHang,
      },
    },
  })),


}));
