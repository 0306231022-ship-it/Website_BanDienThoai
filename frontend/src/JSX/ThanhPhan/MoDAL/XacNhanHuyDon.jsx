import React, { useState } from 'react';
import * as API from '../../../JS/API/API';
import * as fun from '../../../JS/FUNCTONS/function';
import * as ThongBao from '../../../JS/FUNCTONS/ThongBao';

const CancelOrderModal = ({ DuLieu }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const reasons = [
    "Tìm thấy giá rẻ hơn ở cửa hàng khác",
    "Muốn thay đổi cấu hình (Màu sắc, Dung lượng)",
    "Quên áp mã giảm giá / Ưu đãi độc quyền",
    "Thời gian dự kiến giao hàng quá chậm",
    "Thay đổi địa chỉ nhận hàng",
    "Lý do khác"
  ];

 
  const handleConfirm = async() => {
    const lyDoCuoiCung = selectedReason === "Lý do khác" ? otherReason : selectedReason;
    if(!lyDoCuoiCung){
        ThongBao.ThongBao_CanhBao('Vui lòng nhập lí do hủy đơn để chúng tôi cải thiện dịch vụ.');
        return;
    }
    const dulieu = {
      IDDH: DuLieu.IDDH,
      LyDo: lyDoCuoiCung,
    };
    const XacNhan = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn muốn hủy đơn hàng này không?');
    if(!XacNhan) return;
    try {
        const formdata = fun.objectToFormData(dulieu);
        const ketqua = await API.CallAPI(formdata,{PhuongThuc:1, url:'/NguoiDung/HuyDon_NguoiDung'});
       if(ketqua.ThanhCong){
            ThongBao.ThongBao_ThanhCong(ketqua.message);
       }else{
            ThongBao.ThongBao_Loi(ketqua.message);
       }
    } catch (error) {
        console.error('Đã có lỗi sãy ra:' + error);
    }
  };

  return (
    <div className="bg-white overflow-hidden border border-gray-100 rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800">Hủy đơn hàng : {`#${DuLieu?.IDDH}`}</h2>
        <p className="text-xs text-gray-500 mt-1">Vui lòng chọn lý do để chúng tôi cải thiện dịch vụ.</p>
      </div>

      {/* Thông báo */}
      <div className="flex items-center gap-3 p-4 bg-orange-50 mx-4 mt-4 rounded-xl border border-orange-100">
        <p className="text-sm text-orange-700 font-medium">
          Mã giảm giá sẽ không được hoàn lại sau khi hủy.
        </p>
      </div>

      {/* Danh sách lý do */}
      <div className="p-4 space-y-2">
        {reasons.map((reason) => (
          <label 
            key={reason}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
              selectedReason === reason 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3 w-full">
              <input 
                type="radio" 
                name="cancelReason"
                checked={selectedReason === reason} // Thêm thuộc tính này để đồng bộ UI
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                onChange={() => setSelectedReason(reason)}
              />
              <span className="text-sm font-medium text-gray-700">{reason}</span>
            </div>
          </label>
        ))}

        {/* Ô nhập văn bản nếu chọn 'Lý do khác' */}
        {selectedReason === "Lý do khác" && (
          <textarea
            className="w-full mt-2 p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Hãy chia sẻ thêm chi tiết (tối thiểu 10 ký tự)..."
            rows="3"
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
          />
        )}
      </div>

      {/* Footer Buttons */}
      <div className="p-4 flex gap-3">
        <button 
          
          className="flex-1 py-3 px-4 rounded-xl border border-gray-300 font-semibold text-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
        >
          Quay lại
        </button>
        <button 
          onClick={handleConfirm} // Gọi hàm xử lý lưu dữ liệu
          disabled={!selectedReason || (selectedReason === "Lý do khác" && !otherReason.trim())}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all active:scale-95 ${
            selectedReason && (selectedReason !== "Lý do khác" || otherReason.trim())
              ? 'bg-red-500 hover:bg-red-600 shadow-md shadow-red-200' 
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Xác nhận hủy
        </button>
      </div>
    </div>
  );
};

export default CancelOrderModal;