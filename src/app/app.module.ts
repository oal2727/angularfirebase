import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//add modules firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule  } from '@angular/fire/storage';


//
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

//
import { ProductoComponent } from './component/producto/producto.component';
import { ListproductoComponent } from './component/listproducto/listproducto.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    ListproductoComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
