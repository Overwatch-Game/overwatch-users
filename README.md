## Description

Users app to authenticate customers

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Docker instructions 

```bash
# Construir el contenedor
$ docker-compose up -d

# Detener y eliminar el contenedor con los volumenes
$ docker-compose down -v

# Entrar al contenedor desde la terminal
$ docker exec -it postgres_container /bin/bash

# Conectarse a la base de datos creada en el docker-compose
$ psql -U users app-users

# Listar bases de datos
$ \l

# Listartablas
$ \dt

# Salir de postgres
$ \q

# Salir del contenedor creado en el docker-compose
$ Ctrl + P seguido de Ctrl + Q

# Listar todos los contenedores (incluyendo los que no están en ejecución)
$ docker ps -a

# Listar solo los contenedores en ejecución:
$ docker ps

# Iniciar un contenedor ya creado
$ docker start [CONTAINER_ID_OR_NAME]

# Detener un contenedor
$ docker stop [CONTAINER_ID_OR_NAME]

# Reiniciar un contenedor
$ docker restart [CONTAINER_ID_OR_NAME]
```

## Migrations instructions 

```bash
# Crear migraciones 
$ npm run migration:create src/database/migrations/create-users-table.migration

# Revertir migraciones 
$ npm run migration:revert
```
