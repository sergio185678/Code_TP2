CREATE TABLE DietAsist.`important_ingredient` (
  `id` int NOT NULL,
  `name` text,
  `Portion` double DEFAULT NULL,
  `Calories` double DEFAULT NULL,
  `Protein` double DEFAULT NULL,
  `Carbohydrates` double DEFAULT NULL,
  `Total fat` double DEFAULT NULL,
  `Calo/Port` double DEFAULT NULL,
  `Prot/Port` double DEFAULT NULL,
  `Carbo/Port` double DEFAULT NULL,
  `Fat/Port` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

