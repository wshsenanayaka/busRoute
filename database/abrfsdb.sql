-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2025 at 01:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abrfsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `bus_routetb`
--

CREATE TABLE `bus_routetb` (
  `id` int(11) NOT NULL,
  `neo4j_id` int(11) NOT NULL,
  `bus_route_no` int(11) NOT NULL DEFAULT 0,
  `bus_route_name` varchar(250) NOT NULL,
  `system_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus_routetb`
--

INSERT INTO `bus_routetb` (`id`, `neo4j_id`, `bus_route_no`, `bus_route_name`, `system_date`) VALUES
(1, 1, 210, 'ratnapura - embilipitiya', '2025-04-08 10:58:39'),
(2, 2, 98, 'colombo - embilipitiya - old orad', '2025-04-08 10:58:39'),
(3, 3, 99, 'colombo - badulla', '2025-04-08 10:58:39'),
(4, 4, 122, 'colombo-awissawella', '2025-04-08 10:58:39'),
(5, 5, 122, 'colombo-ratnapura', '2025-04-08 10:58:39'),
(6, 6, 450, 'ratnapura-panadura', '2025-04-08 10:58:39'),
(7, 7, 138, 'colombo-maharagama', '2025-04-08 10:58:39'),
(8, 8, 138, 'colombo-kottawa', '2025-04-08 10:58:39'),
(9, 9, 138, 'colombo-homagama', '2025-04-08 10:58:39'),
(10, 10, 314, 'ratnapura-balangoda', '2025-04-08 10:58:39'),
(11, 11, 125, 'colombo-padukka', '2025-04-08 10:58:39'),
(12, 12, 98, 'colombo-bandarawela', '2025-04-08 10:58:39'),
(13, 13, 99, 'colombo-bandarawela', '2025-04-08 10:58:39'),
(14, 14, 120, 'colombo-piliyandala', '2025-04-08 10:58:39'),
(15, 15, 143, 'colombo-hanwella', '2025-04-08 10:58:39'),
(16, 16, 3, 'colombo-embilipitiya parana', '2025-04-08 10:58:39'),
(17, 17, 98, 'colombo-monaragala', '2025-04-08 10:58:39'),
(18, 18, 0, 'avissawella-ratnaupura', '2025-04-08 10:58:39'),
(19, 19, 0, 'eheliyagoda-ratnapura', '2025-04-08 10:58:39'),
(20, 20, 0, 'kuruwita-ratnapura', '2025-04-08 10:58:39'),
(21, 21, 120, 'colombo-horana', '2025-04-08 10:58:39'),
(22, 22, 135, 'kelaniya-kohuwala', '2025-04-08 10:58:39');

-- --------------------------------------------------------

--
-- Table structure for table `locationtb`
--

CREATE TABLE `locationtb` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `system_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `locationtb`
--

INSERT INTO `locationtb` (`id`, `name`, `status`, `system_date`) VALUES
(1, 'Colombo', 1, '2025-04-11 09:14:29'),
(4, 'Kalutara', 1, '2025-04-14 06:48:26'),
(5, 'Maharagma', 1, '2025-04-21 10:31:13');

-- --------------------------------------------------------

--
-- Table structure for table `usertb`
--

CREATE TABLE `usertb` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(150) NOT NULL,
  `user_role` int(11) NOT NULL DEFAULT 1,
  `system_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usertb`
--

INSERT INTO `usertb` (`id`, `username`, `password`, `user_role`, `system_date`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 1, '2025-04-08 21:03:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bus_routetb`
--
ALTER TABLE `bus_routetb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locationtb`
--
ALTER TABLE `locationtb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usertb`
--
ALTER TABLE `usertb`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bus_routetb`
--
ALTER TABLE `bus_routetb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `locationtb`
--
ALTER TABLE `locationtb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usertb`
--
ALTER TABLE `usertb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
