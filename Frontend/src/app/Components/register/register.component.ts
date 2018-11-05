import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Store } from 'ngrx/@ngrx/store';
import { AppState } from '../../app.state';
import { RegisterService } from '../../AppServices/Register.service';
import { RegisterData } from '../../Models/RegisterModel';
import { Answer } from '../../Models/IAnswer';
import * as AnswerActions from '../../Actions/answer.actions';
@Component({
  selector: 'app-register',
  templateUrl: '../../Views/Components/register.component.html',
  styleUrls: ['../../Styles/Components/register.component.scss'],
  providers: [RegisterService],
})
export class RegisterComponent implements OnInit {
// in proccess...
answer: Answer;
//fields for SignIn possibility
R_login:string;
R_password:string;
R_passwordConfirm:string;
IsLoading=false;
Rdata: RegisterData;
//for Register/Login events

  constructor(
    private registerService:RegisterService,
    private store: Store<AppState>,
    private router:Router,
            ) { 
            }
  ngOnInit() {
  }
  RedirectToSignIn()
  {
    this.router.navigate(["Sign_In/Log_In"])
  }
   Login = new FormControl('', [Validators.required]);
   Password = new FormControl('',[Validators.required]);
   selected : number;
   getErrorMessage(form:number) {
     switch(form)
     {
       case 1:
       {
         return this.Login.hasError('required') ? 'You must enter a Login' :
         '';
       }
       case 2:
       {
         return this.Password.hasError('required') ? 'You must enter a Password' :
         '';
       }
     }
    
   }
   //methods for Authorization window
   Register()
   {
     this.Rdata={
       Login:this.R_login, 
       Password:this.R_password,
       PasswordConfirm:this.R_passwordConfirm
                 };
     this.IsLoading=true;
     this.registerService.Register(this.Rdata)
                         .subscribe(
                           data=>
                           {
                             this.store.dispatch(new AnswerActions.AddAnswer(data));
                             if(data.statusCode==200)
                             {
                               this.IsLoading=false;
                               this.router.navigate(['Sign_In/Log_In'])
                             }
                             if(data.userMessage="Failed:DuplicateUserName")
                             {
                               this.IsLoading=false
                               this.answer=data;
                             }
                           },
                           error=>console.log(error)
                                 );
   }
}
