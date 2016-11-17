CAEA
=============

## Prerrequisitos
Asegurate de tener instalados todos los siguientes prerrequisitos en tu computador:
* Git - [Descargar e Instalar git](https://git-scm.com/downloads)
* Node.js - [Descargar e instalar Nodejs](https://nodejs.org/en/download/) y el administrador de paquetes npm.
* MySQL - [Descargar e Instalar MySQL](https://www.mysql.com/downloads/)
* Bower - Debes instalar [Bower Package Manager](http://bower.io/) para instalar las dependencias públicas del proyecto. Asegurate de tener instalado Node.js y npm primero, luego instala bower globalmente utilizando npm:

```
$ npm install -g bower
```

##Instalación

Ejecutar los siguientes comandos en la terminal

Clonar repositorio github
```
git clone https://github.com/rodrigolagos/caea.git caea
```

Posicionarse en la carpeta del proyecto
```
cd caea
```

Instalar dependencias del proyecto
```
npm install
```

Instalar librerías públicas del proyecto
```
bower install
```

Editar el archivo “server/config/config.example.js”

+ Establecer los datos de la conexión mysql
+ Guardar el archivo como "config.js"

Ejecutar el software
```
node server.js
```
