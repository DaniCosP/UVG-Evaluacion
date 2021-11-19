import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any;
  producto: FormGroup;
  mod: Boolean = false;
  selectedid: any;

  GET_PRODUCTOS = gql`
    query Query {
      productos {
        idproducto
        nombre
        descripcion
        precio
      }
    }
  `;

  GET_PRODUCTO = gql`
  query Query($productoId: ID!) {
    producto(id: $productoId) {
      nombre
      descripcion
      precio
    }
  }
  `;

  CREATE_PRODUCTO = gql`
  mutation Mutation($producto: ProductoIn) {
    createProducto(producto: $producto) {
      codigo
      mensaje
    }
  }
  `;

  UPDATE_PRODUCTO = gql`
  mutation Mutation($updateProductoId: ID!, $producto: ProductoIn) {
    updateProducto(id: $updateProductoId, producto: $producto) {
      codigo
      mensaje
    }
  }
  `;

  DELETE_PRODUCTO = gql`
  mutation Mutation($deleteProductoId: ID!) {
    deleteProducto(id: $deleteProductoId) {
      codigo
      mensaje
    }
  }
  `;


  constructor(private apollo: Apollo, private router: Router) {



  }

  public setMod(modo, idproducto) {
    this.mod = modo;
    this.selectedid = idproducto;
    if (this.mod) {
      this.getProducto(idproducto);
    }
    else {
      this.producto.reset();
    }
  }

  public getProductos() {
    this.apollo.watchQuery({
      query: this.GET_PRODUCTOS
    }).valueChanges.subscribe((result: any) => {
      console.log(result);
      this.productos = result.data.productos;
    });
  }

  public getProducto(id) {
    console.log(id);
    this.apollo.watchQuery({
      query: this.GET_PRODUCTO,
      variables: { productoId: id }
    }).valueChanges.subscribe((result: any) => {

      console.log(result);
      this.producto.controls.nombre.setValue(result.data.producto.nombre);
      this.producto.controls.descripcion.setValue(result.data.producto.descripcion);
      this.producto.controls.precio.setValue(result.data.producto.precio);
    });
  }

  onSubmit() {
    if (this.mod) {
      this.guardarProductoMod();
    }
    else {
      this.guardarProducto();
    }
  }

  public guardarProducto() {
    if (this.producto.valid) {
      console.log(this.producto.value);
      this.apollo.mutate({
        mutation: this.CREATE_PRODUCTO,
        variables: { producto: this.producto.value }
      }).subscribe((result: any) => {
        alert(result.data.createProducto.mensaje);
        this.router.navigate(['productos']);
      })
    }
  }

  public guardarProductoMod() {
    if (this.producto.valid) {
      console.log(this.producto.value);
      console.log(this.selectedid);
      this.apollo.mutate({
        mutation: this.UPDATE_PRODUCTO,
        variables: { updateProductoId: this.selectedid, producto: this.producto.value }
      }).subscribe((result: any) => {
        alert(result.data.updateProducto.mensaje);
        this.router.navigate(['productos']);
      })
    }
  }

  public deleteProducto() {
      this.apollo.mutate({
        mutation: this.DELETE_PRODUCTO,
        variables: { deleteProductoId: this.selectedid }
      }).subscribe((result: any) => {
        alert(result.data.deleteProducto.mensaje);
        this.router.navigate(['productos']);
      })    
  }

  ngOnInit(): void {
    this.getProductos()
    this.producto = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('([A-Z]|[a-z]|(á|é|í|ó|ú)|(Á|É|Í|Ó|Ú|ñ|Ñ|ä|ë|ï|ö|ü|Ä|Ë|Ï|Ö|Ü))(\\s|[A-Z]|[a-z]|(á|é|í|ó|ú)|(Á|É|Í|Ó|Ú|ñ|Ñ|ä|ë|ï|ö|ü|Ä|Ë|Ï|Ö|Ü))+([A-Z]|[a-z]|(á|é|í|ó|ú)|(Á|É|Í|Ó|Ú|ñ|Ñ|ä|ë|ï|ö|ü|Ä|Ë|Ï|Ö|Ü))')]),
      descripcion: new FormControl('', [Validators.maxLength(20), Validators.pattern('([A-Z]|[a-z]|(á|é|í|ó|ú)|(Á|É|Í|Ó|Ú|ñ|Ñ|ä|ë|ï|ö|ü|Ä|Ë|Ï|Ö|Ü))(\\s|[A-Z]|[a-z]|(á|é|í|ó|ú)|(Á|É|Í|Ó|Ú|ñ|Ñ|ä|ë|ï|ö|ü|Ä|Ë|Ï|Ö|Ü))+([A-Z]|[a-z]|(á|é|í|ó|ú)|(Á|É|Í|Ó|Ú|ñ|Ñ|ä|ë|ï|ö|ü|Ä|Ë|Ï|Ö|Ü))')]),
      precio: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    });
  }

}
