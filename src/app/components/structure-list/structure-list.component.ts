import { Component, OnInit } from '@angular/core';
import { StructureService } from 'src/app/services/structure.service';
import { Structure } from 'src/app/common/structure';

@Component({
  selector: 'app-structure-list',
  templateUrl: './structure-list.component.html',
  styleUrls: ['./structure-list.component.css']
})
export class StructureListComponent implements OnInit {

  structures: Structure[];

  constructor(private structureService: StructureService) { }

  ngOnInit(): void {
    this.listStructures();
  }

  listStructures(){
    this.structureService.getStructureList().subscribe(
      data => {
        this.structures = data;
      }
    )
  }

}
