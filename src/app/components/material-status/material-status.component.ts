import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-status',
  templateUrl: './material-status.component.html',
  styleUrls: ['./material-status.component.css']
})
export class MaterialStatusComponent implements OnInit {

totalGrade: number = 0.00;
totalQuantity: number = 0;

  constructor(private materialService: MaterialService) { }

  ngOnInit(): void {
    this.updateMaterialstatus();
  }

  updateMaterialstatus() {
    this.materialService.totalGrade.subscribe(
      data => this.totalGrade = data
    );

    this.materialService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }
}
