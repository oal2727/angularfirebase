import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {FirestoreService} from '../../service/firestore.service'
// import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  imagen:Array<any[]>;
  // image:string=this.firebase.imagePath;
  // public productoForm:FormGroup;
  //
  // filename:string;
  fileimage:Object
  constructor(public firebase:FirestoreService) {
    // this.id=firebase.productoForm
    // this.firebase.productoForm = this.firebase.createForm()

   }

  ngOnInit(): void {

  }

  UploadFile(e){
    const file = e.target.files[0]
    this.fileimage=file
    const extension = file.name.split('.')[1].toLowerCase()
     this.firebase.filename = `${uuidv4()}.${extension}`
     const filereader = new FileReader();
     filereader.onload = (e)=>{
      this.firebase.image=e.target.result as string
    }
    filereader.readAsDataURL(file)
  }
  //falta validar archivo
  
  Cancelar(){
    this.firebase.Clear()
  }
  Crear(){
    Object.assign(this.firebase.productoForm.value,{id:this.firebase.id})
      // console.log(this.firebase.productoForm.value)

      if(this.firebase.id === null){
        delete this.firebase.productoForm.value.id
        Object.assign(this.firebase.productoForm.value,{filename:this.firebase.filename,file:this.fileimage})
        this.firebase.Add(this.firebase.productoForm.value)
        console.log('agregar')
      }else{
        //imagen => downloadUrl | filename => filename.jpg
        Object.assign(this.firebase.productoForm.value,{filename:this.firebase.filename},{imageUrl:this.firebase.urlimage},{file:this.fileimage})
        console.log("update")
        this.firebase.Update(this.firebase.productoForm.value)
      }
      // if(this.firebase.productoForm.value)
    // Object.assign(this.firebase.productoForm.value,{filename:this.filename,file:this.fileimage})
    // console.log(this.firebase.productoForm.value)
  }
  

}
