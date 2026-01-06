import { body } from 'express-validator';

export const PhieuNhapValidate = [
  body('NguoiGhiPhieu')
    .notEmpty()
    .withMessage('Bạn đang thực hiện hành vi trái phép')
    .isLength({ max: 10 })
    .withMessage('không tồn tại định dạng IDND!'),
  body('thongTinPhieu.GhiChu')
    .optional()
    .isLength({ max: 255 }).withMessage('Ghi chú quá dài'),

  body('thongTinPhieu.DaThanhToan')
    .optional()
    .isNumeric().withMessage('Số tiền đã thanh toán không hợp lệ'),

  body('CheDoLuu')
    .isIn(['0', '1']).withMessage('Chế độ lưu không hợp lệ'),

  body('newProductState')
    .isArray({ min: 1 }).withMessage('Danh sách sản phẩm rỗng'),

  body('newProductState.*.TenSanPham')
    .notEmpty().withMessage('Tên sản phẩm không được bỏ trống'),

  body('newProductState.*.ThuongHieu')
    .notEmpty().withMessage('Chưa chọn thương hiệu'),

  body('newProductState.*.GiaNhap')
    .isNumeric().withMessage('Giá nhập phải là số')
    .custom(v => v > 0).withMessage('Giá nhập phải > 0'),

  body('newProductState.*.GiaDuKien')
    .optional()
    .isNumeric().withMessage('Giá dự kiến không hợp lệ'),

  body('newProductState.*.SoLuong')
    .isInt({ min: 1 }).withMessage('Số lượng phải >= 1'),

  body('newProductState.*.ThongSoKyThuat.Ram')
    .notEmpty().withMessage('RAM không được bỏ trống'),

  body('newProductState.*.ThongSoKyThuat.BoNhoTrong')
    .notEmpty().withMessage('Bộ nhớ trong không được bỏ trống'),

  body('newProductState.*.ThongSoKyThuat.Pin')
    .notEmpty().withMessage('Pin không được bỏ trống'),

  body('newProductState.*.ThongSoKyThuat.MauSac')
    .notEmpty().withMessage('Màu sắc không được bỏ trống'),

  body('newProductState.*.parsedIMEI')
    .isArray().withMessage('IMEI phải là mảng')
    .custom((arr, { req, path }) => {
      const index = path.match(/\d+/)?.[0];
      const soLuong = req.body.newProductState[index].SoLuong;
      if (arr.length !== Number(soLuong)) {
        throw new Error('Số IMEI không khớp số lượng');
      }
      return true;
    }),
];
