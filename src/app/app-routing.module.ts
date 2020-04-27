import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokeDetailsComponent } from './components/joke-details/joke-details.component';
import { JokeListComponent } from './components/joke-list/joke-list.component';
import { StructureListComponent } from './components/structure-list/structure-list.component';
import { Routes, RouterModule } from '@angular/router';
import { AddJokeComponent } from './components/add-joke/add-joke.component';

const routes: Routes = [ 
  {path: 'jokes/:id', component: JokeDetailsComponent},
  {path: 'search/:keyword', component: JokeListComponent},
  {path: 'structure/:id', component: JokeListComponent},
  {path: 'structure', component: JokeListComponent},
  {path: 'jokes', component: JokeListComponent},
  {path: 'add-joke', component: AddJokeComponent},
  {path: 'structures', component: StructureListComponent},
  {path: '', redirectTo: '/jokes', pathMatch: 'full'},
  {path: '**', redirectTo: '/jokes', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
