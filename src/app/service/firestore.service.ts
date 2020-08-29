import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection   } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import {Producto} from '../models/Producto'
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  //uso collection
  // El servicio AngularFirestoreDocument es un contenedor alrededor del tipo 
  //DocumentReference del SDK nativo de Firestore.
  // Este servicio está diseñado para usarse como @Injectable ().

  private ItemDoc: AngularFirestoreCollection<Producto>;
  //definir el item interprentando el interfaz
  public items:Observable<Producto[]>
  downloadURL: Observable<string>;
  public id:string=null;
  public productoForm:FormGroup;


  public image:string=null; //imagen mediante en base64|url upload file o imageUrl
  public urlimage:string=null;  


  public filename:string; //nombre de la imagen
  public oldimage:string; //imagen vieja para poder actualizar

  uploadPercent:number;
  //mentalidad si usaba clases si saldria el editar
  constructor(private fb:FormBuilder,private firestore: AngularFirestore,private storage: AngularFireStorage ) {  
    //opcion 3
    this.productoForm = this.createForm()
    //no obtengo el id T_T | pero si añado {idField:'id'}
    this.ItemDoc = firestore.collection<Producto>("producto")
    this.items = this.ItemDoc.valueChanges({idField:'id'});
  }
  createForm(){
    return new FormGroup({
      nombre:new FormControl('',[Validators.required,Validators.minLength(5)]),
      categoria:new FormControl("null",[Validators.required]),
      descripcion:new FormControl('',[Validators.required]),
      precio:new FormControl('',[Validators.required]),
      stock:new FormControl('',[Validators.required]),
    })
  }
  


  Add(item){
    console.log(item)
    const ref = this.cloudStorage(item.filename)
    const progress = this.sendCloudStorage(item.filename,item.file)
    progress.percentageChanges().subscribe(porcentaje => {
      this.uploadPercent=Math.round(porcentaje)
      console.log(this.uploadPercent)
      if(porcentaje == 100){
        console.log("finalizado")
        ref.getDownloadURL().subscribe(async (URL) => {
          delete item.file
          await Object.assign(item,{'imageUrl':URL})
         await console.log(item)
         await this.ItemDoc.add(item).then(()=>{
           console.log("guardado")
           this.Clear()
         })
        
        })
      }
  })
  }
  DeleteProduct(item:any){
    this.cloudStorage(item.filename).delete().subscribe(()=>{
      this.ItemDoc.doc(item.id).delete()
    })
  }
  EditarProduct(item:any){
    this.id=item.id
    this.image=item.imageUrl //image mantenible
    this.filename=item.filename
    this.urlimage=item.imageUrl
    this.oldimage = item.filename //imagen vieja para pdoer actualizar
    this.productoForm.patchValue({
      nombre:item.nombre,
      categoria:item.categoria,
      descripcion:item.descripcion,
      precio:item.precio,
      stock:item.stock,
    })
  }
  Update(item){
    const param={
      nombre:item.nombre,
      precio:item.precio,
      stock:item.stock,
      descripcion:item.descripcion,
      categoria:item.categoria,
      filename:item.filename,
      imageUrl:item.imageUrl
    }
  //  this.ItemDoc.doc(item.id).update(param)
  
  // const cloudStore = this.cloudStorage
  const $this=this
    this.cloudStorage(item.filename).getDownloadURL().subscribe(onResolve, onReject);
    async function onResolve(){
      console.log("existe imagen")
     await $this.ItemDoc.doc(item.id).update(param)
     $this.Clear()
    }
    function onReject(){
      console.log("no existe imagen")
      //delete file me falta
      console.log($this.oldimage)
      $this.cloudStorage($this.oldimage).delete().subscribe(()=>{
        console.log("delete sucessfull")
        const ref = $this.cloudStorage(item.filename)
        const progress = $this.sendCloudStorage(item.filename,item.file)
        progress.percentageChanges().subscribe(porcentaje => {
          this.uploadPercent=Math.round(porcentaje)
          console.log(this.uploadPercent)
          if(porcentaje == 100){
            console.log("finalizado")
            ref.getDownloadURL().subscribe(async (URL) => {
              //guardar
              await Object.assign(param,{'imageUrl':URL})
             await $this.ItemDoc.doc(item.id).update(param).then(()=>{
              console.log("actualizado correctamente")  
              $this.Clear()
             })
            })
          }
      })
      })
    }
  }

  Clear(){
    this.image=null
    this.id=null
    this.productoForm.reset()
    this.productoForm.value.categoria=""
  }

  cloudStorage(nombreArchivo: string) {
    return this.storage.ref(`productos/${nombreArchivo}`,)
  }


  sendCloudStorage(nombreArchivo: string, datos: any) {
      return this.storage.upload(`productos/${nombreArchivo}`, datos)
  }
  //opcion 1
  // nombreCollection:string="producto"
  // getProdutos(){
  //   this.firestore.collection<Producto>(this.nombreCollection).get().subscribe(e => {
  //    const data = e.docs.map(item => ({id:item.id,...item.data()}))
  //    console.log(data)
  //  })
  // }

  //opcion 2 
  // getProdutos(){
  //   this.item=this.firestore.collection("producto").valueChanges();
  //   this.item.forEach((element)=>{
  //     console.log(element)
  //   })
  // }

 

}
