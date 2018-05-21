-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2018 at 01:01 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dzigua`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Nuts'),
(2, 'Fruit'),
(4, 'Paste'),
(5, 'Vegetable'),
(6, 'Tube');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `phone`, `email`, `address`) VALUES
(1, 'koffi', '0572274469', 'koffi@gimail.com', 'ashesi'),
(8, 'barry', '3011912', 'alieujallow675@gmail.com', 'londoncorner'),
(9, 'alieu', '572274469', 'alieujallow675@gmail.com', '1 university avenue'),
(10, 'james', '3011912', 'alieujallow675@gmail.com', 'londoncorner, serekunda');

-- --------------------------------------------------------

--
-- Table structure for table `measurement`
--

CREATE TABLE `measurement` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `symbol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `measurement`
--

INSERT INTO `measurement` (`id`, `name`, `symbol`) VALUES
(1, 'kilogram', 'kg'),
(2, 'litters', 'Li');

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `measurement_unit` varchar(20) NOT NULL,
  `value` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`id`, `name`, `measurement_unit`, `value`) VALUES
(3, 'olunka', '1', '24'),
(5, 'BASKET', '1', '50');

-- --------------------------------------------------------

--
-- Table structure for table `processing`
--

CREATE TABLE `processing` (
  `id` int(11) NOT NULL,
  `product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `processor` int(11) NOT NULL,
  `product_from` int(11) NOT NULL,
  `transaction_date` datetime NOT NULL,
  `status` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `processing`
--

INSERT INTO `processing` (`id`, `product`, `quantity`, `processor`, `product_from`, `transaction_date`, `status`) VALUES
(5, 8, 5, 5001, 3002, '2018-04-15 17:54:31', 0),
(6, 9, 27, 5000, 3002, '2018-04-18 13:56:04', 0),
(7, 11, 8, 5001, 3002, '2018-04-18 13:56:20', 0),
(8, 12, 23, 5000, 3002, '2018-04-18 13:56:33', 0),
(9, 8, 200, 5000, 3001, '2018-04-26 00:21:39', 0),
(10, 8, 26, 5000, 3000, '2018-04-26 02:23:38', 0),
(11, 8, 58, 5000, 3000, '2018-04-27 01:05:29', 0),
(12, 9, 63, 5001, 3000, '2018-04-27 01:05:47', 0),
(13, 8, 46, 5000, 3000, '2018-04-27 01:17:56', 1),
(14, 10, 28, 5001, 3001, '2018-04-27 01:18:16', 0),
(15, 9, 26, 5000, 3002, '2018-04-27 01:18:48', 0),
(16, 10, 20, 5000, 3001, '2018-04-27 01:44:43', 0),
(17, 8, 50, 5000, 3001, '2018-04-27 02:20:24', 1),
(18, 12, 8, 5001, 3002, '2018-04-27 02:20:49', 0),
(19, 14, 250, 5000, 3000, '2018-04-27 02:21:33', 0),
(20, 8, 250, 5000, 3001, '2018-04-27 02:27:46', 0),
(21, 12, 62, 5000, 3001, '2018-04-27 02:39:21', 1);

-- --------------------------------------------------------

--
-- Table structure for table `processor`
--

CREATE TABLE `processor` (
  `id` int(2) UNSIGNED ZEROFILL NOT NULL,
  `name` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `processor`
--

INSERT INTO `processor` (`id`, `name`, `phone`, `address`) VALUES
(5000, 'sourMills', '0272274468', 'Achimota'),
(5001, 'Milling', '0572274489', '32 hill street Adenta');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `order_point` int(11) NOT NULL,
  `warning_point` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category`, `name`, `order_point`, `warning_point`) VALUES
(8, 2, 'Pepper', 80, 100),
(9, 5, 'onion', 150, 200),
(10, 1, 'Raw Groundnut', 200, 300),
(11, 4, 'Groundnut Paste', 250, 350),
(12, 6, 'Yam', 34, 50),
(14, 6, 'cassava', 200, 300);

-- --------------------------------------------------------

--
-- Table structure for table `reason`
--

