-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 24, 2023 at 09:44 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `warung_susea`
--

-- --------------------------------------------------------

--
-- Table structure for table `akun`
--

CREATE TABLE `akun` (
  `id` int(11) NOT NULL,
  `nama_depan` varchar(50) NOT NULL,
  `nama_belakang` varchar(50) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(15) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `gender` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `akun`
--

INSERT INTO `akun` (`id`, `nama_depan`, `nama_belakang`, `username`, `email`, `password`, `role`, `tanggal_lahir`, `gender`) VALUES
(1, 'warung', 'susea', 'warung_susea', 'warung.susea@restoran.com', '$2a$12$dTa3ZBxlJDl3pSfFlTnvluKFCmpQ4kJPHCWxM90bQuommffmkU88G', 'admin', '2023-10-22', 'n'),
(3, 'Filia Putri', 'Septarica', 'filiaptr', 'filiaptr@gmail.com', '$2y$10$VERmbMlnnPHLSMWg0NTlRe9jJyZhDZXzX7sWG7SS6JdQ6w/FiXMHG', 'customer', '2005-09-04', 'P'),
(4, 'Zhafran Aziya', 'Negasia Tajusa', 'zhafran123', 'zhafran@gmail.com', '$2y$10$9H3N6VUqA54OAGLY.kNpueeKg2gXg68fhL9h/jP/CUDPoKDNJuerS', 'customer', '2023-10-04', 'L'),
(5, 'Muhamad', 'Dafa', 'dronedaffa', 'muhamad102dafa@gmail.com', '$2y$10$RcwvaEWftrJ8MTkoaCDN7.9xvGYZXu0h6XeGjVDF7GdVC0GvWjy92', 'customer', '2004-06-09', 'L');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `deskripsi` varchar(155) NOT NULL,
  `kategori` varchar(50) NOT NULL,
  `harga` int(11) NOT NULL,
  `gambar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `nama`, `deskripsi`, `kategori`, `harga`, `gambar`) VALUES
(1, 'Jo Unagi', 'Premium Eel Sushi', 'Sushi Roll', 40000, 'JoUnagi.png'),
(2, 'Ikura Sushi', 'Salmon Roe Sushi', 'Sushi Roll', 38000, 'IkuraSushi.png'),
(3, 'Spicy Maguro Roll', 'Spicy Tuna Roll Topped with Fresh Tuna', 'Sushi Roll', 40000, 'SpicyMaguroRoll.png'),
(4, 'Nabeyaki Udon', 'Hot Claypot Noodles with Vegetables and Prawn Tempura', 'Hidangan Utama', 35000, 'NabeyakiUdon.png'),
(5, 'Gyu Tamagotoji Ju', 'Beef Topped with Egg and Rice', 'Hidangan Utama', 30000, 'GyuTamagotojiJu.png'),
(6, 'Negitoro Don', 'Minced Tuna and Spring Onion on Sushi Rice with Onsen Tamago', 'Hidangan Utama', 42000, 'NegitoroDon.png'),
(7, 'Maguro', 'Fresh Tuna', 'Sashimi', 50000, 'Maguro.png'),
(8, 'Mekajiki', 'Fresh Swordfish', 'Sashimi', 47000, 'Mekajiki.png'),
(9, 'Toro', 'Fresh Tunabelly', 'Sashimi', 55000, 'Toro.png'),
(10, 'Green Addict', 'Kiwi, Matcha and Passion Fruit with Soda', 'Minuman', 20000, 'GreenAddict.png'),
(11, 'Honeydew Juice ', 'Fresh Honeydew Juice', 'Minuman', 20000, 'HoneydewJuice.png'),
(12, 'Sparkling Passion Fruit Tea', 'Passion Fruit, Soda, Lime, and Black Tea', 'Minuman', 20000, 'SparklingPassionFruitTea.png'),
(13, 'Matcha Dango', 'Japanese Sweet Dumpling', 'Hidangan Penutup', 23000, 'MatchaDango.png'),
(14, 'Chocolate Monaka', 'Japanese Ice Cream Sandwich', 'Hidangan Penutup', 20000, 'ChocolateMonaka.png'),
(15, 'Matcha Monaka', 'Japanese Ice Cream Sandwich', 'Hidangan Penutup', 20000, 'MatchaMonaka.png');

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `id` int(11) NOT NULL,
  `id_order` char(13) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga_menu` int(11) NOT NULL,
  `tanggal_order` date NOT NULL,
  `order_selesai` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`id`, `id_order`, `id_menu`, `id_customer`, `jumlah`, `harga_menu`, `tanggal_order`, `order_selesai`) VALUES
(59, 'ORDER//86ca5e', 9, 5, 1, 55000, '2023-10-24', 0),
(60, 'ORDER//86ca5e', 8, 5, 2, 47000, '2023-10-24', 0),
(61, 'ORDER//77decb', 1, 5, 2, 40000, '2023-10-24', 0),
(62, 'ORDER//77decb', 2, 5, 2, 38000, '2023-10-24', 0),
(63, 'ORDER//951cfc', 2, 5, 1, 38000, '2023-10-24', 0),
(64, 'ORDER//951cfc', 3, 5, 1, 40000, '2023-10-24', 0),
(65, 'ORDER//951cfc', 4, 5, 1, 35000, '2023-10-24', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akun`
--
ALTER TABLE `akun`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_menu` (`nama`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_menu` (`id_menu`),
  ADD KEY `id_customer` (`id_customer`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `akun`
--
ALTER TABLE `akun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD CONSTRAINT `pesanan_ibfk_1` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pesanan_ibfk_2` FOREIGN KEY (`id_customer`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
