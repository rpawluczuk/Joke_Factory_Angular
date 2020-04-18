import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JokeListComponent } from './components/joke-list/joke-list.component';
import { StructureListComponent } from './components/structure-list/structure-list.component';
import { HttpClientModule } from '@angular/common/http';
import { JokeService } from './services/joke.service';

import { Routes, RouterModule} from '@angular/router';
import { StructureService } from './services/structure.service';
const routes: Routes = [ 
  {path: 'structure/:id', component: JokeListComponent},
  {path: 'structure', component: JokeListComponent},
  {path: 'jokes', component: JokeListComponent},
  {path: '', redirectTo: '/jokes', pathMatch: 'full'},
  {path: '**', redirectTo: '/jokes', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    JokeListComponent,
    StructureListComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [JokeService, StructureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
