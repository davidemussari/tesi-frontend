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
import { SottrazioneComponent } from './sottrazione/sottrazione.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { InputScomposizioneComponent } from './input-scomposizione/input-scomposizione.component';

import { ImpostazioniGlobaliService } from './services/impostazioni-globali.service';
import { InputSommaAlgebricaComponent } from './input-somma-algebrica/input-somma-algebrica.component';
import { UserApiService } from './services/user-api.service';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';

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
        InputScomposizioneComponent,
        InputSommaAlgebricaComponent,
        LoginComponent
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
    providers: [ImpostazioniGlobaliService, UserApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }
