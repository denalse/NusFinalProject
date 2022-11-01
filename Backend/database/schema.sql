-- drop database if exists
drop schema if exists moodboard;

create schema moodboard;

use moodboard;

create table users (
    id bigint(20) auto_increment primary key,
    username varchar(50),
    password varchar(120)
);

create table roles (
    id int(11) auto_increment primary key,
    name varchar(20)
);

-- create table user_roles (
--     user_id bigint(20) primary key,
--     role_id int(20) primary key
-- );

INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');