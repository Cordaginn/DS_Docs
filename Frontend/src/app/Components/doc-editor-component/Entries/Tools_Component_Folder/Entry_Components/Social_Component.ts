import {Component, Inject, OnInit} from '@angular/core';
import {Answer} from '../../../../../Models/IAnswer';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Store } from 'ngrx/@ngrx/store';
import { AppState } from '../../../../../app.state';
import { Token } from '../../../../../Models/IToken';


export interface Option
{
  value:number;
  viewValue:string;
}
export interface DialogData {
}

@Component(
  {
    selector: 'Social',
    templateUrl: './../../../../../Views/Components/Tools/Entries/Social_Component.html',
    styleUrls: ['./../../../../../Styles/Components/Tools/Entries/Social_Component.scss']
  }
)
  
export class Social implements OnInit
{
  answer:Answer[];
  token:Token;
  Id:number;
  constructor(public dialog: MatDialog,private store:Store<AppState>) {}
  ngOnInit()
  {
    this.store.select(result=>result.answer)
              .subscribe(data=>{
                this.answer=data;
              });
    this.token=this.answer.find(x=>x.userMessage=="That is token").payload as Token
    this.Id=this.token.userId;
  }
  openDialog(): void
  {
    let dialogRef = this.dialog.open(Share_Dialog,{
      height: '280px',
      width: '640px',
    });
  }
  
   options:Option[]=
   [
    { value:1,viewValue:"Option 1"},
    { value:2,viewValue:"Option 2"},
    { value:3,viewValue:"Option 3"},
    { value:4,viewValue:"Option 4"},
   ];
  
}
@Component(
  {
  selector: 'Share_Dialog',
  templateUrl: './../../../../../Views/Components/Tools/Entries/Share_Dialog_Component.html',
  styleUrls: ['./../../../../../Styles/Components/Tools/Entries/Share_Dialog_Component.scss'],
  }
)
export class Share_Dialog 
{
  constructor(public dialogRef: MatDialogRef<Share_Dialog>,@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  options:Option[]=
  [
   { value:1,viewValue:"Option 1"},
   { value:2,viewValue:"Option 2"},
   { value:3,viewValue:"Option 3"},
   { value:4,viewValue:"Option 4"},
  ];
}
