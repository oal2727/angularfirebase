"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListproductoComponent = void 0;
var core_1 = require("@angular/core");
var ListproductoComponent = /** @class */ (function () {
    function ListproductoComponent(producto) {
        this.producto = producto;
    }
    //definir un subscribe
    // Cannot find a differ supporting object '[object Object]'
    // of type 'object'.
    // NgFor only supports binding to Iterables such as Array
    ListproductoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.producto.items.subscribe(function (e) {
            _this.productos = e;
        });
    };
    ListproductoComponent.prototype.Delete = function (item) {
        console.log(item);
        this.producto.DeleteProduct(item);
    };
    ListproductoComponent.prototype.Editar = function (item) {
        this.producto.EditarProduct(item);
    };
    ListproductoComponent = __decorate([
        core_1.Component({
            selector: 'app-listproducto',
            templateUrl: './listproducto.component.html',
            styleUrls: ['./listproducto.component.css']
        })
    ], ListproductoComponent);
    return ListproductoComponent;
}());
exports.ListproductoComponent = ListproductoComponent;
