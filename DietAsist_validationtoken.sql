CREATE TABLE DietAsist.`validationtoken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(4) DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL,
  `User_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ValidationToken_User` (`User_id`),
  CONSTRAINT `ValidationToken_User` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb3;