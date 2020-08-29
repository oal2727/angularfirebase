"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductoComponent = void 0;
var core_1 = require("@angular/core");
var uuid_1 = require("uuid");
// import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
var ProductoComponent = /** @class */ (function () {
    function ProductoComponent(firebase) {
        // this.id=firebase.productoForm
        // this.firebase.productoForm = this.firebase.createForm()
        this.firebase = firebase;
    }
    ProductoComponent.prototype.ngOnInit = function () {
    };
    ProductoComponent.prototype.UploadFile = function (e) {
        var _this = this;
        var file = e.target.files[0];
        this.fileimage = file;
        var extension = file.name.split('.')[1].toLowerCase();
        this.firebase.filename = "productos/" + uuid_1.v4() + "." + extension;
        var filereader = new FileReader();
        filereader.onload = function (e) {
            _this.firebase.image = e.target.result;
        };
        filereader.readAsDataURL(file);
    };
    //falta validar archivo
    ProductoComponent.prototype.Cancelar = function () {
        this.firebase.image = null;
        this.firebase.id = null;
        this.firebase.productoForm.reset();
    };
    ProductoComponent.prototype.Crear = function () {
        Object.assign(this.firebase.productoForm.value, { id: this.firebase.id });
        // console.log(this.firebase.productoForm.value)
        if (this.firebase.id === null) {
            delete this.firebase.productoForm.value.id;
            Object.assign(this.firebase.productoForm.value, { filename: this.firebase.filename, file: this.fileimage });
            this.firebase.Add(this.firebase.productoForm.value);
            console.log('agregar');
        }
        else {
            //imagen => downloadUrl | filename => filename.jpg
            Object.assign(this.firebase.productoForm.value, { filename: this.firebase.filename }, { image: this.firebase.image });
            console.log("update");
            this.firebase.Update(this.firebase.productoForm.value);
        }
        // if(this.firebase.productoForm.value)
        // Object.assign(this.firebase.productoForm.value,{filename:this.filename,file:this.fileimage})
        // console.log(this.firebase.productoForm.value)
    };
    ProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-producto',
            templateUrl: './producto.component.html',
            styleUrls: ['./producto.component.css']
        })
    ], ProductoComponent);
    return ProductoComponent;
}());
exports.ProductoComponent = ProductoComponent;
