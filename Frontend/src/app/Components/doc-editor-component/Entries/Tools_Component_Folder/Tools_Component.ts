import { Component, Output, EventEmitter, AfterContentInit} from '@angular/core';
import {IndentService} from '../../../../AppServices/indent.serivces';
import { PaddingService } from '../../../../AppServices/padding.services';
import { DocumentService } from '../../../../AppServices/document.service';
@Component(
  {
  selector: 'Tools',
  templateUrl: '../../../../Views/Components/Tools/ToolsComponent.html',
  styleUrls: ['../../../../Styles/Components/Tools/ToolsComponent.scss'],
  }
)
export class Tools_Component implements AfterContentInit
{
  constructor(private indenteditor:IndentService, private Paddingeditor:PaddingService,private docService:DocumentService)
  {
  }
  ngAfterContentInit()
  {
    var documentStyle=document.getElementById('editing_content').style
    if(documentStyle.paddingLeft||documentStyle.paddingRight||documentStyle.textIndent)
    {
      this.start1=parseInt(documentStyle.textIndent[length-2]);
      this.start2[0]=parseInt(documentStyle.paddingLeft[length-2]);
      this.start2[1]=parseInt(documentStyle.paddingRight[length-2]);
    }
    else
    {
      this.start1=190;
      this.start2=[190,990];
    }
    
  }
  state:boolean;
  start1:number;
  start2:number[];
  connect1=[true,false];
  connect2=[true,false,true];
  @Output() Changed = new EventEmitter<boolean>();
  openSide(IsChanged:any)
  { 
    this.Changed.emit(IsChanged)
  }
  indent(indentValue:number)
  {
    this.indenteditor.setIndent(indentValue,this.start2[0]);
  }
  Padding(PaddingValue:number[])
  {
    this.Paddingeditor.setPadding(PaddingValue)
  }
}