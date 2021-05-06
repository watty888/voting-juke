create database [IF NOT EXISTS] db_example;
create user [IF NOT EXISTS] 'springuser'@'%' identified by 'ThePassword';
grant all on db_example.* to 'springuser'@'%';