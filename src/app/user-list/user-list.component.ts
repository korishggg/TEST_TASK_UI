import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.reloadData()
  }

  reloadData() {
    this.userService.getUsers()
      .subscribe({
        next: value => {
          this.users = value;
        }
      })
  }

  deleteEmployee(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        data => {
          this.reloadData();
        },
        error => {
          window.alert(error.error)
        });
  }

  userDetails(id: number) {
    this.router.navigate(['details', id]);
  }

  updateUser(id: number) {
    this.router.navigate(['update', id]);
  }

}
