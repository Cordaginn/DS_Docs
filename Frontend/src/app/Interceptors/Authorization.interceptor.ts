//core for interceptors
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs-compat';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
//for getting token from store
import { Answer } from '../Models/IAnswer';
import { AppState } from '../app.state';
import { Store } from 'ngrx/@ngrx/store';
import {Token} from '../Models/IToken';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor 
{
    //// private http: HttpClient;
    constructor(private store: Store<AppState>,private injector: Injector){}
    answer:Answer[];
    result:Answer;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    //// if (!this.http) 
    //// {
    ////   this.http = this.injector.get(HttpClient);
    //// }

    //evading of Login/Register requests
    if (req.url.includes('/Account/Register')||req.url.includes('/Account/Login'))
    {
      const authReq = req.clone({
                                  headers: new HttpHeaders(
                                    {
                                    'Content-Type':  'application/json',
                                    'Access-Control-Allow-Origin':'*',
                                    }
                                                          )
                                });
      return next.handle(authReq);
    }
    //else after successfully Register/Login we can re-write 
    //header of requests for authorization by Bearer scheme with JWT
    //from our store
    else
    {
      this.store.select(result=>result.answer)
                .subscribe(
                          data=>{
                                  this.answer=data;
                                },
                          error=>console.log(error)
                          );
      this.result=this.answer[this.answer.length-1]; 
      var token = this.result.payload as Token;
    const tokenReq = req.clone({
                                headers: new HttpHeaders(
                                                          {
                                                          'Content-Type':  'application/json',
                                                          'Authorization': "Bearer " + token.access_token,
                                                          'Access-Control-Allow-Origin':'*'
                                                          }
                                                        )
                                });
    return next.handle(tokenReq);
    }   
  }
}