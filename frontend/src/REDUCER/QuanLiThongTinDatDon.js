import { create } from "zustand";

export const useThongTinDonHang = create((set) => ({
  ThongTinDatDon: {
    IDDH: null,
    ThongTin_KhachHang: {
      HoTen: "",
      SDT: "",
      DiaChi_GiaoHang: "",
    },
    SanPham: [],
  },

    // Hàm chuyên để cập nhật thông tin khách hàng
  setThongTinKhachHang: (HoTen, SDT, DiaChi_GiaoHang) =>
    set((state) => ({
      ThongTinDatDon: {
        ...state.ThongTinDatDon,
        ThongTin_KhachHang: {
          ...state.ThongTinDatDon.ThongTin_KhachHang,
          HoTen,
          SDT,
          DiaChi_GiaoHang,
        },
      },
    })),
    // hàm cập nhật thông tin sản phẩm
  setThongTinSanPham: (SanPham) =>
    set((state) => ({
      ThongTinDatDon: {
        ...state.ThongTinDatDon,
        SanPham,
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


