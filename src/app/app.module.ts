import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

// Must export the config

export const firebaseConfig = {
  apiKey: "AIzaSyC4hyCewirWy-NCeo3rlF6bW-iTg45GVcM",
  authDomain: "business-contacts-26262.firebaseapp.com",
  databaseURL: "https://business-contacts-26262.firebaseio.com",
  storageBucket: "business-contacts-26262.appspot.com",
  messagingSenderId: "479982237042"
};



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    HttpModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
