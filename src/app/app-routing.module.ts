import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorialComponent } from './tutorial/tutorial.component';
import { LoginComponent } from './login/login.component';
import { IsloggedService } from './services/islogged.service';
import { AddizioneComponent } from './addizione/addizione.component';
import { GrigliaEserciziSvoltiComponent } from './griglia-esercizi-svolti/griglia-esercizi-svolti.component';

const routes: Routes = [
    {path: 'tutorial', component: TutorialComponent, canActivate: [IsloggedService]},
    {path: 'addizione', component: AddizioneComponent, canActivate: [IsloggedService]},
    {path: 'esercizi_svolti', component: GrigliaEserciziSvoltiComponent, canActivate: [IsloggedService]},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


