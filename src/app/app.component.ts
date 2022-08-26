import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from './models/producto';
import { ProductosService } from './servicios/productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crudAngular';
  productos!: Producto[];
  modalVisible: boolean = false;
  nuevoProducto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required)
  })
  constructor(private servicioProductos: ProductosService) {

  }
  ngOnInit() {
    this.servicioProductos.getProductos().subscribe(producto => {
      this.productos = producto;
    })
  }
  agregarProducto() {
    if (this.nuevoProducto.valid) {
      let nuevoProducto: Producto = {
        nombre: this.nuevoProducto.value.nombre!,
        precio: this.nuevoProducto.value.precio!,
        idProducto: '',
        descripcion: this.nuevoProducto.value.descripcion!
      }
      this.servicioProductos.createProducto(nuevoProducto).then(producto => {
        alert('producto agragado')
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
  }
}
