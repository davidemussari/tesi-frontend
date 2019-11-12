import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddizioneComponent } from './addizione/addizione.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { InputScomposizioneComponent } from './input-scomposizione/input-scomposizione.component';

import { ImpostazioniGlobaliService } from './services/impostazioni-globali.service';
import {IsloggedService} from './services/islogged.service';
import { InputSommaAlgebricaComponent } from './input-somma-algebrica/input-somma-algebrica.component';
import { UserApiService } from './services/user-api.service';
import { LoginComponent } from './login/login.component';
import { RighePassaggiComponent } from './righe-passaggi/righe-passaggi.component';
import { SommaAlgebricaFiltroPipe } from './pipe/somma-algebrica-filtro.pipe';

const appRoutes: Routes = [
    { path: 'tutorial', component: TutorialComponent },
    { path: 'addizione', component: AddizioneComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        AddizioneComponent,
        TutorialComponent,
        InputScomposizioneComponent,
        InputSommaAlgebricaComponent,
        LoginComponent,
        RighePassaggiComponent,
        SommaAlgebricaFiltroPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClarityModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        NoopAnimationsModule,
        DragDropModule,
        HttpClientModule
    ],
    providers: [ImpostazioniGlobaliService, UserApiService, IsloggedService],
    bootstrap: [AppComponent]
})
export class AppModule { }
