-- MySQL Script generated by MySQL Workbench
-- Wed Aug 18 20:04:44 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema puffy_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `puffy_db` ;

-- -----------------------------------------------------
-- Schema puffy_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `puffy_db` DEFAULT CHARACTER SET utf8 ;
USE `puffy_db` ;

-- -----------------------------------------------------
-- Table `puffy_db`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `puffy_db`.`user` ;

CREATE TABLE IF NOT EXISTS `puffy_db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `mobile` VARCHAR(15) NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `admin` TINYINT(1) NOT NULL,
  `avatar` VARCHAR(100) NULL,
  `last_login` DATETIME NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `email` USING BTREE (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puffy_db`.`address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `puffy_db`.`address` ;

CREATE TABLE IF NOT EXISTS `puffy_db`.`address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `line1` VARCHAR(250) NOT NULL,
  `line2` VARCHAR(100) NULL,
  `city` VARCHAR(250) NOT NULL,
  `state` VARCHAR(250) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `zip` INT(5) NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_address_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_address_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `puffy_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puffy_db`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `puffy_db`.`product` ;

CREATE TABLE IF NOT EXISTS `puffy_db`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DOUBLE NOT NULL,
  `quantity` INT NOT NULL,
  `discount` FLOAT NULL,
  `size` TINYINT(5) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puffy_db`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `puffy_db`.`category` ;

CREATE TABLE IF NOT EXISTS `puffy_db`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puffy_db`.`product_images`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `puffy_db`.`product_images` ;

CREATE TABLE IF NOT EXISTS `puffy_db`.`product_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(250) NULL,
  `main` TINYINT(1) NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_images_product1_idx` (`product_id` ASC),
  CONSTRAINT `fk_product_images_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `puffy_db`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puffy_db`.`product_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `puffy_db`.`product_category` ;

CREATE TABLE IF NOT EXISTS `puffy_db`.`product_category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_has_category_category1_idx` (`category_id` ASC),
  INDEX `fk_product_has_category_product1_idx` (`product_id` ASC),
  CONSTRAINT `fk_product_has_category_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `puffy_db`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_category_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `puffy_db`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puffy_db`.`cart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `puffy_db`.`cart` ;

CREATE TABLE IF NOT EXISTS `puffy_db`.`cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sessionId` VARCHAR(100) NULL,
  `token` VARCHAR(150) NULL,
  `status` CHAR(10) NULL,
  `user_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cart_user1_idx` (`user_id` ASC),
  INDEX `fk_cart_address1_idx` (`address_id` ASC),
  CONSTRAINT `fk_cart_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `puffy_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `puffy_db`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puffy_db`.`product_cart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `puffy_db`.`product_cart` ;

