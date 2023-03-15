import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UpdateUser} from "../models/update-user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  id: number;
  userForm: FormGroup;
  loading: boolean = true;
  isFormDirty: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.loadAndSetUpUser();
  }

  loadAndSetUpUser() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUser(this.id)
      .subscribe(data => {
          this.userForm.controls["firstName"].setValue(data.firstName)
          this.userForm.controls["lastName"].setValue(data.lastName)
          this.userForm.controls["email"].setValue(data.email)
        },
        error => {
          window.alert(error.error);
        }, () => {
          this.loading = false;
        });
  }

  updateUser() {
    const user = this.userForm.value as UpdateUser;
    this.userService.patchUser(this.id, user)
      .subscribe(data => {
          this.toUserList();
        },
        error => {
          window.alert(error.error);
        });
  }

  onSubmit() {
    this.updateUser();
  }

  toUserList() {
    this.router.navigate(['/users']);
  }

  setFormDirty() {
    console.log(this.isFormDirty);
    this.isFormDirty = true;
  }
}
