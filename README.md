# APIRest escalable telegram
Guia paso a paso para construir apirest robusta y altamente escalable, separando backend en tres capas: [capa del servidor] [capa de red] [capa de componentes]; cada una con responsabilidad especifica

## Tabla de contenido
- [Preparar entorno de trabajo](#Preparar-entorno-de-trabajo)
- [Archivos de configuración](#Archivos-de-configuración)
- [Instalar dependencias](#Instalar-dependencias)
- [Ajustar package.json](#Ajustar-package.json)
- [Control de versiones con git y github](#Control-de-versiones-con-git-y-github)
- [Arquitectura backend (3 capas)](#Arquitectura-backend-(3-capas))


## Preparar entorno de trabajo

1. Instalar programas y/o herramientas como: node, vscode, git, terminal, entre otros.

2. Crear carpeta del proyecto en equipo local.

3. En el IDE abrir carpeta raiz creada

4. Abrir terminal integrada de vscode con `ctrl + ñ`

5. Crear `package.json` para describir la configuración y gestión de dependencias del proyecto con:
```bash
npm init -y
```

## Archivos de configuración
1. Para que git omita archivos || estilos, reglas, buenas prácticas del código || variables de entorno:
```bash
touch .gitignore .editorconfig .eslintrc.json .prettierrc.json .env
```
* `.gitignore` Ir a [gitignore.io](https://www.toptal.com/developers/gitignore/) || seleccionar: Node Windows Linux macOS || click en create || copiar y pegar en el archivo.

* `.editorconfig` Copiar y pegar el contenido de [editorconfig.org](https://editorconfig.org/) en el archivo || Asegurarse que en vscode esté instalada la extensión `EditorConfig for VS Code` 

* `.eslintrc.json` Copiar y pegar el contenido que se encuentra en [eslintrc.json](https://github.com/T-percy/archivos-de-configuracion-para-proyectos-web-/blob/main/.eslintrc.json)

* `.prettierrc.json` Copiar y pegar el contenido que se encuentra en [prettierrc.json](https://github.com/T-percy/archivos-de-configuracion-para-proyectos-web-/blob/main/.prettierrc.json)  

* `.env` Para separar y utilizar información sensible y/o configuraciones específicas del entorno en el que se ejecutará la aplicación.


## Instalar dependencias
* `Paquetes para desarrollo`
```bash
npm i eslint eslint-config-prettier eslint-plugin-prettier prettier nodemon -D
```

* `Otras dependencias necesarias`
```bash
npm i express dotenv multer cors morgan mongoose
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

## Ajustar package.json
1. Configurar `main` y el `scripts` para entorno de desarrollo y producción; lint. 

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

## Control de versiones con git y github
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

## Arquitectura backend (3 capas)
* `carpeta src` 
    * `server.js` >>> CAPA DEL SERVIDOR: comprobar peticiones para que pasen al routes.js o sean rechazadas
    * `Carpeta network` >>> CAPA DE RED
        - `routes.js` ---Comprobar la ruta de la petición para llamar al componente correcto
        - `response.js` ---Gestionar respuestas coherentes ya sean de (exito o error) a las peticiones del cliente.
    * `Carpeta componentes` >>> CAPA DE COMPONENTES
        - `Carpeta componente1` === Contiene archivos del componente
            - `network.js` ---Enviará petición al controlador y devolvera la respuesta al response.js
            - `controller.js` ---Ejecutará las acciones o funciones, segun la petición
            - `store.js` ---Responsable de dónde y cómo se guardará la información
            - `model.js` ---Definir la estructura de los datos, ya sean colecciones o tablas
        - `Carpeta componente...`
    * `Carpeta config` >>> Para configuraciones del proyecto como conexión a BD, etc, o cualquier otra configuración que necesite ser ajustada sin modificar el codigo fuente.
    * `Carpeta utils` >>> Para funciones helpers (ayudantes para tareas repetitivas)
    * `Carpeta public` >>> Para los archivos estaticos (frontend) y subir archivos


## Creando y ejecutando servidor
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
4. Declarar y utilizar middlewares para manejo de aspectos de solicitudes HTTP
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