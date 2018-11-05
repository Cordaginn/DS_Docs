import {Injectable, OnInit} from '@angular/core';
import {HttpService} from './http.services';
import {TextDocument} from '../Models/TextDocumentModel';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class DocumentService implements OnInit
{
    doc:TextDocument[];
    ChoosenData:TextDocument;
    observable:BehaviorSubject<TextDocument[]>;
    constructor(private http:HttpService)
    {
        this.observable = new BehaviorSubject<TextDocument[]>(this.doc);
        this.ChoosenData=null;
    }
   ngOnInit()
   {
   }
   saveFile(file:TextDocument)
   {
    this.http.postData('Documents/Save',file).subscribe();
   }
   openFile()
   {
    this.http.getData('Documents/Open')
    .subscribe(data=>{
        this.doc=data as TextDocument[];
        this.observable.next(this.doc);
    });   
   }
   chooseFile(index:number)
   {
    this.ChoosenData=this.doc[index];
   }
   deleteFile(index:number)
   {
       this.http.postData('Documents/Delete',index)
       .subscribe(data=>{
        this.doc=data as TextDocument[];
        this.observable.next(this.doc);
    });
       this.doc.splice(this.doc.findIndex(x=>x.id==index),1);
   }
   updateFile(file:TextDocument)
   {
    this.http.postData('Documents/Update',file).subscribe();
   }
}