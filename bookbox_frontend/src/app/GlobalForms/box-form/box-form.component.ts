import { OnInit, Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-box-form',
  standalone: true,
  imports: [
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './box-form.component.html',
  styleUrl: './box-form.component.css'
})
export class BoxFormComponent implements OnInit {



  responses = new FormGroup({
    boxName: new FormControl<string | null >(null, [Validators.required]),
    boxDescription:new FormControl<string | null >(null),
    boxQuantity:new FormControl<string | null >(null, [Validators.required]),
    boxLatitude:new FormControl<number | null >(null, [Validators.required,
      Validators.min(-90), Validators.max(90)]),
    boxLongitude:new FormControl<number | null >(null, [Validators.required,
      Validators.min(-180), Validators.max(180)])
  });

  constructor(){}

  ngOnInit():void{

  }

  getAllInputValues():any{
    return this.responses;
  }

  resetForm(){
    this.responses.reset();
  }

}
