import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';

import { DndModule } from 'ngx-drag-drop';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddizioneComponent } from './addizione/addizione.component';
import { SottrazioneComponent } from './sottrazione/sottrazione.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { InputScomposizioneComponent } from './input-scomposizione/input-scomposizione.component';

const appRoutes: Routes = [
	{ path: 'tutorial', component: TutorialComponent },
  { path: 'allenamento/addizione', component: AddizioneComponent },
  { path: 'allenamento/sottrazione', component: SottrazioneComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AddizioneComponent,
    SottrazioneComponent,
    TutorialComponent,
    InputScomposizioneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
	DndModule,
	FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
