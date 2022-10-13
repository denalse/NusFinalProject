--- drop database if exists
drop schema if exists rentable;

create schema rentable;

use rentable;

create table register (
    reg_id int not null primary key auto_increment,
    email varchar(256) not null,
    mobile int not null
);