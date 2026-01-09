import { AfterViewInit, ViewChild, OnInit, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { BoxFormComponent } from '../../GlobalForms/box-form/box-form.component';
import { BoxService } from '../../service/box-service/box.service';
import { Box, CreatedBox } from '../../Interface/box';
import {Router} from '@angular/router'
@Component({
  selector: 'app-add-box',
  standalone: true,
  imports: [
    MatButtonModule,
    BoxFormComponent
  ],
  templateUrl: './add-box.component.html',
  styleUrl: './add-box.component.css'
})
export class AddBoxComponent implements OnInit, AfterViewInit{

  constructor(
    private boxService: BoxService,
    private router : Router
  ){}

  @ViewChild(BoxFormComponent)
  boxFormComponent!:BoxFormComponent;

  createBox(){
    const nameBox = this.boxFormComponent.getAllInputValues().get("boxName")?.value;
    const descriptionBox = this.boxFormComponent.getAllInputValues().get("boxDescription")?.value;
    const quantityBox = this.boxFormComponent.getAllInputValues().get("boxQuantity")?.value;
    const latitudeBox = this.boxFormComponent.getAllInputValues().get("boxLatitude")?.value;
    const longitudeBox = this.boxFormComponent.getAllInputValues().get("boxLongitude")?.value;


    const box: CreatedBox = {
      name:nameBox,
      quantity:quantityBox,
      description:descriptionBox,
      coordinates:{
        latitude:latitudeBox,
        longitude:longitudeBox
      }
    };

    if (this.isValidLatitude(latitudeBox) && this.isValidLongitude(longitudeBox)){
      this.boxService.createBox(box).subscribe({
            next: (boxes) =>{
              alert("A new box was created !");
              this.router.navigateByUrl('/load-box')
            },
            error: (err) =>{
              alert("Error while creating a box. Make sure you have provided all the required information.");
            }
          });

          this.boxFormComponent.resetForm();
    }else{
      alert("Provide correct value for latitude and/or longitude");
    }



  }

  ngOnInit():void{

  }

  ngAfterViewInit():void{
    console.log("Form : " + this.boxFormComponent.getAllInputValues());
  }

  private isValidLatitude(latitude:number):boolean{
    return (latitude >= -90 && latitude <= 90);
  }

  private isValidLongitude(longitude:number):boolean{
    return (longitude >= -180 && longitude <= 180);
  }




}
