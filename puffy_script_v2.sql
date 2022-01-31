-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: puffy_db
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `line1` varchar(250) NOT NULL,
  `line2` varchar(100) DEFAULT NULL,
  `city` varchar(250) NOT NULL,
  `state` varchar(250) NOT NULL,
  `country` varchar(100) NOT NULL,
  `zip` int(5) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_address_user_idx` (`user_id`),
  CONSTRAINT `fk_address_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (35,'Calle Central 201','Col. Centro','CDMX','Ciudad de México','Mexico',77772,5,'2021-09-06 01:41:53','2021-10-18 23:52:16'),(45,'Calle Norte 1','Colonia Juarez','Gustavo A Madero','CDMX','MX',6600,15,'2021-09-02 01:41:53','2021-09-02 01:41:53'),(55,'Calle Sur1','Colonia Hidalgo','Juarez','Chihuahua','MX',58940,25,'2021-09-01 01:41:53','2021-09-01 01:41:53'),(65,'Bahía de Dinamarca 45','','Tenacatita','Chihuahua','Mexico',46645,55,'2021-10-14 20:22:34','2021-10-14 20:22:34'),(75,'Camino a la perdición','','Tenacatita','Jalisco','Mexico',34565,55,'2021-10-19 00:31:22','2021-10-19 00:31:22');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sessionId` varchar(100) DEFAULT NULL,
  `token` varchar(150) DEFAULT NULL,
  `status` char(10) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `address_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cart_user1_idx` (`user_id`),
  KEY `fk_cart_address1_idx` (`address_id`),
  CONSTRAINT `fk_cart_address1` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `fk_cart_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (5,NULL,NULL,'1',55,65,'2021-10-14 20:22:43','2021-10-14 20:23:03'),(15,NULL,NULL,'1',55,65,'2021-10-14 20:38:52','2021-10-14 20:39:03'),(25,NULL,NULL,'1',55,65,'2021-10-14 22:28:37','2021-10-14 22:28:39'),(35,NULL,NULL,'1',55,65,'2021-10-14 22:28:45','2021-10-14 22:29:34'),(45,NULL,NULL,'1',55,65,'2021-10-14 22:29:42','2021-10-14 22:29:45'),(55,NULL,NULL,'1',55,65,'2021-10-14 22:29:53','2021-10-14 22:30:08'),(65,NULL,NULL,'1',55,65,'2021-10-18 23:58:58','2021-10-18 23:58:58'),(75,NULL,NULL,'1',55,65,'2021-10-19 00:19:07','2021-10-19 00:19:25'),(85,NULL,NULL,'1',55,65,'2021-10-19 00:31:33','2021-10-19 00:31:49'),(95,NULL,NULL,'1',55,65,'2021-10-19 02:59:53','2021-10-19 03:00:38'),(105,NULL,NULL,'1',55,65,'2021-10-19 03:12:25','2021-10-19 03:12:36'),(115,NULL,NULL,'1',55,65,'2021-10-25 01:45:57','2021-10-25 01:46:00');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Light',NULL,NULL),(2,'Vegano',NULL,NULL),(3,'Normal',NULL,NULL),(5,'Keto',NULL,NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invited`
--

DROP TABLE IF EXISTS `invited`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invited` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invited`
--

