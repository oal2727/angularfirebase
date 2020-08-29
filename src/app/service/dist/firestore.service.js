"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.FirestoreService = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FirestoreService = /** @class */ (function () {
    //mentalidad si usaba clases si saldria el editar
    //sin embargo tendre que darle uso a formgroup
    //variable imagen nueva
    //variable imagen vieja 
    function FirestoreService(fb, firestore, storage) {
        this.fb = fb;
        this.firestore = firestore;
        this.storage = storage;
        this.id = null;
        this.image = null; //imagen mediante en base64|url upload file o imageUrl
        //opcion 3
        this.productoForm = this.createForm();
        //no obtengo el id T_T | pero si añado {idField:'id'}
        this.ItemDoc = firestore.collection("producto");
        this.items = this.ItemDoc.valueChanges({ idField: 'id' });
        // this.items.forEach((element)=>{
        //   console.log('constructor data',element)
        // })
    }
    FirestoreService.prototype.createForm = function () {
        return new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(5)]),
            categoria: new forms_1.FormControl('', [forms_1.Validators.required]),
            descripcion: new forms_1.FormControl('', [forms_1.Validators.required]),
            precio: new forms_1.FormControl('', [forms_1.Validators.required]),
            stock: new forms_1.FormControl('', [forms_1.Validators.required])
        });
    };
    FirestoreService.prototype.Add = function (item) {
        var _this = this;
        console.log(item);
        this.cloudStorage(item.filename);
        //actualmmente esta definido el filename => productos/897.jpg
        //atnteriorente solo envia el nombre del filname => 89.jpg
        var ref = this.cloudStorage(item.filename);
        var progress = this.sendCloudStorage(item.filename, item.file);
        progress.percentageChanges().subscribe(function (porcentaje) {
            _this.uploadPercent = Math.round(porcentaje);
            console.log(_this.uploadPercent);
            if (porcentaje == 100) {
                console.log("finalizado");
                ref.getDownloadURL().subscribe(function (URL) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                delete item.file;
                                return [4 /*yield*/, Object.assign(item, { 'imageUrl': URL })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, this.ItemDoc.add(item)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
        });
    };
    FirestoreService.prototype.DeleteProduct = function (item) {
        var _this = this;
        this.cloudStorage(item.filename)["delete"]().subscribe(function () {
            _this.ItemDoc.doc(item.id)["delete"]();
        });
    };
    FirestoreService.prototype.EditarProduct = function (item) {
        this.id = item.id;
        this.image = item.imageUrl; //image mantenible
        this.filename = item.filename;
        this.oldimage = item.filename; //imagen vieja para pdoer actualizar
        this.productoForm.patchValue({
            nombre: item.nombre,
            categoria: item.categoria,
            descripcion: item.descripcion,
            precio: item.precio,
            stock: item.stock
        });
    };
    FirestoreService.prototype.Update = function (item) {
        console.log(item);
        //maneras de verificar el url solo obtengo el url existente
        this.cloudStorage(item.filename).getDownloadURL();
    };
    FirestoreService.prototype.cloudStorage = function (nombreArchivo) {
        return this.storage.ref(nombreArchivo);
    };
    FirestoreService.prototype.sendCloudStorage = function (nombreArchivo, datos) {
        return this.storage.upload(nombreArchivo, datos);
    };
    FirestoreService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FirestoreService);
    return FirestoreService;
}());
exports.FirestoreService = FirestoreService;
