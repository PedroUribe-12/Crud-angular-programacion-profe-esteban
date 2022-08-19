import { Component, OnInit } from '@angular/core';
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
    this.servicioProductos.getProductos()
  }
}
