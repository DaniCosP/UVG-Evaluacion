const { gql } = require("apollo-server");

const typeDefs = gql`

    type Query {
        clientes: [Cliente]
        productos: [Producto]
        facturas: [Factura]
        cliente(id: ID!): Cliente
        producto(id: ID!): Producto
        factura(id: ID!): Factura
    }

    type Mutation {
        createCliente(cliente: ClienteIn): GeneralResponse
        updateCliente(id: ID!, cliente: ClienteIn): GeneralResponse
        deleteCliente(id: ID!): GeneralResponse

        createProducto(producto: ProductoIn): GeneralResponse
        updateProducto(id: ID!, producto: ProductoIn): GeneralResponse
        deleteProducto(id: ID!): GeneralResponse
        
        createFactura(factura: FacturaIn): GeneralResponse
        updateFactura(id: ID!, producto: FacturaIn): GeneralResponse
        deleteFactura(id: ID!): GeneralResponse
    }

    type Cliente {
        idcliente: ID!
        nombres: String
        apellidos: String
        nit: String
        direccion: String
        estado: String
    }

    input ClienteIn {
        nombres: String
        apellidos: String
        nit: String
        direccion: String
    }

    type Producto {
        idproducto: ID!
        nombre: String
        descripcion: String
        precio: Float
        estado: String
    }

    input ProductoIn {
        nombre: String
        descripcion: String
        precio: Float
    }

    type Detalle {
        iddetalle: ID!
        idfactura: Int
        producto: Producto
        cantidad: Int
        subtotal: Float
    }

    type Factura {
        idfactura: ID!
        serie: String
        no: String
        cliente: Cliente
        fecha: String
        total: Float
        estado: String
        detalle: [Detalle]
    }

    input FacturaIn {
        serie: String
        no: String
        idcliente: Int
        fecha: String
        total: Float
    }

    type GeneralResponse{
        codigo: Int
        mensaje: String
    }

`;


module.exports = typeDefs;