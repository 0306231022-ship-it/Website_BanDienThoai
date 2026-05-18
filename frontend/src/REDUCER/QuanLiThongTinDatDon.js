import { create } from "zustand";

export const useThongTinDonHang = create((set) => ({
  ThongTinDatDon: {
    IDDH: null,
    ThongTin_KhachHang: {
      HoTen: "",
      SDT: "",
      DiaChi_GiaoHang: "",
    },
  },

  // Hàm cập nhật toàn bộ thông tin (cả IDDH và Khách hàng)
  setThongTinDatDon: (updates) =>
    set((state) => ({
      ThongTinDatDon: {
        ...state.ThongTinDatDon,
        ...(updates.IDDH !== undefined && { IDDH: updates.IDDH }),
        ThongTin_KhachHang: {
          ...state.ThongTinDatDon.ThongTin_KhachHang,
          ...updates.ThongTin_KhachHang,
        },
      },
    })),

  // Hàm chuyên để cập nhật IDDH
  setIDDH: (IDDH) =>
    set((state) => ({
      ThongTinDatDon: {
        ...state.ThongTinDatDon,
        IDDH,
      },
    })),
}));

