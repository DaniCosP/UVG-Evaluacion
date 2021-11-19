const { DataSource } = require('apollo-datasource');
const { CreateMysqlSource } = require('../utils');

class MysqlSource extends DataSource {

    constructor({ mysql }) {
        super();
        this.mysql = CreateMysqlSource();
    }

    initialize(config) {
        this.context = config.context;
    }

    async getClientes(){
        const arr = await this.mysql.cliente.findAll({where: {estado: "A"}});
        return arr;
    }

    async createCliente(cliente){
        cliente.estado = "A"
        try{
            await this.mysql.cliente.create(cliente) 
            return {codigo: 0, mensaje: "Creado con exito"};
        }
        catch(ex){
            return {codigo: 0, mensaje: "Ocurrio un error en la creacion"};
        }
    }

    async updateCliente(id, cliente){
        try{
            await this.mysql.cliente.update(cliente, {where: {idcliente: id}}) 
            return {codigo: 0, mensaje: "Operacion ejecutada con exito"};
        }
        catch(ex){
            return {codigo: 0, mensaje: "Ocurrio un error en la operacion"};
        }
    }

    async getProductos(){
        const arr = await this.mysql.cliente.findAll({where: {estado: "A"}});
        return arr;
    }

    async createProducto(producto){
        producto.estado = "A"
        try{
            await this.mysql.producto.create(producto) 
            return {codigo: 0, mensaje: "Creado con exito"};
        }
        catch(ex){
            return {codigo: 0, mensaje: "Ocurrio un error en la creacion"};
        }
    }

    async updateProducto(id, producto){
        try{
            await this.mysql.cliente.update(producto, {where: {idproducto: id}}) 
            return {codigo: 0, mensaje: "Operacion ejecutada con exito"};
        }
        catch(ex){
            return {codigo: 0, mensaje: "Ocurrio un error en la operacion"};
        }
    }

    async getFacturas(){
        const arr = await this.mysql.factura.findAll({where: {estado: "A"}});
        return arr;
    }

    async createFactura(factura){
        factura.estado = "A"
        try{
            await this.mysql.factura.create(factura) 
            return {codigo: 0, mensaje: "Creado con exito"};
        }
        catch(ex){
            return {codigo: 0, mensaje: "Ocurrio un error en la creacion"};
        }
    }

    async updateCliente(id, factura){
        try{
            await this.mysql.factura.update(factura, {where: {idfactura: id}}) 
            return {codigo: 0, mensaje: "Operacion ejecutada con exito"};
        }
        catch(ex){
            return {codigo: 0, mensaje: "Ocurrio un error en la operacion"};
        }
    }


    async getProductoById({ idproducto }) {
        const arr = await this.mysql.producto.findOne({ where: { id: idproducto } });
        return arr;
    }

}

module.exports = MysqlSource;