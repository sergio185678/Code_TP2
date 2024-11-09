CREATE TABLE DietAsist.`peruviandishes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `receta` varchar(2000) DEFAULT NULL,
  `portion` int DEFAULT NULL,
  `calories` int DEFAULT NULL,
  `carbohydrates` float(10,1) DEFAULT NULL,
  `protein` float(10,1) DEFAULT NULL,
  `total_fat` float(10,1) DEFAULT NULL,
  `cholesterol_level` varchar(50) DEFAULT NULL,
  `uric_acid_level` varchar(50) DEFAULT NULL,
  `List_ingredient_portion` varchar(500) DEFAULT NULL,
  `List_important_ingredient_portion` varchar(300) DEFAULT NULL,
  `individual_percentage` varchar(300) DEFAULT NULL,
  `total_percentage` float(20,5) DEFAULT NULL,
  `array_portions` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;
