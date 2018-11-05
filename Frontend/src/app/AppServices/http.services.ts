import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
//environments variables
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService
{
    public host:string;
    constructor(private http: HttpClient)
    {
        this.host= environment.DSDOCS_API_URL+'/api/';   
    }
    getData(route:string)
    {
        return this.http.get(this.host + route);
    }
    postData(route:string, data:Object)
    {
        return this.http.post(this.host + route, data);
    }
   
}