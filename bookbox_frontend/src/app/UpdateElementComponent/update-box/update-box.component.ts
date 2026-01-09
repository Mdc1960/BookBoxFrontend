import { AfterViewInit, ViewChild, OnInit, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { BoxFormComponent } from '../../GlobalForms/box-form/box-form.component';
import { Box, CreatedBox } from '../../Interface/box';
import { UpdateBoxService } from '../../service/update-box-service/update-box.service';
import {Coordinates} from "../../Interface/coordinates";
import { BoxService } from '../../service/box-service/box.service';

@Component({
  selector: 'app-update-box',
  standalone: true,
  imports: [
    BoxFormComponent,
    MatButtonModule
  ],
  templateUrl: './update-box.component.html',
  styleUrl: './update-box.component.css'
})
export class UpdateBoxComponent implements OnInit, AfterViewInit {

  constructor(
    private updateBoxService:UpdateBoxService,
    private boxService: BoxService
  ){}

  @ViewChild(BoxFormComponent)
  boxFormComponent!:BoxFormComponent;



  boxToUpdate!:Box;

  updateBox(){

    const nameBox = this.boxFormComponent?.getAllInputValues().get("boxName")?.value;
    const descriptionBox = this.boxFormComponent?.getAllInputValues().get("boxDescription")?.value;
    const quantityBox = this.boxFormComponent?.getAllInputValues().get("boxQuantity")?.value;
    const latitudeBox = this.boxFormComponent?.getAllInputValues().get("boxLatitude")?.value;
    const longitudeBox = this.boxFormComponent?.getAllInputValues().get("boxLongitude")?.value;

    alert("Value : " + latitudeBox + longitudeBox);

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
      this.boxService.updateBox(this.boxToUpdate?.boxId, box).subscribe({
            next: (boxes) =>{
              alert("A box was successfully updated !");
            },
            error: (err) =>{
              alert("Error while updating a box. Make sure you have provided all the required information.");
            }
          });

          this.boxFormComponent.resetForm();
    }else{
      alert("Provide correct value for latitude and/or longitude");
    }
  }

  private isValidLatitude(latitude:number):boolean{
    return (latitude >= -90 && latitude <= 90);
  }

  private isValidLongitude(longitude:number):boolean{
    return (longitude >= -180 && longitude <= 180);
  }



  ngOnInit(){

  }

  ngAfterViewInit(){
    this.boxToUpdate = this.updateBoxService.getBoxToUpdate();

    let box:Box = {
      boxId: this.boxToUpdate?.boxId,
      name : "",
      quantity : 0,
      description : "",
      coordinates : {
        latitude:0,
        longitude: 0
      }
    }

    if (this.boxToUpdate){
      if (this.boxToUpdate.coordinates){
        if (this.boxToUpdate.coordinates.latitude){
          box.coordinates.latitude = this.boxToUpdate.coordinates.latitude;
        }
        if (this.boxToUpdate.coordinates.longitude){
          box.coordinates.longitude = this.boxToUpdate.coordinates.longitude;
        }
      }
      if (this.boxToUpdate.name){
        box.name = this.boxToUpdate.name;
      }
      if (this.boxToUpdate.description){
        box.description = this.boxToUpdate.description;
      }
      if (this.boxToUpdate.quantity){
        box.quantity = this.boxToUpdate.quantity;
      }

      setTimeout(()=>{
        this.boxFormComponent?.getAllInputValues().patchValue({
          boxName: box.name,
          boxDescription: box.description,
          boxQuantity: box.quantity,
          boxLatitude: box.coordinates.latitude,
          boxLongitude: box.coordinates.longitude
        });
      });


    }



  }

}
