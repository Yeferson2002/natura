-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-12-2025 a las 13:04:53
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aba_platform`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Perfumería', 'perfumera', 'Fragancias únicas que combinan arte y ciencia.', '2025-12-02 23:41:38', '2025-12-02 23:46:38'),
(6, 'Cuidados Diarios', 'cuidados-diarios', 'Productos para el cuidado diario de tu piel.', '2025-12-02 23:46:38', '2025-12-02 23:46:38'),
(7, 'Cabello', 'cabello', 'Tratamientos y cuidados para todo tipo de cabello.', '2025-12-02 23:46:38', '2025-12-02 23:46:38'),
(8, 'Maquillaje', 'maquillaje', 'Realza tu belleza con nuestros productos de maquillaje.', '2025-12-02 23:46:38', '2025-12-02 23:46:38'),
(9, 'Rostro', 'rostro', 'Cuidado especializado para la piel de tu rostro.', '2025-12-02 23:46:38', '2025-12-02 23:46:38'),
(10, 'Regalos', 'regalos', 'Opciones perfectas para regalar en cualquier ocasión.', '2025-12-02 23:46:38', '2025-12-02 23:46:38'),
(11, 'Casa', 'casa', 'Productos para armonizar y perfumar tu hogar.', '2025-12-02 23:46:38', '2025-12-02 23:46:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `password` varchar(255) NOT NULL,
  `ConsultantId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clients`
--

INSERT INTO `clients` (`id`, `firstName`, `lastName`, `email`, `phone`, `createdAt`, `updatedAt`, `password`, `ConsultantId`) VALUES
(1, 'María', 'González', 'maria@example.com', '999111222', '2025-12-02 12:07:21', '2025-12-02 12:07:21', '$2b$10$IreVTdvNVTtD9G9K9PSFrOTIpfG/EAQpxm7qEWTnYDAVmMipTVa5q', NULL),
(2, 'Ana', 'Pérez', 'ana@example.com', '999333444', '2025-12-02 12:07:21', '2025-12-02 12:07:21', '$2b$10$oeJMGVrbVFIMm8peEzcWVOqfU1VTCEbL/U4nASAx2ARbZyR0nNg/u', NULL),
(3, 'Lucía', 'Rodríguez', 'lucia@example.com', '999555666', '2025-12-02 12:07:21', '2025-12-02 12:07:21', '$2b$10$0b6TW3vLCNXJX403FVOpCej3MZOMyqYFkZH53aqtJPq5ThIecVQM6', NULL),
(4, 'Carmen', 'Sánchez', 'carmen@example.com', '999777888', '2025-12-02 12:07:22', '2025-12-02 12:07:22', '$2b$10$qzAD01tPtQVh989IKCDJCe8SRoG2tZuSrHyi8M3dVsr3Cyd4WkZJm', NULL),
(5, 'Patricia', 'Lima', 'patricia@example.com', '999999000', '2025-12-02 12:07:22', '2025-12-02 12:07:22', '$2b$10$NitUFbCRPX.9VaknI/YtaeerRO9g2om89/iU8c4Rl6sjvvrca8kHq', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `qty` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `OrderId` int(11) DEFAULT NULL,
  `ProductId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orderitems`
--

INSERT INTO `orderitems` (`id`, `name`, `qty`, `image`, `price`, `createdAt`, `updatedAt`, `OrderId`, `ProductId`) VALUES
(1, 'Regalo Homem Potence', 2, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-master-catalog/default/dw4f247920/images/h_2000/132176_1.jpg', 96.00, '2025-12-02 13:51:54', '2025-12-02 13:51:54', 1, 2),
(2, 'Regalo Ritual Humor Paz y Humor', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-master-catalog/default/dw8b763654/images/h_2000/132178_1.jpg', 84.00, '2025-12-02 13:51:54', '2025-12-02 13:51:54', 1, 3),
(3, 'Essencial eau de parfum femenina exclusivo 50 ml', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw35a21e09/ProdutoJoia/mobile/93622.jpg', 109.80, '2025-12-02 13:51:54', '2025-12-02 13:51:54', 1, 6),
(4, 'Regalo Kaiak Clásico Masculino con Hidratante', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-master-catalog/default/dw12345678/images/h_2000/132179_1.jpg', 98.00, '2025-12-02 13:51:54', '2025-12-02 13:51:54', 2, 4),
(5, 'Regalo Kaiak Clásico Masculino con Hidratante', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-master-catalog/default/dw12345678/images/h_2000/132179_1.jpg', 98.00, '2025-12-02 13:51:54', '2025-12-02 13:51:54', 2, 4),
(6, 'Regalo Kaiak Clásico Masculino con Hidratante', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-master-catalog/default/dw12345678/images/h_2000/132179_1.jpg', 98.00, '2025-12-02 13:51:54', '2025-12-02 13:51:54', 3, 4),
(7, 'Essencial eau de parfum femenina exclusivo 50 ml', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw35a21e09/ProdutoJoia/mobile/93622.jpg', 109.80, '2025-12-02 13:51:54', '2025-12-02 13:51:54', 3, 6),
(8, 'Regalo Essencial Exclusivo Masculino', 1, 'https://www.natura.com.pe/p/regalo-essencial-exclusivo-masculino/NATPER-217081?position=1&listTitle=search+results+list+showcase+-+Regalo+Essencial+Exclusivo+Masculino', 138.00, '2025-12-02 13:51:54', '2025-12-02 13:51:54', 4, 1),
(9, 'Regalo Homem Potence', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-master-catalog/default/dw4f247920/images/h_2000/132176_1.jpg', 96.00, '2025-12-02 13:51:54', '2025-12-02 13:51:54', 5, 2),
(10, 'Regalo Meu Primeiro Humor', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-master-catalog/default/dw87654321/images/h_2000/132180_1.jpg', 69.00, '2025-12-02 13:51:54', '2025-12-02 13:51:54', 5, 5),
(11, 'Regalo Essencial Exclusivo Masculino', 2, 'https://www.natura.com.pe/p/regalo-essencial-exclusivo-masculino/NATPER-217081?position=1&listTitle=search+results+list+showcase+-+Regalo+Essencial+Exclusivo+Masculino', 138.00, '2025-12-02 13:51:54', '2025-12-02 13:51:54', 5, 1),
(12, 'Regalo Kaiak Clásico Masculino con Hidratante', 2, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-master-catalog/default/dw12345678/images/h_2000/132179_1.jpg', 98.00, '2025-12-02 13:51:54', '2025-12-02 13:51:54', 6, 4),
(13, 'Regalo Ritual Humor Paz y Humor', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-master-catalog/default/dw8b763654/images/h_2000/132178_1.jpg', 84.00, '2025-12-02 13:51:54', '2025-12-02 13:51:54', 7, 3),
(14, 'Regalo Essencial Exclusivo Masculino', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw9bf139b7/ProdutoJoia/mobile/217081.jpg', 115.00, '2025-12-04 03:40:38', '2025-12-04 03:40:38', 8, 1),
(15, 'Regalo Homem Potence', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw8ce2b50c/ProdutoJoia/mobile/217075.jpg', 96.00, '2025-12-04 03:40:38', '2025-12-04 03:40:38', 8, 2),
(16, 'Ekos Néctar hidratante corporal maracuyá 400 ml', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwb0004df3/ProdutoJoia/mobile/82509.jpg', 34.50, '2025-12-04 03:40:38', '2025-12-04 03:40:38', 8, 7),
(17, 'Essencial eau de parfum femenina exclusivo 50 ml', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw35a21e09/ProdutoJoia/mobile/93622.jpg', 109.80, '2025-12-04 03:40:38', '2025-12-04 03:40:38', 8, 6),
(18, 'Regalo Essencial Exclusivo Masculino', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw9bf139b7/ProdutoJoia/mobile/217081.jpg', 115.00, '2025-12-04 12:00:14', '2025-12-04 12:00:14', 9, 1),
(19, 'Ekos Frescor eau de toilette maracuyá 150 ml', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw3659c4b6/ProdutoJoia/mobile/73574.jpg', 97.00, '2025-12-04 12:00:14', '2025-12-04 12:00:14', 9, 8),
(20, 'Ekos Pulpa hidratante corporal castaña 400 ml', 1, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwe760345e/ProdutoJoia/mobile/80936.jpg', 69.00, '2025-12-04 12:00:14', '2025-12-04 12:00:14', 9, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `shippingAddress` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`shippingAddress`)),
  `paymentMethod` varchar(255) NOT NULL,
  `paymentResult` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`paymentResult`)),
  `itemsPrice` decimal(10,2) NOT NULL DEFAULT 0.00,
  `taxPrice` decimal(10,2) NOT NULL DEFAULT 0.00,
  `shippingPrice` decimal(10,2) NOT NULL DEFAULT 0.00,
  `totalPrice` decimal(10,2) NOT NULL DEFAULT 0.00,
  `isPaid` tinyint(1) NOT NULL DEFAULT 0,
  `paidAt` datetime DEFAULT NULL,
  `isDelivered` tinyint(1) NOT NULL DEFAULT 0,
  `deliveredAt` datetime DEFAULT NULL,
  `status` enum('Pendiente','Procesando','Enviado','Entregado','Cancelado') DEFAULT 'Pendiente',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `ConsultantId` int(11) DEFAULT NULL,
  `ClientId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `shippingAddress`, `paymentMethod`, `paymentResult`, `itemsPrice`, `taxPrice`, `shippingPrice`, `totalPrice`, `isPaid`, `paidAt`, `isDelivered`, `deliveredAt`, `status`, `createdAt`, `updatedAt`, `UserId`, `ConsultantId`, `ClientId`) VALUES
