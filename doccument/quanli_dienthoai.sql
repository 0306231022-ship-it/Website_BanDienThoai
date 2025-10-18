-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 07, 2025 lúc 10:40 AM
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
-- Cơ sở dữ liệu: `quanli_dienthoai`
--

DELIMITER $$
--
-- Thủ tục
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `CapNhatSanPham` (IN `p_ID` INT, IN `p_xuatxu` VARCHAR(100), IN `p_tensp` VARCHAR(255), IN `p_gia` DECIMAL(15,2), IN `p_sl` INT, IN `p_dungluong` VARCHAR(50), IN `p_ram` VARCHAR(50), IN `p_pin` VARCHAR(50), IN `p_khac` VARCHAR(255))   BEGIN
    -- Cập nhật bảng nhapkho
    UPDATE nhapkho
    SET TENSP = p_tensp,
        GIASP = p_gia,
        SOLUONG = p_sl,
        XUATXU = p_xuatxu
    WHERE IDNK = p_ID;

    -- Cập nhật bảng chitietsp
    UPDATE chitietsp
    SET DUNGLUONG = p_dungluong,
        RAM = p_ram,
        PIN = p_pin,
        KHAC = p_khac
    WHERE IDSP = p_ID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ThemHA` (IN `hinhanh` VARCHAR(255), IN `idsp` INT)   BEGIN
    INSERT INTO hinhanh(IDSP, HINH)
    VALUES(idsp, hinhanh);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ThemPN` (IN `p_mancc` INT, IN `p_manv` INT, IN `p_tongtien` DECIMAL(15,2), OUT `p_id` INT)   BEGIN
    INSERT INTO phieunhap(MANCC, MANV, NGAYNHAP, TONGTIEN)
    VALUES (p_mancc, p_manv, NOW(), p_tongtien);

    SET p_id = LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ThemSanPhamVaoKho` (IN `p_MANCC` INT, IN `p_MANV` INT, IN `p_TENSP` VARCHAR(255), IN `p_GIASP` INT, IN `p_SOLUONG` INT, IN `p_TONKHO` INT, IN `p_XUATXU` VARCHAR(255), IN `p_DS_HINH` TEXT, IN `p_DUNGLUONG` INT, IN `p_RAM` VARCHAR(255), IN `p_PIN` VARCHAR(255), IN `p_KHAC` VARCHAR(255))   BEGIN
    DECLARE v_idphieu INT;
    DECLARE v_idnk INT;
    DECLARE hinh VARCHAR(255);
    DECLARE next_pos INT DEFAULT 0;

    -- 1) Phiếu nhập (ngày hiện tại)
    INSERT INTO phieunhap (MANCC, MANV, NGAYNHAP)
    VALUES (p_MANCC, p_MANV, CURDATE());
    SET v_idphieu = LAST_INSERT_ID();

    -- 2) Nhập kho (CHÚ Ý: cột FK là IDPN theo schema của bạn)
    INSERT INTO nhapkho (TENSP, GIASP, SOLUONG, TONKHO, IDPN, XUATXU)
    VALUES (p_TENSP, p_GIASP, p_SOLUONG, p_TONKHO, v_idphieu, p_XUATXU);
    SET v_idnk = LAST_INSERT_ID();

    -- 3) Chi tiết sản phẩm (MANHINH/CPU để NULL nếu chưa có)
    INSERT INTO chitietsp (IDSP, DUNGLUONG, RAM, PIN, KHAC)
    VALUES (v_idnk, p_DUNGLUONG, p_RAM, p_PIN, p_KHAC);

    -- 4) Ảnh: tách p_DS_HINH theo dấu phẩy và chèn từng ảnh
    WHILE CHAR_LENGTH(p_DS_HINH) > 0 DO
        SET next_pos = LOCATE(',', p_DS_HINH);
        IF next_pos = 0 THEN
            SET hinh = TRIM(p_DS_HINH);
            SET p_DS_HINH = '';
        ELSE
            SET hinh = TRIM(SUBSTRING(p_DS_HINH, 1, next_pos - 1));
            SET p_DS_HINH = SUBSTRING(p_DS_HINH, next_pos + 1);
        END IF;

        IF hinh <> '' THEN
            INSERT INTO hinhanh (IDSP, HINH) VALUES (v_idnk, hinh);
        END IF;
    END WHILE;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ThemSP_KHO` (IN `p_tensp` VARCHAR(100), IN `p_giasp` DECIMAL(15,2), IN `p_soluong` INT, IN `p_idpn` INT, IN `p_xuatxu` VARCHAR(50), IN `p_dungluong` VARCHAR(50), IN `p_ram` VARCHAR(50), IN `p_pin` VARCHAR(50), IN `p_khac` VARCHAR(255), OUT `p_idsp` INT)   BEGIN
    -- Thêm vào bảng nhapkho
    INSERT INTO nhapkho(TENSP, GIASP, SOLUONG, TONKHO, IDPN, XUATXU, GHICHU)
    VALUES(p_tensp, p_giasp, p_soluong, p_soluong, p_idpn, p_xuatxu, 1);

    -- Lấy ID sản phẩm vừa thêm
    SET p_idsp = LAST_INSERT_ID();

    -- Thêm chi tiết sản phẩm
    INSERT INTO chitietsp(IDSP, DUNGLUONG, RAM, PIN, KHAC)
    VALUES (p_idsp, p_dungluong, p_ram, p_pin, p_khac);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietsp`
--

CREATE TABLE `chitietsp` (
  `IDCTSP` int(11) NOT NULL,
  `IDSP` int(11) DEFAULT NULL,
  `DUNGLUONG` int(11) DEFAULT NULL,
  `RAM` varchar(255) DEFAULT NULL,
  `PIN` varchar(255) DEFAULT NULL,
  `KHAC` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietsp`
