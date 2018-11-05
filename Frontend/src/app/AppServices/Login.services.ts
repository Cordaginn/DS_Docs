import {Injectable} from '@angular/core';
//parent service
import {HttpService} from './http.services';
//models
import {LoginData} from '../Models/LoginModel';
import { Answer } from '../Models/IAnswer';

import { Observable } from 'rxjs';
@Injectable()
export class LoginService{
    
    constructor(private http:HttpService){
    }
    Login(data:LoginData):Observable<Answer>
    {
        return this.http.postData("Account/Login", data);
    }
}