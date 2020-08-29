import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../../service/firestore.service'
import {Producto} from '../../models/Producto'

@Component({
  selector: 'app-listproducto',
  templateUrl: './listproducto.component.html',
  styleUrls: ['./listproducto.component.css']
})
export class ListproductoComponent implements OnInit {

  constructor(public producto:FirestoreService) { }

  //diferencia entre get y valuechanges

    // this.producto.getProdutos()
    // this.producto.items.forEach((element)=>{
    //   console.log(element)
    // })
  productos:Array<Producto>
    //definir un subscribe
    // Cannot find a differ supporting object '[object Object]'
    // of type 'object'.
    // NgFor only supports binding to Iterables such as Array
  ngOnInit(): void {
    this.producto.items.subscribe(e => {
      this.productos=e
    })

  }
  Delete(item){
    this.producto.DeleteProduct(item)
  }
  Editar(item){
    this.producto.EditarProduct(item)
  }
}
