import { Component, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit { 
  
    constructor(public dialog: MatDialog) {  
    }
  
    ngOnInit() {
    }
    openLoginDialog() {
      this.dialog.open(LoginComponent, {
        width: '500px',
        height: 'auto',
      });
    }
  }
  