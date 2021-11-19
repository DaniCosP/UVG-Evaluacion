const { Sequelize } = require('sequelize');

module.exports.CreateMysqlSource = () => {

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

    const cliente = db.define('cliente', {
        idcliente: { type: Sequelize.INTEGER, primaryKey: true },
        nombres: Sequelize.STRING,
        apellidos: Sequelize.STRING,
        nit: Sequelize.STRING,
        direccion: Sequelize.STRING,
        estado: Sequelize.STRING
    },
        {
            freezeTableName: true,
            createdAt: false,
            updatedAt: false
        }
    )

    const producto = db.define('producto', {
        idproducto: { type: Sequelize.INTEGER, primaryKey: true },
        nombre: Sequelize.STRING,
        descripcion: Sequelize.STRING,
        precio: Sequelize.DECIMAL(10,2),
        estado: Sequelize.STRING
    },
        {
            freezeTableName: true,
            createdAt: false,
            updatedAt: false
        }
    )

    const factura = db.define('factura', {
        idfactura: { type: Sequelize.INTEGER, primaryKey: true },
        serie: Sequelize.STRING,
        no: Sequelize.STRING,
        idcliente: Sequelize.INTEGER,
        fecha: Sequelize.STRING,
        total: Sequelize.DECIMAL(10,2),
        estado: Sequelize.STRING
    },
        {
            freezeTableName: true,
            createdAt: false,
            updatedAt: false
        }
    )

    return { db, cliente, producto, factura };
};