-- Script para poblar la base de datos en TiDB Cloud
-- Copia y pega TODO este contenido en la consola SQL de TiDB (Chat2Query)

USE test;

SET FOREIGN_KEY_CHECKS = 0;

-- Limpiar tablas por si acaso (para evitar duplicados)
TRUNCATE TABLE `OrderItems`;
TRUNCATE TABLE `Orders`;
TRUNCATE TABLE `Products`;
TRUNCATE TABLE `Clients`;
TRUNCATE TABLE `Users`;
TRUNCATE TABLE `Categories`;

-- 1. Categorías
INSERT INTO `Categories` (`id`, `name`, `slug`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Perfumería', 'perfumera', 'Fragancias únicas que combinan arte y ciencia.', '2025-12-02 23:41:38', '2025-12-02 23:46:38'),
(6, 'Cuidados Diarios', 'cuidados-diarios', 'Productos para el cuidado diario de tu piel.', '2025-12-02 23:46:38', '2025-12-02 23:46:38'),
(7, 'Cabello', 'cabello', 'Tratamientos y cuidados para todo tipo de cabello.', '2025-12-02 23:46:38', '2025-12-02 23:46:38'),
(8, 'Maquillaje', 'maquillaje', 'Realza tu belleza con nuestros productos de maquillaje.', '2025-12-02 23:46:38', '2025-12-02 23:46:38'),
(9, 'Rostro', 'rostro', 'Cuidado especializado para la piel de tu rostro.', '2025-12-02 23:46:38', '2025-12-02 23:46:38'),
(10, 'Regalos', 'regalos', 'Opciones perfectas para regalar en cualquier ocasión.', '2025-12-02 23:46:38', '2025-12-02 23:46:38'),
(11, 'Casa', 'casa', 'Productos para armonizar y perfumar tu hogar.', '2025-12-02 23:46:38', '2025-12-02 23:46:38');

-- 2. Usuarios (Admins y Consultoras)
-- Passwords hasheadas incluidas
INSERT INTO `Users` (`id`, `firstName`, `lastName`, `dni`, `phone`, `email`, `password`, `role`, `consultantLevel`, `points`, `createdAt`, `updatedAt`, `status`, `monthlySales`) VALUES
(1, 'Admin', 'User', '12345678', '', 'admin@example.com', '$2b$10$OozDdjWlUgB7X2j992GI9.5LpqfXAFgAUXOfv/HZJYmy4sL4WoSpC', 'admin', 'Bronce', 0, '2025-11-28 02:38:20', '2025-11-28 02:38:20', 'Activa', 0.00),
(2, 'Consultora', 'Natura', '87654321', '917458125', 'consultora@example.com', '$2b$10$wYVwXQs9/yN62tv.TZ.NzuVCqO9ISCZC53zywpbRYQ/gZiugI5X3y', 'consultant', 'Oro', 1500, '2025-12-02 11:43:04', '2025-12-02 11:43:04', 'Activa', 0.00),
(4, 'Test', 'Admin', '99999999', '', 'admin_test@example.com', '$2b$10$Ckykp0hGoMVtkgFvqR6AqeENUcFIXvMyCkKkfmjhXkNT7xVIFcSoq', 'admin', 'Bronce', 0, '2025-11-28 02:35:06', '2025-11-28 02:35:06', 'Activa', 0.00),
(5, 'Test', 'Consultant', '88888888', '', 'consultant_test@example.com', '$2b$10$bcmNSELdLp2TkgFzo4XJbeGLqNVU1xkQNQUVOLTAbLqWPpf7KWssi', 'consultant', 'Bronce', 0, '2025-11-28 02:35:06', '2025-12-01 23:04:47', 'Pendiente', 0.00),
(6, 'María', 'González', '40123456', '987654321', 'maria.gonzalez@email.com', '$2b$10$FWoVn1sS3Ml7ohf4aQXvsuJf8EdsA/KSLRlucZfYlMxhKm0LiVapW', 'consultant', 'Oro', 0, '2025-12-01 14:05:57', '2025-12-02 11:43:09', 'Activa', 0.00),
(7, 'Ana', 'Pérez', '40654321', '', 'ana.perez@email.com', '$2b$10$wT5a9VGwaWl10xcZPlapYOMv1VRr7sMFROjpEZyLSyKsPaKfpc.Lm', 'consultant', 'Plata', 0, '2025-12-01 14:05:57', '2025-12-01 14:05:57', 'Activa', 0.00),
(8, 'Lucía', 'Rodríguez', '40987654', '', 'lucia.rodriguez@email.com', '$2b$10$YZEgEmINhAWqEAViuCB7KeC1c1zKkaiR17547r69bYl413J6ky2Fa', 'consultant', 'Bronce', 0, '2025-12-01 14:05:57', '2025-12-01 14:05:57', 'Inactiva', 0.00),
(9, 'Carmen', 'Sánchez', '40567890', '', 'carmen.sanchez@email.com', '$2b$10$YvVUT9uSwX4oEuA1Y4z7SuCUWuFqSDl6a2zddT0ULi8OnhoKE/sgm', 'consultant', 'Diamante', 0, '2025-12-01 14:05:57', '2025-12-01 14:05:57', 'Activa', 0.00),
(10, 'Patricia', 'Lima', '40432109', '', 'patricia.lima@email.com', '$2b$10$L3lEMisuQJl/7jLcb8tqlOL2/8wyq3l5CWvSaSJg4bW8CN/oXq7KS', 'consultant', 'Plata', 0, '2025-12-01 14:05:57', '2025-12-01 14:56:32', 'Activa', 0.00);

-- 3. Productos
INSERT INTO `Products` (`id`, `name`, `brand`, `price`, `originalPrice`, `discount`, `stock`, `image`, `description`, `status`, `createdAt`, `updatedAt`, `image2`, `image3`, `CategoryId`) VALUES
(1, 'Regalo Essencial Exclusivo Masculino', 'Essencial', 115.00, 230.00, 50, 10, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw9bf139b7/ProdutoJoia/mobile/217081.jpg', 'Una fragancia amaderada intensa que combina la potencia de las maderas profundas con notas de especias frías.', 'Disponible', '2025-12-02 23:17:34', '2025-12-02 23:17:34', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwbadeb5cf/products/NATPER-217081_1.jpg', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwd70c0798/products/NATPER-217081_2.jpg', 1),
(2, 'Regalo Homem Potence', 'Homem', 96.00, 160.00, 40, 15, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw8ce2b50c/ProdutoJoia/mobile/217075.jpg', 'Para el hombre que se expresa con intensidad. Una combinación marcante de maderas nobles con pimienta negra.', 'Disponible', '2025-12-02 23:14:14', '2025-12-02 23:14:14', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw972e14aa/products/NATPER-217075_1.jpg', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw5a6b7ff8/products/NATPER-217075_2.jpg', 1),
(3, 'Regalo Ritual Humor Paz y Humor', 'Humor', 84.00, 120.00, 30, 20, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwfc1cc325/ProdutoJoia/mobile/217074.jpg', 'Una fragancia irreverente y llena de humor. Notas frutales mezcladas con un toque de especias.', 'Disponible', '2025-12-02 23:15:10', '2025-12-02 23:15:10', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwefb84ee6/products/NATPER-217074_1.jpg', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwa96989b9/products/NATPER-217074_2.jpg', 1),
(4, 'Regalo Kaiak Clásico Masculino con Hidratante', 'Kaiak', 98.00, 140.00, 30, 12, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw6d60ead3/ProdutoJoia/mobile/217064.jpg', 'La frescura vibrante de las hierbas y bergamota. Un clásico que renueva las energías.', 'Disponible', '2025-12-02 23:16:06', '2025-12-02 23:16:06', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwcc794525/products/NATPER-217064_1.jpg', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwfd6e06fd/products/NATPER-217064_2.jpg', 1),
(5, 'Regalo Meu Primeiro Humor', 'Humor', 69.00, 115.00, 40, 8, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwc84f8cf2/ProdutoJoia/mobile/217047.jpg', 'El encuentro de las notas cítricas con un cóctel de frutas, vibrante y alegre.', 'Disponible', '2025-12-02 23:17:01', '2025-12-02 23:17:01', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw30a8b3e3/products/NATPER-217047_1.jpg', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwfe0b0056/products/NATPER-217047_2.jpg', 1),
(6, 'Essencial eau de parfum femenina exclusivo 50 ml', 'Natura', 109.80, 183.00, 40, 10, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw35a21e09/ProdutoJoia/mobile/93622.jpg', 'elegancia y personalidad en cada nota.', 'Disponible', '2025-11-28 14:38:37', '2025-11-28 18:03:04', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw000db547/NATPER-93622_1.jpg', '', 1),
(7, 'Ekos Néctar hidratante corporal maracuyá 400 ml', 'Ekos', 34.50, 69.00, 50, 10, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwb0004df3/ProdutoJoia/mobile/82509.jpg', 'calmante natural para la piel.', 'Disponible', '2025-12-03 00:03:06', '2025-12-03 00:03:06', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwae86d52b/NATPER-82509_2.jpg', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw8ae1fbdc/NATPER-82509_6.jpg', 6),
(8, 'Ekos Frescor eau de toilette maracuyá 150 ml', 'Ekos', 97.00, 97.00, 0, 10, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw3659c4b6/ProdutoJoia/mobile/73574.jpg', 'el encanto Refrescante del Maracuyá', 'Disponible', '2025-12-03 00:04:59', '2025-12-03 00:04:59', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw0d68b9aa/products/NATPER-73574_1.jpg', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw233e4635/products/NATPER-73574_3.jpg', 6),
(9, 'Ekos Pulpa hidratante para manos castaña 40 g', 'Ekos', 29.99, 29.99, 0, 10, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwffd6ff67/ProdutoJoia/mobile/95133.jpg', 'manos y uñas más fuertes', 'Disponible', '2025-12-03 00:06:28', '2025-12-03 00:06:28', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw0b9b3791/products/NATPER-95133_1.jpg', NULL, 6),
(10, 'Ekos Pulpa hidratante corporal castaña 400 ml', 'Ekos', 69.00, 69.00, 0, 10, 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dwe760345e/ProdutoJoia/mobile/80936.jpg', 'revitaliza tu piel con el poder de la castaña', 'Disponible', '2025-12-03 00:08:02', '2025-12-03 00:08:02', 'https://production.na01.natura.com/on/demandware.static/-/Sites-natura-pe-storefront-catalog/default/dw10010d26/products/NATPER-80936_1.jpg', NULL, 6);

-- 4. Clients
INSERT INTO `Clients` (`id`, `firstName`, `lastName`, `email`, `phone`, `createdAt`, `updatedAt`, `password`, `ConsultantId`) VALUES
(1, 'María', 'González', 'maria@example.com', '999111222', '2025-12-02 12:07:21', '2025-12-02 12:07:21', '$2b$10$IreVTdvNVTtD9G9K9PSFrOTIpfG/EAQpxm7qEWTnYDAVmMipTVa5q', NULL),
(2, 'Ana', 'Pérez', 'ana@example.com', '999333444', '2025-12-02 12:07:21', '2025-12-02 12:07:21', '$2b$10$oeJMGVrbVFIMm8peEzcWVOqfU1VTCEbL/U4nASAx2ARbZyR0nNg/u', NULL);

SET FOREIGN_KEY_CHECKS = 1;

-- Fin del script
