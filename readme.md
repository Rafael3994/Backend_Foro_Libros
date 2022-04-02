# Backend Foro de libros
Este es un proyecto personal, trata de crear un backend y frontend para crear un foro de libros. En él los usuarios podran poner los comentarios de sus partes favoritas de los libros y capitulos de estos que mas les gusten.

Repositorio Frontend: https://github.com/Rafael3994/Frontend_Foro_Libros


## Deploy de la aplicacion 🚀

Backend URL: https://backend-foro-libros.herokuapp.com

### Instalación en local 🔧

* Clona el repositorio en tu maquina local
```
git clone https://github.com/Rafael3994/Backend_Foro_Libros.git
```
* Crea un Cluster y una Base de datos en MongoDB, para ello deberas registrarte.
* Instalamos node.js en el ordenador, con ello tambien abremos instalado npm.
* Abrimos el repositiorio clonado con un IDE e instalamos las librerias.
```
## npm
npm install

## yarn
yarn install
```
* Copia en fichero .env-sample y dejalo con el nombre .env.<br>
Veras que hay tres variables a las que asignar un valor:
```
## Link de mongoDB (recuerda cambiar <password> por tu contraseña de usuario y myFirstDatabase por el nombre de tu base de datos).
MONGO_URI=

## El puerto donde se ejecutara la aplicacion.
PORT=

## Palabra con la que se cifrara el Token
JWT_SECRET=
```

* Finalmente para iniciar el proyecto ejecuta el comando
```
## npm
npm start

## yarn
yarn start
```


## Endpoints ⚙️
* Usuarios
```
    - POST /user/register 
        body: {
            email:
            name:
            password:
        }

    - POST /user/login
        body: {
            email:
            password:
        }
    
    - GET /user/getuser

    - GET /user/logout

    - DELETE /user/deleteuserbyid (admin)
        body: {
            idUser:
        }

    - DELETE /user/deleteuser

    - PUT /user/edituser
        body: {
            name:
            email:
            password:
            photo:
        }

    - GET /user/allusers (admin)

    - PUT /user/newadmin (admin)
        body: {
            idUser:
        }
```
* Libros
```
    - GET /libro/alllibros

    - GET /libro/getlibro
        body: {
            idLibro:
        }
    
    - POST /libro/newlibro (admin)
        body: {
            nombre:
            autor:
            descripcion:
            fecha_publicacion:
            paginas:
            caratula:
            capitulos:
        }
    
    - DELETE /libro/deletelibro (admin)
        body: {
            idLibro:
        }
    
    - PUT /libro/editlibro (admin)
        body: {
            idLibro:
            nombre:
            autor:
            descripcion:
            fecha_publicacion:
            paginas:
            caratula:
            capitulos:
        }

    - GET /libro/comentariolibro/getall
        body: {
            idLibro:
        }
    
    - POST /libro/comentariolibro/newcomentario
        body: {
            idLibro:
            comentarioDesc:
        }

    - PUT /libro/comentariolibro/editcomentario
        body: {
            idLibro:
            idComentario:
            comentarioDesc:
        }
    
    - DELETE /libro/comentariolibro/deletecomentario
        body: {
            idLibro:
            idComentario:
        }

    - GET /libro/capitulo/getcapitulo
        body: {
            idLibro:
            idCapitulo:
        }

    - DELETE /libro/capitulo/deletecapitulo (admin)
        body: {
            idLibro:
            idCapitulo:
        }

    - POST /libro/capitulo/newcapitulo (admin)
        body: {
            idLibro:
            nombreCap:
            paginas:
        }

    - PUT /libro/capitulo/editcapitulo (admin)
        body: {
            idLibro:
            idCapitulo:
            nombreCap:
            paginas:
        }

    - GET /libro/comentariocap/getall
        body: {
            idLibro:
            idCapitulo:
        }

    - POST /libro/comentariocap/newcomentario
        body: {
            idLibro:
            idCapitulo:
            comentarioDesc:
        }

    - PUT /libro/comentariocap/editcomentario
        body: {
            idLibro:
            idCapitulo:
            idComentario:
            comentarioDesc:
        }

    - DELETE /libro/comentariocap/deletecomentario
        body: {
            idLibro:
            idCapitulo:
            idComentario:
        }

```
* Lenguaje
```
    - GET /lenguage/en

    - GET /lenguage/es

    - GET /lenguage/cat
```

## Construido con 🛠️

* [JavaScript](https://www.javascript.com/) - Lenguaje de programacion
* [Node.js](https://nodejs.org/es/) - Entorno de ejecucion
* [Express](https://expressjs.com/es/) - Framework de node para Backend
* [MongoDB](https://www.mongodb.com/) - Base de datos

Algunas librerias:
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [i18next](https://www.npmjs.com/package/i18next)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [yup](https://www.npmjs.com/package/yup)


## Autores ✒️

 **Rafael Garcia Perez** - [rafael3994](https://github.com/Rafael3994)

## Licencia 📄

Este proyecto está bajo la Licencia.
