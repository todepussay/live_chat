CREATE DATABASE IF NOT EXISTS `chat` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `chat`;

CREATE TABLE IF NOT EXISTS "t_user" (
    "id" INT NOT NULL AUTO_INCREMENT,
    "name" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "create_time" datetime NOT NULL,
    "update_time" datetime NOT NULL,
    PRIMARY KEY ("id")
) ENGINE=InnoDB DEFAULT CHARSET=utf8;