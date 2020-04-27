import { Injectable } from '@angular/core';
import { MaterialJoke } from '../common/material-joke';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  materialJokes: MaterialJoke[] = [];

  totalGrade: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToMaterial(theMaterialJoke: MaterialJoke){

    // check if we already have the item in our material
    let alreadyExistsInMaterial: boolean = false;
    let existingMaterialJoke: MaterialJoke = undefined;

    if (this.materialJokes.length > 0) {
      // find the joke in the material based on joke id
      
      existingMaterialJoke = this.materialJokes.find(tempMaterialJoke => tempMaterialJoke.id === theMaterialJoke.id);

      // chceck if we found it
      alreadyExistsInMaterial = (existingMaterialJoke != undefined);
    }

    if (!alreadyExistsInMaterial){
      this.materialJokes.push(theMaterialJoke);
    }

    this.computeMaterialTotals();
  }

  computeMaterialTotals() {
    
    let totalGradeValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentMaterialJoke of this.materialJokes) {
      totalGradeValue += currentMaterialJoke.grade;
      totalQuantityValue++;
    }

    if (totalQuantityValue != 0){
      totalGradeValue = totalGradeValue / totalQuantityValue; 
    }
    
    this.totalGrade.next(totalGradeValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
