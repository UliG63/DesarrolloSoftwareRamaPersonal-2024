CREATE DATABASE  IF NOT EXISTS `patentes_hechizos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `patentes_hechizos`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: patentes_hechizos
-- ------------------------------------------------------
-- Server version	8.0.38

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
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `idEmpleado` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `profesion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (1,'Arthur','Weasley','Jefe del Departamento del Uso Indebido de la Magia'),(2,'Amelia','Bones','Jefa del Departamento de Aplicación de la Ley Mágica'),(3,'Rufus','Scrimgeour','Jefe de la Oficina de Aurores'),(4,'Cornelius','Fudge','Ministro de Magia');
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etiqueta`
--

DROP TABLE IF EXISTS `etiqueta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etiqueta` (
  `codEtiqueta` int unsigned NOT NULL AUTO_INCREMENT,
  `nombreEtiqueta` varchar(255) DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`codEtiqueta`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etiqueta`
--

LOCK TABLES `etiqueta` WRITE;
/*!40000 ALTER TABLE `etiqueta` DISABLE KEYS */;
INSERT INTO `etiqueta` VALUES (1,'Basico','Estos hechizos son los más fáciles de aprender y ejecutar. Se enseñan en los primeros años en Hogwarts y no requieren mucho poder mágico ni concentración.'),(2,'Intermedio','Estos hechizos requieren más práctica y habilidad que los básicos. Se enseñan en los cursos intermedios en Hogwarts y pueden tener efectos más complejos.'),(3,'Avanzado','Los hechizos avanzados son difíciles de dominar y suelen ser enseñados en los últimos años de Hogwarts. Requieren una comprensión profunda de la magia y una gran concentración.'),(4,'Experto','Estos hechizos son extremadamente difíciles y solo los magos y brujas más talentosos pueden ejecutarlos correctamente. Su enseñanza es rara y suelen necesitarse años de práctica.'),(5,'Prohibido','Los hechizos prohibidos son extremadamente peligrosos y están regulados por el Ministerio de Magia. Su uso es ilegal y se enseñan solo en circunstancias especiales o bajo supervisión estricta.'),(6,'Legendario','Estos hechizos son extremadamente raros y se encuentran en el límite de la magia conocida. Requieren una destreza mágica increíble y a menudo están envueltos en mitos y leyendas. Pocos magos en la historia han sido capaces de realizarlos.'),(7,'Ofensivo','Diseñados para atacar o dañar.'),(8,'Defensivo','Utilizados para protegerse o defenderse.'),(9,'Utilitario','Hechizos prácticos para el día a día o tareas específicas.'),(10,'Temporal','El hechizo tiene un efecto limitado en el tiempo.'),(11,'Permanente','El hechizo tiene un efecto duradero o permanente.'),(12,'Transformador','Cambia la forma o la naturaleza de algo.'),(13,'Verbal','Requieren que el lanzador pronuncie las palabras mágicas en voz alta para que el hechizo se active.'),(14,'No Verbal','No requieren que el lanzador pronuncie las palabras mágicas en voz alta.');
/*!40000 ALTER TABLE `etiqueta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etiquetas_hechizos`
--

DROP TABLE IF EXISTS `etiquetas_hechizos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etiquetas_hechizos` (
  `codHechizo` int unsigned NOT NULL,
  `idPatente` int unsigned NOT NULL,
  `codEtiqueta` int unsigned NOT NULL,
  PRIMARY KEY (`codHechizo`,`idPatente`,`codEtiqueta`),
  KEY `codEtiqueta` (`codEtiqueta`),
  CONSTRAINT `etiquetas_hechizos_ibfk_1` FOREIGN KEY (`codHechizo`, `idPatente`) REFERENCES `hechizo` (`codHechizo`, `idPatente`) ON UPDATE CASCADE,
  CONSTRAINT `etiquetas_hechizos_ibfk_2` FOREIGN KEY (`codEtiqueta`) REFERENCES `etiqueta` (`codEtiqueta`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etiquetas_hechizos`
--

LOCK TABLES `etiquetas_hechizos` WRITE;
/*!40000 ALTER TABLE `etiquetas_hechizos` DISABLE KEYS */;
INSERT INTO `etiquetas_hechizos` VALUES (4,4,1),(1,1,2),(2,2,3),(3,3,5),(5,5,5),(6,6,5),(3,3,7),(5,5,7),(6,6,7),(2,2,8),(1,1,9),(4,4,9),(2,2,10),(4,4,10),(6,6,10),(1,1,11),(3,3,11),(5,5,11),(1,1,13),(2,2,13),(4,4,13),(5,5,13),(6,6,13),(1,1,14),(3,3,14);
/*!40000 ALTER TABLE `etiquetas_hechizos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hechizo`
--

DROP TABLE IF EXISTS `hechizo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hechizo` (
  `codHechizo` int unsigned NOT NULL AUTO_INCREMENT,
  `idPatente` int unsigned NOT NULL,
  `codTipoHechizo` int unsigned NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `instrucciones` text,
  `restingido` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`codHechizo`,`idPatente`),
  KEY `idPatente` (`idPatente`),
  KEY `codTipoHechizo` (`codTipoHechizo`),
  CONSTRAINT `hechizo_ibfk_1` FOREIGN KEY (`idPatente`) REFERENCES `patente` (`idPatente`) ON UPDATE CASCADE,
  CONSTRAINT `hechizo_ibfk_2` FOREIGN KEY (`codTipoHechizo`) REFERENCES `tipo_hechizo` (`codTipoHechizo`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hechizo`
--

LOCK TABLES `hechizo` WRITE;
/*!40000 ALTER TABLE `hechizo` DISABLE KEYS */;
INSERT INTO `hechizo` VALUES (1,1,5,'Finite incantatem','Luz Roja. Cesa todos los efectos de los hechizos.','El movimiento de la varita es rápido y preciso, dibujando una forma de escudo.',NULL),(2,2,1,'Expecto Patronum','Luz Plateada. Conjura un espíritu guardián magico.','Realiza un movimiento circular en sentido horario (derecha) con la varita, comenzando desde la parte inferior del círculo. Requiere utilizar la felicidad para poder conjurarlo.',NULL),(3,3,4,'Sectumsempra','Luz Blanca. Hace profundos cortes en el objetivo.','Realizar movimientos cortantes y bruscos con la varita.',NULL),(4,4,1,'Wingardium Leviosa','Sin Luz. Hace que los objetos leviten.','Realiza una curva suave y ascendente hacia la derecha. Luego, lleva la varita hacia abajo en una curva y termina el movimiento con un pequeño giro hacia arriba.',NULL),(5,5,1,'Obliviate','Luz Verde. Borra recuerdos de la memoria del objetivo.','Movimiento curvo, circular, que se asemeja a la forma de un cerebro.',NULL),(6,6,4,'Imperio','Sin Luz o Luz Amarilla Verdosa. Control total sobre la persona.','Apuntar la varita al objetivo, trazar un 4 de abajo hacia arriba. Se debe comunicar lo que tiene que realizar.',NULL);
/*!40000 ALTER TABLE `hechizo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mago`
--

DROP TABLE IF EXISTS `mago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mago` (
  `idMago` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `madera_varita` varchar(255) DEFAULT NULL,
  `nucleo_varita` varchar(255) DEFAULT NULL,
  `largo_varita` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`idMago`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mago`
--

LOCK TABLES `mago` WRITE;
/*!40000 ALTER TABLE `mago` DISABLE KEYS */;
INSERT INTO `mago` VALUES (1,'Harry','Potter','Acebo','Pluma de Fenix',27.94),(2,'Remus','Lupin','Cipres','Pelo de Unicornio',26.00),(3,'Neville','Longbottom','Cerezo','Pelo de Unicornio',33.02),(4,'Draco','Malfoy','Espino','Pelo de Unicornio',25.40),(5,'Nymphadora','Tonks','Nogal','Fibra de Dragon',24.42),(6,'Kingsley','Shacklebolt','Olmo','Fibra de Dragon',31.87),(7,'Albus','Dumbledore','Sauco','Pelo de Thestral',38.10);
/*!40000 ALTER TABLE `mago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patente`
--

DROP TABLE IF EXISTS `patente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patente` (
  `idPatente` int unsigned NOT NULL AUTO_INCREMENT,
  `idMago` int unsigned NOT NULL,
  `idEmpleado` int unsigned DEFAULT NULL,
  `descripcion` text,
  `fechaCreacion` date DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idPatente`),
  KEY `idMago` (`idMago`),
  KEY `idEmpleado` (`idEmpleado`),
  CONSTRAINT `patente_ibfk_1` FOREIGN KEY (`idMago`) REFERENCES `mago` (`idMago`) ON UPDATE CASCADE,
  CONSTRAINT `patente_ibfk_2` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patente`
--

LOCK TABLES `patente` WRITE;
/*!40000 ALTER TABLE `patente` DISABLE KEYS */;
INSERT INTO `patente` VALUES (1,5,2,'Luz Roja. Cesa todos los efectos de los hechizos.','2024-07-24','Aprobada'),(2,1,2,'Luz Plateada. Conjura un espíritu guardián magico.','2024-07-20','En Espera'),(3,4,4,'Luz Blanca. Hace profundos cortes en el objetivo.','2024-06-17','En Espera'),(4,2,1,'Sin Luz. Hace que los objetos leviten.','2024-03-30','Rechazada'),(5,2,2,'Luz Verde. Borra recuerdos de la memoria del objetivo.','2023-09-09','Aprobada'),(6,4,2,'Sin Luz o Luz Amarilla Verdosa. Control total sobre la persona.','2023-12-13','Aprobada');
/*!40000 ALTER TABLE `patente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitud_visualizacion`
--

DROP TABLE IF EXISTS `solicitud_visualizacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitud_visualizacion` (
  `codHechizo` int unsigned NOT NULL,
  `idPatente` int unsigned NOT NULL,
  `idMago` int unsigned NOT NULL,
  `motivo` text,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_solicitud` date DEFAULT NULL,
  `idEmpleado` int unsigned DEFAULT NULL,
  `razon` text,
  PRIMARY KEY (`codHechizo`,`idPatente`,`idMago`),
  KEY `idMago` (`idMago`),
  KEY `idEmpleado` (`idEmpleado`),
  CONSTRAINT `solicitud_visualizacion_ibfk_1` FOREIGN KEY (`codHechizo`, `idPatente`) REFERENCES `hechizo` (`codHechizo`, `idPatente`) ON UPDATE CASCADE,
  CONSTRAINT `solicitud_visualizacion_ibfk_2` FOREIGN KEY (`idMago`) REFERENCES `mago` (`idMago`) ON UPDATE CASCADE,
  CONSTRAINT `solicitud_visualizacion_ibfk_3` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud_visualizacion`
--

LOCK TABLES `solicitud_visualizacion` WRITE;
/*!40000 ALTER TABLE `solicitud_visualizacion` DISABLE KEYS */;
INSERT INTO `solicitud_visualizacion` VALUES (5,5,1,'Tengo mi propio grupo de estudio de defensa contra las artes oscuras y quiero comprender tanto sus aplicaciones como sus riesgos. Mi objetivo escapacitarme mejor y también transmitir el peligro del hechizo a mis alumnos.','Aprobada','2024-01-26',4,'Los motivos brindados son satisfactorios, el individuo no posee historial criminal.'),(5,5,3,'Mis padres tienen pérdida de memoria permanente, me gustaría estudiar este hechizo para investigar una solución.','En Espera','2024-06-21',NULL,NULL),(6,6,6,'Soy Auror, me gustaría entrenar a mis subordinados a resistir este maleficio.','Aprobada','2024-03-11',1,'Los motivos brindados son satisfactorios, el individuo no posee historial criminal.'),(6,6,7,'Soy Albus Percival Wulfric Brian Dumbledore.','En Espera','2024-07-25',NULL,NULL);
/*!40000 ALTER TABLE `solicitud_visualizacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_hechizo`
--

DROP TABLE IF EXISTS `tipo_hechizo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_hechizo` (
  `codTipoHechizo` int unsigned NOT NULL AUTO_INCREMENT,
  `nombreTipoHechizo` varchar(255) DEFAULT NULL,
  `caracteristicas` varchar(255) DEFAULT NULL,
  `notas` text,
  PRIMARY KEY (`codTipoHechizo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_hechizo`
--

LOCK TABLES `tipo_hechizo` WRITE;
/*!40000 ALTER TABLE `tipo_hechizo` DISABLE KEYS */;
INSERT INTO `tipo_hechizo` VALUES (1,'Encantamiento','Estos hechizos alteran las propiedades de sus objetivos, como sus comportamientos y propiedades. No alteran la esencia de las propiedades de quien lo sufre, sólo aumentan o cambian sus propiedades.','Cuando son lanzados por un practicante experimentado, los encantamientos suelen tener efectos de muy larga duración.'),(2,'Embrujo','También conocidos como \"mal de ojo\", tienen una ligera connotación de magia oscura. Son hechizos cuyos efectos son irritantes, pero divertidos, y que generan inconvenientes menores al objetivo.','Los embrujos sólo duran mientras el lanzador mantenga el contacto ocular con el objetivo.'),(3,'Maleficio','Afectan al objetivo de manera negativa; tiene una connotación de magia oscura, ligeramente peor que un \"mal de ojo\". Genera grandes inconvenientes a la víctima.',NULL),(4,'Maldicion','Se reservan para los peores tipos de magia oscura, con la intención de afectar al objetivo de manera sumamente negativa.','La mayoría de las maldiciones dejan secuelas que no se pueden revertir.'),(5,'Contrahechizo','Inhibición o finalización del efecto de otro hechizo.','Existen seis tipos conocidos: Contraembrujos, contrahechizos, contraencantamientos, destransformaciones, antiembrujos y contrahechizos sin diferenciación. Mientras que la nomenclatura es compleja, todos ellos tienen en común la inhibición de otro hechizo.'),(6,'Hechizo de curación','Mejora la condición de los seres vivos.','Existen varios tipos y efectos, todos ellos destinados a sanar o curar a los seres vivos.'),(7,'Transformacion','También conocidos como hechizos de transfiguración, alteran la forma o apariencia del objetivo.','Los hechizos de este grupo pueden separarse en verdaderos hechizos de transfiguración (donde un objeto existente es alterado), y conjuraciones, donde el objeto conjurado es aparentemente transformado de la nada.');
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

-- Dump completed on 2024-07-26 11:32:16
