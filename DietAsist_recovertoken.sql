CREATE TABLE DietAsist.`recovertoken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(64) DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL,
  `User_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `RecoverToken_User` (`User_id`),
  CONSTRAINT `RecoverToken_User` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
