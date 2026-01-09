import { AfterViewInit, ViewChild, OnInit, ChangeDetectionStrategy, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule ,NgForOf, NgIf } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BoxService } from '../../service/box-service/box.service';
import { UpdateBoxService } from '../../service/update-box-service/update-box.service';
import { Box, CreatedBox } from '../../Interface/box';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-box',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatSortModule,
    MatSort,
    MatInput,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent implements OnInit, AfterViewInit{

  listBoxes!: Box[];


  dataSource:any;
  display:string[] = ["name","description", "quantity","coordinates","actions"];




  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(
    private router:Router,
    private boxService: BoxService,
    private updateBoxService:UpdateBoxService
  ){}

  getAllBoxes(){
      this.boxService.getAllBoxes().subscribe({
        next : rest => {
          this.listBoxes = rest;

          this.dataSource.data = this.listBoxes;
        },
        error : err => {
          console.log(err);
        }
      });

  }

  handleAddBox():void{
    alert("You will add a new box");
    this.router.navigateByUrl("/add-box");
  }

  handleUpdateBox(box:Box):void{
    let conf = confirm("Are you sure you want to update this box ?");
    if (conf){


      this.updateBoxService.redirectToUpdatePageByUrl("/update-box",box);
    }
  }

  handleDeleteBox(box:Box):void{
    const conf = confirm("Are you sure you want to delete this box ?");
    if(conf){
      this.boxService.deleteBox(box.boxId).subscribe({
        next: () => {
          this.getAllBoxes(),
          alert("Box is deleted.")
        },
        error: err => alert('Error : ' + err.message)
      })
    }
  }

  filterBox(event: Event){
    const filtered = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtered.trim().toLowerCase();

  }

  ngOnInit():void{

    this.dataSource = new MatTableDataSource<Box>([]);

    this.listBoxes = [];


    this.getAllBoxes();

  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
