import {Component,OnInit} from '@angular/core';
import {MatDialog,MatDialogRef} from '@angular/material';
import {VersionService} from '../../../../../AppServices/Version.service';
import { TextEditingService } from '../../../../../AppServices/TextEditing.services';
import {Version} from '../../../../../Models/IVersion';
import {DocumentService} from '../../../../../AppServices/document.service';
import {TextDocument} from '../../../../../Models/TextDocumentModel';
import { Store } from 'ngrx/@ngrx/store';
import * as AnswerActions from '../../../../../Actions/answer.actions';
import { AppState } from '../../../../../app.state';
import { Answer } from '../../../../../Models/IAnswer';
import { Token } from '../../../../../Models/IToken';
import { Router } from '@angular/router';

@Component(
  {
    selector: 'Menu',
    templateUrl: '../../../../../Views/Components/Tools/Entries/Menu_Component.html',
    styleUrls: ['../../../../../Styles/Components/Tools/Entries/Menu_Component.scss'],
    providers:[],
  }
)
export class Menu 
{
  constructor
  (
    public dialog: MatDialog,
    private texteditor:TextEditingService,
    private router:Router,
    private docService: DocumentService,
    private store:Store<AppState>,
  ) {}
  answers:Answer[];
  openDialog(): void
  {
    let dialogRef = this.dialog.open(Version_Dialog,{
        height: '280px',
        width: '320px',
      });
  }
  openSaveDialog():void
  {
    let dialogRef = this.dialog.open(Save_Dialog,{
      height:'auto',
      width:'auto',
    })
  }
  editCommand(command:string, value?:string)
  {
    this.texteditor.setStyle(command,value);
  }
  openFile()
  {
    this.docService.openFile();
    this.router.navigate(['CRUD_UI'])
  }
  CreateDoc()
  {
    if(this.docService.ChoosenData)
    {
      if(document.getElementById('editing_content').innerHTML==this.docService.ChoosenData.data)
      {
        this.docService.ChoosenData=null;
        document.getElementById('editing_content').innerHTML=null;
      }
      else
      {
        let dialogRef = this.dialog.open(Update_Component,{
          height:'auto',
          width:'auto',
        })
      }
    }
    else
    {
      let dialogRef = this.dialog.open(Update_Component,{
        height:'auto',
        width:'auto',
      })
    }
  }
  Save()
  {
    if(this.docService.ChoosenData!=null)
    {
      this.docService.ChoosenData.data=document.getElementById('editing_content').innerHTML;
      this.docService.updateFile(this.docService.ChoosenData)
    }
    else
    {
      this.openSaveDialog();
    }
  }
  Exit()
  {
    this.store.select(result=>result.answer).subscribe(data=>this.answers=data);
    this.store.dispatch(
      new AnswerActions.RemoveAnswer(this.answers.findIndex(x=>x.userMessage=="That is token"))
    );
    this.router.navigate(['Sign_In/Log_In']);
  }
}
@Component(
  {
  selector: 'Save',
  templateUrl: '../../../../../Views/Components/Tools/Entries/Save_Dialog_Menu.html',
  styleUrls: ['../../../../../Styles/Components/Tools/Entries/Save_Dialog_Menu.scss'],
  providers: [DocumentService],
  }
)

export class Save_Dialog implements OnInit
{
  Id:number;
  UserId:number;
  DocName:string;
  Doc:TextDocument;
  answer: Answer[];
  result: Answer;
  token:Token;
  constructor
  (
    private docService:DocumentService,
    public dialogRef: MatDialogRef<Save_Dialog>,
    private store: Store<AppState>,
  ) {}
  ngOnInit()
  {
    this.store.select(result=>result.answer)
    .subscribe(
              data=>{
                      this.answer=data;
                    },
              error=>console.log(error)
              );
  this.result=this.answer.find(x=>x.userMessage=="That is token"); 
  this.token = this.result.payload as Token;
  }
  Save()
  {
    this.Doc={
      name:this.DocName,
      userId:this.token.userId,
      data:document.getElementById('editing_content').innerHTML,
    }
    this.docService.saveFile(this.Doc);
    this.dialogRef.close();
  }
  Cancel()
  {
    this.dialogRef.close();
  }
}
@Component(
  {
    selector:'Update',
    templateUrl:'../../../../../Views/Components/Tools/Entries/Update_Component.html',
    styleUrls: ['../../../../../Styles/Components/Tools/Entries/Update_Component.scss'],
  }
)
export class Update_Component 
{
  constructor(private docService:DocumentService,public dialogRef: MatDialogRef<Version_Dialog>,public dialog: MatDialog,) 
  {
  }
  Save()
  {
    if(this.docService.ChoosenData!=null)
    {
      this.docService.ChoosenData.data=document.getElementById('editing_content').innerHTML;
      this.docService.updateFile(this.docService.ChoosenData)
    }
    else
    {
      let dialogRef = this.dialog.open(Save_Dialog,{
        height:'auto',
        width:'auto',
      })
    }
    this.docService.ChoosenData=null;
    document.getElementById('editing_content').innerHTML=null;
    this.dialogRef.close()
  }
  No()
  {
    this.docService.ChoosenData=null;
    document.getElementById('editing_content').innerHTML=null;
    this.dialogRef.close();
  }
  Cancel()
  {
    this.dialogRef.close();
  }
}
@Component(
  {
  selector: 'Version',
  templateUrl: '../../../../../Views/Components/Tools/Entries/Version_Component.html',
  styleUrls: ['../../../../../Styles/Components/Tools/Entries/Version_Component.scss'],
  providers: [VersionService],
  }
)

export class Version_Dialog implements OnInit
{
  version:Version;
  constructor(private httpService: VersionService,public dialogRef: MatDialogRef<Version_Dialog>) 
  {
  }
  ngOnInit()
  {
    this.httpService.getData().subscribe((data:any) => {this.version=data.payload}, error=>console.log(error));
  }
}