import {Injectable} from '@angular/core';
//parent service
import {HttpService} from './http.services';
  
@Injectable()
export class VersionService{
    constructor(private http: HttpService){ 
    }
      
    getData(){
        return this.http.getData("Version")
    }
}