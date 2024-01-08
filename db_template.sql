CREATE DATABASE IF NOT EXISTS `chat` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `chat`;

CREATE TABLE IF NOT EXISTS `t_user`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `create_time` datetime NOT NULL,
    `update_time` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `t_conversation` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_user1` INT NOT NULL,
    `id_user2` INT NOT NULL,
    `create_time` datetime NOT NULL,
    `update_time` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `t_conversation` ADD CONSTRAINT `fk_t_conversation_t_user1` FOREIGN KEY (`id_user1`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `t_conversation` ADD CONSTRAINT `fk_t_conversation_t_user2` FOREIGN KEY (`id_user2`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `t_message` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_conversation` INT NOT NULL,
    `id_user` INT NOT NULL,
    `content` TEXT NOT NULL,
    `send_time` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `t_message` ADD CONSTRAINT `fk_t_message_t_conversation` FOREIGN KEY (`id_conversation`) REFERENCES `t_conversation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `t_message` ADD CONSTRAINT `fk_t_message_t_user` FOREIGN KEY (`id_user`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;