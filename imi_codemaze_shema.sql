-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2015 at 03:24 AM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `imi_codemaze_shema`
--

-- --------------------------------------------------------

--
-- Table structure for table `igra`
--

CREATE TABLE IF NOT EXISTS `igra` (
  `IdNivoa` int(11) NOT NULL,
  `IdUcenika` int(11) NOT NULL,
  `predjen` tinyint(1) NOT NULL,
  `kod` varchar(1000) NOT NULL,
  `brKomandi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE IF NOT EXISTS `level` (
`id` int(11) NOT NULL,
  `redniBrNivoa` int(11) NOT NULL,
  `matrica` varchar(350) NOT NULL,
  `optBrKomandi` int(11) NOT NULL,
  `ponudjeneKomande` varchar(200) NOT NULL,
  `smerKaraktera` int(11) NOT NULL,
  `xKoordKaraktera` int(11) NOT NULL,
  `yKoordKaraktera` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`id`, `redniBrNivoa`, `matrica`, `optBrKomandi`, `ponudjeneKomande`, `smerKaraktera`, `xKoordKaraktera`, `yKoordKaraktera`) VALUES
(1, 2, '[[1,1,1,1,1,1,1,1],[1,1,1,0,1,1,1,1],[1,1,1,1,1,1,1,1],[1,8,0,0,2,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1]]', 5, '[1,2,3]', 2, 3, 1),
(2, 2, '[[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,0,0,1,1,1,1],[1,1,1,0,1,1,1,1],[1,1,1,2,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1]]', 5, '[1,2,3]', 2, 2, 2),
(3, 2, '[[1,1,1,1,1,1,1,1],[1,1,3,0,3,7,7,1],[1,5,6,5,2,7,3,1],[1,8,0,0,0,7,3,1],[1,5,5,6,6,6,3,1],[1,1,7,1,6,3,3,1],[1,5,7,7,6,5,3,1],[1,1,1,1,1,1,1,1]]', 6, '[1,2,3]', 2, 3, 1),
(4, 2, '[[1,1,1,1,1,1,1,1],[1,7,7,7,1,6,6,1],[1,7,7,7,1,6,6,1],[1,3,3,0,1,6,6,1],[1,3,3,0,1,6,6,1],[1,5,3,0,2,6,6,1],[1,5,5,4,5,6,6,1],[1,1,1,1,1,1,1,1]]', 5, '[1,2,3]', 2, 3, 3),
(5, 2, '[[1,1,1,1,1,1,1,1],[1,3,3,3,0,3,3,1],[1,3,6,6,6,3,3,1],[1,3,6,6,6,3,3,1],[1,8,0,0,0,0,2,1],[1,7,7,5,5,5,5,1],[1,5,5,7,7,7,7,1],[1,1,1,1,1,1,1,1]]', 5, '[1,2,3,4]', 2, 4, 1),
(6, 2, '[[1,1,1,1,1,1,1,1],[1,5,1,1,7,7,7,1],[1,7,0,4,7,7,7,1],[1,6,0,5,5,5,5,1],[1,6,0,5,6,6,6,1],[1,6,0,5,6,6,6,1],[1,6,2,5,6,6,6,1],[1,1,1,1,1,1,1,1]]', 6, '[1,2,3,4]', 2, 2, 2),
(7, 2, '[[1,1,1,1,1,1,1,1],[1,7,5,5,7,0,1,1],[1,7,5,5,7,5,2,1],[1,5,5,5,5,5,0,1],[1,3,3,3,3,3,0,1],[1,8,0,0,0,0,0,1],[1,6,6,6,6,6,6,1],[1,1,1,1,1,1,1,1]]', 6, '[1,2,3,4]', 2, 5, 1),
(8, 2, '[[1,1,1,1,1,1,1,1],[1,5,3,0,3,5,3,1],[1,1,1,7,7,6,6,1],[1,8,0,0,0,0,0,1],[1,5,3,6,6,6,0,1],[1,6,2,0,0,0,0,1],[1,7,7,7,7,7,7,1],[1,1,1,1,1,1,1,1]]', 6, '[1,2,3,4,5]', 2, 3, 1),
(9, 2, '[[1,1,1,1,1,1,1,1],[1,1,7,0,7,7,3,1],[1,5,1,5,5,3,5,1],[1,8,0,0,0,0,2,1],[1,5,5,3,1,5,5,1],[1,5,3,6,6,1,5,1],[1,3,6,6,6,6,1,1],[1,1,1,1,1,1,1,1]]', 6, '[1,2,3,4,5]', 2, 3, 1),
(10, 2, '[[1,1,1,1,1,1,1,1],[1,3,3,3,4,7,3,1],[1,6,2,0,0,0,0,1],[1,3,3,3,3,0,4,1],[1,5,8,0,0,0,3,1],[1,5,5,5,5,5,4,1],[1,3,3,3,7,3,3,1],[1,1,1,1,1,1,1,1]]', 6, '[1,2,3,4,5]', 2, 4, 2),
(11, 2, '[[1,1,1,1,1,1,1,1],[1,7,0,0,0,0,1,1],[1,6,0,3,1,0,0,1],[1,6,2,1,3,5,0,1],[1,3,1,1,1,3,0,1],[1,5,8,0,0,0,0,1],[1,3,3,6,6,7,7,1],[1,1,1,1,1,1,1,1]]', 6, '[1,2,3,4,5]', 2, 5, 2),
(12, 2, '[[1,1,1,1,1,1,1,1],[1,0,0,0,0,0,8,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,4,4,0,4,4,4,1],[1,0,0,0,0,0,0,1],[1,2,0,0,0,0,0,1],[1,1,1,1,1,1,1,1]]', 6, '[1,2,3,4,5]', 2, 1, 6),
(13, 2, '[[1,1,1,1,1,1,1,1],[1,3,0,3,0,0,2,1],[1,0,0,3,0,3,0,1],[1,3,0,0,0,3,0,1],[1,3,0,3,0,0,0,1],[1,0,0,0,0,3,0,1],[1,0,8,3,0,3,0,1],[1,1,1,1,1,1,1,1]]', 6, '[1,2,3,4,5]', 3, 6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `ucenik`
--

CREATE TABLE IF NOT EXISTS `ucenik` (
`id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `ime` varchar(30) NOT NULL,
  `prezime` varchar(255) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ucenik`
--

INSERT INTO `ucenik` (`id`, `username`, `ime`, `prezime`, `email`, `password`, `role`) VALUES
(2, 'milos', 'Milos', 'Bajic', 'bajic_kg@live.com', '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `igra`
--
ALTER TABLE `igra`
 ADD PRIMARY KEY (`IdNivoa`,`IdUcenika`), ADD KEY `ucenik` (`IdUcenika`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ucenik`
--
ALTER TABLE `ucenik`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `ucenik`
--
ALTER TABLE `ucenik`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `igra`
--
ALTER TABLE `igra`
ADD CONSTRAINT `nivo` FOREIGN KEY (`IdNivoa`) REFERENCES `level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `ucenik` FOREIGN KEY (`IdUcenika`) REFERENCES `ucenik` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
