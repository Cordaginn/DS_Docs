import {Injectable} from '@angular/core';
//parent service
import {HttpService} from './http.services';
//models
import {RegisterData} from '../Models/RegisterModel';
import { Answer } from '../Models/IAnswer';
//rxjs
import { Observable } from 'rxjs';

@Injectable()
export class RegisterService{
    constructor(private http:HttpService){
        
    }
    Register(data:RegisterData):Observable<Answer>
    {
        return this.http.postData("Account/Register", data);                
    }
}