CREATE TABLE `reason` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reason`
--

INSERT INTO `reason` (`id`, `name`) VALUES
(1, 'theft'),
(2, 'spillage'),
(3, 'wastage');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'normal'),
(3, 'teacher'),
(4, 'data entry');

-- --------------------------------------------------------

--
-- Table structure for table `source`
--

CREATE TABLE `source` (
  `id` int(4) UNSIGNED ZEROFILL NOT NULL,
  `name` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `source`
--

INSERT INTO `source` (`id`, `name`) VALUES
(1000, 'Tamale'),
(1001, 'Adenkrebi');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(1, 'active'),
(2, 'pending'),
(3, 'suspended');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` int(11) NOT NULL,
  `product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `supplier` int(11) NOT NULL,
  `source` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `inventory_date` date NOT NULL,
  `order_number` varchar(20) NOT NULL,
  `storage` int(11) NOT NULL,
  `transaction_date` datetime NOT NULL,
  `description` text NOT NULL,
  `tag` int(1) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `product`, `quantity`, `supplier`, `source`, `order_date`, `inventory_date`, `order_number`, `storage`, `transaction_date`, `description`, `tag`, `user_id`) VALUES
(145, 8, 20, 18, 1000, '2018-04-15', '2018-04-15', '11111', 3000, '2018-04-15 15:32:36', 'first', 1, 84),
(146, 8, 10, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-15 17:33:39', '', 0, 84),
(147, 8, 10, 16, 1, '0000-00-00', '0000-00-00', '', 3002, '2018-04-15 17:33:39', '', 1, 84),
(148, 8, 2, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-15 17:36:24', '', 0, 84),
(149, 8, 2, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-15 17:36:24', '', 1, 84),
(150, 8, 5, 16, 1, '0000-00-00', '0000-00-00', '', 3002, '2018-04-15 17:54:31', '', 0, 84),
(151, 10, 88, 19, 1001, '2018-04-13', '2018-04-20', '3443342', 3001, '2018-04-15 16:49:14', 'second receipt', 1, 84),
(152, 8, 4, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-15 19:21:47', '', 0, 84),
(153, 8, 4, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-15 19:21:47', '', 1, 84),
(154, 9, 89, 19, 1000, '2018-04-03', '2018-04-15', '88888', 3001, '2018-04-15 19:07:58', 'LLL', 1, 84),
(155, 8, 2, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-15 00:00:00', 'theft', 1, 84),
(156, 11, 2100, 19, 1001, '2018-04-13', '2018-04-17', '77777', 3001, '2018-04-17 23:52:21', 'great', 1, 84),
(157, 11, 1000, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-18 00:00:00', 'spillage', 0, 84),
(158, 11, 900, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-18 00:00:00', 'theft', 0, 84),
(159, 12, 150, 19, 1001, '2018-04-13', '2018-04-13', '242424', 3000, '2018-04-18 01:43:29', 'sadf', 1, 84),
(160, 8, 25, 19, 1000, '2018-04-18', '2018-04-18', '9999', 3002, '2018-04-18 11:40:35', 'good', 1, 84),
(161, 9, 30, 19, 1000, '2018-04-18', '2018-04-18', '5555', 3002, '2018-04-18 11:50:06', 'HHH', 1, 84),
(162, 9, 29, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-18 13:51:14', '', 0, 84),
(163, 9, 29, 16, 1, '0000-00-00', '0000-00-00', '', 3002, '2018-04-18 13:51:14', '', 1, 84),
(164, 12, 50, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-18 13:51:51', '', 0, 84),
(165, 12, 50, 16, 1, '0000-00-00', '0000-00-00', '', 3002, '2018-04-18 13:51:51', '', 1, 84),
(166, 11, 25, 18, 1000, '2018-04-21', '2018-04-20', '44444', 3002, '2018-04-18 11:52:52', 'kkkk', 1, 84),
(167, 9, 90, 19, 1001, '2018-04-17', '2018-04-18', '9974', 3000, '2018-04-18 11:54:59', 'uuuu', 1, 84),
(168, 9, 42, 19, 1000, '2018-04-16', '2018-04-18', '3332', 3001, '2018-04-18 11:55:29', 'tt', 1, 84),
(169, 9, 27, 16, 1, '0000-00-00', '0000-00-00', '', 3002, '2018-04-18 13:56:04', '', 0, 84),
(170, 11, 8, 16, 1, '0000-00-00', '0000-00-00', '', 3002, '2018-04-18 13:56:20', '', 0, 84),
(171, 12, 23, 16, 1, '0000-00-00', '0000-00-00', '', 3002, '2018-04-18 13:56:33', '', 0, 84),
(172, 8, 20, 18, 1000, '2018-04-25', '2018-04-25', '88', 3000, '2018-04-25 21:53:35', ';;;;', 1, 84),
(173, 8, 800, 19, 1000, '2018-04-18', '2018-04-18', '78987', 3000, '2018-04-25 22:18:14', 'ffffffffffffffffffffffff', 1, 84),
(174, 8, 200, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-26 00:19:41', '', 0, 84),
(175, 8, 200, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-26 00:19:41', '', 1, 84),
(176, 8, 200, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-26 00:21:39', '', 0, 84),
(177, 8, 4, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-26 00:00:00', 'theft', 1, 84),
(178, 8, 200, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-26 00:00:00', 'adjustment', 1, 84),
(179, 8, 200, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-26 00:00:00', 'adjustment', 1, 84),
(180, 8, 200, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-26 00:00:00', 'adjustment', 1, 84),
(181, 8, 200, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-26 00:00:00', 'adjustment', 1, 84),
(182, 9, 27, 16, 1, '0000-00-00', '0000-00-00', '', 3002, '2018-04-26 00:00:00', 'adjustment', 1, 84),
(183, 9, 27, 16, 1, '0000-00-00', '0000-00-00', '', 3002, '2018-04-26 00:00:00', 'adjustment', 1, 84),
(184, 8, 26, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-26 02:23:38', '', 0, 84),
(185, 8, 26, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-26 00:00:00', 'adjustment', 1, 84),
(186, 9, 30, 18, 1000, '2018-04-26', '2018-04-14', '434', 3000, '2018-04-26 01:26:55', '34', 1, 84),
(187, 10, 778, 18, 1000, '2018-04-20', '2018-04-13', '77', 3000, '2018-04-26 01:28:34', '7878', 1, 84),
(188, 9, 43, 19, 1000, '2018-04-26', '2018-04-26', '999', 3000, '2018-04-26 01:34:59', 'y', 1, 84),
(189, 8, 78, 18, 1000, '2018-04-20', '2018-04-20', '99999', 3000, '2018-04-26 01:39:55', 'ghjhgj', 1, 84),
(190, 12, 34, 19, 1000, '2018-04-20', '2018-04-06', '99991', 3000, '2018-04-26 01:47:39', 'ertert', 1, 84),
(191, 14, 800, 18, 1000, '2018-04-25', '2018-04-26', '9991', 3000, '2018-04-26 23:03:21', 'fresh', 1, 84),
(192, 14, 250, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-27 01:05:08', '', 0, 84),
(193, 14, 250, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-27 01:05:08', '', 1, 84),
(194, 8, 58, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-27 01:05:29', '', 0, 84),
(195, 9, 63, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-27 01:05:47', '', 0, 84),
(196, 9, 63, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-27 00:00:00', 'adjustment', 1, 84),
(197, 8, 46, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-27 01:17:56', '', 0, 84),
(198, 10, 28, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-27 01:18:16', '', 0, 84),
(199, 9, 26, 16, 1, '0000-00-00', '0000-00-00', '', 3002, '2018-04-27 01:18:48', '', 0, 84),
(200, 8, 208, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-27 01:32:14', '', 0, 84),
(201, 8, 208, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-27 01:32:14', '', 1, 84),
(202, 9, 5, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-27 00:00:00', 'theft', 1, 84),
(203, 9, 600, 18, 1001, '2018-04-25', '2018-04-26', '9992', 3001, '2018-04-26 23:42:41', 'fresh onion', 1, 84),
(204, 9, 8, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-27 00:00:00', 'spillage', 1, 84),
(205, 9, 68, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-27 01:44:21', '', 0, 84),
(206, 9, 68, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-27 01:44:21', '', 1, 84),
(207, 10, 20, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-27 01:44:43', '', 0, 84),
(208, 10, 20, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-27 00:00:00', 'adjustment', 1, 84),
(209, 8, 50, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-27 02:20:24', '', 0, 84),
(210, 12, 8, 16, 1, '0000-00-00', '0000-00-00', '', 3002, '2018-04-27 02:20:49', '', 0, 84),
(211, 14, 250, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-27 02:21:33', '', 0, 84),
(212, 8, 80, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-27 02:27:23', '', 0, 84),
(213, 8, 80, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-27 02:27:23', '', 1, 84),
(214, 8, 250, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-27 02:27:46', '', 0, 84),
(215, 8, 250, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-27 00:00:00', 'adjustment', 1, 84),
(216, 11, 28, 18, 1000, '2018-04-26', '2018-04-27', '9998', 3001, '2018-04-27 00:28:54', 'hot and nice', 1, 84),
(217, 12, 800, 18, 1000, '2018-04-26', '2018-04-27', '9910', 3001, '2018-04-27 00:37:59', 'fresh yam', 1, 84),
(218, 12, 20, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-27 00:00:00', 'wastage', 1, 84),
(219, 12, 258, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-27 02:39:05', '', 0, 84),
(220, 12, 258, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-27 02:39:05', '', 1, 84),
(221, 12, 62, 16, 1, '0000-00-00', '0000-00-00', '', 3001, '2018-04-27 02:39:21', '', 0, 84),
(222, 14, 250, 16, 1, '0000-00-00', '0000-00-00', '', 3000, '2018-04-27 00:00:00', 'adjustment', 1, 84);

-- --------------------------------------------------------

--
-- Table structure for table `storage`
--

CREATE TABLE `storage` (
  `id` int(3) UNSIGNED ZEROFILL NOT NULL,
  `name` varchar(40) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `storage`
--

INSERT INTO `storage` (`id`, `name`, `phone`, `address`) VALUES
(3000, 'storageA', '23423423', 'WEREWW'),
(3001, 'StorageB', '4332', 'SFSFDF'),
(3002, 'StorageC', '2423234324', 'SDFSAADF');

-- --------------------------------------------------------

--
-- Table structure for table `storage_has_product`
--

CREATE TABLE `storage_has_product` (
  `storage_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `storage_has_product`
