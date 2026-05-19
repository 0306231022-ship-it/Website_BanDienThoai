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
    ThongTin_Gia:{
      TongTien: 0,
      PhiVanChuyen: 0,
      GiamGia: 0,
    }
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
  
    // hàm cập nhật thông tin phí vận chuyển
  setPhiVanChuyen: (PhiVanChuyen) =>
    set((state) => ({
      ThongTinDatDon: {
        ...state.ThongTinDatDon,
        ThongTin_Gia: {
          ...state.ThongTinDatDon.ThongTin_Gia,
          PhiVanChuyen,
        },
      },
    })),
    // hàm cập nhật thông tin giảm giá
  setGiamGia: (GiamGia) =>
    set((state) => ({
      ThongTinDatDon: {
        ...state.ThongTinDatDon,
        ThongTin_Gia: {
          ...state.ThongTinDatDon.ThongTin_Gia,
          GiamGia,
        },
      },
    })),
    // hàm cập nhật thông tin tổng tiền
  setTongTien: (TongTien) =>
    set((state) => ({
      ThongTinDatDon: {
        ...state.ThongTinDatDon,
        ThongTin_Gia: {
          ...state.ThongTinDatDon.ThongTin_Gia,
          TongTien,
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