(1, '{\"address\":\"Test St\"}', 'Credit Card', NULL, 100.00, 18.00, 10.00, 128.00, 1, '2025-12-01 14:27:59', 1, '2025-12-01 14:27:59', 'Entregado', '2025-12-01 14:27:59', '2025-12-01 14:27:59', NULL, 2, 2),
(2, '{\"address\":\"Test St\"}', 'Credit Card', NULL, 100.00, 18.00, 10.00, 128.00, 1, '2025-12-01 14:28:20', 1, '2025-12-01 14:28:20', 'Entregado', '2025-12-01 14:28:20', '2025-12-01 14:28:20', NULL, 2, 2),
(3, '{\"address\":\"Av. Larco 123, Lima\"}', 'Tarjeta de Crédito', NULL, 400.00, 50.00, 0.00, 450.00, 1, NULL, 1, NULL, '', '2025-12-02 12:07:22', '2025-12-02 12:07:22', NULL, 2, 1),
(4, '{\"address\":\"Jr. Union 456, Lima\"}', 'Yape', NULL, 250.00, 30.50, 0.00, 280.50, 0, NULL, 0, NULL, 'Pendiente', '2025-12-02 12:07:22', '2025-12-02 12:07:22', NULL, 2, 2),
(5, '{\"address\":\"Av. Arequipa 789, Lima\"}', 'Transferencia', NULL, 800.00, 90.00, 0.00, 890.00, 1, NULL, 0, NULL, '', '2025-12-02 12:07:22', '2025-12-02 12:07:22', NULL, 2, 3),
(6, '{\"address\":\"Calle Los Pinos 321, Lima\"}', 'Efectivo', NULL, 100.00, 15.00, 10.00, 125.00, 1, NULL, 1, NULL, '', '2025-12-02 12:07:22', '2025-12-02 12:07:22', NULL, 2, 4),
(7, '{\"address\":\"Av. Javier Prado 555, Lima\"}', 'Tarjeta de Débito', NULL, 300.00, 40.00, 0.00, 340.00, 0, NULL, 0, NULL, 'Cancelado', '2025-12-02 12:07:22', '2025-12-02 12:07:22', NULL, 2, 5),
(8, '{\"address\":\"jr jose carlos\",\"city\":\"Huanuco\"}', 'Yape', NULL, 355.30, 0.00, 0.00, 355.30, 1, '2025-12-04 03:40:38', 0, NULL, 'Pendiente', '2025-12-04 03:40:38', '2025-12-04 03:40:38', 1, NULL, 1),
(9, '{\"address\":\"jr carlos\",\"city\":\"Huánuco\"}', 'Yape', NULL, 281.00, 0.00, 0.00, 281.00, 1, '2025-12-04 12:00:14', 0, NULL, 'Pendiente', '2025-12-04 12:00:14', '2025-12-04 12:00:14', NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `originalPrice` decimal(10,2) DEFAULT NULL,
  `discount` int(11) DEFAULT 0,
  `stock` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Disponible','Agotado') DEFAULT 'Disponible',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `image2` varchar(255) DEFAULT NULL,
  `image3` varchar(255) DEFAULT NULL,
  `CategoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `brand`, `price`, `originalPrice`, `discount`, `stock`, `image`, `description`, `status`, `createdAt`, `updatedAt`, `image2`, `image3`, `CategoryId`) VALUES
(1, 'Regalo Essencial Exclusivo Masculino', 'Essencial', 115.00, 230.00, 50, 10, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw9bf139b7/ProdutoJoia/mobile/217081.jpg', 'Una fragancia amaderada intensa que combina la potencia de las maderas profundas con notas de especias frías.', 'Disponible', '0000-00-00 00:00:00', '2025-12-02 23:17:34', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwbadeb5cf/products/NATPER-217081_1.jpg', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwd70c0798/products/NATPER-217081_2.jpg', 1),
(2, 'Regalo Homem Potence', 'Homem', 96.00, 160.00, 40, 15, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw8ce2b50c/ProdutoJoia/mobile/217075.jpg', 'Para el hombre que se expresa con intensidad. Una combinación marcante de maderas nobles con pimienta negra.', 'Disponible', '0000-00-00 00:00:00', '2025-12-02 23:14:14', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw972e14aa/products/NATPER-217075_1.jpg', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw5a6b7ff8/products/NATPER-217075_2.jpg', 1),
(3, 'Regalo Ritual Humor Paz y Humor', 'Humor', 84.00, 120.00, 30, 20, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwfc1cc325/ProdutoJoia/mobile/217074.jpg', 'Una fragancia irreverente y llena de humor. Notas frutales mezcladas con un toque de especias.', 'Disponible', '0000-00-00 00:00:00', '2025-12-02 23:15:10', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwefb84ee6/products/NATPER-217074_1.jpg', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwa96989b9/products/NATPER-217074_2.jpg', 1),
(4, 'Regalo Kaiak Clásico Masculino con Hidratante', 'Kaiak', 98.00, 140.00, 30, 12, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw6d60ead3/ProdutoJoia/mobile/217064.jpg', 'La frescura vibrante de las hierbas y bergamota. Un clásico que renueva las energías.', 'Disponible', '0000-00-00 00:00:00', '2025-12-02 23:16:06', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwcc794525/products/NATPER-217064_1.jpg', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwfd6e06fd/products/NATPER-217064_2.jpg', 1),
(5, 'Regalo Meu Primeiro Humor', 'Humor', 69.00, 115.00, 40, 8, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwc84f8cf2/ProdutoJoia/mobile/217047.jpg', 'El encuentro de las notas cítricas con un cóctel de frutas, vibrante y alegre.', 'Disponible', '0000-00-00 00:00:00', '2025-12-02 23:17:01', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw30a8b3e3/products/NATPER-217047_1.jpg', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwfe0b0056/products/NATPER-217047_2.jpg', 1),
(6, 'Essencial eau de parfum femenina exclusivo 50 ml', 'Natura', 109.80, 183.00, 40, 10, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw35a21e09/ProdutoJoia/mobile/93622.jpg', 'elegancia y personalidad en cada nota.\n\n• perfumación de larga duración;\n• fragancia sofisticada y distintiva;\n• bouquet floral de rosa, fresia y magnolia;\n• creación exclusiva realzada con notas de grosella negra (cassis) y mandarina;\n• ideal para ocasiones especiales y uso cotidiano.', 'Disponible', '2025-11-28 14:38:37', '2025-11-28 18:03:04', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw000db547/NATPER-93622_1.jpg', '', 1),
(7, 'Ekos Néctar hidratante corporal maracuyá 400 ml', 'Ekos', 34.50, 69.00, 50, 10, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwb0004df3/ProdutoJoia/mobile/82509.jpg', 'calmante natural para la piel. hidratación y equilibrio\n\n• hecho con óleo bruto de maracuya, rico en ácidos grasos esenciale\n• combate los indicadores del estrés cutáneo, aumentando los niveles naturales de hidratación\n• reequilibra la piel\n• posee textura leve y de rápida absorción\n• 96% origen natural\n• 83% origen vegetal\n• dermatológicamente probado\n• tiene repuesto\n• libre de crueldad animal\n• vegano\n• tipo de piel: todo tipo de piel', 'Disponible', '2025-12-03 00:03:06', '2025-12-03 00:03:06', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwae86d52b/NATPER-82509_2.jpg', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw8ae1fbdc/NATPER-82509_6.jpg', 6),
(8, 'Ekos Frescor eau de toilette maracuyá 150 ml', 'Ekos', 97.00, 97.00, 0, 10, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw3659c4b6/ProdutoJoia/mobile/73574.jpg', 'el encanto Refrescante del Maracuyá\n\n• una Amazonía fresca e inesperada\n• perfil olfativo: frutal ligero, con equilibrio entre la acidez dulce del maracuyá y la comodidad del almizcle\n• sensación de fragancia encantadora, confortable y refrescante\n• activo de la biodiversidad con extracto aromático 100% natural de las semillas de maracuyá\n• proporciona ligereza y bienestar\n• ideal para refrescar el cuerpo a lo largo del día\n• aporta la naturalidad y potencia de los ingredientes amazónicos\n• textura de la fragancia: Fluida, con la intensidad justa para el uso diario', 'Disponible', '2025-12-03 00:04:59', '2025-12-03 00:04:59', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw0d68b9aa/products/NATPER-73574_1.jpg', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw233e4635/products/NATPER-73574_3.jpg', 6),
(9, 'Ekos Pulpa hidratante para manos castaña 40 g', 'Ekos', 29.99, 29.99, 0, 10, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwffd6ff67/ProdutoJoia/mobile/95133.jpg', 'manos y uñas más fuertes, piel más nutrida\n\n• piel restaurada e intensamente nutrida\n• uñas y cutículas con aspecto saludable\n• base vegetal biocompatible con la piel; altamente biodegradable\n• libre de ingredientes potencialmente dañinos para ti y para el medio ambiente', 'Disponible', '2025-12-03 00:06:28', '2025-12-03 00:06:28', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw0b9b3791/products/NATPER-95133_1.jpg', NULL, 6),
(10, 'Ekos Pulpa hidratante corporal castaña 400 ml', 'Ekos', 69.00, 69.00, 0, 10, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwe760345e/ProdutoJoia/mobile/80936.jpg', 'revitaliza tu piel con el poder de la castaña\n\n• con acción anti resequedad, deja tu piel restaurada y nutrida\n• mayor concentración de aceite crudo de castaña\n• revitaliza la piel\n• mejora visiblemente la textura\n• producto vegano: con ingredientes de origen natural y vegetal de la Amazonía\n• fórmulas biocompatibles con la piel y altamente biodegradables\n• sin parabenos, siliconas ni aceites minerales', 'Disponible', '2025-12-03 00:08:02', '2025-12-03 00:08:02', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw10010d26/products/NATPER-80936_1.jpg', NULL, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','consultant','client') DEFAULT 'client',
  `consultantLevel` enum('Bronce','Plata','Oro','Diamante') DEFAULT 'Bronce',
  `points` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` enum('Activa','Inactiva','Pendiente') DEFAULT 'Activa',
  `monthlySales` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `dni`, `phone`, `email`, `password`, `role`, `consultantLevel`, `points`, `createdAt`, `updatedAt`, `status`, `monthlySales`) VALUES