--

INSERT INTO `storage_has_product` (`storage_id`, `product_id`) VALUES
(0, 8),
(0, 9);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `phone`, `email`, `address`) VALUES
(18, 'Abdul', '025477997', 'abdul@nice.com', 'berekuso'),
(19, 'Ebrima', '0254776465', 'ebri@live.com', 'Gambia rek'),
(20, 'vlad', '0254798646', 'vlad@ashesi.com', 'longston street uk');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `transaction_date` datetime NOT NULL,
  `product` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `source` varchar(25) NOT NULL,
  `destination` varchar(25) NOT NULL,
  `reason` text NOT NULL,
  `tag` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `transaction_date`, `product`, `type`, `quantity`, `source`, `destination`, `reason`, `tag`, `user_id`) VALUES
(22, '2018-04-15 17:36:24', 8, 'movement', 2, 'storageA', 'StorageB', 'testing', 0, 84),
(23, '2018-04-15 17:54:31', 8, 'processing', 5, 'StorageC', 'Milling', 'testing', 0, 84),
(24, '2018-04-15 16:49:14', 10, 'stock receipt', 88, 'Adenkrebi', 'StorageB', 'testing', 0, 84),
(25, '2018-04-15 19:21:47', 8, 'movement', 4, 'storageA', 'StorageB', 'trying out some to see if it will work', 0, 84),
(26, '2018-04-15 19:07:58', 9, 'stock receipt', 89, 'Tamale', 'StorageB', 'testing', 0, 84),
(27, '2018-04-17 23:52:21', 11, 'stock receipt', 2100, 'Adenkrebi', 'StorageB', 'testing', 0, 84),
(28, '2018-04-18 01:43:29', 12, 'stock receipt', 150, 'Adenkrebi', 'storageA', 'testing', 0, 84),
(29, '2018-04-18 11:40:35', 8, 'stock receipt', 25, 'Tamale', 'StorageC', 'testing', 0, 84),
(30, '2018-04-18 11:50:06', 9, 'stock receipt', 30, 'Tamale', 'StorageC', 'refiling stock level', 0, 84),
(31, '2018-04-18 13:51:14', 9, 'Movement', 29, 'StorageB', 'StorageC', 'stock over load', 0, 84),
(32, '2018-04-18 13:51:51', 12, 'Movement', 50, 'storageA', 'StorageC', 'stock balance', 0, 84),
(33, '2018-04-18 11:52:52', 11, 'stock receipt', 25, 'Tamale', 'StorageC', 'refiling stock level', 0, 84),
(34, '2018-04-18 11:54:59', 9, 'stock receipt', 90, 'Adenkrebi', 'storageA', 'refiling stock level', 0, 84),
(35, '2018-04-18 11:55:29', 9, 'stock receipt', 42, 'Tamale', 'StorageB', 'refiling stock level', 0, 84),
(36, '2018-04-18 13:56:04', 9, 'Movement', 27, 'StorageC', 'sourMills', 'for processing', 0, 84),
(37, '2018-04-18 13:56:20', 11, 'Movement', 8, 'StorageC', 'Milling', 'for processing', 0, 84),
(38, '2018-04-18 13:56:33', 12, 'Movement', 23, 'StorageC', 'sourMills', 'for processing', 0, 84),
(39, '2018-04-25 21:53:35', 8, 'stock receipt', 20, 'Tamale', 'storageA', 'refiling stock level', 0, 84),
(40, '2018-04-25 22:18:14', 8, 'stock receipt', 800, 'Tamale', 'storageA', 'refiling stock level', 0, 84),
(41, '2018-04-26 00:19:41', 8, 'Movement', 200, 'storageA', 'StorageB', 'capacity filled', 0, 84),
(42, '2018-04-26 00:21:39', 8, 'Movement', 200, 'StorageB', 'sourMills', 'for processing', 0, 84),
(43, '2018-04-26 02:23:38', 8, 'Movement', 26, 'storageA', 'sourMills', 'for processing', 0, 84),
(44, '2018-04-26 01:26:55', 9, 'stock receipt', 30, 'Tamale', 'storageA', 'refiling stock level', 0, 84),
(45, '2018-04-26 01:28:34', 10, 'stock receipt', 778, 'Tamale', 'storageA', 'refiling stock level', 0, 84),
(46, '2018-04-26 01:34:59', 9, 'stock receipt', 43, 'Tamale', 'storageA', 'refiling stock level', 0, 84),
(47, '2018-04-26 01:39:55', 8, 'stock receipt', 78, 'Tamale', 'storageA', 'refiling stock level', 0, 84),
(48, '2018-04-26 01:47:39', 12, 'stock receipt', 34, 'Tamale', 'storageA', 'refiling stock level', 0, 84),
(49, '2018-04-26 23:03:21', 14, 'stock receipt', 800, 'Tamale', 'storageA', 'refiling stock level', 0, 84),
(50, '2018-04-27 01:05:08', 14, 'Movement', 250, 'storageA', 'storageA', 'capacity filled', 0, 84),
(51, '2018-04-27 01:05:29', 8, 'Movement', 58, 'storageA', 'sourMills', 'for processing', 0, 84),
(52, '2018-04-27 01:05:47', 9, 'Movement', 63, 'storageA', 'Milling', 'for processing', 0, 84),
(53, '2018-04-27 01:17:56', 8, 'Movement', 46, 'storageA', 'sourMills', 'for processing', 0, 84),
(54, '2018-04-27 01:18:16', 10, 'Movement', 28, 'StorageB', 'Milling', 'for processing', 0, 84),
(55, '2018-04-27 01:18:48', 9, 'Movement', 26, 'StorageC', 'sourMills', 'for processing', 0, 84),
(56, '2018-04-27 01:32:14', 8, 'Movement', 208, 'StorageB', 'storageA', 'balancing', 0, 84),
(57, '2018-04-26 23:42:41', 9, 'stock receipt', 600, 'Adenkrebi', 'StorageB', 'refiling stock level', 0, 84),
(58, '2018-04-27 01:44:21', 9, 'Movement', 68, 'storageA', 'StorageB', 'capacity filled', 0, 84),
(59, '2018-04-27 01:44:43', 10, 'Movement', 20, 'StorageB', 'sourMills', 'for processing', 0, 84),
(60, '2018-04-27 02:20:24', 8, 'Movement', 50, 'StorageB', 'sourMills', 'for processing', 0, 84),
(61, '2018-04-27 02:20:49', 12, 'Movement', 8, 'StorageC', 'Milling', 'for processing', 0, 84),
(62, '2018-04-27 02:21:33', 14, 'Movement', 250, 'storageA', 'sourMills', 'for processing', 0, 84),
(63, '2018-04-27 02:27:23', 8, 'Movement', 80, 'storageA', 'StorageB', 'spillage', 0, 84),
(64, '2018-04-27 02:27:46', 8, 'Movement', 250, 'StorageB', 'sourMills', 'for processing', 0, 84),
(65, '2018-04-27 00:28:54', 11, 'stock receipt', 28, 'Tamale', 'StorageB', 'refiling stock level', 0, 84),
(66, '2018-04-27 00:37:59', 12, 'stock receipt', 800, 'Tamale', 'StorageB', 'refiling stock level', 0, 84),
(67, '2018-04-27 02:39:05', 12, 'Movement', 258, 'StorageB', 'storageA', 'capacity full', 0, 84),
(68, '2018-04-27 02:39:21', 12, 'Movement', 62, 'StorageB', 'sourMills', 'for processing', 0, 84);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_reason`
--

CREATE TABLE `transaction_reason` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `email` varchar(80) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `role` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `last_login` datetime NOT NULL,
  `password` varchar(100) NOT NULL,
  `flag` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `phone`, `role`, `status`, `last_login`, `password`, `flag`) VALUES
(67, 'barry', 'barry@gmail.com', '65465664646', 4, 1, '2018-02-15 07:50:40', ' $2y$10$O4QW97VzX3daoaGG7FfRi.dOpcnfm3/chVWtAMbZCrUHALqL8XDyW', 1),
(84, 'alieu', 'alieujallow675@gmail.com', '0572274469', 2, 1, '2018-05-21 10:54:01', '$2y$10$2xaY6vNww3uHnnEckw.BMeWKxpePXVG27K4VB0Uj73Lvv8/XkKci.', 1),
(117, 'alex', 'alex@gmil.com', '84798765654', 2, 1, '2018-01-15 07:40:44', '$2y$10$QwLP3aGOONFNI1fdlgl9POn5uKVxSO4dKTBodam6GFI9o723D1Tvu', 1),
(148, 'job', 'job@ashesi.com', '025654642656', 1, 1, '2018-03-15 07:10:20', '$2y$10$sr4D4tHSIqYc6RFCkZKs1.Hh4KiXvsuCC4zWcLqdBar5CCnVbdmWy', 1),
(151, 'jabby', 'jabby@gmail.com', '0572274469', 4, 2, '2018-03-18 07:50:48', '$2y$10$h/1BH74a4lf.OoIKrYlEuugWeQRBdRTTbZkfsNBRRvnbKdlTpZzIC', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `measurement`
--
ALTER TABLE `measurement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `processing`
--
ALTER TABLE `processing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `processor`
--
ALTER TABLE `processor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `reason`
--
ALTER TABLE `reason`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `source`
--
ALTER TABLE `source`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_id_2` (`user_id`);

--
-- Indexes for table `storage`
--
ALTER TABLE `storage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `storage_has_product`
--
ALTER TABLE `storage_has_product`
  ADD KEY `storage_id` (`storage_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role` (`role`),
  ADD KEY `status` (`status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `measurement`
--
ALTER TABLE `measurement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `processing`
--
ALTER TABLE `processing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `processor`
--
ALTER TABLE `processor`
  MODIFY `id` int(2) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5002;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `reason`
--
ALTER TABLE `reason`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `source`
--
ALTER TABLE `source`
  MODIFY `id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1002;
--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=223;
--
-- AUTO_INCREMENT for table `storage`
--
ALTER TABLE `storage`
  MODIFY `id` int(3) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3003;
--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`id`);

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `storage_has_product`
--
ALTER TABLE `storage_has_product`
  ADD CONSTRAINT `storage_has_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`status`) REFERENCES `status` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
