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

  jokes: Joke[];
  currentStructureId: number;

  constructor(private jokeService: JokeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listJokes();
    })
  }

  listJokes() {
    const hasStructureId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasStructureId){
      this.currentStructureId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentStructureId = 1;
    }

    this.jokeService.getJokeList(this.currentStructureId).subscribe(
      data => {
        this.jokes = data;
      }
    )
  }

}