(1, 'Admin', 'User', '12345678', '', 'admin@example.com', '$2b$10$OozDdjWlUgB7X2j992GI9.5LpqfXAFgAUXOfv/HZJYmy4sL4WoSpC', 'admin', 'Bronce', 0, '0000-00-00 00:00:00', '2025-11-28 02:38:20', 'Activa', 0.00),
(2, 'Consultora', 'Natura', '87654321', '917458125', 'consultora@example.com', '$2b$10$wYVwXQs9/yN62tv.TZ.NzuVCqO9ISCZC53zywpbRYQ/gZiugI5X3y', 'consultant', 'Oro', 1500, '0000-00-00 00:00:00', '2025-12-02 11:43:04', 'Activa', 0.00),
(4, 'Test', 'Admin', '99999999', '', 'admin_test@example.com', '$2b$10$Ckykp0hGoMVtkgFvqR6AqeENUcFIXvMyCkKkfmjhXkNT7xVIFcSoq', 'admin', 'Bronce', 0, '2025-11-28 02:35:06', '2025-11-28 02:35:06', 'Activa', 0.00),
(5, 'Test', 'Consultant', '88888888', '', 'consultant_test@example.com', '$2b$10$bcmNSELdLp2TkgFzo4XJbeGLqNVU1xkQNQUVOLTAbLqWPpf7KWssi', 'consultant', 'Bronce', 0, '2025-11-28 02:35:06', '2025-12-01 23:04:47', 'Pendiente', 0.00),
(6, 'María', 'González', '40123456', '987654321', 'maria.gonzalez@email.com', '$2b$10$FWoVn1sS3Ml7ohf4aQXvsuJf8EdsA/KSLRlucZfYlMxhKm0LiVapW', 'consultant', 'Oro', 0, '2025-12-01 14:05:57', '2025-12-02 11:43:09', 'Activa', 0.00),
(7, 'Ana', 'Pérez', '40654321', '', 'ana.perez@email.com', '$2b$10$wT5a9VGwaWl10xcZPlapYOMv1VRr7sMFROjpEZyLSyKsPaKfpc.Lm', 'consultant', 'Plata', 0, '2025-12-01 14:05:57', '2025-12-01 14:05:57', 'Activa', 0.00),
(8, 'Lucía', 'Rodríguez', '40987654', '', 'lucia.rodriguez@email.com', '$2b$10$YZEgEmINhAWqEAViuCB7KeC1c1zKkaiR17547r69bYl413J6ky2Fa', 'consultant', 'Bronce', 0, '2025-12-01 14:05:57', '2025-12-01 14:05:57', 'Inactiva', 0.00),
(9, 'Carmen', 'Sánchez', '40567890', '', 'carmen.sanchez@email.com', '$2b$10$YvVUT9uSwX4oEuA1Y4z7SuCUWuFqSDl6a2zddT0ULi8OnhoKE/sgm', 'consultant', 'Diamante', 0, '2025-12-01 14:05:57', '2025-12-01 14:05:57', 'Activa', 0.00),
(10, 'Patricia', 'Lima', '40432109', '', 'patricia.lima@email.com', '$2b$10$L3lEMisuQJl/7jLcb8tqlOL2/8wyq3l5CWvSaSJg4bW8CN/oXq7KS', 'consultant', 'Plata', 0, '2025-12-01 14:05:57', '2025-12-01 14:56:32', 'Activa', 0.00),
(19, 'Jimena', 'Ramirez', '71853136', '', 'ramirez@gmail.com', '$2b$10$DlVbxzZpRM.IebORbRPgp.S2j1E1z11nu3Y6H2v4SVw7nRJtwHxvy', 'consultant', 'Bronce', 0, '2025-12-01 14:20:34', '2025-12-01 14:20:34', 'Activa', 0.00),
(20, 'Verif', 'User', 'DNI1764600919187', '', 'verif_1764600919187@example.com', '$2b$10$RZwuOJobQn9.gb3KiZ.7SO4a7PhkUhIdmosPtBR5udpE5gr7b.8gG', 'consultant', 'Bronce', 0, '2025-12-01 14:55:19', '2025-12-01 14:55:19', 'Activa', 0.00);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD KEY `clients_ConsultantId_foreign_idx` (`ConsultantId`);

