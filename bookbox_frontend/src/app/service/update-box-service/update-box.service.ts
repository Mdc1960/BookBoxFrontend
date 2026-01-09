import { Injectable } from '@angular/core';
import {Box} from '../../Interface/box';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UpdateBoxService {

  boxToUpdate!:Box;

  constructor(
    private router:Router
  ) { }

  redirectToUpdatePageByUrl(url:string, box:Box){
    this.boxToUpdate = box;
    this.router.navigateByUrl(url);
  }

  getBoxToUpdate():Box{
    return this.boxToUpdate;
  }

}
