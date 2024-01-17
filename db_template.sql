CREATE DATABASE IF NOT EXISTS `chat` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `chat`;

CREATE TABLE IF NOT EXISTS `t_user`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `avatar` varchar(255) DEFAULT '0.png',
    `create_time` datetime NOT NULL,
    `update_time` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `l_relation`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_user1` INT NOT NULL,
    `id_user2` INT NOT NULL,
    `status` INT NOT NULL,
    `emit` INT,
    `create_time` datetime NOT NULL,
    `update_time` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `l_relation` ADD CONSTRAINT `fk_l_relation_t_user1` FOREIGN KEY (`id_user1`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `l_relation` ADD CONSTRAINT `fk_l_relation_t_user2` FOREIGN KEY (`id_user2`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `t_group`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `can_change` boolean NOT NULL,
    `create_time` datetime NOT NULL,
    `update_time` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `t_right`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `t_right` (`id`, `name`) VALUES (1, 'admin'), (2, 'member'), (3, 'guest');

CREATE TABLE IF NOT EXISTS `l_group_user`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_group` INT NOT NULL,
    `id_user` INT NOT NULL,
    `right` INT NOT NULL,
    `create_time` datetime NOT NULL,
    `update_time` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `l_group_user` ADD CONSTRAINT `fk_l_group_user_t_right` FOREIGN KEY (`right`) REFERENCES `t_right` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `l_group_user` ADD CONSTRAINT `fk_l_group_user_t_group` FOREIGN KEY (`id_group`) REFERENCES `t_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `l_group_user` ADD CONSTRAINT `fk_l_group_user_t_user` FOREIGN KEY (`id_user`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `t_message`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_user` INT,
    `id_group` INT NOT NULL,
    `system` boolean NOT NULL DEFAULT false,
    `content` TEXT NOT NULL,
    `create_time` datetime NOT NULL,
    `update_time` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `t_message` ADD CONSTRAINT `fk_t_message_t_user` FOREIGN KEY (`id_user`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `t_message` ADD CONSTRAINT `fk_t_message_t_group` FOREIGN KEY (`id_group`) REFERENCES `t_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `l_user_message`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_user` INT NOT NULL,
    `id_message` INT NOT NULL,
    `time` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DELIMITER //
CREATE TRIGGER after_update_l_relation
AFTER UPDATE ON l_relation
FOR EACH ROW
BEGIN
    IF NEW.status = 1 THEN
        INSERT INTO t_group (name, can_change, create_time, update_time) VALUES ("", 0, NOW(), NOW());
        SET @id_group = LAST_INSERT_ID();

        INSERT INTO l_group_user (id_group, id_user, `right`, create_time, update_time) VALUES (@id_group, NEW.id_user1, 3, NOW(), NOW());
        INSERT INTO l_group_user (id_group, id_user, `right`, create_time, update_time) VALUES (@id_group, NEW.id_user2, 3, NOW(), NOW());

        INSERT INTO t_message (id_user, id_group, `system`, content, create_time, update_time) VALUES (NULL, @id_group, 1, "Début de la conversation", NOW(), NOW());
    END IF;
END;
//
DELIMITER ;