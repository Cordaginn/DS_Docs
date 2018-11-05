import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { DocumentService } from '../../AppServices/document.service';
import { TextDocument } from '../../Models/TextDocumentModel';
@Component({
  selector: 'app-crud-ui',
  templateUrl: '../../Views/Components/crud-ui.component.html',
  styleUrls: ['../../Styles/Components/crud-ui.component.scss']
})
export class CRUD_UI_Component implements OnInit {
  
  constructor(private router:Router,private docService:DocumentService) { 
  }
  YourOwnDocsNames :TextDocument[];
  ngOnInit() {
    this.docService.observable.subscribe(data=>{this.YourOwnDocsNames=data});
  }
  CreateDoc()
  {
    this.docService.ChoosenData=null;
    this.router.navigate(['Doc_editor'])
  }
  OpenFile(index:number)
  {
    this.docService.chooseFile(index);
    this.router.navigate(['Doc_editor']);
  }
  DeleteFile(index:number)
  {
    this.docService.deleteFile(index);
  }
}
