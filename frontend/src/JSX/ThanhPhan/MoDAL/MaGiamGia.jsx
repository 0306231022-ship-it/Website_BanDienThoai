import * as fun from '../../../JS/FUNCTONS/function';
import * as ThongBao from '../../../JS/FUNCTONS/ThongBao';
import * as API from '../../../JS/API/API';
import React, { useState} from 'react';
import { useThongTinDonHang } from '../../../REDUCER/QuanLiThongTinDatDon';
function MaGiamGia({DuLieu}) {

 
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
                          <button onClick={() => { }} className="bg-red-500 hover:bg-red-600 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-md active:scale-90 transition-transform uppercase">
                            Chọn
                          </button>
                        )}
                      </div>
                    </label>
    )
};
export default MaGiamGia;