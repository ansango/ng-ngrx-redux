import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { filter, first, map, mergeAll, tap } from 'rxjs/operators';
import { Education } from '../models/education';
import { Profile } from '../models/profile';
import { User, UserForm, UserType } from '../models/user';
import { MessageService } from './message.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private readonly urlUsers = 'api/users';
  private readonly urlProfiles = 'api/profiles';

  private currentUser!: User;
  private loggedUser: boolean = false;
  private typeUser: string = '';

  message: string = '';
  timeoutInterval: any;
  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private messageService: MessageService,
    private router: Router
  ) {}

  register(userForm: UserForm): Observable<User> {
    const $user = this.postUser({
      email: userForm.email,
      password: userForm.password,
      userType: userForm.userType,
    });

    $user.subscribe((user) => {
      const profile: Profile = {
        id: user.id,
        firstName: userForm.firstName,
        lastName: userForm.lastName,
        type: userForm.userType,
      };
      this.profileService.postProfile(profile);
    });
    return $user;
  }

  private postUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlUsers, user, this.httpOptions);
  }

  getLocaleUser(): User {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!) || {};
    this.typeUser = this.currentUser.userType!;
    this.loggedUser = true;
    return this.currentUser;
  }

  isUserLogged(): boolean {
    const isLoggedIn = Object.entries(this.getLocaleUser()).length !== 0;
    if (isLoggedIn) return (this.loggedUser = isLoggedIn);
    return (this.loggedUser = isLoggedIn);
  }

  isUserTourist(): boolean {
    if (this.typeUser === 'tourist') return true;
    return false;
  }

  isUserCompany(): boolean {
    if (this.typeUser === 'company') return true;
    return false;
  }

  login(email: string, password: string) {
    return this.http.get<User[]>(this.urlUsers).pipe(
      map((users) => {
        const user = users.filter((user) => {
          return user.email === email && user.password === password;
        });
        if (user.length === 0) {
          this.setErrorMessage('Not user found');
          throw new Error('Not user found');
        }
        return user;
      })
    );
  }

  signUp(email: string, password: string, userType: UserType) {
    return this.http.post<User>(
      this.urlUsers,
      { email, password, userType },
      this.httpOptions
    );
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const user = JSON.parse(userDataString);
      return user;
    }
    return null;
  }

  loggout() {
    localStorage.removeItem('userData');
  }

  formatUser(data: any) {
    if (data && data.length > 0) {
      return data[0];
    } else {
      null;
    }
  }

  newFormatUser(data: any): User {
    return {
      email: data.email,
      password: data.password,
      userType: data.userType,
    };
  }

  setErrorMessage(message: string) {
    this.message = message;
  }

  getErrorMessage() {
    return this.message;
  }
}
