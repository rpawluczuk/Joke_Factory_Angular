import { Component, OnInit } from '@angular/core';
import { JokeService } from 'src/app/services/joke.service';
import { Joke } from 'src/app/common/joke';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-joke',
  templateUrl: './add-joke.component.html',
  styleUrls: ['./add-joke.component.css']
})
export class AddJokeComponent implements OnInit {

  constructor(private jokeService: JokeService) { }

  joke: Joke = new Joke();
  submitted = false;

  ngOnInit(): void {
    this.submitted = false;
  }

  jokesaveform=new FormGroup({  
    title:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),  
    content:new FormControl('', [Validators.required, Validators.minLength(5) ] ),  
    grade:new FormControl()  
  });  

  saveJoke(saveJoke){  
    this.joke = new Joke();     
    this.joke.title = this.JokeTitle.value;  
    this.joke.content = this.JokeContent.value;  
    this.joke.grade = this.JokeGrade.value;  
    this.submitted = true;  
    this.save();  
  }  

  save() {  
    this.jokeService.createJoke(this.joke)  
      .subscribe(data => console.log(data), error => console.log(error));  
    this.joke = new Joke();  
  }  

  get JokeTitle(){  
    return this.jokesaveform.get('title');  
  }  
  
  get JokeContent(){  
    return this.jokesaveform.get('content');  
  }  
  
  get JokeGrade(){  
    return this.jokesaveform.get('grade');  
  }  

  addJokeForm(){  
    this.submitted=false;  
    this.jokesaveform.reset();  
  }  
}
