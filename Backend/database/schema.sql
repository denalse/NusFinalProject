-- drop database if exists
drop schema if exists moodboard;

create schema moodboard;

use moodboard;

create table user (
    id mediumint not null auto_increment primary key,
    username varchar(64) not null,
    password varchar(120) not null
);