--

INSERT INTO `chitietsp` (`IDCTSP`, `IDSP`, `DUNGLUONG`, `RAM`, `PIN`, `KHAC`) VALUES
(26, 26, 128, '128', '7200', 'Chống nước tốt'),
(27, 27, 128, '8', '4999', 'Chống nước tốt, Chống va đập ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhgia`
--

CREATE TABLE `danhgia` (
  `IDDANHGIA` int(11) NOT NULL,
  `MASP` int(11) DEFAULT NULL,
  `MAKH` int(11) DEFAULT NULL,
  `NOIDUNG` varchar(255) DEFAULT NULL,
  `GHICHU` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hinhanh`
--

CREATE TABLE `hinhanh` (
  `IDHA` int(11) NOT NULL,
  `IDSP` int(11) DEFAULT NULL,
  `HINH` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hinhanh`
--

INSERT INTO `hinhanh` (`IDHA`, `IDSP`, `HINH`) VALUES
(74, 27, 'uploads/Data/240910082946-iphone16-pro-max-1tb3.webp'),
(75, 27, 'uploads/Data/240910082946-iphone16-pro-max-1tb8.webp'),
(79, 26, 'uploads/Data/240910083102-iphone-16-pro-max-natural-titanium-pdp-image-position-1a-natural-titanium-color-vn-vi.webp'),
(80, 26, 'uploads/Data/240910082946-iphone16-pro-max-1tb3.webp');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `muasp`
--

CREATE TABLE `muasp` (
  `IDMUA` int(11) NOT NULL,
  `IDKH` int(11) DEFAULT NULL,
  `IDSP` int(11) DEFAULT NULL,
  `SOLUONG` int(11) DEFAULT NULL,
  `NGAYDAT` date DEFAULT NULL,
  `THANHTIEN` int(11) DEFAULT NULL,
  `TRANGTHAI` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidung`
--

CREATE TABLE `nguoidung` (
  `IDND` int(11) NOT NULL,
  `HINHANH` text NOT NULL,
  `TENND` varchar(255) DEFAULT NULL,
  `NGAYSINH` date DEFAULT NULL,
  `GIOITINH` varchar(3) DEFAULT NULL,
  `NOISINH` varchar(255) DEFAULT NULL,
  `DIACHI` varchar(255) DEFAULT NULL,
  `LOAIND` int(11) DEFAULT NULL,
  `CCCD_CMND` varchar(12) DEFAULT NULL,
  `SDT` varchar(10) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `MATKHAU` varchar(255) DEFAULT NULL,
  `TRANGTHAI` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nguoidung`
--

INSERT INTO `nguoidung` (`IDND`, `HINHANH`, `TENND`, `NGAYSINH`, `GIOITINH`, `NOISINH`, `DIACHI`, `LOAIND`, `CCCD_CMND`, `SDT`, `EMAIL`, `MATKHAU`, `TRANGTHAI`) VALUES
(1, 'uploads/Data/Screenshot 2025-08-06 113423(1).png', 'Nguyễn Ngọc Hiếu', '2005-06-07', 'Nam', 'Lâm Đồng', '123 Lê Lợi, Hà Nội', 1, '068205009712', '0398004970', '147.nnh.2048ae@gmail.com', '147/nnh.2048aeNNH', 'Hoạt động');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhacungcap`
--

CREATE TABLE `nhacungcap` (
  `IDCUNGCAP` int(11) NOT NULL,
  `TENNCC` varchar(255) DEFAULT NULL,
  `SDT` varchar(10) DEFAULT NULL,
  `DIACHI` varchar(255) DEFAULT NULL,
  `GHICHU` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhacungcap`
--

INSERT INTO `nhacungcap` (`IDCUNGCAP`, `TENNCC`, `SDT`, `DIACHI`, `GHICHU`) VALUES
(1, 'Công ty 123', '0912345678', '123 Lê Lợi, Hà Nội', 1),
(2, 'Nguyễn Ngọc Hiếu', '0398004970', '332 Thôn hiệp thành 1 Gia Hiệp, Lâm đồng', 1),
(3, '12345', '0398004970', '12344', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhapkho`
--

CREATE TABLE `nhapkho` (
  `IDNK` int(11) NOT NULL,
  `TENSP` varchar(255) DEFAULT NULL,
  `GIASP` int(11) DEFAULT NULL,
  `SOLUONG` int(11) DEFAULT NULL,
  `TONKHO` int(11) DEFAULT NULL,
  `IDPN` int(11) DEFAULT NULL,
  `XUATXU` varchar(255) DEFAULT NULL,
  `GHICHU` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhapkho`
--

INSERT INTO `nhapkho` (`IDNK`, `TENSP`, `GIASP`, `SOLUONG`, `TONKHO`, `IDPN`, `XUATXU`, `GHICHU`) VALUES
(26, 'iphone 15 pro max', 37000000, 30, 30, 50, 'Trung Quốc', 1),
(27, 'iphone 16 pro max', 25000000, 20, 20, 50, 'Nhật Bản', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieunhap`
--

CREATE TABLE `phieunhap` (
  `IDPHIEU` int(11) NOT NULL,
  `MANCC` int(11) DEFAULT NULL,
  `MANV` int(11) DEFAULT NULL,
  `NGAYNHAP` date DEFAULT NULL,
  `TONGTIEN` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phieunhap`
--

INSERT INTO `phieunhap` (`IDPHIEU`, `MANCC`, `MANV`, `NGAYNHAP`, `TONGTIEN`) VALUES
(50, 2, 1, '2025-09-27', 1610000000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `MASP` int(11) NOT NULL,
  `IDNHAPKHO` int(11) DEFAULT NULL,
  `SOLUONG` int(11) DEFAULT NULL,
  `NGAYLAY` date DEFAULT NULL,
  `MANV` int(11) DEFAULT NULL,
  `TRANGTHAI` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chitietsp`
--
ALTER TABLE `chitietsp`
  ADD PRIMARY KEY (`IDCTSP`),
  ADD KEY `IDSP` (`IDSP`);

--
-- Chỉ mục cho bảng `danhgia`
--
ALTER TABLE `danhgia`
  ADD PRIMARY KEY (`IDDANHGIA`),
  ADD KEY `MASP` (`MASP`),
  ADD KEY `MAKH` (`MAKH`);

--
-- Chỉ mục cho bảng `hinhanh`
--
ALTER TABLE `hinhanh`
  ADD PRIMARY KEY (`IDHA`),
  ADD KEY `IDSP` (`IDSP`);

--
-- Chỉ mục cho bảng `muasp`
--
ALTER TABLE `muasp`
  ADD PRIMARY KEY (`IDMUA`),
  ADD KEY `IDKH` (`IDKH`),
  ADD KEY `IDSP` (`IDSP`);

--
-- Chỉ mục cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`IDND`);

--
-- Chỉ mục cho bảng `nhacungcap`
--
ALTER TABLE `nhacungcap`
  ADD PRIMARY KEY (`IDCUNGCAP`);

--
-- Chỉ mục cho bảng `nhapkho`
--
ALTER TABLE `nhapkho`
  ADD PRIMARY KEY (`IDNK`),
  ADD KEY `IDPN` (`IDPN`);

--
-- Chỉ mục cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD PRIMARY KEY (`IDPHIEU`),
  ADD KEY `MANCC` (`MANCC`),
  ADD KEY `MANV` (`MANV`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`MASP`),
  ADD KEY `IDNHAPKHO` (`IDNHAPKHO`),
  ADD KEY `MANV` (`MANV`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chitietsp`
--
ALTER TABLE `chitietsp`
  MODIFY `IDCTSP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `danhgia`
--
ALTER TABLE `danhgia`
  MODIFY `IDDANHGIA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `hinhanh`
--
ALTER TABLE `hinhanh`
  MODIFY `IDHA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT cho bảng `muasp`
--
ALTER TABLE `muasp`
  MODIFY `IDMUA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  MODIFY `IDND` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `nhacungcap`
--
ALTER TABLE `nhacungcap`
  MODIFY `IDCUNGCAP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `nhapkho`
--
ALTER TABLE `nhapkho`
  MODIFY `IDNK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  MODIFY `IDPHIEU` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `MASP` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chitietsp`
--
ALTER TABLE `chitietsp`
  ADD CONSTRAINT `chitietsp_ibfk_1` FOREIGN KEY (`IDSP`) REFERENCES `nhapkho` (`IDNK`);

--
-- Các ràng buộc cho bảng `danhgia`
--
ALTER TABLE `danhgia`
  ADD CONSTRAINT `danhgia_ibfk_1` FOREIGN KEY (`MASP`) REFERENCES `sanpham` (`MASP`),
  ADD CONSTRAINT `danhgia_ibfk_2` FOREIGN KEY (`MAKH`) REFERENCES `nguoidung` (`IDND`);

--
-- Các ràng buộc cho bảng `hinhanh`
--
ALTER TABLE `hinhanh`
  ADD CONSTRAINT `hinhanh_ibfk_1` FOREIGN KEY (`IDSP`) REFERENCES `nhapkho` (`IDNK`);

--
-- Các ràng buộc cho bảng `muasp`
--
ALTER TABLE `muasp`
  ADD CONSTRAINT `muasp_ibfk_1` FOREIGN KEY (`IDKH`) REFERENCES `nguoidung` (`IDND`),
  ADD CONSTRAINT `muasp_ibfk_2` FOREIGN KEY (`IDSP`) REFERENCES `sanpham` (`MASP`);

--
-- Các ràng buộc cho bảng `nhapkho`
--
ALTER TABLE `nhapkho`
  ADD CONSTRAINT `nhapkho_ibfk_1` FOREIGN KEY (`IDPN`) REFERENCES `phieunhap` (`IDPHIEU`);

--
-- Các ràng buộc cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD CONSTRAINT `phieunhap_ibfk_1` FOREIGN KEY (`MANCC`) REFERENCES `nhacungcap` (`IDCUNGCAP`),
  ADD CONSTRAINT `phieunhap_ibfk_2` FOREIGN KEY (`MANV`) REFERENCES `nguoidung` (`IDND`);

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`IDNHAPKHO`) REFERENCES `nhapkho` (`IDNK`),
  ADD CONSTRAINT `sanpham_ibfk_2` FOREIGN KEY (`MANV`) REFERENCES `nguoidung` (`IDND`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
