import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Platillo } from './models/platillo';
import { PlatillosService } from './servicios/platillos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crudAngular';
  platillos!: Platillo[];
  modalVisible: boolean = false;
  textoBoton!:string;
  platilloSeleccionado!:Platillo;
  eliminarVisible : boolean = false;

  nuevoPlatillo= new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required)
  })
  constructor(private servicioPlatillos: PlatillosService) {
  }

  ngOnInit() {
    this.servicioPlatillos.getPlatillos().subscribe(platillo => {
      this.platillos = platillo;
    })
  }

  agregarPlatillo() {
    if (this.nuevoPlatillo.valid) {
      let nuevoPlatillo: Platillo = {
        nombre: this.nuevoPlatillo.value.nombre!,
        precio: this.nuevoPlatillo.value.precio!,
        idPlatillo: '',
        descripcion: this.nuevoPlatillo.value.descripcion!
      }
      this.servicioPlatillos.createProducto(nuevoPlatillo).then(platillo => {
        alert('platillo agregado')
      })
        .catch(error => {
          alert('Ocurrio un error\nError: ' + error)
        })
    }else{
      alert('asergrdfhdrtyjrtherror')
    }

  }
  mostrarDialogo() {
    this.modalVisible = true;
    this.textoBoton='Agregar Platillo'
  }
  mostrarEditar(productoSeleccionado:Platillo){
    this.platilloSeleccionado=productoSeleccionado;

    this.nuevoPlatillo.setValue({
      nombre:productoSeleccionado.nombre,
      precio:productoSeleccionado.precio,
      descripcion:productoSeleccionado.descripcion
    })

    this.textoBoton= 'Actualizar Platillo'
    this.modalVisible = true;
  }
  actualizarPlatillo(){
    let nuevoPlatillo: Platillo = {

      nombre: this.nuevoPlatillo.value.nombre!,
      precio: this.nuevoPlatillo.value.precio!,
      idPlatillo: this.platilloSeleccionado.idPlatillo,
      descripcion: this.nuevoPlatillo.value.descripcion!

    }
    this.servicioPlatillos.editarProducto(this.platilloSeleccionado.idPlatillo, nuevoPlatillo).then((resp)=>{
      alert('Platillo Actualizado con exito')
    })
    .catch((error)=>{
      alert('No se pudo actualizar el platillo \n Error: '+error)
    })
  }

  cargarPlatillo(){
    if(this.textoBoton==='Agregar Platillo'){
      this.agregarPlatillo()
    }else if(this.textoBoton==='Actualizar Platillo'){
      this.actualizarPlatillo()
    }
  }

  eliminarPlatillo(){
    this.servicioPlatillos.eliminarPlatillo(this.platilloSeleccionado.idPlatillo).then((resp) =>{
      alert('El producto fue elimando con exito');
    })
    .catch((err)=>{
      alert('No se pudo eliminar el platillo\nError: '+err)
    });
    this.eliminarVisible = false;
  }

  mostrarEliminar(platillo:Platillo){
    this.eliminarVisible = true;
    this.platilloSeleccionado = platillo;
  }
}
