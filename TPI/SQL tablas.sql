CREATE DATABASE IF NOT EXISTS patentes_hechizos;
USE patentes_hechizos;

CREATE TABLE IF NOT EXISTS empleado(
	idEmpleado int unsigned not null auto_increment,
    nombre varchar(255),
    apellido varchar(255),
    profesion varchar(255),
    primary key (idEmpleado)
);

CREATE TABLE IF NOT EXISTS mago (
	idMago int unsigned not null auto_increment,
    nombre varchar(255),
    apellido varchar(255),
    madera_varita varchar(255),
	nucleo_varita varchar(255),
    largo_varita decimal(2,2) unsigned,
	primary key (idMago)
);

CREATE TABLE IF NOT EXISTS tipo_hechizo (
	codTipoHechizo int unsigned not null auto_increment,
    nombreTipoHechizo varchar(255),
    caracteristicas varchar(255),
    notas text,
    primary key (codTipoHechizo)
);

CREATE TABLE IF NOT EXISTS etiqueta (
	codEtiqueta int unsigned not null auto_increment,
    nombreEtiqueta varchar(255),
    descripcion text,
    primary key (codEtiqueta)
);

CREATE TABLE IF NOT EXISTS patente (
	idPatente int unsigned not null auto_increment,
    idMago int unsigned not null,
    idEmpleado int unsigned default null,
    descripcion text,
    fechaCreacion date,
    estado varchar(255),
    primary key (idPatente),
    foreign key (idMago) references mago (idMago) on update cascade,
    foreign key (idEmpleado) references empleado (idEmpleado) on update cascade
);

CREATE TABLE IF NOT EXISTS hechizo (
	codHechizo int unsigned not null auto_increment,
    idPatente int unsigned not null,
    codTipoHechizo int unsigned not null,
    nombre varchar(255),
    descripcion text,
    instrucciones text,
    restingido boolean,
    primary key (codHechizo, idPatente),
    foreign key (idPatente) references patente (idPatente) on update cascade,
    foreign key (codTipoHechizo) references tipo_hechizo (codTipoHechizo) on update cascade
);

CREATE TABLE IF NOT EXISTS etiquetas_hechizos (
	codHechizo int unsigned not null,
    idPatente int unsigned not null,
    codEtiqueta int unsigned not null,
    primary key (codHechizo, idPatente, codEtiqueta),
    foreign key (codHechizo, idPatente) references hechizo (codHechizo, idPatente) on update cascade,
    foreign key (codEtiqueta) references  etiqueta (codEtiqueta) on update cascade
);

CREATE TABLE IF NOT EXISTS solicitud_visualizacion (
	codHechizo int unsigned not null,
    idPatente int unsigned not null,
    idMago int unsigned not null,
    motivo text,
    estado varchar(255),
    fecha_solicitud date,
    idEmpleado int unsigned default null,
    razon text,
    primary key (codHechizo, idPatente, idMago),
    foreign key (codHechizo, idPatente) references hechizo (codHechizo, idPatente) on update cascade,
    foreign key (idMago) references mago (idMago) on update cascade,
    foreign key (idEmpleado) references empleado (idEmpleado) on update cascade
);

ALTER TABLE empleado add column usuario varchar(255);
ALTER TABLE empleado add column pass varchar(255);

ALTER TABLE mago add column usuario varchar(255);
ALTER TABLE mago add column pass varchar(255);