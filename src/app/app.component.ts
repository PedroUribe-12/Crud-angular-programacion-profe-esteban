import { Component, OnInit } from '@angular/core';
import { Producto } from './models/producto';
import { ProductosService } from './servicios/productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crudAngular';
  constructor(private servicioProductos:ProductosService){

  }
  ngOnInit(){
    this.servicioProductos.getProductos().subscribe(producto=>{
      console.log(producto)
    })
  }
  agregarProducto(){
    let nuevoProducto:Producto ={
      nombre:'lampara',
      precio:2000,
      idProducto:'',
      descripcion:'lampara de bajo consumo'
    }
    this.servicioProductos.createProducto(nuevoProducto).then(producto=>{
      alert('producto agragado')
    })
    .catch(error=>{
      alert('Ocurrio un error\nError: '+ error)
    })
  }
}
