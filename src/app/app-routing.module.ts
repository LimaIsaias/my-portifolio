import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GerenciaProjetoComponent } from './gerencia-projeto/gerencia-projeto.component';
import { ContatoComponent } from './contato/contato.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  { path: 'contato', component: ContatoComponent},
  { path: 'gerencia-projeto', component: GerenciaProjetoComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
