CREATE TABLE DietAsist.`chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `User_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Chat_User` (`User_id`),
  CONSTRAINT `Chat_User` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=utf8mb3;