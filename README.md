<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).

## Ejecutar en Desarrollo
1. Clonar el repositorio
2.  Ejecutar
```
npm install
 ```
3. Tener Nest CLI instalado
```
npm i -g @nest/cli
 ```
4. levantar la base de datos de Docker
```
docker-compose up -d
 ```

## Stack Usado
- Nest
- MongoDB

# Custom Notes 
## Contenido estático
```
 npm i @nestjs/serve-static
 ```

## CustomPipes
```
nest g pi common/pipes/parseMongoId --no-spec
```

## Paquete para trabajar con MongoDB y mongoose
```
npm i @nestjs/mongoose mongoose
```


## Conexion de puertos docker
ports:
      - 27017:27017
conectar el puerto 27017 de mi computadora con el 27017 del contenedor

## instalar imagenes de DBs

docker pull mongo:5.0.0
docker pull postgres:14.3

- Docker Messages 
View a summary of image vulnerabilities and recommendations → docker scout quickview mongo:5.0.0
View a summary of image vulnerabilities and recommendations → docker scout quickview postgres:14.3


# Docker Compose
- docker-compose up -d (up para levantar el servicio, -d para desligar la instacia de docker de la terminal)
detach


## Axios | error presente en last version
```
npm install axios@0.27.2
```

node version manager 
- nvm  use 18


revertir a anterior commit
git checkout --.