CREATE TABLE IF NOT EXISTS `puffy_db`.`product_cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `cart_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `cart_id`),
  INDEX `fk_product_has_cart_cart1_idx` (`cart_id` ASC),
  INDEX `fk_product_has_cart_product1_idx` (`product_id` ASC),
  CONSTRAINT `fk_product_has_cart_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `puffy_db`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_cart_cart1`
    FOREIGN KEY (`cart_id`)
    REFERENCES `puffy_db`.`cart` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `puffy_db`.`order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `puffy_db`.`order` ;

CREATE TABLE IF NOT EXISTS `puffy_db`.`order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sessionId` VARCHAR(100) NULL,
  `token` VARCHAR(100) NULL,
  `status` CHAR(10) NULL,
  `subtotal` FLOAT NOT NULL,
  `discount` FLOAT NULL,
  `tax` FLOAT NOT NULL,
  `shipping` FLOAT NOT NULL,
  `total` FLOAT NOT NULL,
  `promo` VARCHAR(45) NULL,
  `promo_discount` FLOAT NULL,
  `grandTotal` FLOAT NOT NULL,
  `user_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_user1_idx` (`user_id` ASC),
  INDEX `fk_order_address1_idx` (`address_id` ASC),
  CONSTRAINT `fk_order_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `puffy_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `puffy_db`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- DATOS DE PRUEBA

INSERT INTO `puffy_db`.`user` (`first_name`, `last_name`, `mobile`, `email`, `password`, `admin`, `created_at`, `updated_at`, `last_login`, `avatar`) VALUES 
('Fulanito','De Tal','123456789','demo@puffy.com','EHeHy0luhvLFqGvAWgvVku13ZrIZO/dDMkdGPDy3.UMls0mAwim6e',0,'2021-09-06 01:40:59','2021-09-06 01:40:59','2021-09-06 01:41:17','https://storage.googleapis.com/avatars-puffy/1630892454221_img.png'),
('Gabo', 'espinosa', '23425232', 'gabo@email.com', '6Rj/QyOBHrKfaEVTPVgRseC0J8PwkscAUV3jM.jBx7IKn11IpP01q', 1, '2021-08-30 16:36:11','2021-08-30 17:16:28','2021-08-31 02:36:37', '/images/avatars/default.jpg'),
('Montse', 'Olmedo', '35643552', 'montse@email.com', 'bn1btTQWWgBrX/IK5vjxzudBwkSvUeU33jrt09ES6lV5BatBxebee', 0, '2021-08-20 16:36:11','2021-08-20 17:16:28','2021-08-30 02:36:37', '/images/avatars/default.jpg');

INSERT INTO `puffy_db`.`address` (`line1`, `line2`, `city`, `state`, `country`, `zip`, `user_id`, `created_at`, `updated_at`) VALUES 
('Calle Central 200','Col. Centro','CDMX','Ciudad de México','Mexico',7777,1,'2021-09-06 01:41:53','2021-09-06 01:41:53'),
('Calle Norte 1', 'Colonia Juarez', 'Gustavo A Madero', 'CDMX', 'MX', 06600, 2,'2021-09-02 01:41:53','2021-09-02 01:41:53'), 
('Calle Sur1', 'Colonia Hidalgo', 'Juarez', 'Chihuahua', 'MX', 58940, 3,'2021-09-01 01:41:53','2021-09-01 01:41:53');

INSERT INTO `puffy_db`.`order` (`sessionId`, `token`, `status`, `subtotal`, `discount`, `tax`, `shipping`, `total`, `promo`, `promo_discount`, `grandTotal`, `user_id`, `address_id`) VALUES 
(1, 'fgsdgsdgd', 0, 10.2, 0.1, 0.16, 10.0, 100.0, 'asdfas', 0.1, 90.0, 1, 1), 
(2, 'asdfas', 1, 99.2, 0.2, 0.16, 100.0, 200.0, 'fsdfs', 0.0, 200.0, 2, 2), 
(3, 'asfasf', 0, 500.0, 0.05, 0.15, 150.0, 350.0, 'adfs', 0.2, 300.0, 1, 1);

INSERT INTO `category` (`id`,`name`,`created_at`,`updated_at`) VALUES 
(0,'Keto','2021-09-01 01:41:53','2021-09-01 01:41:53'),
(1,'Light','2021-09-01 01:41:53','2021-09-01 01:41:53'),
(2,'Vegano','2021-09-01 01:41:53','2021-09-01 01:41:53'),
(3,'Normal','2021-09-01 01:41:53','2021-09-01 01:41:53');

INSERT INTO `product` (`id`,`name`,`description`,`price`,`quantity`,`discount`,`created_at`,`updated_at`,`size`) VALUES 
(1,'Pastel de Zanahoria y piña','Contiene nueces, zanahoria y leche deslactosada',250,2,0,NULL,'2021-09-05 23:40:03',2),
(5,'pastel de tres leches','Leche de almendras',123,1,NULL,'2021-09-04 16:54:20','2021-09-05 18:18:59',0),
(7,'Flan','Rico chocoflan',123,1,NULL,'2021-09-05 13:28:44','2021-09-05 14:01:31',0),
(8,'Pan de Chocolate','Tres tipos de chocolate',150,1,NULL,'2021-09-05 19:20:15','2021-09-05 19:20:15',1);

INSERT INTO `product_category` (`product_id`,`category_id`,`id`) VALUES 
(5,3,1), (1,0,2), (7,0,3), (8,3,4);
INSERT INTO `product_images` (`id`,`url`,`main`,`product_id`) VALUES 
(1,'/images/avatars/default.jpg',1,5),
(3,'https://storage.googleapis.com/avatars-puffy/1630848522565_img.jpg',1,7),
(4,'https://storage.googleapis.com/avatars-puffy/1630869614125_img.jpg',1,8),
(5,'https://storage.googleapis.com/avatars-puffy/1630885182201_img.jpg',1,1);