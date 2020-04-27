import { Component, OnInit } from '@angular/core';
import { Joke } from 'src/app/common/joke';
import { JokeService } from 'src/app/services/joke.service';
import { ActivatedRoute } from '@angular/router';
import { MaterialService } from 'src/app/services/material.service';
import { MaterialJoke } from 'src/app/common/material-joke';

@Component({
  selector: 'app-joke-details',
  templateUrl: './joke-details.component.html',
  styleUrls: ['./joke-details.component.css']
})
export class JokeDetailsComponent implements OnInit {

  joke: Joke = new Joke();

  constructor(private jokeService: JokeService,
              private materialService: MaterialService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleJokeDetails();
    })
  }
  
  handleJokeDetails() {
    
    const theJokeId: number = +this.route.snapshot.paramMap.get('id');

    this.jokeService.getJoke(theJokeId).subscribe(
      data => {
        this.joke = data;
      }
    )
  }

  addToMaterial(){
    
    console.log(`Adding to material: ${this.joke.title}, ${this.joke.grade}`);
    const theMaterialJoke = new MaterialJoke(this.joke);
    this.materialService.addToMaterial(theMaterialJoke);
  }
}
