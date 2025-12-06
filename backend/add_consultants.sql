-- Script to add consultants to an existing database
-- Run this if you already have the database created and want to add the new columns and data.

USE aba_platform;

-- Add new columns if they don't exist (MySQL doesn't support IF NOT EXISTS for columns easily in one line, 
-- so this might error if they exist, which is fine, or use a stored procedure. 
-- For simplicity, we assume they might need to be added or we just run the ALTER and ignore error if exists).
-- Better approach for a script:

SET @dbname = DATABASE();
SET @tablename = "Users";
SET @columnname = "status";
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 1",
  "ALTER TABLE Users ADD COLUMN status ENUM('Activa', 'Inactiva', 'Pendiente') DEFAULT 'Activa';"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

SET @columnname = "monthlySales";
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 1",
  "ALTER TABLE Users ADD COLUMN monthlySales DECIMAL(10, 2) DEFAULT 0.00;"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;


-- Insert Consultants
INSERT INTO Users (firstName, lastName, dni, email, password, role, consultantLevel, status, monthlySales, points) VALUES
('María', 'González', '40123456', 'maria.gonzalez@email.com', '$2a$10$X7.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1', 'consultant', 'Oro', 'Activa', 4500.00, 0),
('Ana', 'Pérez', '40654321', 'ana.perez@email.com', '$2a$10$X7.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1', 'consultant', 'Plata', 'Activa', 2100.00, 0),
('Lucía', 'Rodríguez', '40987654', 'lucia.rodriguez@email.com', '$2a$10$X7.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1', 'consultant', 'Bronce', 'Inactiva', 850.00, 0),
('Carmen', 'Sánchez', '40567890', 'carmen.sanchez@email.com', '$2a$10$X7.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1', 'consultant', 'Diamante', 'Activa', 12300.00, 0),
('Patricia', 'Lima', '40432109', 'patricia.lima@email.com', '$2a$10$X7.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1', 'consultant', 'Plata', 'Pendiente', 1800.00, 0);

SELECT * FROM Users WHERE role = 'consultant';
