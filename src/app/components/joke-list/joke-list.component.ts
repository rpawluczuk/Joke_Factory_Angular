import { Component, OnInit } from '@angular/core';
import { JokeService } from 'src/app/services/joke.service';
import { Joke } from 'src/app/common/joke';
import { ActivatedRoute } from '@angular/router';
import { MaterialJoke } from 'src/app/common/material-joke';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list-div.component.html',
  styleUrls: ['./joke-list.component.css']
})
export class JokeListComponent implements OnInit {

  jokes: Joke[] = [];
  currentStructureId: number = 1;
  previousStructureId: number = 1;
  searchMode: boolean = false;

  //properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = null;

  deleteMessage = false;

  constructor(private jokeService: JokeService,
              private materialService: MaterialService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listJokes();
    })
  }

  listJokes() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchJokes();
    }
    else {
      this.handleListJokes();
    }
  }

  handleSearchJokes(){
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    // if the keyword is deiferrent than previos then set thePageNumber to 1
    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // search for the jokes using keyword
    this.jokeService.searchJokesPaginate(this.thePageNumber - 1,
      this.thePageSize,
      theKeyword).subscribe(this.processResult());
  }

  handleListJokes(){
    const hasStructureId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasStructureId){
      this.currentStructureId = +this.route.snapshot.paramMap.get('id');
    } 
    else {
      this.currentStructureId = 1;
    }

    //if we have different structure id than previous then set thePageNumber back to 1
    if (this.previousStructureId != this.currentStructureId) {
      this.thePageNumber = 1;
    }

    this.previousStructureId = this.currentStructureId;
    console.log(`currentStructureId=${this.currentStructureId}, thePageNumber=${this.thePageNumber}`);

    this.jokeService.getJokeListPaginate(this.thePageNumber - 1,
                                         this.thePageSize,
                                         this.currentStructureId)
                                         .subscribe(this.processResult());
  }

  processResult(){
    return data => {
      this.jokes = data._embedded.jokes;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  updatePageSize(pageSize: number){
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listJokes();
  }

  addToMaterial(theJoke: Joke) {
    
    console.log(`Adding to material: ${theJoke.title}`);

    const theMaterialJoke = new MaterialJoke(theJoke);

    this.materialService.addToMaterial(theMaterialJoke);
  }

  deleteJoke(id: number) {  
    this.jokeService.deleteJoke(id)  
      .subscribe(  
        data => {  
          console.log(data);  
          this.deleteMessage=true;  
          this.jokeService.getJokeList().subscribe(data =>{  
            this.jokes =data  
            })  
        },  
        error => console.log(error));  
  }  
}
