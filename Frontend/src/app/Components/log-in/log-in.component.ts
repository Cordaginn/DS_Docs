import { Component, OnInit} from '@angular/core';
import { Answer } from '../../Models/IAnswer';
import { LoginData } from '../../Models/LoginModel';
import { LoginService } from '../../AppServices/Login.services';
import { AppState } from '../../app.state';
import { Store } from 'ngrx/@ngrx/store';
import * as AnswerActions from '../../Actions/answer.actions';
import {Router} from '@angular/router';
import { DocumentService } from '../../AppServices/document.service';
@Component({
  selector: 'app-log-in',
  templateUrl: '../../Views/Components/log-in.component.html',
  styleUrls: ['../../Styles/Components/log-in.component.scss'],
  providers: [LoginService],
})
export class LogInComponent implements OnInit {
// in proccess...
answer: Answer;
//fields for SignIn possibility
L_login:string;
L_password:string;
IsLoading=false;
//for Register/Login events
Ldata: LoginData;
constructor(
  private loginService: LoginService,
  private docService:DocumentService,
  private store: Store<AppState>,
  private router: Router,
          ) { 
          }

  ngOnInit() {
  }
  SignIn()
  {
    this.Ldata={
                Login:this.L_login, 
                Password:this.L_password
                };
    this.IsLoading=true;
    this.loginService.Login(this.Ldata)
                      .subscribe(
                        data=>
                        {
                          this.store.dispatch(new AnswerActions.AddAnswer(data));
                          if(data.statusCode==200)
                          {
                            this.IsLoading=false;
                            this.router.navigate(['CRUD_UI']);
                            this.docService.openFile();
                          }
                          else
                          {
                            this.IsLoading=false
                            this.answer=data;
                          }
                        },
                        error=>console.log(error)
                                );
  }
  RedirectToRegister()
  {
    this.router.navigate(["Sign_In/Register"])
  }
}
