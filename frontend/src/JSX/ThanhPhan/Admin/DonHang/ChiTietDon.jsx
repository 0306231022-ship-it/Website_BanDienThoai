import { useState , useEffect } from 'react';
import { Link , useParams} from 'react-router-dom';
import * as API from '../../../../JS/API/API';
import * as fun  from '../../../../JS/FUNCTONS/function';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';
function ChiTietDon() {
  const { id } = useParams();
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [err,seterr] = useState('');
  const [loading,setloading] = useState(false);
  const [ThongTin_KhachHang,setThongTin_KhachHang] = useState({});
  const [ThongTin_SanPham,setThongTin_SanPham] = useState([]);
  const [TrangThai,setTrangThai] = useState('');
  const TongTien = ThongTin_SanPham.reduce((tong, sp) => tong + sp.THANHTIEN, 0);
  const [ThongTin_HuyDon,setThongTin_HuyDon] = useState('');
  useEffect(() => {
    if (!id) {
      seterr('Không tìm thấy đơn hàng');
      return;
    }
    const fetchOrderDetails = async () => {
      setloading(true);
      try {
        const response = await API.CallAPI(undefined, {url: `/admin/chitiet_donhang?id=${id}` , PhuongThuc:2});
        if (response.ThanhCong) {
          setThongTin_KhachHang(response.ThongTin_KhachHang);
          setThongTin_SanPham(response.ThongTin_SanPham);
          setTrangThai(response.TrangThai);
        } else {
          seterr('Không thể tải chi tiết đơn hàng');
        }
      } catch (error) {
        seterr('Lỗi khi tải chi tiết đơn hàng');
      } finally {
        setloading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);
  const XuLi_XacNhan_Duyet = async (id) => {
    const XacNhan = await ThongBao.ThongBao_XacNhanTT("Bạn có chắc chắn muốn duyệt đơn hàng này không?");
    if(!XacNhan) return;
    try {
      const response = await API.CallAPI(undefined, {url: `/admin/duyet_donhang?id=${id}` , PhuongThuc:2});
      if(response.ThanhCong){
        ThongBao.ThongBao_ThanhCong(response.message);
        setTrangThai(1);
      } else {
        ThongBao.ThongBao_Loi(response.message);
      }
    } catch (error) {
      ThongBao.ThongBao_Loi("Lỗi khi duyệt đơn hàng");
      console.error("Error approving order:", error);
    } 
  }
  const XuLi_XacNhan_Huy = async (id) => {
    const XacNhan = await ThongBao.ThongBao_XacNhanTT("Bạn có chắc chắn muốn hủy đơn hàng này không?");
    if(!XacNhan) return;
    if(!ThongTin_HuyDon){
      ThongBao.ThongBao_CanhBao("Vui lòng nhập lý do hủy đơn hàng!");
      return;
    }
    try {
      const formdata = fun.objectToFormData({ LyDoHuy: ThongTin_HuyDon ,id:id });
      const response = await API.CallAPI(formdata, {url: `/admin/huy_donhang` , PhuongThuc:1});
      if(response.ThanhCong){
        ThongBao.ThongBao_ThanhCong(response.message);
        setTrangThai(2);
      } else {
        ThongBao.ThongBao_Loi(response.message);
      }
    }catch (error) {
      ThongBao.ThongBao_Loi("Lỗi khi hủy đơn hàng");
      console.error("Error canceling order:", error);
    }
  }
  if (err) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md border border-red-300">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            <i className="fas fa-exclamation-triangle mr-2"></i> Lỗi
          </h2>
          <p className="text-gray-700 mb-6">{err}</p>
          <Link
            to="/admin/DonHang"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition"
          >
            <i className="fas fa-arrow-left mr-2"></i> Quay Lại Danh Sách Đơn Hàng
          </Link>
        </div>
      </div>
    );
  }
    if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        <p className="mt-4 text-gray-700 text-lg">Đang tải chi tiết đơn hàng...</p>
      </div>
    );
  }
  return (
    <>
      <section
        id="order-detail-admin"
        className="section"
        aria-label="Chi tiết và xử lý đơn hàng"
      >
        <div className="flex items-center justify-between mb-6 mt-6 border-b pb-3 border-gray-200">
          <Link
            id="back-to-orders-btn"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition"
            to="/admin/DonHang">
            <i className="fas fa-arrow-left mr-2"></i> Quay Lại
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Chi Tiết Đơn Hàng #{id}
          </h2>
          {
            TrangThai === 0 ? (
              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-base font-bold">
                <i className="fas fa-hourglass-start mr-1"></i> Đang Chờ Xử Lý
              </span>
            ) : TrangThai === 1 ? (
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-base font-bold">
                <i className="fas fa-check-circle mr-1"></i> Đã Xử Lý
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-base font-bold">
                <i className="fas fa-times-circle mr-1"></i> Đã Hủy
              </span>
            )
          }
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-teal-100">
              <h3 className="text-xl font-bold text-teal-700 mb-4 border-b pb-2">
                Thông tin Khách hàng & Giao hàng
              </h3>
              <div className="grid grid-cols-2 gap-y-3">
                <p>
                  <span className="font-semibold text-gray-600">Khách hàng:</span>{' '}
                  {ThongTin_KhachHang.TEN_NGUOINHAN}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Ngày đặt:</span>{' '}
                  {fun.formatDate(ThongTin_KhachHang.NGAYDAT)}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Điện thoại:</span>{' '}
                  {ThongTin_KhachHang.SDT_NGUOINHAN}
                </p>
                <p className="col-span-2">
                  <span className="font-semibold text-gray-600">Địa chỉ:</span> 
                  {ThongTin_KhachHang.DIACHI_GIAOHANG}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-teal-100">
              <h3 className="text-xl font-bold text-teal-700 mb-4 border-b pb-2">
                Danh sách Sản phẩm
              </h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-bold text-gray-500 uppercase">
                      Sản phẩm
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-bold text-gray-500 uppercase">
                      SL
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-bold text-gray-500 uppercase">
                      Đơn giá
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-bold text-gray-500 uppercase">
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {
                    ThongTin_SanPham.map((sanpham,index) => (
                      <tr key={index} className="text-sm">
                        <td className="px-3 py-3 font-medium text-gray-900">
                          {sanpham.TENSANPHAM}
                        </td>
                        <td className="px-3 py-3 text-center">{sanpham.SOLUONG}</td>
                        <td className="px-3 py-3 text-right">{fun.formatCurrency(sanpham.DONGIA)}</td>
                        <td className="px-3 py-3 text-right">{fun.formatCurrency(sanpham.THANHTIEN)}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

              <div className="mt-4 pt-4 border-t border-gray-200 text-right space-y-1">
                <p className="text-sm">
                  <span className="font-semibold text-gray-600">Tạm tính:</span>{' '}
                  {fun.formatCurrency(TongTien)}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-600">Phí Vận chuyển:</span>{' '}
                  Chưa thực hiện chức năng tính phí vận chuyển
                </p>
                <p className="text-xl font-bold text-red-600">
                  <span className="text-gray-700">Tổng cộng:</span> {fun.formatCurrency(TongTien)}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-teal-50 p-6 rounded-xl shadow-inner border border-teal-300">
              <h3 className="text-xl font-bold text-teal-800 mb-4">
                Cập nhật Trạng thái
              </h3>
              <div className="space-y-3">
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition shadow-md">
                  <i className="fas fa-box-open mr-2"></i> Chuyển sang: Đang Xử Lý
                </button>
                <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition shadow-md">
                  <i className="fas fa-truck mr-2"></i> Chuyển sang: Đang Giao
                </button>
                {
                  TrangThai !== 2 && (
                     <button
                  onClick={() => setShowCancelForm(!showCancelForm)}
                  className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition shadow-md"
                >
                  <i className="fas fa-times-circle mr-2"></i> Hủy Đơn Hàng
                </button>
                  )
                }
               
                {
                  TrangThai === 0 && (
                    <>
                    <button onClick={()=>{XuLi_XacNhan_Duyet(id)}} className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition shadow-md">
                      <i className="fas fa-check mr-2"></i> Chuyển sang: Đã Xử Lý
                    </button>
                    <p className="text-sm font-medium text-gray-700">
                      *Đơn hàng đang ở trạng thái "Đang Chờ Xử Lý". Bạn có thể cập nhật trạng thái hoặc hủy đơn nếu cần thiết.
                    </p>
                    </>
                  )

                }
              </div>
            </div>

            <div
              id="cancel-reason-form"
              className={`bg-red-50 p-6 rounded-xl shadow-lg border-2 border-red-300 ${
                showCancelForm ? '' : 'hidden'
              }`}
            >
              <h3 className="text-xl font-bold text-red-700 mb-3">
                <i className="fas fa-exclamation-triangle mr-2"></i> Xác nhận Hủy Đơn
              </h3>

              <div>
                <label
                  htmlFor="cancel-reason"
                  className="block text-sm font-semibold text-red-700 mb-1"
                >
                  Lý do hủy đơn hàng (Bắt buộc)*
                </label>
                <textarea
                  onChange={(e)=>{setThongTin_HuyDon(e.target.value)}}
                  id="cancel-reason"
                  rows="3"
                  placeholder="Ví dụ: Sản phẩm hết hàng, Khách hàng yêu cầu hủy, Lỗi hệ thống..."
                  className="w-full p-3 border border-red-300 rounded-lg text-base focus:ring-red-500 focus:border-red-500 transition duration-150 bg-white"
                  required
                ></textarea>
              </div>

              <div className="mt-3 p-3 bg-red-100 border border-red-400 rounded-lg">
                <p className="text-sm font-medium text-red-800">
                  *Lý do này sẽ được **gửi thông báo** đến Khách hàng {ThongTin_KhachHang.TEN_NGUOINHAN}.
                </p>
              </div>

              <button onClick={()=>{XuLi_XacNhan_Huy(id)}} className="mt-4 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition shadow-md">
                <i className="fas fa-ban mr-2"></i> Xác Nhận HỦY Đơn
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChiTietDon;
