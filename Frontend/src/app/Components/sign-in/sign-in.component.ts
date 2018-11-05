import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: '../../Views/Components/sign-in.component.html',
  styleUrls: ['../../Styles/Components/sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  constructor(private router: Router)
  {
  }
  ngOnInit() {
    this.router.navigate(['Sign_In/Log_In'])
  }
}
