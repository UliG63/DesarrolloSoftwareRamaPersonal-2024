CREATE DATABASE  IF NOT EXISTS `pruebatpdsw` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pruebatpdsw`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: pruebatpdsw
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `etiqueta`
--

DROP TABLE IF EXISTS `etiqueta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etiqueta` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `etiqueta_nombre_unique` (`nombre`),
  UNIQUE KEY `etiqueta_descripcion_unique` (`descripcion`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etiqueta`
--

LOCK TABLES `etiqueta` WRITE;
/*!40000 ALTER TABLE `etiqueta` DISABLE KEYS */;
INSERT INTO `etiqueta` VALUES (4,'Basico','Estos hechizos son los más fáciles de aprender y ejecutar. Se enseñan en los primeros años en Hogwarts y no requieren mucho poder mágico ni concentración.'),(5,'Intermedio','Estos hechizos requieren más práctica y habilidad que los básicos. Se enseñan en los cursos intermedios en Hogwarts y pueden tener efectos más complejos.'),(6,'Avanzado','Los hechizos avanzados son difíciles de dominar y suelen ser enseñados en los últimos años de Hogwarts. Requieren una comprensión profunda de la magia y una gran concentración.'),(7,'Experto','Estos hechizos son extremadamente difíciles y solo los magos y brujas más talentosos pueden ejecutarlos correctamente. Su enseñanza es rara y suelen necesitarse años de práctica.'),(8,'Prohibido','Los hechizos prohibidos son extremadamente peligrosos y están regulados por el Ministerio de Magia. Su uso es ilegal y se enseñan solo en circunstancias especiales o bajo supervisión estricta.'),(9,'Legendario','Estos hechizos son extremadamente raros y se encuentran en el límite de la magia conocida. Requieren una destreza mágica increíble y a menudo están envueltos en mitos y leyendas. Pocos magos en la historia han sido capaces de realizarlos'),(10,'Ofensivo','Diseñados para atacar o dañar.'),(11,'Defensivo','Utilizados para protegerse o defenderse.'),(12,'Utilitario','Hechizos prácticos para el día a día o tareas específicas.'),(13,'Temporal','El hechizo tiene un efecto limitado en el tiempo.'),(14,'Permanente','El hechizo tiene un efecto duradero o permanente.'),(15,'Transformador','Cambia la forma o la naturaleza de algo.'),(16,'Verbal','Requieren que el lanzador pronuncie las palabras mágicas en voz alta para que el hechizo se active.'),(17,'No Verbal','No requieren que el lanzador pronuncie las palabras mágicas en voz alta.');
/*!40000 ALTER TABLE `etiqueta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hechizo`
--

DROP TABLE IF EXISTS `hechizo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hechizo` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `instrucciones` varchar(255) NOT NULL,
  `restringido` tinyint(1) NOT NULL,
  `patente_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hechizo_nombre_unique` (`nombre`),
  UNIQUE KEY `hechizo_descripcion_unique` (`descripcion`),
  KEY `hechizo_patente_id_index` (`patente_id`),
  CONSTRAINT `hechizo_patente_id_foreign` FOREIGN KEY (`patente_id`) REFERENCES `patente` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hechizo`
--

LOCK TABLES `hechizo` WRITE;
/*!40000 ALTER TABLE `hechizo` DISABLE KEYS */;
INSERT INTO `hechizo` VALUES (45,'Sectumsempra','Luz Blanca. Hace profundos cortes en el objetivo.','Realizar movimientos cortantes y bruscos con la varita.',1,21),(46,'Imperio','Sin Luz o Luz Amarilla Verdosa. Control total sobre la persona.','Apuntar la varita al objetivo, trazar un 4 de abajo hacia arriba. Se debe comunicar lo que tiene que realizar.',1,22),(47,'Crucio','Luz Roja vibrante. Tortura y dolor extremo sobre la victima.','Enunciar el conjuro proyectando sobre la victima todo el dolor interno, con profundo odio.',1,23),(48,'Avada Kedavra','Luz verde. Muerte instantanea','Enunciar el conjuro con la absoluta intencion de causar la muerte de la victima.',1,24),(49,'Finite incantatem','Luz Roja. Cesa todos los efectos de los hechizos.','El movimiento de la varita es rápido y preciso, dibujando una forma de escudo.',0,16),(50,'Expecto Patronum','Luz Plateada. Conjura un espíritu guardián magico.','Realiza un movimiento circular en sentido horario (derecha) con la varita, comenzando desde la parte inferior del círculo. Requiere utilizar la felicidad para poder conjurarlo.',0,17),(51,'Wingardium Leviosa','Sin Luz. Hace que los objetos leviten.','Realiza una curva suave y ascendente hacia la derecha. Luego, lleva la varita hacia abajo en una curva y termina el movimiento con un pequeño giro hacia arriba.',0,18),(52,'Expelliarmus','Luz Roja. Es el hechizo básico para desarmar al oponente.','Decir el encantamiento dirigiendo la varita hacia tu enemigo. Mantener la varita perfectamente firme',0,19),(53,'Obliviate','Luz Verde. Borra recuerdos de la memoria del objetivo.','Movimiento curvo, circular, que se asemeja a la forma de un cerebro.',0,20),(54,'Fiendfyre','Produce fuego demoníaco, el cual es capaz de buscar a sus objetivos a pesar de ser no sensible. Se trata de un fuego de inmenso poder que no puede ser extinguido normalmente o por un hechizo de agua, como Aguamenti, Aqua Volatem o Aqua Eructo\n','Pronunciar el conjuro realizando movimientos envolventes con la varita. Se debe tener la mente en blanco para controlar las llamas.',1,27);
/*!40000 ALTER TABLE `hechizo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institucion`
--

DROP TABLE IF EXISTS `institucion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institucion` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `pais` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institucion_nombre_unique` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institucion`
--

LOCK TABLES `institucion` WRITE;
/*!40000 ALTER TABLE `institucion` DISABLE KEYS */;
INSERT INTO `institucion` VALUES (1,'Hogwarts','Unknown','Scotland'),(3,'Beauxbatons','Cannes','Francia'),(4,'Mahoutokoro','Tokio','Japon'),(5,'Uagadou','Gulu','Uganda'),(6,'Castelobruxo ','Fortaleza','Brasil'),(7,'Durmstrang','Unknown','Hungria'),(8,'Ilvermorny','Atlanta','Estados Unidos de America');
/*!40000 ALTER TABLE `institucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `magos`
--

DROP TABLE IF EXISTS `magos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `magos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `profesion` varchar(255) DEFAULT NULL,
  `madera_varita` varchar(255) NOT NULL,
  `nucleo_varita` varchar(255) NOT NULL,
  `largo_varita` int NOT NULL,
  `is_empleado` tinyint(1) NOT NULL,
  `institucion_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `magos_email_unique` (`email`),
  KEY `magos_institucion_id_index` (`institucion_id`),
  CONSTRAINT `magos_institucion_id_foreign` FOREIGN KEY (`institucion_id`) REFERENCES `institucion` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `magos`
--

LOCK TABLES `magos` WRITE;
/*!40000 ALTER TABLE `magos` DISABLE KEYS */;
INSERT INTO `magos` VALUES (1,'Ejemlo','Ejemplo','ejemplo@ejemplo.com','$2b$10$exS88dH.cUnDS.C6fc7WAe91OEiHBZjViYMkvGtXi0ILGILUGFqdu','Ejemplo','Ejemplo','Ejemplo',23,1,1),(6,'Harry ','Potter','harry@potter.com','$2b$10$JGxDJAeVAti5FdGKiAqJMuPa8Et3CHrKhexxlJWQahUrYMRWz.0O2','Estudiante','Acebo','Pluma de Fenix',28,0,1),(7,'Remus','Lupin','remus@lupin.com','$2b$10$fJHHOZadsmpTPlDdE0OppuZtlFtgQaNvokX5yY2omFkR2fN1MMMvW','Profesor','Cipres','Pelo de Unicornio',26,0,1),(8,'Fleur','Delacour','fleur@delacour.com','$2b$10$3Poq8rKORJ9Kq0kz01sc9eF7GFuNo5K3.L4kq9Mh9Lzk6DmSiY0MO','Ama de Casa','Palisandro','Pelo de Veela',25,0,3),(9,'Victor','Krum','victor@krum.com','$2b$10$DCwzqguxGCId.7BscQuh1.4Txj6Z41Gnju6ckglRsHyP7yxMKQaDS','Buscador','Carpe','Fibra de Corazon de Dragon',27,0,7),(10,'Nynphadora','Tonks','nyn@tonks.com','$2b$10$xcmAjRNruT4hHpmQkeKAgO.7Z/hRmmxKDUwNuu69Wzm3GciRFNy4W','Auror','Nogal','Fibra de Corazon de Dragon',24,0,1),(11,'Amelia','Bones','amelia@bones.com','$2b$10$NC9gqsykYUeUpoEvl.PbyeL/3DxHTgCwF97bSVLnynDvRKkxfmr06','Jefa del Departamento de Aplicación de la Ley Mágica','Nogal','Fibra de Corazon de Dragon',24,1,1),(12,'Arthur','Weasley','arthur@weasley.com','$2b$10$Ow/guxBF1rHfZn7FZ6RbI.aZg8/sqlMY40XQonM4FOGYUBv8Wvxmu','Jefe del Departamento del Uso Indebido de la Magia','Nogal','Fibra de Corazon de Dragon',24,1,1),(13,'Severus','Snape','severus@snape.com','$2b$10$8nnxPlyCOvZVwqKuNG3nx.npgEKSpBQ6MmDC5Q9wVUupuhaMI9pOm','Profesor de Pociones','Olmo','Pluma de Fenix',27,0,1),(14,'Ekrizdis','Azkaban','e@azkaban.com','$2b$10$PGjG8aJgooFZV90Kwhx/ueyAAcpG5rvVVs5PRj5HGFda1oUCyt4gq','Carcelero','Roble','Pelo de Cola de Thestral',30,0,6);
/*!40000 ALTER TABLE `magos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patente`
--

DROP TABLE IF EXISTS `patente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patente` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fecha_creacion` datetime NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `empleado_id` int unsigned DEFAULT NULL,
  `mago_id` int unsigned NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `instrucciones` varchar(255) NOT NULL,
  `restringido` tinyint(1) DEFAULT NULL,
  `motivo_rechazo` varchar(255) DEFAULT NULL,
  `tipo_hechizo_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patente_empleado_id_index` (`empleado_id`),
  KEY `patente_mago_id_index` (`mago_id`),
  KEY `patente_tipo_hechizo_id_index` (`tipo_hechizo_id`),
  CONSTRAINT `patente_empleado_id_foreign` FOREIGN KEY (`empleado_id`) REFERENCES `magos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `patente_mago_id_foreign` FOREIGN KEY (`mago_id`) REFERENCES `magos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `patente_tipo_hechizo_id_foreign` FOREIGN KEY (`tipo_hechizo_id`) REFERENCES `tipo_hechizo` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patente`
--

LOCK TABLES `patente` WRITE;
/*!40000 ALTER TABLE `patente` DISABLE KEYS */;
INSERT INTO `patente` VALUES (16,'2024-11-17 20:10:07','Luz Roja. Cesa todos los efectos de los hechizos.','publicada',12,7,'Finite incantatem','El movimiento de la varita es rápido y preciso, dibujando una forma de escudo.',0,NULL,15),(17,'2024-11-17 20:10:36','Luz Plateada. Conjura un espíritu guardián magico.','publicada',12,7,'Expecto Patronum','Realiza un movimiento circular en sentido horario (derecha) con la varita, comenzando desde la parte inferior del círculo. Requiere utilizar la felicidad para poder conjurarlo.',0,NULL,11),(18,'2024-11-17 20:11:42','Sin Luz. Hace que los objetos leviten.','publicada',12,6,'Wingardium Leviosa','Realiza una curva suave y ascendente hacia la derecha. Luego, lleva la varita hacia abajo en una curva y termina el movimiento con un pequeño giro hacia arriba.',0,NULL,11),(19,'2024-11-17 20:14:06','Luz Roja. Es el hechizo básico para desarmar al oponente.','publicada',12,6,'Expelliarmus','Decir el encantamiento dirigiendo la varita hacia tu enemigo. Mantener la varita perfectamente firme',0,NULL,11),(20,'2024-11-17 20:15:27','Luz Verde. Borra recuerdos de la memoria del objetivo.','publicada',12,9,'Obliviate','Movimiento curvo, circular, que se asemeja a la forma de un cerebro.',0,NULL,13),(21,'2024-11-17 20:17:20','Luz Blanca. Hace profundos cortes en el objetivo.','publicada',11,13,'Sectumsempra','Realizar movimientos cortantes y bruscos con la varita.',1,NULL,14),(22,'2024-11-17 20:19:23','Sin Luz o Luz Amarilla Verdosa. Control total sobre la persona.','publicada',11,14,'Imperio','Apuntar la varita al objetivo, trazar un 4 de abajo hacia arriba. Se debe comunicar lo que tiene que realizar.',1,NULL,14),(23,'2024-11-17 20:20:40','Luz Roja vibrante. Tortura y dolor extremo sobre la victima.','publicada',11,14,'Crucio','Enunciar el conjuro proyectando sobre la victima todo el dolor interno, con profundo odio.',1,NULL,14),(24,'2024-11-17 20:21:17','Luz verde. Muerte instantanea','publicada',11,14,'Avada Kedavra','Enunciar el conjuro con la absoluta intencion de causar la muerte de la victima.',1,NULL,14),(25,'2024-11-17 20:28:12','dwefsthukp\'l[','rechazada',12,6,'adsefrgthyujiop[','wertreytiupo;p\'[\np]',NULL,'Se quedo dormido en el teclado...',NULL),(26,'2024-11-18 15:22:35','Luz Roja. Desarma al enemigo','rechazada',11,6,'Desarmus','Mantener la varita firme, apuntar al enemigo y enunciar el conjuro.',NULL,'Carece de merito inventivo',NULL),(27,'2024-11-19 09:32:56','Produce fuego demoníaco, el cual es capaz de buscar a sus objetivos a pesar de ser no sensible. Se trata de un fuego de inmenso poder que no puede ser extinguido normalmente o por un hechizo de agua, como Aguamenti, Aqua Volatem o Aqua Eructo\n','publicada',11,6,'Fiendfyre','Pronunciar el conjuro realizando movimientos envolventes con la varita. Se debe tener la mente en blanco para controlar las llamas.',1,NULL,14);
/*!40000 ALTER TABLE `patente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patente_etiquetas`
--

DROP TABLE IF EXISTS `patente_etiquetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patente_etiquetas` (
  `patente_id` int unsigned NOT NULL,
  `etiqueta_id` int unsigned NOT NULL,
  PRIMARY KEY (`patente_id`,`etiqueta_id`),
  KEY `patente_etiquetas_patente_id_index` (`patente_id`),
  KEY `patente_etiquetas_etiqueta_id_index` (`etiqueta_id`),
  CONSTRAINT `patente_etiquetas_etiqueta_id_foreign` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiqueta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `patente_etiquetas_patente_id_foreign` FOREIGN KEY (`patente_id`) REFERENCES `patente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patente_etiquetas`
--

LOCK TABLES `patente_etiquetas` WRITE;
/*!40000 ALTER TABLE `patente_etiquetas` DISABLE KEYS */;
INSERT INTO `patente_etiquetas` VALUES (16,6),(16,11),(17,7),(17,9),(17,11),(17,13),(18,4),(18,12),(18,13),(18,17),(19,5),(19,9),(19,10),(19,16),(20,6),(20,14),(20,16),(21,6),(21,10),(22,7),(22,8),(22,13),(23,7),(23,8),(23,10),(23,13),(24,7),(24,8),(24,14),(27,7),(27,8),(27,10),(27,13);
/*!40000 ALTER TABLE `patente_etiquetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitud`
--

DROP TABLE IF EXISTS `solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitud` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `hechizo_id` int unsigned NOT NULL,
  `mago_id` int unsigned NOT NULL,
  `empleado_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `solicitud_hechizo_id_index` (`hechizo_id`),
  KEY `solicitud_mago_id_index` (`mago_id`),
  KEY `solicitud_empleado_id_index` (`empleado_id`),
  CONSTRAINT `solicitud_empleado_id_foreign` FOREIGN KEY (`empleado_id`) REFERENCES `magos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `solicitud_hechizo_id_foreign` FOREIGN KEY (`hechizo_id`) REFERENCES `hechizo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `solicitud_mago_id_foreign` FOREIGN KEY (`mago_id`) REFERENCES `magos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud`
--

LOCK TABLES `solicitud` WRITE;
/*!40000 ALTER TABLE `solicitud` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_hechizo`
--

DROP TABLE IF EXISTS `tipo_hechizo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_hechizo` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `caracteristicas` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipo_hechizo_nombre_unique` (`nombre`),
  UNIQUE KEY `tipo_hechizo_caracteristicas_unique` (`caracteristicas`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_hechizo`
--

LOCK TABLES `tipo_hechizo` WRITE;
/*!40000 ALTER TABLE `tipo_hechizo` DISABLE KEYS */;
INSERT INTO `tipo_hechizo` VALUES (11,'Encantamiento','Estos hechizos alteran las propiedades de sus objetivos, como sus comportamientos y propiedades. No alteran la esencia de las propiedades de quien lo sufre, sólo aumentan o cambian sus propiedades.'),(12,'Embrujo','También conocidos como \"mal de ojo\", tienen una ligera connotación de magia oscura. Son hechizos cuyos efectos son irritantes, pero divertidos, y que generan inconvenientes menores al objetivo.'),(13,'Maleficio','Afectan al objetivo de manera negativa; tiene una connotación de magia oscura, ligeramente peor que un \"mal de ojo\". Genera grandes inconvenientes a la víctima.'),(14,'Maldicion','Se reservan para los peores tipos de magia oscura, con la intención de afectar al objetivo de manera sumamente negativa.'),(15,'Contrahechizo','Inhibición o finalización del efecto de otro hechizo.'),(16,'Hechizo de curación','Mejora la condición de los seres vivos.'),(17,'Transformacion','También conocidos como hechizos de transfiguración, alteran la forma o apariencia del objetivo.');
/*!40000 ALTER TABLE `tipo_hechizo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-25 10:24:08
