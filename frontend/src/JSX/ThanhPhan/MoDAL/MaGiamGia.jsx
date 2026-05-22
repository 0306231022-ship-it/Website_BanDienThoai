import * as fun from '../../../JS/FUNCTONS/function';
import * as ThongBao from '../../../JS/FUNCTONS/ThongBao';
import * as API from '../../../JS/API/API';
import React, { useState} from 'react';
import { useThongTinDonHang } from '../../../REDUCER/QuanLiThongTinDatDon';
function MaGiamGia({DuLieu}) {
     const [ThongTinNguoiDung, setThongTinNguoiDung] = useState(null);
      const { ThongTinDatDon} = useThongTinDonHang();
       const [maGiamGia_NguoiDung, setMGG_NguoiDung] = useState([]); // Mã đã áp dụng
     const Chon_MaGiamGia = async (id) => {
        switch (DuLieu.TrangThai) {
          case 1:
            try {
              const formdata = fun.objectToFormData({ MaGG: id, IDND: ThongTinNguoiDung.IDND })
              const response = await API.CallAPI(formdata, { url: '/NguoiDung/ApMa_GiamGia', PhuongThuc: 1 });
              if (response.ThanhCong) {
                ThongBao.ThongBao_ThanhCong(response.message);
                const magg = await API.CallAPI(undefined, { url: `/NguoiDung/ApMaGiamGia_NguoiDung?idnd=${ThongTinNguoiDung.IDND}`, PhuongThuc: 2 });
                magg.ThanhCong ? setMGG_NguoiDung(magg.dulieu) : setMGG_NguoiDung([])
              } else {
                ThongBao.ThongBao_Loi(response.message);
              }
            } catch (error) {
              ThongBao.ThongBao_CanhBao('Có lỗi xảy ra!');
            }
            break;
          case 2:
            const selected = ThongTinDatDon.MaGiamGia_NguoiDung.filter(item => item.MaGG === id);
            setMGG_NguoiDung(selected);
            ThongBao.ThongBao_ThanhCong('Áp dụng thành công!');
            break;
          default:
            break;
        }
        // setIsModalOpen(false);
      }
    return (
          <label key={DuLieu.index} className="flex border border-red-100 rounded-xl overflow-hidden relative cursor-pointer active:bg-red-50 transition-colors">
                      <div className="w-24 bg-red-500 flex flex-col items-center justify-center text-white p-2">
                        <i className="fas fa-percent text-2xl"></i>
                        <span className="text-[10px] font-bold mt-1 text-center leading-tight uppercase">{DuLieu.TENCHUONGTRINH}</span>
                      </div>
                      <div className="flex-1 p-3 bg-white pr-10">
                        <h3 className="font-bold text-sm uppercase">
                          {DuLieu.LOAIGIAM === 1 ? `giảm ${DuLieu.GIATRIGIAM} %` : `giảm ${fun.formatCurrency(DuLieu.GIATRIGIAM)}`}
                        </h3>
                        <p className="text-[10px] text-gray-400 mt-1 leading-tight">{DuLieu.TENCHUONGTRINH}</p>
                        <p className="text-[10px] text-red-500 font-bold mt-2 italic">HSD: {fun.formatDate(DuLieu.NGAYKETTHUC)}</p>
                      </div>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {DuLieu.SOLUONG_DADUNG !== DuLieu.SOLUONG && (
                          <button onClick={() => { Chon_MaGiamGia(DuLieu.MaGG) }} className="bg-red-500 hover:bg-red-600 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-md active:scale-90 transition-transform uppercase">
                            Chọn
                          </button>
                        )}
                      </div>
                    </label>
    )
};
export default MaGiamGia;