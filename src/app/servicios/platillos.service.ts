import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { async } from '@firebase/util';
import { map } from 'rxjs/operators';
import { Platillo } from '../models/platillo';

@Injectable({
  providedIn: 'root'
})
export class PlatillosService {

  private coleccionPlatillos!: AngularFirestoreCollection<Platillo>

  getPlatillos() {
    return this.coleccionPlatillos.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())));
  }
  constructor(private db: AngularFirestore) {
    this.coleccionPlatillos = db.collection('platillos')
  }
  createProducto(nuevoPlatillo: Platillo) {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.db.createId();
        nuevoPlatillo.idPlatillo = id;
        const respuesta = await this.coleccionPlatillos.doc(id).set(nuevoPlatillo);
        resolve(respuesta)
        //this.db.collection('productos').add(nuevoProducto)
      }
      catch (error) {
        reject(error)
      }
    })


  }
  editarProducto(idPlatillo:string, nuevosDatos:Platillo){
   return this.coleccionPlatillos.doc(idPlatillo).update(nuevosDatos)
  }

  eliminarPlatillo(idPlatillo:string){

    return new Promise(async(resolve, reject) => {
      try{
        const respuesta = await this.coleccionPlatillos.doc(idPlatillo).delete();
        resolve(respuesta);
      }
      catch(error){
        reject(error);
      }
    })
  }
}
