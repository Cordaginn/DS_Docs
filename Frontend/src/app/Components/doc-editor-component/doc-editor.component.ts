import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-editor',
  templateUrl: '../../Views/Components/doc-editor.component.html',
  styleUrls: ['../../Styles/Components/doc-editor.component.scss']
})
export class DocEditorComponent implements OnInit {

  constructor() 
  {
  }

  state:boolean
  onChanged(IsChanged:any)
  { 
    IsChanged==true?this.state=true:false;
  }

  ngOnInit() {
  }

}
