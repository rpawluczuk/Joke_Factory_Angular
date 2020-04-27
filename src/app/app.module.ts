import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JokeListComponent } from './components/joke-list/joke-list.component';
import { StructureListComponent } from './components/structure-list/structure-list.component';
import { HttpClientModule } from '@angular/common/http';
import { JokeService } from './services/joke.service';

import { Routes, RouterModule} from '@angular/router';
import { StructureService } from './services/structure.service';
import { SearchComponent } from './components/search/search.component';
import { JokeDetailsComponent } from './components/joke-details/joke-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialStatusComponent } from './components/material-status/material-status.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';  
import { AddJokeComponent } from './components/add-joke/add-joke.component';

@NgModule({
  declarations: [
    AppComponent,
    JokeListComponent,
    StructureListComponent,
    SearchComponent,
    JokeDetailsComponent,
    MaterialStatusComponent,
    AddJokeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    ReactiveFormsModule, 
    HttpClientModule,
    DataTablesModule, 
    NgbModule
  ],
  providers: [JokeService, StructureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
