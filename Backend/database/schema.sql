--- drop database if exists
drop schema if exists rentable;

create schema rentable;

use rentable;

create table user (
    username varchar(256) not null primary key,
    password varchar not null
);