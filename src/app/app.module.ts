import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
//import {  } from '@clr/angular/utils/drag-and-drop';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddizioneComponent } from './addizione/addizione.component';
import { SottrazioneComponent } from './sottrazione/sottrazione.component';

const appRoutes: Routes = [
  { path: 'allenamento/addizione', component: AddizioneComponent },
  { path: 'allenamento/sottrazione', component: SottrazioneComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AddizioneComponent,
    SottrazioneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
