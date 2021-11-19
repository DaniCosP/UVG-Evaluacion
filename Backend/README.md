# Repositorio

Clonacion de repositorio
```
git clone https://github.com/DaniCosP/UVG-Evaluacion.git
```

## FrontEnd Instalacion

Carpeta Back End
```
cd BackEnd
```

Instalacion de node modules

```
npm install
```

Modificar credenciales de mysql en el archivo utils.js


    const db = new Sequelize(
        'uvgevaluacion',
        'root',
        'root',
        {
            dialect: 'mysql',
            host: 'localhost',
            port: 3306
        }
    );

## Uso

Correr la aplicacion
```
node index.js
```
