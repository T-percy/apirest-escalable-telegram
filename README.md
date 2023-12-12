# APIRest escalable telegram
Guia paso a paso para construir apirest robusta y altamente escalable, separando backend en tres capas: [capa del servidor] [capa de red] [capa de componentes]; cada una con responsabilidad especifica

## Tabla de contenido
1. [Preparar entorno de trabajo](#1.-Preparar-entorno-de-trabajo)
2. [Archivos de configuración](#2.-Archivos-de-configuración)
3. [Instalar dependencias](#3.-Instalar-dependencias)
4. [Ajustar package.json](#4.-Ajustar-package.json)
5. [Control de versiones con git y github](#5.-Control-de-versiones-con-git-y-github)
6. [Arquitectura backend (3 capas)](#6.-Arquitectura-backend-(3-capas))
7. [Crear y ejecutar servidor](#7.-Crear-y-ejecutar-servidor)
8. [Conectar API a base de datos](#8.-Conectar-API-a-base-de-datos)
9. [Definir modelo](#9.-Definir-modelo)
10. [Rutas, organizar y separar capa de red](#10.-Rutas,-organizar-y-separar-capa-de-red)





## 1. Preparar entorno de trabajo

1. Instalar programas y/o herramientas como: node, vscode, git, terminal, entre otros.

2. Crear carpeta del proyecto en equipo local.

3. En el IDE abrir carpeta raiz creada

4. Abrir terminal integrada de vscode con `ctrl + ñ`

5. Crear `package.json` para describir la configuración y gestión de dependencias del proyecto con:
```bash
npm init -y
```

## 2. Archivos de configuración
1. Para que git omita archivos `||` para estilos, reglas, buenas prácticas del código `||` para variables de entorno:
```bash
touch .gitignore .editorconfig .eslintrc.json .prettierrc.json .env
```
* `.gitignore` Ir a [gitignore.io](https://www.toptal.com/developers/gitignore/) `||` escribir y seleccionar: Node Windows Linux macOS `||` click en create `||` copiar y pegar lo generado

* `.editorconfig` Copiar y pegar el contenido de [editorconfig.org](https://editorconfig.org/) `||` Asegurarse que en vscode esté instalada la extensión `EditorConfig for VS Code` 

* `.eslintrc.json` Copiar y pegar el contenido que se encuentra en [eslintrc.json](https://github.com/T-percy/archivos-de-configuracion-para-proyectos-web-/blob/main/.eslintrc.json)

* `.prettierrc.json` Copiar y pegar el contenido que se encuentra en [prettierrc.json](https://github.com/T-percy/archivos-de-configuracion-para-proyectos-web-/blob/main/.prettierrc.json)  

* `.env` Para separar y utilizar información sensible y/o configuraciones específicas del entorno en el que se ejecutará la aplicación.


## 3. Instalar dependencias
* `Paquetes para desarrollo`
```bash
npm i eslint eslint-config-prettier eslint-plugin-prettier prettier nodemon morgan dotenv -D
```

* `Otras dependencias necesarias`
```bash
npm i express cors multer mongoose
```

`express` Framework para crear el servidor
`nodemon` Reiniciar automaticamente el servidor al cambiar codigo
`dotenv` Manejar variables de entorno.
`multer` Manejar la carga y almacenamiento de archivos de forma sencilla
`cors` Permite conexiones de clientes al backend, evitando error de origen cruzado entre navegadores
`morgan` Para ver las peticiones del servidor en tiempo real.
`mongoose` Gestión de conexión con mongoDB.
`eslint` Ayuda a identificar y corregir errores de código, así como a aplicar y hacer cumplir convenciones de estilo.
`eslint-config-prettier` Desactiva las reglas relacionadas con ESLint, para que Prettier las maneje. Establece la configuración de ESLint para que no tenga conflicto con las reglas de Prettier.
`eslint-plugin-prettier` Complemento de ESLint que ejecuta Prettier como una regla de ESLint. Integra a Prettier en el flujo de trabajo de ESLint.
`prettier` formatea automaticamente el código para seguir reglas predefinidas. Ayuda a la consistencia en el estilo del código.

## 4. Ajustar package.json
1. Configurar `main` y el `scripts` para entorno de desarrollo, de producción y lint. 

```bash
"main": "server.js",
```

Opción 1 scripts
```bash
"dev": "nodemon src/server.js",
"start": "node src/server.js",
"lint": "eslint",
```

Opción 2 scripts
```bash
"dev": "DEBUG=app:* nodemon src/server.js",
"start": "NODE_ENV=production node src/server.js",
"lint": "eslint"
```

## 5. Control de versiones con git y github
1. `Repositorio local [git]`
* Iniciar repositorio de git:
```bash
git init
```
* Consultar estado actual del repositorio:
```bash
git status
```
* Agregar archivos y/o cambios al area de preparación antes de confirmarse para el seguimiento de git:
```bash
git add .
```
* Confirmar los cambios del repositorio, que se encuentren en el area de preparación, y una breve descripción:
```bash
git commit -m "description"
```

2. `Repositorio remoto [github]`
* En `github` Crear nuevo repositorio que guardará el código del backend en nuestra pc || copiar y pegar comando del remoto en el local, para agregar el repositorio remoto `git remote add ...`, cambiar el nombre origin por uno intuitivo como `... github` apuntar a la url del repositorio creado `... git@github.com:user/name-repository.git`
```bash
git remote add github git@github.com:T-percy/apirest-escalable-telegram.git
```

* Copiar y pegar comando del remoto en la `maquina local` para renombrar la rama actual del local
```bash
git branch -M main
```

* Copiar y pegar comando del remoto en la maquina local `git push`  para enviar los cambios al remoto || indicar el repositorio remoto y su rama `-u github main` y el "-u" permite que el nombre del remoto y su rama quede guardada por defecto: 
```bash
git push -u github main
```
y en adelante solo usar:
```bash
git push
```

## 6. Arquitectura backend (3 capas)
* `carpeta src` 
    * `server.js` >>> CAPA DEL SERVIDOR: comprobar peticiones para que pasen al routes.js o sean rechazadas
    * `Carpeta network` >>> CAPA DE RED
        - `routes.js` ---Comprobar la ruta de la petición para llamar al componente correcto
        - `response.js` ---Gestionar respuestas coherentes ya sean de (exito o error) a las peticiones del cliente.
    * `Carpeta componentes` >>> CAPA DE COMPONENTES
        - `Carpeta messages` === Contiene archivos del componente
            - `network.js` ---Enviará petición al controlador y devolvera la respuesta al response.js
            - `controller.js` ---Ejecutará las acciones o funciones, segun la petición
            - `store.js` ---Responsable de dónde y cómo se guardará la información
            - `model.js` ---Definir la estructura de los datos, ya sean colecciones o tablas
        - `Carpeta users...`
    * `Carpeta config` >>> Para configuraciones del proyecto como conexión a BD, etc, o cualquier otra configuración que necesite ser ajustada sin modificar el codigo fuente.
    * `Carpeta utils` >>> Para funciones helpers (ayudantes para tareas repetitivas)
    * `Carpeta public` >>> Para los archivos estaticos (frontend) y subir archivos


## 7. Crear y ejecutar servidor
1. En `server.js` importar `express`
```bash
const express = require('express');
```
2. Crear el servidor con express
```bash
const app = express();
```
3. Declarar puerto e inicializar con variable de entorno
```bash
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('🔥🔥🔥 http://localhost:' + PORT + ' 🔥🔥🔥');
});
```
4. Declarar y utilizar middlewares para manejo de solicitudes HTTP
```bash
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
```

5. Probar servidor:
```bash
npm run dev
```

## 8. Conectar API a base de datos
1. En `src` dentro de la carpeta `config` crear archivo(s) para conexión
```bash
touch mongodb.js mysqldb.js ...
```
2. En `mongodb.js` `a)`importar mongoose
```bash
const mongoose = require('mongoose');
```
 `b)`Declarar función de conexión 
```bash
const dbConnect = async () => {}
```
 `c)`Exportar la función 
```bash
module.exports = dbConnect;
```
 `e)`En el archivo `.env` crear variable de entorno
```bash
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.ebrfadl.mongodb.net/database?retryWrites=true&w=majority
```
`f)`En `mongodb.js` dentro de la función, usando `try-catch` y dentro de `try{}` llamar la variable de entorno y guardarla como constante 
```bash
const MONGODB_URI = process.env.MONGODB_URI;
```
`g)`Usar metodo de mongoose para conectar DB, pasandole la variable de entorno como parametro
```bash
await mongoose.connect(MONGODB_URI);
```
`h)`Mandar al desarrollador mensaje de conexión exitosa
```bash
console.log('[mongodb]: ¡Conexión ✅!');
```
`i)`Dentro de `catch (error) {}` manejar el error y mostrarlo al desarrollador
```bash
console.log('[mongodb]: ¡Conexión ❌!', error.message);
```
`j)`En `server.js` importar e invocar la función
```bash
const dbConnect = require('./config/mongodb');

dbConnect();
```
`k)`Verificar conexión con la DB
```bash
npm run dev
```
`[mongodb]: ¡Conexión ✅!`

3. En `mysqldb.js` ...

## 9. Definir modelo
1. Definir la estructura de los datos (propiedades y tipos de datos) que se almacenarán en la DB, sean colecciones o tablas.

`colecciones` `a)`En la capa de componentes o api, dentro de la carpeta de cada componente crear model.js 
```bash
- carpeta api
    - carpeta messages
        - messageModel.js
    - carpeta users
        - userModel.js
    - carpeta chats
        - chatModel.js
```
`b)`En `model.js` importar `mongoose` y separar la clase `Schema` de mongoose
```bash
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
```
`c)`Instanciar la clase `Schema` que recibe como argumento la `definición del esquema` con sus propiedades, tipos de datos, y los datos que son obligatorios, y guardarla en una constante
```bash
const messageSchema = new Schema({
    chat: {
        type: Schema.ObjectId,
        ref: 'chat',
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
    },
    message: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});
```
`d)` `Definir el modelo` con el metodo `mongoose.model` usando dos argumentos: 1.`nombre de colección` que servirá para importar el modelo mismo y 2.`esquema creado` 
```bash
const messageModel = mongoose.model('message', messageSchema);
```
`e)`Exportar el modelo
```bash
module.exports = messageModel;
```
`f)`Repetir el proceso para crear los modelos de cada una de las demás entidades

## 10. Rutas, organizar y separar capa de red
1. Definir el enrutador principal en `routes.js` `a)`Importar las rutas de los distintos componentes de la aplicación
```bash
const message = require('../api/message/network');
const user = require('../api/user/network');
const chat = require('../api/chat/network');
```
`b)`Definir funcion de las rutas, tomando como argumento server
```bash
const routes = (server) => {}
```
`c)`Exportar la función routes para su uso
```bash
module.exports = routes;
```
`d)`Definir y usar cada una de esas rutas dentro de la función
```bash
server.use('/messages', message);
server.use('/users', user);
server.use('/chats', chat);
```
2. Utilizar el enrutador principal desde el servidor `server.js` `a)`importar el archivo routes.js asignandole la variable router, `b)`llamar la función importada pasandole a `app` como argumento
```bash
const router = require('./network/routes');

router(app);
```
3. Gestionar respuestas coherentes para el cliente final `a)`en `carpeta utils` crear archivos para manejo de respuesta exitosa y de error
```bash
- utils
    - handleSuccess.js
    - handleError.js
```
`b)`En `handleSuccess.js` crear función success pasando sus parametros; usar `res.status()` para establecer el estado HTTP de la respuesta; usar `res.send()` para enviar respuesta al cliente en JSON, con dos propiedades => error: cadena vacía.  body: cuerpo de la respuesta; por último exportar la función. 
```bash
const success = (req, res, msg, status) => {
    res.status(status || 200).send({
        error: '',
        body: msg,
    });
}

module.exports = success;
```
`c)`En `handleError.js` crear función error pasando sus parametros; usar `console.error` para mostrar en consola detalles adicionales del error; usar `res.status()` y `res.send()` para enviar respuesta controlada del error al cliente en JSON, con dos propiedades => error: mensaje de error proporcionado.  body: cadena vacia, al no devolver datos por ser invalidos; por último exportar la función. 
```bash
const error = (req, res, msgError, status, details) => {
    console.error(`[responseError]🚫: ${details}`);
    res.status(status || 403).send({
        error: msgError,
        body: '',
    });
}

module.exports = error;
```
`d)`En `response.js` importar archivos success y error, asignando cada uno a una constante; crear y exportar las funciones de success y error asignandoles las funciones de manejo de exito y error
```bash
const success = require('../utils/handleSuccess');
const {error} = require('../utils/handleError');

exports.success = success;
exports.error = error;
```
4.En el archivo `network.js` de cada componente de la API preparar las rutas para las solicitudes HTTP `a)` importar express y response.js `b)`Crear enrutador de express `c)`Exportar el enrutador para ser usado por routes.js `d)`Crear las ruta `post` `get` `update` `delete` para probar con postman `e)` Repetir proceso con cada componente de la api
```bash
const express = require('express');
const response = require('../../network/response');

const router = express.Router();

router.post('/', async (req, res) => {
    res.send('Ruta post de messages ✅')
});

router.get('/', async (req, res) => {
    res.send('Ruta get de messages ✅')
});

router.patch('/', async (req, res) => {
    res.send('Ruta patch de messages ✅')
});

router.delete('/', async (req, res) => {
    res.send('Ruta delete de messages ✅')
});

module.exports = router;
```
