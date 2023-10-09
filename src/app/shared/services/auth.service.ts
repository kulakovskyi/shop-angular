import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../types/user.interface";
import {environment} from "../../../environment/environment";
import {UserResponseInterface} from "../types/user-response.interface";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: UserInterface): Observable<UserResponseInterface>{
    return this.http.post<UserResponseInterface>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      )
  }

  private setToken(response: any){
    if(response){
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token-exp', expData.toString())
      localStorage.setItem('fb-token', response.idToken)
    } else {
      localStorage.clear()
    }

  }

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-exp')!)
    if(new Date > expDate){
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }


  logout() {
    this.setToken(null)
  }

  isAuthenticated() : boolean{
    return !!this.token
  }
}
