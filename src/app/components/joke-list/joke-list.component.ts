import { Component, OnInit } from '@angular/core';
import { JokeService } from 'src/app/services/joke.service';
import { Joke } from 'src/app/common/joke';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private jokeService: JokeService,
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

    this.jokeService.searchJokes(theKeyword).subscribe(
      data => {
        this.jokes = data;
      }
    )
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
}
