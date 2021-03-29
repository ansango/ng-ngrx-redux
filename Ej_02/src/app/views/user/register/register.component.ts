import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User, UserType } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { AppState } from 'src/app/store/app.state';
import { signUpStart } from '../state/user.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  newUser!: User;
  registerForm!: FormGroup;
  options = Object.values(UserType);

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(55),
          ],
        ],
        lastName: [
          '',
          [
            Validators.minLength(3),
            Validators.maxLength(55),
            Validators.pattern(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/),
          ],
        ],
        type: [null, Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        rePassword: ['', [Validators.required]],
      },
      { validators: this.checkPasswordEqual }
    );
  }
  onSubmit(form: FormGroup) {
    /*const user = form.value;
    this.userService.register(user).subscribe((resp) => {
      this.router.navigate(['user/login']);
    });*/

    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const firstName = this.registerForm.value.firstName;
    const lastName = this.registerForm.value.lastName;
    const userType = this.registerForm.value.type;

    this.store.dispatch(signUpStart({ email, password, userType }));
  }

  checkPasswordEqual(group: FormGroup): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const rePass = group.get('rePassword')?.value;
    if (pass !== rePass) return { different: true };
    return null;
  }
}
