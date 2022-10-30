CREATE SCHEMA `correos_db`;
use correos_db;
CREATE TABLE `usuarios`(
	idusuarios INT NOT NULL,
    nombre VARCHAR(45),
    apellido VARCHAR(45),
    pais VARCHAR(45),
    ciudad VARCHAR(45),
    PRIMARY KEY(idusuarios)
);
CREATE TABLE `emails`(
	idemails INT NOT NULL PRIMARY KEY,
    texto VARCHAR(144),
    fecha DATE,
    recibido boolean,
    enviado boolean
);
ALTER TABLE emails
ADD idusuarios INT;
ADD FOREIGN KEY (idusuarios) REFERENCES usuarios(idusuarios);