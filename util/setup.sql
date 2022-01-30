DROP DATABASE IF EXISTS HacknDash;
CREATE DATABASE HacknDash;
USE HacknDash;

DROP TABLE IF EXISTS stats;

CREATE TABLE stats (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  userID int(11) NOT NULL,
  gamesplayed int(11) NOT NULL,
  score int(11) DEFAULT NULL,
  time int(11) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS userlist;

CREATE TABLE userlist (
  id int(45) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primäre ID',
  email varchar(45) NOT NULL COMMENT 'E-Mail',
  username varchar(45) NOT NULL COMMENT 'Nutzername',
  password varchar(60) NOT NULL COMMENT 'Passwort',
  PRIMARY KEY (id),
  UNIQUE KEY username (username)
);

COMMIT;
