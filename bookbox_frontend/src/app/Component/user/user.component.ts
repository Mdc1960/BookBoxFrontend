import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { UserService } from "../../service/User-service/user.service";
import { Router } from "@angular/router";
import {User} from "../../Interface/user";
import {UpdateUserService} from "../../service/update-user-service/update-user.service";
import { AuthenticationService } from '../../service/AuthenticationService/authentication.service';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  listUsers: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  display: string[] = ["name", "surname", "username", "email", "actions"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private userService: UserService,
    private userServiceUpdate : UpdateUserService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.listUsers = users;
        this.dataSource.data = this.listUsers;
      },
      error: (err) => {
        console.error("Error while loading users:", err);
      }
    });
  }

  handleAddUser(): void {
    alert("You will add a new user");
    this.router.navigateByUrl("/add-user");
  }

  handleDeleteUser(user: User): void {
    const conf = confirm("Are you sure you want to delete this user ?");
    if(conf){
      if (this.authService.isAdmin()){
        this.userService.deleteUser(user.userId).subscribe({
          next : () => {
            this.listUsers=this.listUsers.filter(u=> u.userId !== user.userId);
            this.dataSource.data=this.listUsers;
            alert("User : " + user.name + " deleted from the database.")
          },
          error: err => alert('Error : ' + err.message)
        })
      }else{
        alert('Only an administrator can perform this action (Delete a user)');
      }
      
    }
    
  }
  filterUser(event : Event){
    const filtered = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtered.trim().toLowerCase();
  }

  handleUpdateUser(user :User) {
    alert("you will modify this user information !");
    this.userServiceUpdate.redirectToUpdatePageByUrl("/update-user",user);

  }

}
