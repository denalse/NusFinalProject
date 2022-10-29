--- drop database if exists
drop schema if exists moodboard;

create schema moodboard;

use moodboard;

create table user (
    username varchar(64) not null primary key,
    password varchar(120) not null
);