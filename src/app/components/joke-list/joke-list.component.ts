import { Component, OnInit } from '@angular/core';
import { JokeService } from 'src/app/services/joke.service';
import { Joke } from 'src/app/common/joke';

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list-div.component.html',
  // templateUrl: './joke-list-table.component.html',
  // templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.css']
})
export class JokeListComponent implements OnInit {

  jokes : Joke[];
  constructor(private jokeService: JokeService) { }

  ngOnInit(): void {
    this.listJokes();
  }

  listJokes(){
      this.jokeService.getJokeList().subscribe(
        data => {
          this.jokes = data;
        }
      )
  }

}
