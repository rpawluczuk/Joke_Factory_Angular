import { Joke } from './joke';

export class MaterialJoke {
    id: string;
    title: string;
    grade: number;

    quantity: number;

    constructor(joke: Joke) {
        this.id = joke.id;
        this.title = joke.title;
        this.grade = joke.grade;

        this.quantity = 1;
    }
}