--
-- Indices de la tabla `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OrderId` (`OrderId`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `ConsultantId` (`ConsultantId`),
  ADD KEY `ClientId` (`ClientId`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Products_CategoryId_foreign_idx` (`CategoryId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `dni_2` (`dni`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `dni_3` (`dni`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `dni_4` (`dni`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `dni_5` (`dni`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `dni_6` (`dni`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `dni_7` (`dni`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `dni_8` (`dni`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `dni_9` (`dni`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `dni_10` (`dni`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `dni_11` (`dni`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `dni_12` (`dni`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `dni_13` (`dni`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `dni_14` (`dni`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `dni_15` (`dni`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `dni_16` (`dni`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `dni_17` (`dni`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `dni_18` (`dni`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `dni_19` (`dni`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `dni_20` (`dni`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `dni_21` (`dni`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `dni_22` (`dni`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `dni_23` (`dni`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `dni_24` (`dni`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `dni_25` (`dni`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `dni_26` (`dni`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `dni_27` (`dni`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `dni_28` (`dni`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `dni_29` (`dni`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `dni_30` (`dni`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `dni_31` (`dni`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `dni_32` (`dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ConsultantId_foreign_idx` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_10` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_11` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_12` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_13` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_14` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_15` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_16` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_17` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_18` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_19` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_20` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_21` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_22` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_23` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_24` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_25` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_26` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_27` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_28` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_29` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_3` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_30` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_31` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_32` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_33` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_34` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_35` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_36` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_37` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_38` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_39` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_4` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_40` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_41` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_42` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_43` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_44` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_45` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_46` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_47` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_48` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_49` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_5` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_50` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_51` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_52` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_53` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_54` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_55` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_56` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_57` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_58` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_59` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_6` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_60` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_61` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_62` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_7` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_8` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_9` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `Orders_ConsultantId_foreign_idx` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_10` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_11` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_12` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_13` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_14` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_15` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_16` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_17` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_18` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_19` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_20` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_21` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_22` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_23` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_24` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_25` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_26` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_27` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_28` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_29` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_30` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_31` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_32` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_33` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_34` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_35` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_36` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_37` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_38` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_39` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_40` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_41` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_42` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_ibfk_43` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_44` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_45` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `orders_ibfk_46` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_47` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_48` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_49` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_50` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_51` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_52` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_53` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_54` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_55` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_56` FOREIGN KEY (`ConsultantId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_57` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_6` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_7` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_8` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_9` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `Products_CategoryId_foreign_idx` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
