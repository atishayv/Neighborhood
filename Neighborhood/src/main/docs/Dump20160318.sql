-- MySQL dump 10.13  Distrib 5.5.9, for Win32 (x86)
--
-- Host: localhost    Database: localitydb
-- ------------------------------------------------------
-- Server version	5.5.15

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
-- Current Database: `localitydb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `localitydb` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `localitydb`;

--
-- Table structure for table `comments_data`
--

DROP TABLE IF EXISTS `comments_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments_data` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `post_time` varchar(255) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  `comment_text` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `feed_id` (`feed_id`),
  CONSTRAINT `comments_data_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`),
  CONSTRAINT `comments_data_ibfk_2` FOREIGN KEY (`feed_id`) REFERENCES `feeds_data` (`feed_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments_data`
--

LOCK TABLES `comments_data` WRITE;
/*!40000 ALTER TABLE `comments_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeds_data`
--

DROP TABLE IF EXISTS `feeds_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feeds_data` (
  `feed_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `feed_title` varchar(255) DEFAULT NULL,
  `feed_desc` varchar(255) DEFAULT NULL,
  `feed_image` varchar(255) DEFAULT NULL,
  `feed_image_comment` varchar(255) DEFAULT NULL,
  `feed_link` varchar(255) DEFAULT NULL,
  `post_time` varchar(255) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `locality_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`feed_id`),
  KEY `locality_id` (`locality_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `feeds_data_ibfk_1` FOREIGN KEY (`locality_id`) REFERENCES `locality_data` (`locality_id`),
  CONSTRAINT `feeds_data_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeds_data`
--

LOCK TABLES `feeds_data` WRITE;
/*!40000 ALTER TABLE `feeds_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `feeds_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locality_data`
--

DROP TABLE IF EXISTS `locality_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locality_data` (
  `locality_id` int(11) NOT NULL AUTO_INCREMENT,
  `profile_pic` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `area` text,
  `address` varchar(500) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `cover_pic` varchar(255) DEFAULT NULL,
  `overview` varchar(1000) DEFAULT NULL,
  `specifications` varchar(1000) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`locality_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locality_data`
--

LOCK TABLES `locality_data` WRITE;
/*!40000 ALTER TABLE `locality_data` DISABLE KEYS */;
INSERT INTO `locality_data` VALUES (1,'../locality_app/images/apartment_profile.jpeg','Suncity Gloria',NULL,NULL,'Corporate Leisure and Property Developments Pvt Ltd has launched yet another project in Bangalore. Suncity Gloria is located in Sarjapur Road.Suncity Gloria is the latest and the most delectable offering from M/s. Corporate Leisure & Property development (P) ltd after their phenomenal success of highly acclaimed mega-condominium project “Suncity”.Perfectly located on Sarjapur road, 5 minutes drive from the Wipro corporate office, Suncity Gloria is spread over 10 acres of land. With 75% of the available space dedicated to beautifully landscaped gardens and amenities, all apartments face lush green spaces. This gated community is conceived to provide the discerning young families with high quality housing loaded with amenities at true value prices.','../images/gloria-project.jpg','Project Type - Apartment$Project Status - Ready to Move$Blocks - 2$Wings - 5$Units - More than 1000$Area Range - 804 - 1557 Sq. Ft.$Location : Opp. to upcoming SEZ,3KM from Wipro Corporate Office,Opp. to Decathlon Sports$Land Size - 10 Acres','Structure : RCC framed structure$Walls : External are 8, Internal are 6” R.C.C constructed.$Lobbies & corridors : All lobbies and corridors elegantly finished in Granite / Vitrified tiles.$Doors : Main door- Teak Wood door frame with threshold and flush door shutter finished$Internal doors: Sal Wood door frame with flush shutters with enamel paint.$Windows : Anodized glazed aluminium sliding windows with mosquito mesh and MS grills.','12.9045666','77.7059702');
/*!40000 ALTER TABLE `locality_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_data`
--

DROP TABLE IF EXISTS `user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_data` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `password` char(128) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `mail_id` varchar(255) NOT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `college` varchar(255) DEFAULT NULL,
  `workplace` varchar(255) DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `contact_number` varchar(14) DEFAULT NULL,
  `relationship_status` varchar(255) DEFAULT NULL,
  `user_status` varchar(255) DEFAULT NULL,
  `locality_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `mail_id` (`mail_id`),
  KEY `locality_id` (`locality_id`),
  CONSTRAINT `user_data_ibfk_1` FOREIGN KEY (`locality_id`) REFERENCES `locality_data` (`locality_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_data`
--

LOCK TABLES `user_data` WRITE;
/*!40000 ALTER TABLE `user_data` DISABLE KEYS */;
INSERT INTO `user_data` VALUES (1,'','Atishay','Verma','atishayv@gmail.com','http://graph.facebook.com/875937409150588/picture?type=large','1992-10-23 00:00:00','lions school 2007','Inderprastha Engineering College','Openstream Technologies Pvt. Ltd.','m',NULL,NULL,NULL,NULL,'Single',NULL,NULL),(2,'Divyanshu1!','Atishay','Verma','atishay@gmail.com','','1993-10-11 00:00:00','Lions School','Lions School','Openstream Technologies','M',NULL,'12.9244668','77.64526939999996','7829464101','Single',NULL,NULL);
/*!40000 ALTER TABLE `user_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-18 11:48:54
