-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2025 at 09:20 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo_api`
--
CREATE DATABASE IF NOT EXISTS `demo_api` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `demo_api`;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`product_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`user_id`, `product_id`, `quantity`) VALUES
(2, 1, 1),
(2, 11, 2),
(3, 2, 1),
(3, 12, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Laptops', '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(2, 'Smartphones', '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(3, 'Tablets', '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(4, 'Accessories', '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `coupon` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total` int(11) NOT NULL,
  `payment_type` enum('COD','MOMO','VNPAY') COLLATE utf8mb4_unicode_ci DEFAULT 'COD',
  `transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cancel_reason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','delivering','delivered','canceled') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `coupon`, `total`, `payment_type`, `transaction_id`, `address`, `phone`, `note`, `cancel_reason`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, 'NEWYEAR2024', 52998000, 'COD', NULL, '65 Huỳnh Thúc Kháng', '0987654321', 'Please deliver between 9 AM and 5 PM', NULL, 'pending', '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(2, 3, NULL, 21499000, 'MOMO', NULL, '123 Lê Lợi', '0112233445', NULL, NULL, 'approved', '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
CREATE TABLE IF NOT EXISTS `order_details` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 1, 39999000),
(1, 11, 2, 12999000),
(2, 2, 1, 21499000);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `description`, `price`, `stock`, `category_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'MacBook Pro', '', 'Apple laptop with M1 chip', 39999000, 10, 1, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(2, 'Dell XPS 13', '', 'Dell laptop with Intel i7', 31999000, 15, 1, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(3, 'Asus ZenBook 13', '', 'Asus laptop with AMD Ryzen 5', 24999000, 20, 1, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(4, 'HP Spectre x360', '', 'HP convertible laptop with Intel i7', 32999000, 12, 1, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(5, 'Microsoft Surface Laptop 4', '', 'Microsoft laptop with Intel i5', 29999000, 8, 1, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(6, 'Google Pixelbook Go', '', 'Google laptop with Intel i5', 24999000, 10, 1, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(7, 'Lenovo ThinkPad X1 Carbon', '', 'Lenovo laptop with Intel i7', 32999000, 5, 1, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(8, 'Asus ROG Zephyrus G14', '', 'Asus gaming laptop with Ryzen 9', 49999000, 3, 1, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(9, 'Razer Blade 15', '', 'Razer gaming laptop with Intel i7', 49999000, 2, 1, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(10, 'Acer Swift 3', '', 'Acer laptop with Ryzen 7', 19999000, 18, 1, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(11, 'iPhone 13', '', 'Apple smartphone with A15 Bionic', 26499000, 20, 2, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(12, 'Samsung Galaxy S21', '', 'Samsung smartphone with Exynos 2100', 21499000, 25, 2, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(13, 'Google Pixel 6', '', 'Google smartphone with Tensor chip', 19999000, 30, 2, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(14, 'OnePlus 9', '', 'OnePlus smartphone with Snapdragon 888', 17999000, 15, 2, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(15, 'Xiaomi Mi 11', '', 'Xiaomi smartphone with Snapdragon 888', 16999000, 22, 2, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(16, 'Sony Xperia 1 III', '', 'Sony smartphone with Snapdragon 888', 24999000, 10, 2, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(17, 'Oppo Find X3 Pro', '', 'Oppo smartphone with Snapdragon 888', 19999000, 18, 2, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(18, 'Nokia X20', '', 'Nokia smartphone with Snapdragon 480', 9999000, 40, 2, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(19, 'Motorola Edge 20', '', 'Motorola smartphone with Snapdragon 778G', 14999000, 28, 2, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(20, 'Asus ROG Phone 5', '', 'Asus gaming smartphone with Snapdragon 888', 29999000, 5, 2, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(21, 'iPad Pro', '', 'Apple tablet with M1 chip', 29999000, 12, 3, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(22, 'Samsung Galaxy Tab S7', '', 'Samsung tablet with Snapdragon 865+', 17299000, 18, 3, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(23, 'Microsoft Surface Pro 7', '', 'Microsoft tablet with Intel i5', 24999000, 10, 3, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(24, 'Lenovo Tab P11 Pro', '', 'Lenovo tablet with Snapdragon 730G', 15999000, 15, 3, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(25, 'Amazon Fire HD 10', '', 'Amazon tablet with MediaTek Helio P60T', 4999000, 25, 3, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(26, 'Huawei MatePad Pro', '', 'Huawei tablet with Kirin 990', 19999000, 8, 3, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(27, 'Xiaomi Pad 5', '', 'Xiaomi tablet with Snapdragon 860', 12999000, 20, 3, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(28, 'Apple Pencil', '', 'Apple stylus for iPad', 3499000, 50, 4, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(29, 'Samsung Galaxy Buds Pro', '', 'Samsung wireless earbuds', 4999000, 35, 4, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(30, 'AirPods Pro', '', 'Apple wireless earbuds', 6499000, 30, 4, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(31, 'Logitech MX Master 3', '', 'Logitech wireless mouse', 2599000, 40, 4, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(32, 'Anker PowerCore 10000', '', 'Anker portable charger', 499000, 60, 4, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(33, 'Sony WH-1000XM4', '', 'Sony noise-canceling headphones', 7999000, 20, 4, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(34, 'JBL Flip 5', '', 'JBL portable Bluetooth speaker', 1999000, 45, 4, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(35, 'Razer DeathAdder V2', '', 'Razer gaming mouse', 1499000, 30, 4, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(36, 'Corsair K95 RGB Platinum', '', 'Corsair mechanical gaming keyboard', 3999000, 15, 4, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(37, 'SanDisk Extreme Pro 128GB', '', 'SanDisk high-speed SD card', 899000, 50, 4, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `revoked_tokens`
--

DROP TABLE IF EXISTS `revoked_tokens`;
CREATE TABLE IF NOT EXISTS `revoked_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `revoked_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `address`, `phone`, `is_admin`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'admin', '$2b$10$cK4MjzMj3k5eG.tk30qqt.jRhF8Re3XI1/JELdPcyExwnJFwoKGsS', NULL, NULL, '123 Admin St', '0123456789', 1, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(2, 'nguyenle', '$2b$10$srIrSwS.oWy2GzK4WbfneezAj6Labiv7LQvHWtyJYcbaCMTm2jEES', NULL, NULL, '65 Huỳnh Thúc Kháng ', '0987654321', 0, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(3, 'tuantran', '$2b$10$iXdHMo7lRbA1F03exuK17O4NlDMigRAZbx612CL9xpDACLU5oMxm6', NULL, NULL, '65 Huỳnh Thúc Kháng', '0112233445', 0, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(4, 'tienlu', '$2b$10$lkdC5rQWUnQXNOG29uVFtuSkn2AoFUTxfBYAnKEfA5swoQY6gm9Qy', NULL, NULL, '65 Huỳnh Thúc Kháng', '0223344556', 0, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(5, 'vinhle', '$2b$10$sS42zz4giX0u4nOymq5VLOt2sOkTfzE9aNE3tJHcWp1dlgy7UfQve', NULL, NULL, '65 Huỳnh Thúc Kháng', '0334455667', 0, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL),
(6, 'ngocnguyen', '$2b$10$pPXaWwTpSttgDca5QHAOoOEjYYh0f6IcQZl1km0enzIqkpw5ffpD6', NULL, NULL, '65 Huỳnh Thúc Kháng', '0445566778', 0, '2025-10-26 09:39:32', '2025-10-26 09:39:32', NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
