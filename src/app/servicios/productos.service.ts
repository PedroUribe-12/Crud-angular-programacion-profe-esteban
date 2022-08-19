import { Injectable } from '@angular/core';
import {AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import {Producto} from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private coleccionProductos! : AngularFirestoreCollection<Producto>

  getProductos(){
    this.coleccionProductos.snapshotChanges();
  }
  constructor() {

   }
}
