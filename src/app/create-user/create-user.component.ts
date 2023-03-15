import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateUser} from "../models/create-user";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  save() {
    if (this.userForm.valid) {
      const user = this.userForm.value as CreateUser
      this.userService.createUser(user)
        .subscribe(data => {
            this.toUserList();
          },
          error => {
            window.alert(error.error)
          });
    }
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  toUserList() {
    this.router.navigate(['/users']);
  }
}
