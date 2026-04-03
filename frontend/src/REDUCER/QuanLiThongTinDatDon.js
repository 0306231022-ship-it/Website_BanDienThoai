import { create } from "zustand";

export const useThongTinDonHang = create((set) => ({
  ThongTinDatDon: {
    ThongTin_KhachHang: {
      HoTen: "",
      SDT: "",
      DiaChi_GiaoHang: "",
    },
  },
  setThongTinDatDon: (newThongTin) =>
    set((state) => ({
      ThongTinDatDon: {
        ...state.ThongTinDatDon,
        ...newThongTin,
      },
    })),
}));
