-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 27, 2026 lúc 10:17 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quanliwebsite_bandienthoai`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `binhluan`
--

CREATE TABLE `binhluan` (
  `IDBL` varchar(10) NOT NULL,
  `IDND` varchar(10) DEFAULT NULL,
  `IDSP` varchar(10) DEFAULT NULL,
  `NOIDUNG` text DEFAULT NULL,
  `TRALOI` text DEFAULT NULL,
  `TRANGTHAI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `caidatwebsite`
--

CREATE TABLE `caidatwebsite` (
  `IDWEBSITE` varchar(10) NOT NULL,
  `TenWebsite` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `LinkFacebook` varchar(255) DEFAULT NULL,
  `LinkInstagram` varchar(255) DEFAULT NULL,
  `Zalo` varchar(20) DEFAULT NULL,
  `LoGo` varchar(255) DEFAULT NULL,
  `MoTaWebstite` text NOT NULL,
  `TrangThai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `caidatwebsite`
--

INSERT INTO `caidatwebsite` (`IDWEBSITE`, `TenWebsite`, `Email`, `DiaChi`, `LinkFacebook`, `LinkInstagram`, `Zalo`, `LoGo`, `MoTaWebstite`, `TrangThai`) VALUES
('ID-WBSS02', 'PhoneStore', '0306231022@caothang.edu.vn', '332, Thôn hiệp thành 1, xã Gia Hiệp, tỉnh Lâm Đồng', 'https://www.facebook.com/nguyen.ngoc.hieu.371118', 'https://instagram.com/adminstore_official', '0398004970', 'uploads/1766996872458-877331012.jpg', 'Hãy nói theo cách của bạn!', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitiet_donhang`
--

CREATE TABLE `chitiet_donhang` (
  `IDCT` int(11) NOT NULL,
  `IDDH` varchar(10) DEFAULT NULL,
  `IDSANPHAM` varchar(10) DEFAULT NULL,
  `SOLUONG` int(11) DEFAULT NULL,
  `DONGIA` decimal(15,2) DEFAULT NULL,
  `THANHTIEN` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitiet_donhang`
--

INSERT INTO `chitiet_donhang` (`IDCT`, `IDDH`, `IDSANPHAM`, `SOLUONG`, `DONGIA`, `THANHTIEN`) VALUES
(1, 'DH-001', 'SP-IP15PM', 1, 31000000.00, 31000000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitiet_phieunhap`
--

CREATE TABLE `chitiet_phieunhap` (
  `IDCTPN` int(11) NOT NULL,
  `IDPN` varchar(10) NOT NULL,
  `IDSANPHAM` varchar(10) NOT NULL,
  `SOLUONG` int(11) NOT NULL,
  `GIANHAP` decimal(15,2) NOT NULL,
  `THANHTIEN` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitiet_phieunhap`
--

INSERT INTO `chitiet_phieunhap` (`IDCTPN`, `IDPN`, `IDSANPHAM`, `SOLUONG`, `GIANHAP`, `THANHTIEN`) VALUES
(1, '1', 'SP-IP15PM', 2, 28000000.00, 56000000.00),
(2, 'PN-2601-66', 'SP-2601-12', 1, 1.00, 1.00),
(3, 'PN-2601-33', 'SP-2601-51', 1, 45000.00, 45000.00),
(4, 'PN-2601-55', 'SP-2601-33', 1, 789.00, 789.00),
(5, 'PN-2601-94', 'SP-2601-97', 1, 789.00, 789.00),
(6, 'PN-2601-14', 'SP-2601-48', 1, 30000000.00, 30000000.00),
(7, 'PN-2601-84', 'SP-2601-86', 1, 30000000.00, 30000000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diachi_nguoidung`
--

CREATE TABLE `diachi_nguoidung` (
  `IDDC` varchar(10) NOT NULL,
  `DIACHI` varchar(255) DEFAULT NULL,
  `IDND` varchar(10) DEFAULT NULL,
  `TRANGTHAI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donhang`
--

CREATE TABLE `donhang` (
  `IDDH` varchar(10) NOT NULL,
  `IDKH` varchar(10) DEFAULT NULL,
  `NGAYDAT` datetime DEFAULT current_timestamp(),
  `TONGTIEN` decimal(15,2) DEFAULT 0.00,
  `TEN_NGUOINHAN` varchar(255) DEFAULT NULL,
  `SDT_NGUOINHAN` varchar(20) DEFAULT NULL,
  `DIACHI_GIAOHANG` text DEFAULT NULL,
  `TRANGTHAI` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `donhang`
--

INSERT INTO `donhang` (`IDDH`, `IDKH`, `NGAYDAT`, `TONGTIEN`, `TEN_NGUOINHAN`, `SDT_NGUOINHAN`, `DIACHI_GIAOHANG`, `TRANGTHAI`) VALUES
('DH-001', 'AD-2500601', '2025-12-29 21:37:25', 31000000.00, 'Nguyễn Văn Khách', NULL, NULL, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hinhanh_sanpham`
--

CREATE TABLE `hinhanh_sanpham` (
  `IDHA` varchar(10) NOT NULL,
  `HINHANH` text DEFAULT NULL,
  `IDSANPHAM` varchar(10) DEFAULT NULL,
  `TRANGTHAI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hinhanh_sanpham`
--

INSERT INTO `hinhanh_sanpham` (`IDHA`, `HINHANH`, `IDSANPHAM`, `TRANGTHAI`) VALUES
('IMG-2601-5', 'uploads/1767671009501-698735412.png', 'SP-2601-86', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon_banhang`
--

CREATE TABLE `hoadon_banhang` (
  `IDHD` varchar(10) NOT NULL,
  `IDDH` varchar(10) DEFAULT NULL,
  `THANHTIEN` decimal(15,2) DEFAULT NULL,
  `MGG` varchar(10) DEFAULT NULL,
  `PHIVANCHUYEN` varchar(10) DEFAULT NULL,
  `TONGTIEN` decimal(15,2) DEFAULT NULL,
  `TRANGTHAI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hotro_khachhang`
--

CREATE TABLE `hotro_khachhang` (
  `IDHT` varchar(10) NOT NULL,
  `TENKH` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(50) DEFAULT NULL,
  `TINNHAN` text DEFAULT NULL,
  `TRALOI` text DEFAULT NULL,
  `TRANGTHAI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `kho_imei`
--

CREATE TABLE `kho_imei` (
  `ID_IMEI` bigint(20) NOT NULL,
  `IDSANPHAM` varchar(10) NOT NULL,
  `MA_IMEI` varchar(50) NOT NULL,
  `ID_PHIEUNHAP` varchar(10) DEFAULT NULL,
  `ID_DONHANG` varchar(10) DEFAULT NULL,
  `GIA_VON_THUC` decimal(15,2) DEFAULT 0.00,
  `TINHTRANG` varchar(50) DEFAULT NULL,
  `TRANGTHAI` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `kho_imei`
--

INSERT INTO `kho_imei` (`ID_IMEI`, `IDSANPHAM`, `MA_IMEI`, `ID_PHIEUNHAP`, `ID_DONHANG`, `GIA_VON_THUC`, `TINHTRANG`, `TRANGTHAI`) VALUES
(1, 'SP-IP15PM', '354888111000111', '1', NULL, 28000000.00, 'New Seal', 1),
(2, 'SP-IP15PM', '354888111000222', '1', 'DH-001', 28000000.00, 'New Seal', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `magiamgia`
--

CREATE TABLE `magiamgia` (
  `MaGG` varchar(10) NOT NULL,
  `LOAI` varchar(20) DEFAULT NULL,
  `DONTOITHIEU` int(11) DEFAULT NULL,
  `MOTA` varchar(255) DEFAULT NULL,
  `NGAYCAIDAT` date DEFAULT NULL,
  `HANDUNG` date DEFAULT NULL,
  `SOLUONG` int(11) DEFAULT NULL,
  `DADUNG` int(11) DEFAULT NULL,
  `NGAYKETTHUC` date DEFAULT NULL,
  `TRANGTHAI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidung`
--

CREATE TABLE `nguoidung` (
  `IDND` varchar(10) NOT NULL,
  `AVATAR` text DEFAULT NULL,
  `HOTEN` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(50) DEFAULT NULL,
  `SDT` varchar(20) DEFAULT NULL,
  `MATKHAU` varchar(255) DEFAULT NULL,
  `NGAYSINH` date DEFAULT NULL,
  `DIEMTICHLUY` int(11) DEFAULT NULL,
  `LOAIND` int(11) NOT NULL,
  `TRANGTHAI` int(11) DEFAULT NULL,
  `NGAYTHAMGIA` date DEFAULT NULL,
  `DANGNHAPLANCUOI` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nguoidung`
--

INSERT INTO `nguoidung` (`IDND`, `AVATAR`, `HOTEN`, `EMAIL`, `SDT`, `MATKHAU`, `NGAYSINH`, `DIEMTICHLUY`, `LOAIND`, `TRANGTHAI`, `NGAYTHAMGIA`, `DANGNHAPLANCUOI`) VALUES
('AD-2500601', 'uploads/1766737609993-605234282.png', 'Nguyễn Ngọc Hiếu', '0306231022@caothang.edu.vn', '0398004970', '$2b$10$8/FgHsgZMftnwOzQkmnkr.rVA/1QESJbOh21X2cNC3z9F5MqdeMva', '2005-06-07', NULL, 1, 1, '2025-06-01', '2026-01-27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhacungcap`
--

CREATE TABLE `nhacungcap` (
  `IDNCC` varchar(10) NOT NULL,
  `MAVACH` varchar(10) NOT NULL,
  `TENNCC` varchar(255) NOT NULL,
  `SDT` varchar(20) DEFAULT NULL,
  `LIENHE_DOITAC` varchar(255) NOT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `DIACHI` text DEFAULT NULL,
  `MST` varchar(50) DEFAULT NULL,
  `STK_NGANHANG` varchar(50) DEFAULT NULL,
  `TEN_NGANHANG` varchar(100) DEFAULT NULL,
  `CONGNO` decimal(15,2) DEFAULT 0.00,
  `TRANGTHAI` int(11) DEFAULT 1,
  `NGAY_HOPTAC` date DEFAULT NULL,
  `GHICHU` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhacungcap`
--

INSERT INTO `nhacungcap` (`IDNCC`, `MAVACH`, `TENNCC`, `SDT`, `LIENHE_DOITAC`, `EMAIL`, `DIACHI`, `MST`, `STK_NGANHANG`, `TEN_NGANHANG`, `CONGNO`, `TRANGTHAI`, `NGAY_HOPTAC`, `GHICHU`) VALUES
('1', 'FPT', 'Công ty FPT Trading', '0901234567', 'Nguyễn Ngọc Hiếu', 'sales@fpt.com.vn', '332, Thôn Hiệp Thành 1 , xã Gia Hiệp, Tỉnh Lâm Đồng ', '0101234567', '1050638669', 'VCB', 50000000.00, 1, '2025-12-03', ''),
('2', 'VTS', 'Viettel Store', '18008123', 'Nguyễn Ngọc Hiếu', 'hotro@viettel.com', '332, Thôn Hiệp Thành 1 , xã Gia Hiệp, Tỉnh Lâm Đồng ', '0109876543', '1050638669', 'ARG', 0.00, 1, '2025-12-01', 'là tập đoàn viễn thông và công nghệ hàng đầu Việt Nam, thuộc Bộ Quốc phòng, có 100% vốn nhà nước, phát triển từ năm 1989, cung cấp đa dạng dịch vụ từ di động (2G, 3G, 4G, 5G) đến cố định, Internet, tài chính, an ninh-quốc phòng (quân sự) và đang mở rộng '),
('3', 'CN', 'Anh Tuấn Táo Mỹ', '0912345678', 'Trần Thanh tuấn', 'tuanapple@gmail.com', '332, Thôn Hiệp Thành 1 , xã Gia Hiệp, Tỉnh Lâm Đồng ', '02577895242', NULL, NULL, 0.00, 1, '2025-11-12', ''),
('NCC-2512-9', 'NKA', 'Công Ty Nokia', '0398004970', 'Nguyễn Thế Vinh', '123@gmail.com', '124/45A Phạm Văn Đồng, Hạnh Thông, TP Hồ Chí Minh', '45678999', '0918187975', 'MB', 0.00, 1, '2025-12-30', 'Là công ty hàng đầu thế giới về điện thoại di động với 143 kiểu máy đa dạng, phù hợp với mọi tiêu chuẩn của khách hàng. Các sản phẩm điện thoại mới nhất của chúng tôi hiện nay là Nokia-X7, Nokia-E6, Nokia-E7, NokiaX1-X2,\\...Hãy đến với Nokia nếu các bạn c');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieunhap`
--

CREATE TABLE `phieunhap` (
  `IDPN` varchar(10) NOT NULL,
  `IDNCC` varchar(10) NOT NULL,
  `IDND` varchar(10) NOT NULL,
  `TONGTIEN` decimal(15,2) DEFAULT 0.00,
  `DA_THANHTOAN` decimal(15,2) DEFAULT 0.00,
  `NGAYNHAP` datetime DEFAULT current_timestamp(),
  `TRANGTHAI` int(11) DEFAULT 1,
  `GHICHU` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phieunhap`
--

INSERT INTO `phieunhap` (`IDPN`, `IDNCC`, `IDND`, `TONGTIEN`, `DA_THANHTOAN`, `NGAYNHAP`, `TRANGTHAI`, `GHICHU`) VALUES
('1', '1', 'AD-2500601', 56000000.00, 20000000.00, '2025-12-29 21:37:25', 1, ''),
('PN-2601-14', '2', 'AD-2500601', 0.00, 0.00, '2026-01-06 10:39:43', 0, 'Boss02 nhập để test'),
('PN-2601-33', 'NCC-2512-9', 'AD-2500601', 0.00, 0.00, '2026-01-06 10:24:41', 0, 'Hàng nhập từ ABC'),
('PN-2601-49', '2', 'AD-2500601', 0.00, 0.00, '2026-01-05 22:17:10', 0, '1234'),
('PN-2601-53', '1', 'AD-2500601', 0.00, 0.00, '2026-01-05 22:25:41', 0, '1'),
('PN-2601-55', '2', 'AD-2500601', 0.00, 0.00, '2026-01-06 10:31:10', 0, '12345'),
('PN-2601-57', '2', 'AD-2500601', 0.00, 0.00, '2026-01-05 22:18:14', 0, '1234'),
('PN-2601-61', '2', 'AD-2500601', 0.00, 0.00, '2026-01-05 22:21:59', 0, '1234'),
('PN-2601-65', '2', 'AD-2500601', 0.00, 0.00, '2026-01-05 22:20:43', 0, '1234'),
('PN-2601-66', '1', 'AD-2500601', 0.00, 0.00, '2026-01-05 22:30:30', 0, '1'),
('PN-2601-84', '2', 'AD-2500601', 0.00, 0.00, '2026-01-06 10:43:29', 0, 'Boss02 nhập để test'),
('PN-2601-94', '2', 'AD-2500601', 0.00, 0.00, '2026-01-06 10:32:40', 0, '12345');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phivanchuyen`
--

CREATE TABLE `phivanchuyen` (
  `IDPHIEU` varchar(10) NOT NULL,
  `KHUVUC` varchar(255) DEFAULT NULL,
  `LOAI` varchar(20) DEFAULT NULL,
  `MINPHI` int(11) DEFAULT NULL,
  `MAXPHI` int(11) DEFAULT NULL,
  `PHI` int(11) DEFAULT NULL,
  `TRANGTHAI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `revoked_tokens`
--

CREATE TABLE `revoked_tokens` (
  `id` int(11) NOT NULL,
  `token` text NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `revoked_tokens`
--

INSERT INTO `revoked_tokens` (`id`, `token`, `expires_at`, `created_at`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', '2025-11-29 16:32:56', '2025-11-29 04:08:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `IDSANPHAM` varchar(10) NOT NULL,
  `TENSANPHAM` varchar(255) DEFAULT NULL,
  `IDTHUONGHIEU` varchar(10) DEFAULT NULL,
  `SOLUONG` int(11) DEFAULT 0,
  `THONGSO_KYTHUAT` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`THONGSO_KYTHUAT`)),
  `DONGMAY` varchar(50) NOT NULL,
  `MOTA` text DEFAULT NULL,
  `TRANGTHAI` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`IDSANPHAM`, `TENSANPHAM`, `IDTHUONGHIEU`, `SOLUONG`, `THONGSO_KYTHUAT`, `DONGMAY`, `MOTA`, `TRANGTHAI`) VALUES
('SP-2601-12', '1', 'TH-SAMS', 1, '{\"HeDieuHanh\":\"1\",\"ManHinh\":\"1\",\"Ram\":\"1\",\"BoNhoTrong\":\"1\",\"Pin\":\"`1\",\"MauSac\":\"1\",\"MoTa\":\"1\"}', '1', NULL, 1),
('SP-2601-33', '1234', 'TH-DELL', 1, '{\"HeDieuHanh\":\"678\",\"ManHinh\":\"123456\",\"Ram\":\"90-f\",\"BoNhoTrong\":\"4567\",\"Pin\":\"45678\",\"MauSac\":\"890\",\"MoTa\":\"123457\"}', '123', '123457', 1),
('SP-2601-48', 'samsung S20 FE', 'TH-SAMS', 1, '{\"HeDieuHanh\":\"123\",\"ManHinh\":\"789\",\"Ram\":\"123\",\"BoNhoTrong\":\"456\",\"Pin\":\"45\",\"MauSac\":\"6678\",\"MoTa\":\"12356\"}', 'samsung', '12356', 1),
('SP-2601-51', '123454', 'TH-2512-15', 1, '{\"HeDieuHanh\":\"56\",\"ManHinh\":\"890\",\"Ram\":\"678\",\"BoNhoTrong\":\"234\",\"Pin\":\"345\",\"MauSac\":\"90\",\"MoTa\":\"3456\"}', 'IP1', NULL, 1),
('SP-2601-86', 'samsung S20 FE', 'TH-SAMS', 1, '{\"HeDieuHanh\":\"123\",\"ManHinh\":\"789\",\"Ram\":\"123\",\"BoNhoTrong\":\"456\",\"Pin\":\"45\",\"MauSac\":\"6678\",\"MoTa\":\"12356\"}', 'samsung', NULL, 1),
('SP-2601-97', '1234', 'TH-DELL', 1, '{\"HeDieuHanh\":\"678\",\"ManHinh\":\"123456\",\"Ram\":\"90-f\",\"BoNhoTrong\":\"4567\",\"Pin\":\"45678\",\"MauSac\":\"890\",\"MoTa\":\"123457\"}', '123', '123457', 1),
('SP-IP15PM', 'iPhone 15 Pro Max 256GB Titan Tự Nhiên', 'TH-2512-15', 10, '{\r\n    \"man_hinh\": \"6.7 inch OLED 120Hz\", \r\n    \"camera\": \"48MP + 12MP + 12MP\", \r\n    \"chip\": \"Apple A17 Pro\", \r\n    \"ram\": \"8GB\", \r\n    \"pin\": \"4441 mAh\",\r\n    \"sim\": \"1 Nano + 1 eSIM\"\r\n}', '', NULL, 1),
('SP-S24ULT', 'Samsung Galaxy S24 Ultra 512GB Xám', 'TH-SAMS', 5, '{\r\n    \"man_hinh\": \"6.8 inch QHD+ Dynamic AMOLED 2X\", \r\n    \"camera\": \"200MP + 50MP + 12MP + 10MP\", \r\n    \"chip\": \"Snapdragon 8 Gen 3\", \r\n    \"ram\": \"12GB\", \r\n    \"but_spen\": \"Có\"\r\n}', '', NULL, 1),
('SP-XPS13', 'Laptop Dell XPS 13 Plus Core i7', 'TH-DELL', 2, '{\n    \"cpu\": \"Intel Core i7-1360P\", \n    \"ram\": \"16GB LPDDR5\", \n    \"ssd\": \"512GB NVMe\", \n    \"man_hinh\": \"13.4 inch OLED 3.5K Touch\", \n    \"trong_luong\": \"1.23 kg\"\n}', '', NULL, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thuonghieu`
--

CREATE TABLE `thuonghieu` (
  `IDTHUONGHIEU` varchar(10) NOT NULL,
  `TENTHUONGHIEU` varchar(50) DEFAULT NULL,
  `MOTA` varchar(255) DEFAULT NULL,
  `LOGO` text DEFAULT NULL,
  `NGAYTAO` date DEFAULT NULL,
  `TRANGTHAI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `thuonghieu`
--

INSERT INTO `thuonghieu` (`IDTHUONGHIEU`, `TENTHUONGHIEU`, `MOTA`, `LOGO`, `NGAYTAO`, `TRANGTHAI`) VALUES
('TH-2512-15', 'Apple', 'Tập đoàn công nghệ Mỹ...', 'uploads/1767176803036-826189036.png', '2025-12-27', 1),
('TH-DELL', 'Dell', 'Tập đoàn công nghệ hàng đầu thế giới của Mỹ, nổi tiếng với việc sản xuất và kinh doanh máy tính (PC, laptop), máy chủ, thiết bị lưu trữ và các giải pháp IT toàn diện, với mô hình kinh doanh bán trực tiếp cho khách hàng và nổi bật nhờ chiến lược chuỗi cung', 'uploads/1767172308102-660232996.png', NULL, 1),
('TH-SAMS', 'Samsung', ' Là tập đoàn đa quốc gia khổng lồ của Hàn Quốc, nổi tiếng toàn cầu về công nghệ, đặc biệt là thiết bị điện tử tiêu dùng như điện thoại thông minh (smartphone), TV, tủ lạnh. Được thành lập năm 1938.', 'uploads/1767175095422-556609388.png', NULL, 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `binhluan`
--
ALTER TABLE `binhluan`
  ADD PRIMARY KEY (`IDBL`),
  ADD KEY `IDND` (`IDND`),
  ADD KEY `IDSP` (`IDSP`);

--
-- Chỉ mục cho bảng `caidatwebsite`
--
ALTER TABLE `caidatwebsite`
  ADD PRIMARY KEY (`IDWEBSITE`);

--
-- Chỉ mục cho bảng `chitiet_donhang`
--
ALTER TABLE `chitiet_donhang`
  ADD PRIMARY KEY (`IDCT`),
  ADD KEY `IDDH` (`IDDH`),
  ADD KEY `IDSANPHAM` (`IDSANPHAM`);

--
-- Chỉ mục cho bảng `chitiet_phieunhap`
--
ALTER TABLE `chitiet_phieunhap`
  ADD PRIMARY KEY (`IDCTPN`),
  ADD KEY `IDPN` (`IDPN`),
  ADD KEY `IDSANPHAM` (`IDSANPHAM`);

--
-- Chỉ mục cho bảng `diachi_nguoidung`
--
ALTER TABLE `diachi_nguoidung`
  ADD PRIMARY KEY (`IDDC`),
  ADD KEY `IDND` (`IDND`);

--
-- Chỉ mục cho bảng `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`IDDH`),
  ADD KEY `IDKH` (`IDKH`);

--
-- Chỉ mục cho bảng `hinhanh_sanpham`
--
ALTER TABLE `hinhanh_sanpham`
  ADD PRIMARY KEY (`IDHA`),
  ADD KEY `IDSANPHAM` (`IDSANPHAM`);

--
-- Chỉ mục cho bảng `hoadon_banhang`
--
ALTER TABLE `hoadon_banhang`
  ADD PRIMARY KEY (`IDHD`),
  ADD KEY `IDDH` (`IDDH`),
  ADD KEY `MGG` (`MGG`),
  ADD KEY `PHIVANCHUYEN` (`PHIVANCHUYEN`);

--
-- Chỉ mục cho bảng `hotro_khachhang`
--
ALTER TABLE `hotro_khachhang`
  ADD PRIMARY KEY (`IDHT`);

--
-- Chỉ mục cho bảng `kho_imei`
--
ALTER TABLE `kho_imei`
  ADD PRIMARY KEY (`ID_IMEI`),
  ADD UNIQUE KEY `MA_IMEI` (`MA_IMEI`),
  ADD KEY `IDSANPHAM` (`IDSANPHAM`),
  ADD KEY `ID_PHIEUNHAP` (`ID_PHIEUNHAP`);

--
-- Chỉ mục cho bảng `magiamgia`
--
ALTER TABLE `magiamgia`
  ADD PRIMARY KEY (`MaGG`);

--
-- Chỉ mục cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`IDND`),
  ADD UNIQUE KEY `unique_email` (`EMAIL`);

--
-- Chỉ mục cho bảng `nhacungcap`
--
ALTER TABLE `nhacungcap`
  ADD PRIMARY KEY (`IDNCC`);

--
-- Chỉ mục cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD PRIMARY KEY (`IDPN`),
  ADD KEY `IDNCC` (`IDNCC`),
  ADD KEY `IDND` (`IDND`);

--
-- Chỉ mục cho bảng `phivanchuyen`
--
ALTER TABLE `phivanchuyen`
  ADD PRIMARY KEY (`IDPHIEU`);

--
-- Chỉ mục cho bảng `revoked_tokens`
--
ALTER TABLE `revoked_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`IDSANPHAM`),
  ADD KEY `IDTHUONGHIEU` (`IDTHUONGHIEU`);

--
-- Chỉ mục cho bảng `thuonghieu`
--
ALTER TABLE `thuonghieu`
  ADD PRIMARY KEY (`IDTHUONGHIEU`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chitiet_donhang`
--
ALTER TABLE `chitiet_donhang`
  MODIFY `IDCT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `chitiet_phieunhap`
--
ALTER TABLE `chitiet_phieunhap`
  MODIFY `IDCTPN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `kho_imei`
--
ALTER TABLE `kho_imei`
  MODIFY `ID_IMEI` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `revoked_tokens`
--
ALTER TABLE `revoked_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `binhluan`
--
ALTER TABLE `binhluan`
  ADD CONSTRAINT `binhluan_ibfk_1` FOREIGN KEY (`IDND`) REFERENCES `nguoidung` (`IDND`),
  ADD CONSTRAINT `binhluan_ibfk_2` FOREIGN KEY (`IDSP`) REFERENCES `sanpham` (`IDSANPHAM`);

--
-- Các ràng buộc cho bảng `chitiet_donhang`
--
ALTER TABLE `chitiet_donhang`
  ADD CONSTRAINT `ctdh_ibfk_1` FOREIGN KEY (`IDDH`) REFERENCES `donhang` (`IDDH`),
  ADD CONSTRAINT `ctdh_ibfk_2` FOREIGN KEY (`IDSANPHAM`) REFERENCES `sanpham` (`IDSANPHAM`);

--
-- Các ràng buộc cho bảng `chitiet_phieunhap`
--
ALTER TABLE `chitiet_phieunhap`
  ADD CONSTRAINT `ctpn_ibfk_1` FOREIGN KEY (`IDPN`) REFERENCES `phieunhap` (`IDPN`),
  ADD CONSTRAINT `ctpn_ibfk_2` FOREIGN KEY (`IDSANPHAM`) REFERENCES `sanpham` (`IDSANPHAM`);

--
-- Các ràng buộc cho bảng `diachi_nguoidung`
--
ALTER TABLE `diachi_nguoidung`
  ADD CONSTRAINT `diachi_nguoidung_ibfk_1` FOREIGN KEY (`IDND`) REFERENCES `nguoidung` (`IDND`);

--
-- Các ràng buộc cho bảng `donhang`
--
ALTER TABLE `donhang`
  ADD CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`IDKH`) REFERENCES `nguoidung` (`IDND`);

--
-- Các ràng buộc cho bảng `hinhanh_sanpham`
--
ALTER TABLE `hinhanh_sanpham`
  ADD CONSTRAINT `hinhanh_sanpham_ibfk_1` FOREIGN KEY (`IDSANPHAM`) REFERENCES `sanpham` (`IDSANPHAM`);

--
-- Các ràng buộc cho bảng `hoadon_banhang`
--
ALTER TABLE `hoadon_banhang`
  ADD CONSTRAINT `hdbh_ibfk_1` FOREIGN KEY (`IDDH`) REFERENCES `donhang` (`IDDH`),
  ADD CONSTRAINT `hdbh_ibfk_2` FOREIGN KEY (`MGG`) REFERENCES `magiamgia` (`MaGG`),
  ADD CONSTRAINT `hdbh_ibfk_3` FOREIGN KEY (`PHIVANCHUYEN`) REFERENCES `phivanchuyen` (`IDPHIEU`);

--
-- Các ràng buộc cho bảng `kho_imei`
--
ALTER TABLE `kho_imei`
  ADD CONSTRAINT `kho_imei_ibfk_1` FOREIGN KEY (`IDSANPHAM`) REFERENCES `sanpham` (`IDSANPHAM`),
  ADD CONSTRAINT `kho_imei_ibfk_2` FOREIGN KEY (`ID_PHIEUNHAP`) REFERENCES `phieunhap` (`IDPN`);

--
-- Các ràng buộc cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD CONSTRAINT `phieunhap_ibfk_1` FOREIGN KEY (`IDNCC`) REFERENCES `nhacungcap` (`IDNCC`),
  ADD CONSTRAINT `phieunhap_ibfk_2` FOREIGN KEY (`IDND`) REFERENCES `nguoidung` (`IDND`);

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`IDTHUONGHIEU`) REFERENCES `thuonghieu` (`IDTHUONGHIEU`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
