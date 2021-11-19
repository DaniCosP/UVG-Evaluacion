module.exports = {

    Query: {
        clientes: async (_, __, {dataSources}) => await dataSources.MysqlSource.getClientes(),
        cliente: async (_, {id}, {dataSources}) => await dataSources.MysqlSource.getClienteById({id: id})
    },

    Mutation: {
        createCliente: async(_, {cliente}, {dataSources}) => await dataSources.MysqlSource.createCliente(cliente),
        updateCliente:async(_, {id, cliente}, {dataSources}) => await dataSources.MysqlSource.updateCliente(id,cliente),
        deleteCliente: async(_, {id}, {dataSources}) => await dataSources.MysqlSource.updateCliente(id, {estado: "I"}),
        createProducto: async(_, {producto}, {dataSources}) => await dataSources.MysqlSource.createProducto(producto),
        updateProducto:async(_, {id, producto}, {dataSources}) => await dataSources.MysqlSource.updateProducto(id,producto),
        deleteProducto: async(_, {id}, {dataSources}) => await dataSources.MysqlSource.updateProducto(id, {estado: "I"}),
        createFactura: async(_, {factura}, {dataSources}) => await dataSources.MysqlSource.createFactura(factura),
        updateFactura:async(_, {id, factura}, {dataSources}) => await dataSources.MysqlSource.updateFactura(id,factura),
        deleteFactura: async(_, {id}, {dataSources}) => await dataSources.MysqlSource.updateFactura(id, {estado: "I"})


    }

}