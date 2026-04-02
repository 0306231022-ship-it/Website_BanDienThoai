import React, { useState , useEffect } from 'react';
import * as API from '../../../JS/API/API';
import {KiemTra  , LayThongTinNguoiDung } from '../../../hook/KiemTraDangNhap';
import * as ThongBao from '../../../JS/FUNCTONS/ThongBao';
import * as fun from '../../../JS/FUNCTONS/function';
const ThongTinDonHang = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [ThongTinDiaChi, setThongTinDiaChi] = useState(null);
  const [ThongTinNguoiDung, setThongTinNguoiDung] = useState(null);
  const [DiaChi, setDiaChi] = useState('');
  const [reload, setreload] = useState(false);
  const [SanPham, setSanPham] = useState([]);
  const [ThongTin,setThongTin] = useState([])
  const TongTien = SanPham.reduce((tong, item) => tong + item.DONGIA * item.SOLUONG, 0);
  const MaGiamGia=  ThongTin.LOAIGIAM ===0 ? ThongTin.GIATRIGIAM: TongTien*(ThongTin.GIATRIGIAM/100) ;
  const PhiVanChuyen = 0;
  const [maGiamGia , setMGG] = useState([])
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [input_diachi, setinput_diachi] = useState(false);
  useEffect(() => {
    const fetch_ThongTinDonHang= async () => {
        const kiemtra = await KiemTra();
        if(kiemtra){
            const thongTinNguoiDung = await LayThongTinNguoiDung();
            setThongTinNguoiDung(thongTinNguoiDung);
            setloading(true);
            try {
                const [response1, response2 , response3 , response4] = await Promise.all([
                    API.CallAPI(undefined, { url: `/NguoiDung/LayDiaChi?IDND=${thongTinNguoiDung.IDND}`, PhuongThuc: 2 }),
                    API.CallAPI(undefined, { url: `/NguoiDung/giohang?idnd=${thongTinNguoiDung.IDND}`, PhuongThuc: 2 }),
                    API.CallAPI(undefined, { url: `/NguoiDung/LayMaGiamGia?idnd=${thongTinNguoiDung.IDND}`, PhuongThuc: 2 }),
                    API.CallAPI(undefined,{ url :`/NguoiDung/ThongTinDonHang?idnd=${thongTinNguoiDung.IDND}` ,PhuongThuc:2} )
                ]);
                response1.ThanhCong ?  setThongTinDiaChi(response1.DuLieu[0]) :  setThongTinDiaChi(null);
                response2.ThanhCong ? setSanPham(response2.dulieu) : setSanPham([]);
                response3.ThanhCong ? setMGG(response3.dulieu) : setMGG([]);
                response4.ThanhCong ? setThongTin(response4.dulieu[0]) : ThongBao.ThongBao_Loi(response4.message)
            } catch (error) {
                ThongBao.ThongBao_Loi("Có lỗi xảy ra khi tải thông tin địa chỉ");
                console.error("Lỗi khi tải thông tin địa chỉ:", error);
            } finally {
                setloading(false);
            }
        }else{
            ThongBao.ThongBao_Loi("Vui lòng đăng nhập để xem thông tin đơn hàng");
        }
    };
    fetch_ThongTinDonHang();
  },[reload]);
  const Luu_DiaChi = async () => {
    if (!DiaChi) {
        ThongBao.ThongBao_Loi("Vui lòng nhập địa chỉ cụ thể!");
        return;
    }
    setloading(true);
    try {
        const thongTinNguoiDung = await LayThongTinNguoiDung();
        const DuLieu = fun.objectToFormData({ DiaChi: DiaChi , IDND: thongTinNguoiDung.IDND });
        const response = await API.CallAPI(DuLieu, { url: '/NguoiDung/ChinhSuaDiaChi', PhuongThuc: 1 });
        if(response.Validate){
            ThongBao.ThongBao_Loi(response.errors[0]?.msg || 'Dữ liệu không hợp lệ');
            return;
        } 
        if(response.ThanhCong){
            ThongBao.ThongBao_ThanhCong(response.message);
            setreload(!reload);
        }else{
            ThongBao.ThongBao_Loi(response.message);
        }
    } catch (error) {        
        ThongBao.ThongBao_Loi("Có lỗi xảy ra khi lưu địa chỉ");
        console.error("Lỗi khi lưu địa chỉ:", error);
    } finally {        
        setloading(false);
    }
  }
  const Chon_MaGiamGia = async(id)=>{
    try {
      const formdata= fun.objectToFormData({MaGG:id,IDND:ThongTinNguoiDung.IDND})
      const response = await API.CallAPI(formdata, {url :'/NguoiDung/ApMa_GiamGia' , PhuongThuc:1});
      if(response.ThanhCong){
        ThongBao.ThongBao_ThanhCong(response.message);
        return;
      }else{
        ThongBao.ThongBao_Loi(response.message);
        return;
      }
    } catch (error) {
      console.error('Lỗi chọn max giảm giá :' + error);
      ThongBao.ThongBao_CanhBao('Có lỗi sãy ra, Vui lòng kiểm tra lại! ')
    }
  }

  return (
    <div className="bg-gray-100 flex justify-center">
      {/* Container Điện Thoại Giả Lập */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col">
    
        <main className="flex-1 overflow-y-auto p-4 space-y-5 pb-32">
          {
            loading ? (
              <div className="animate-pulse flex space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ) : (
                ThongTinDiaChi !== null ? (
                    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100 relative cursor-pointer">
                        <div className="flex items-center text-blue-600 mb-2">
              <i className="fas fa-map-marker-alt mr-2"></i>
              <span className="text-xs font-bold uppercase tracking-wider">Địa chỉ nhận hàng</span>
            </div>
            <p className="font-bold text-gray-800">
              {ThongTinNguoiDung?.HOTEN || 'Người dùng'} <span className="font-normal text-gray-500">| {ThongTinNguoiDung?.SDT || 'Số điện thoại không có'}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
                {ThongTinDiaChi.DIACHI}
            </p>
            <i className="fas fa-chevron-right absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"></i>
          </section>
                ) : (
                    <section className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-2xl border border-gray-200 text-center text-gray-500">
                        <p className="text-sm text-gray-600 mt-1">Vui lòng thêm địa chỉ để tiếp tục</p>
                        <button onClick={()=>{setinput_diachi(true)}} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            Thêm địa chỉ
                        </button>
                    </section>
                )
        )}
        {
            input_diachi && (
                <section className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-2xl border border-yellow-200 text-center text-yellow-500">
                    <p className="font-bold text-gray-800">Vui lòng nhập địa chỉ nhận hàng</p>
                   <input type="text" onChange={(e) => setDiaChi(e.target.value)} placeholder="Nhập địa chỉ nhận hàng" className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                   <button onClick={Luu_DiaChi} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Lưu địa chỉ
                    </button>
                </section>
            )
        }

          {/* Khối 2: Danh sách sản phẩm */}
          {
            loading ? (
                <div className="animate-pulse flex space-x-4">
                    <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                </div>
            ) : (
                
                    SanPham.length > 0 ? (
                        SanPham.map((item, index) => (
                         <section key={index} className="space-y-4">
                   
                    <div className="flex space-x-3 bg-white p-2 rounded-xl border border-gray-50 shadow-sm">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
                <img 
                 src={`http://localhost:3001/${item.HINHANH}`} 
                  alt={item.TENSANPHAM} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium line-clamp-2 uppercase italic">{item.TENSANPHAM}</h3>
                <p className="text-xs text-gray-400 mt-1">Thương hiệu: {item.TENTHUONGHIEU}</p>
                <div className="flex justify-between items-end mt-1">
                  <span className="font-bold text-red-500">{fun.formatCurrency(item.DONGIA)}</span>
                  <span className="text-sm text-gray-500 font-medium">x{item.SOLUONG}</span>
                </div>
              </div>
            </div>
          </section>
                        ))

                    ) : (
                        <section className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-2xl border border-gray-200 text-center text-gray-500">
                            <p className="text-sm text-gray-600 mt-1">Không có sản phẩm nào trong đơn hàng</p>
                        </section>
                    )
        )}
               

          {/* Khối 3: Nút mở Mã giảm giá */}
          <section 
            onClick={toggleModal}
            className="flex items-center justify-between p-4 bg-orange-50 border border-orange-100 rounded-2xl cursor-pointer active:scale-95 transition-transform"
          >
            <div className="flex items-center space-x-3 text-orange-600">
              <i className="fas fa-ticket-alt text-xl"></i>
              <span className="font-bold text-sm">Ưu đãi của Shop</span>
            </div>
            <div className="flex items-center text-orange-500">
              <span className="text-xs font-medium mr-1 tracking-tight">Chọn mã giảm giá</span>
              <i className="fas fa-chevron-right text-[10px]"></i>
            </div>
          </section>

          {/* Khối 4: Chi tiết giá tiền */}
          <section className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tổng tiền hàng</span>
              <span className="font-medium text-gray-800">{fun.formatCurrency(TongTien)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Phí vận chuyển</span>
              <span className="font-medium text-gray-800">{fun.formatCurrency(PhiVanChuyen)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Áp dụng mã giảm giá</span>
              <span className="font-medium text-green-500">-{fun.formatCurrency(MaGiamGia)}</span>
            </div>
          </section>

        </main>

        {/* Thanh thanh toán cố định ở dưới */}
        <footer className="p-4 bg-white border-t sticky bottom-0 z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          <div className="flex justify-end items-center mb-3 space-x-2">
            <span className="text-sm text-gray-600">Tổng thanh toán:</span>
            <span className="text-xl font-bold text-orange-600">{fun.formatCurrency(TongTien + PhiVanChuyen - MaGiamGia)}</span>
          </div>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-transform uppercase tracking-wider">
            Đặt hàng
          </button>
        </footer>

        {/* MODAL CHỌN MÃ GIẢM GIÁ */}
        <div 
          className={`fixed inset-0 z-50 flex items-end transition-all duration-300 ${
            isModalOpen ? 'visible' : 'invisible'
          }`}
        >
          {/* Overlay đen mờ */}
          <div 
            onClick={toggleModal}
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              isModalOpen ? 'opacity-100' : 'opacity-0'
            }`}
          ></div>
          
          {/* Nội dung Voucher */}
          <div 
            className={`relative bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto transform transition-transform duration-300 ease-in-out ${
              isModalOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Chọn mã giảm giá</h2>
              <button onClick={toggleModal} className="focus:outline-none">
                <i className="fas fa-times text-gray-400 text-xl"></i>
              </button>
            </div>

            {/* Input nhập mã */}
            <div className="flex space-x-2 mb-6">
              <input 
                type="text" 
                placeholder="Nhập mã voucher tại đây" 
                className="flex-1 bg-gray-100 px-4 py-3 rounded-xl text-sm focus:outline-none ring-1 ring-gray-200 focus:ring-blue-400 transition-shadow"
              />
              <button className="bg-gray-200 text-gray-500 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-300 transition-colors">
                Áp dụng
              </button>
            </div>

            {/* List mã */}
            <div className="space-y-4">
           {
            loading ? (
              <div className="animate-pulse flex space-x-4">
                    <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                </div>
            ):(
              maGiamGia.length> 0 ? (
                maGiamGia.map((maGiamGia,index)=>(
                            <label key={index} className="flex border border-red-100 rounded-xl overflow-hidden relative cursor-pointer active:bg-red-50 transition-colors">
                <div className="w-24 bg-red-500 flex flex-col items-center justify-center text-white p-2">
                  <i className="fas fa-percent text-2xl"></i>
                  <span className="text-[10px] font-bold mt-1 text-center leading-tight uppercase">{MaGiamGia.TENCHUONGTRINH}</span>
                </div>
                <div className="flex-1 p-3 bg-white pr-10">
                  <h3 className="font-bold text-sm uppercase">
                    {
                      maGiamGia.LOAIGIAM === 1 ?
                        `giảm ${maGiamGia.GIATRIGIAM} %` : 
                        `giảm ${fun.formatCurrency(maGiamGia.GIATRIGIAM)}`
                    }
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-1 leading-tight">{maGiamGia.TENCHUONGTRINH}</p>
                  <p className="text-[10px] text-red-500 font-bold mt-2 italic">HSD: {fun.formatDate(maGiamGia.NGAYKETTHUC)}</p>
                </div>
               <div className="absolute right-3 top-1/2 -translate-y-1/2">
               {
                maGiamGia.SOLUONG_DADUNG !== maGiamGia.SOLUONG && (
                   <button onClick={()=>{Chon_MaGiamGia(maGiamGia.MaGG)}} className="bg-red-500 hover:bg-red-600 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-md active:scale-90 transition-transform uppercase">
                     Chọn
                  </button>
                )
               }
                 
                 </div>
              </label>
                ))
              ):(
               <div className="flex flex-col items-center justify-center py-20 text-center">
  {/* Phần hình ảnh giả lập (Dùng icon thay thế) */}
  <div className="relative mb-6">
    <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center">
        <i className="fas fa-search text-orange-200 text-5xl"></i>
    </div>
    <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
        <i className="fas fa-times text-red-400"></i>
    </div>
  </div>

  {/* Nội dung chính */}
  <div className="space-y-2">
    <p className="text-gray-800 font-bold text-lg italic">"Opps! Trống trải quá"</p>
    <p className="text-gray-400 text-sm px-10 leading-relaxed">
      Hiện tại chưa có mã giảm giá nào khả dụng cho đơn hàng này. 
      Hãy thử mua thêm sản phẩm để nhận ưu đãi nhé!
    </p>
  </div>

  {/* Nút quay lại mua sắm */}
  <button 
    className="mt-8 px-8 py-3 bg-gray-800 text-white rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform"
  >
    Tiếp tục mua sắm
  </button>
</div>
              )
            )
           }
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ThongTinDonHang;