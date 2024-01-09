CREATE DATABASE osuplayerdle;

CREATE TABLE players (
    id integer PRIMARY KEY,
    username VARCHAR(50),
    country VARCHAR(2),
    rank integer,
    playcount integer
);