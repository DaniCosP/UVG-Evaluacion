import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: any;
  cliente: FormGroup;
  mod: Boolean = false;
  selectedid: any;

  GET_CLIENTES = gql`
    query Query {
      clientes {
        idcliente
        nombres
        apellidos
        nit
        direccion
      }
    }
  `;

  GET_CLIENTE = gql`
  query Query($clienteId: ID!) {
    cliente(id: $clienteId) {
      nombres
      apellidos
      nit
      direccion
    }
  }
  `;

  CREATE_CLIENTE = gql`
  mutation Mutation($cliente: ClienteIn) {
    createCliente(cliente: $cliente) {
      codigo
      mensaje
    }
  }
  `;

  UPDATE_CLIENTE = gql`
  mutation Mutation($updateClienteId: ID!, $cliente: ClienteIn) {
    updateCliente(id: $updateClienteId, cliente: $cliente) {
      codigo
      mensaje
    }
  }
  `;

  DELETE_CLIENTE = gql`
  mutation Mutation($deleteClienteId: ID!) {
    deleteCliente(id: $deleteClienteId) {
      codigo
      mensaje
    }
  }
  `;


  constructor(private apollo: Apollo, private router: Router) {



  }

  public setMod(modo, idcliente) {
    this.mod = modo;
    this.selectedid = idcliente;
    if (this.mod) {
      this.getCliente(idcliente);
    }
    else {
      this.cliente.reset();
    }
  }

  public getClientes() {
    this.apollo.watchQuery({
      query: this.GET_CLIENTES
    }).valueChanges.subscribe((result: any) => {
      console.log(result);
      this.clientes = result.data.clientes;
    });
  }

  public getCliente(id) {
    console.log(id);
    this.apollo.watchQuery({
      query: this.GET_CLIENTE,
      variables: { clienteId: id }
    }).valueChanges.subscribe((result: any) => {

      console.log(result);
      this.cliente.controls.nombres.setValue(result.data.cliente.nombres);
      this.cliente.controls.apellidos.setValue(result.data.cliente.apellidos);
      this.cliente.controls.nit.setValue(result.data.cliente.nit);
      this.cliente.controls.direccion.setValue(result.data.cliente.direccion);
    });
  }

  onSubmit() {
    if (this.mod) {
      this.guardarClienteMod();
    }
    else {
      this.guardarCliente();
    }
  }

  public guardarCliente() {
    if (this.cliente.valid) {
      console.log(this.cliente.value);
      this.apollo.mutate({
        mutation: this.CREATE_CLIENTE,
        variables: { cliente: this.cliente.value }
      }).subscribe((result: any) => {
        alert(result.data.createCliente.mensaje);
        this.router.navigate(['clientes']);
      })
    }
  }

  public guardarClienteMod() {
    if (this.cliente.valid) {
      console.log(this.cliente.value);
      console.log(this.selectedid);
      this.apollo.mutate({
        mutation: this.UPDATE_CLIENTE,
        variables: { updateClienteId: this.selectedid, cliente: this.cliente.value }
      }).subscribe((result: any) => {
        alert(result.data.updateCliente.mensaje);
        this.router.navigate(['clientes']);
      })
    }
  }

  public deleteCliente() {
      this.apollo.mutate({
        mutation: this.DELETE_CLIENTE,
        variables: { deleteClienteId: this.selectedid }
      }).subscribe((result: any) => {
        alert(result.data.deleteCliente.mensaje);
        this.router.navigate(['clientes']);
      })    
  }

  ngOnInit(): void {
    this.getClientes()
    this.cliente = new FormGroup({
      nombres: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('([A-Z]|[a-z]|(á|é|í|ó|ú)|(Á|É|Í|Ó|Ú|ñ|Ñ|ä|ë|ï|ö|ü|Ä|Ë|Ï|Ö|Ü))(\\s|[A-Z]|[a-z]|(á|é|í|ó|ú)|(Á|É|Í|Ó|Ú|ñ|Ñ|ä|ë|ï|ö|ü|Ä|Ë|Ï|Ö|Ü))+([A-Z]|[a-z]|(á|é|í|ó|ú)|(Á|É|Í|Ó|Ú|ñ|Ñ|ä|ë|ï|ö|ü|Ä|Ë|Ï|Ö|Ü))')]),
      apellidos: new FormControl('', [Validators.maxLength(20), Validators.pattern('([A-Z]|[a-z]|(á|é|í|ó|ú)|(Á|É|Í|Ó|Ú|ñ|Ñ|ä|ë|ï|ö|ü|Ä|Ë|Ï|Ö|Ü))(\\s|[A-Z]|[a-z]|(á|é|í|ó|ú)|(Á|É|Í|Ó|Ú|ñ|Ñ|ä|ë|ï|ö|ü|Ä|Ë|Ï|Ö|Ü))+([A-Z]|[a-z]|(á|é|í|ó|ú)|(Á|É|Í|Ó|Ú|ñ|Ñ|ä|ë|ï|ö|ü|Ä|Ë|Ï|Ö|Ü))')]),
      nit: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      direccion: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });
  }



}