LOCK TABLES `invited` WRITE;
/*!40000 ALTER TABLE `invited` DISABLE KEYS */;
INSERT INTO `invited` VALUES (1,'Gabriel','234234242','demo4@puffy.com','2021-12-22 17:20:45','2021-12-22 17:20:45');
/*!40000 ALTER TABLE `invited` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invited_cart`
--

DROP TABLE IF EXISTS `invited_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invited_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL,
  `invited_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `invited_id` (`invited_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `invited_cart_ibfk_1` FOREIGN KEY (`invited_id`) REFERENCES `invited` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `invited_cart_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `invitedaddress` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invited_cart`
--

LOCK TABLES `invited_cart` WRITE;
/*!40000 ALTER TABLE `invited_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `invited_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitedAddress`
--

DROP TABLE IF EXISTS `invitedAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invitedAddress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `line1` varchar(250) NOT NULL,
  `line2` varchar(100) DEFAULT NULL,
  `city` varchar(250) NOT NULL,
  `state` varchar(250) NOT NULL,
  `country` varchar(100) NOT NULL,
  `zip` int(11) NOT NULL,
  `invited_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `invited_id` (`invited_id`),
  CONSTRAINT `invitedaddress_ibfk_1` FOREIGN KEY (`invited_id`) REFERENCES `invited` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitedAddress`
--

LOCK TABLES `invitedAddress` WRITE;
/*!40000 ALTER TABLE `invitedAddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `invitedAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sessionId` varchar(100) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `status` char(10) DEFAULT NULL,
  `subtotal` float NOT NULL,
  `discount` float DEFAULT NULL,
  `tax` float NOT NULL,
  `shipping` float NOT NULL,
  `total` float NOT NULL,
  `promo` varchar(45) DEFAULT NULL,
  `promo_discount` float DEFAULT NULL,
  `grandTotal` float NOT NULL,
  `user_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_order_user1_idx` (`user_id`),
  KEY `fk_order_address1_idx` (`address_id`),
  CONSTRAINT `fk_order_address1` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `fk_order_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (65,'1','fgsdgsdgd','0',10.2,0.1,0.16,10,100,'asdfas',0.1,90,5,35,NULL,NULL),(75,'2','asdfas','1',99.2,0.2,0.16,100,200,'fsdfs',0,200,15,45,NULL,NULL),(85,'3','asfasf','0',500,0.05,0.15,150,350,'adfs',0.2,300,5,35,NULL,NULL);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `price` double NOT NULL,
  `quantity` int(11) NOT NULL,
  `discount` float DEFAULT NULL,
  `size` tinyint(5) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Pastel de Zanahoria y piña','Contiene nueces, zanahoria y leche deslactosada',250,0,0,2,'2021-09-04 16:54:20','2021-10-19 00:31:49'),(5,'Pastel de tres leches','Leche de almendras',123,9,NULL,0,'2021-09-04 16:54:20','2021-10-19 00:19:26'),(7,'Chocoflan','Rico chocoflan',123,1,NULL,0,'2021-09-05 13:28:44','2021-09-05 14:01:31'),(8,'Pastel de Chocolate','Tres tipos de chocolate',120,0,NULL,1,'2021-09-05 19:20:15','2021-10-19 00:34:38'),(15,'Pancakes Keto','Pancakes deliciosos libres de azucar',999,1,NULL,0,'2021-09-26 16:57:32','2021-09-26 16:57:32'),(25,'Helado Frito','Helado de fresa.',100,9,NULL,2,'2021-10-14 02:31:33','2021-10-25 01:46:00');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_cart`
--

DROP TABLE IF EXISTS `product_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_has_cart_cart1_idx` (`cart_id`),
  KEY `fk_product_has_cart_product1_idx` (`product_id`),
  CONSTRAINT `fk_product_has_cart_cart1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `fk_product_has_cart_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=286 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_cart`
--

LOCK TABLES `product_cart` WRITE;
/*!40000 ALTER TABLE `product_cart` DISABLE KEYS */;
INSERT INTO `product_cart` VALUES (5,1,5),(15,5,5),(25,8,15),(35,5,25),(55,5,35),(65,1,35),(75,7,45),(85,25,55),(95,15,55),(105,7,65),(115,7,65),(125,5,65),(135,5,65),(145,7,65),(155,5,65),(165,5,65),(175,1,65),(185,5,65),(195,7,65),(205,1,75),(215,5,75),(225,1,85),(235,8,85),(245,7,95),(255,5,95),(265,5,105),(275,25,105),(285,25,115);
/*!40000 ALTER TABLE `product_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_has_category_category1_idx` (`category_id`),
  KEY `fk_product_has_category_product1_idx` (`product_id`),
  CONSTRAINT `fk_product_has_category_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_product_has_category_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,5,2),(2,1,1),(3,7,1),(4,8,3),(5,15,5),(15,25,3);
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(250) DEFAULT NULL,
  `main` tinyint(1) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_images_product1_idx` (`product_id`),
  CONSTRAINT `fk_product_images_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,'https://storage.googleapis.com/avatars-puffy/1_pastel-de-tres-leches.jpg',1,5),(3,'https://storage.googleapis.com/avatars-puffy/3_chocoflan.jpg',1,7),(4,'https://storage.googleapis.com/avatars-puffy/2_pastel-de-chocolate.jpg',1,8),(5,'https://storage.googleapis.com/avatars-puffy/5_pastel-de-zanahoria.jpg',1,1),(15,'https://storage.googleapis.com/avatars-puffy/4_pancakes-keto.jpg',1,15),(25,'https://storage.googleapis.com/avatars-puffy/1634178692602_img.jpg',1,25);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (5,'Fulanito','De Tal','123456789','demo@puffy.com','EHeHy0luhvLFqGvAWgvVku13ZrIZO/dDMkdGPDy3.UMls0mAwim6e',1,'https://storage.googleapis.com/avatars-puffy/1630892454221_img.png','2021-10-25 01:43:13','2021-09-06 01:40:59','2021-09-06 01:40:59'),(15,'Gabo','espinosa','23425232','gabo@email.com','6Rj/QyOBHrKfaEVTPVgRseC0J8PwkscAUV3jM.jBx7IKn11IpP01q',1,'/images/avatars/default.jpg','2021-08-31 02:36:37','2021-08-30 16:36:11','2021-08-30 17:16:28'),(25,'Montse','Olmedo','35643552','montse@email.com','bn1btTQWWgBrX/IK5vjxzudBwkSvUeU33jrt09ES6lV5BatBxebee',0,'/images/avatars/default.jpg','2021-08-30 02:36:37','2021-08-20 16:36:11','2021-08-20 17:16:28'),(35,'Fulanito','Otro','1234135123','fulano@correo.com','E51wdKbD9D/Iv034GGF6me/YI9jcqB40Scdwg2MSl2lcpFdRJGSbG',1,'https://storage.googleapis.com/avatars-puffy/1630977926214_img.jpg','2021-09-07 01:25:33','2021-09-07 01:25:27','2021-09-07 01:25:27'),(45,'Test','Test','5570663106','sdsdfsdfsdf@gmail.com','5wKtgRqzrHJPtpupTWbOk.jKE3RgI4.FKriERax6.uPlhWuBJJc8e',0,'/images/avatars/default.jpg','2021-09-26 16:56:49','2021-09-26 16:56:29','2021-09-26 16:56:29'),(55,'Prueba','Comprador','123456789','comprador@puffy.com','EHeHy0luhvLFqGvAWgvVku13ZrIZO/dDMkdGPDy3.UMls0mAwim6e',0,'/images/avatars/default.jpg','2021-10-25 01:45:48','2021-09-06 01:40:59',NULL),(65,'Elizabeth','Garcia','3318038788','elizabeth@puffy.com','1Q/WhSIooqH.E6r6uIBwiuPdWT8W/LJxUEqPHkBvIplCMmghD.vYi',1,'https://storage.googleapis.com/avatars-puffy/1634603299312_img.jpg','2021-10-19 00:28:35','2021-10-19 00:28:20','2021-10-19 00:28:20');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-30 19:29:20
