import { Component, AfterViewInit} from '@angular/core';
import { DocumentService } from '../../../../AppServices/document.service';
@Component(
  {
  selector: 'Content',
  templateUrl: '../../../../Views/Components/Content/Content_Component.html',
  styleUrls: ['../../../../Styles/Components/Content/Content_Component.scss']
  }
)
export class Content_Component implements AfterViewInit
{
  ngAfterViewInit()
  {
    if(this.docService.ChoosenData!=null)
    {
      document.getElementById('editing_content').innerHTML=this.docService.ChoosenData.data;
    }
  }
  constructor(private docService:DocumentService)
  {
  }
  
}