CREATE TABLE DietAsist.`allergicingredient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `User_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `AllergicIngredient_User` (`User_id`),
  CONSTRAINT `AllergicIngredient_User` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb3;
