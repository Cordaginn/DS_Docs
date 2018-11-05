import {Component, OnInit} from '@angular/core';
//angular-material
import {MatDialog} from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './Views/app.component.html',
  styleUrls: ['./Styles/app.component.scss']
})
export class AppComponent implements OnInit
{
  constructor(public dialog: MatDialog,private router:Router) 
  {
  }
  ngOnInit()
  {
    this.router.navigate(['Sign_In']);
  }
 
}