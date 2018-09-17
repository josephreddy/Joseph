import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import Swal from 'sweetalert2'
import { DataService } from '../shared/services/data.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser: any;
  isLoginError: boolean = false;
  activityRights: object = {};
  userActivityRights;

  LoginRegistrationrFrm: FormGroup;
  validYes: boolean = false;
  btnDisable: boolean;
  alert: boolean = false;
  isLoading: boolean = false;
  UserInfo: any;
  TimeZone: any;
  City: any;

  constructor(public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private router: Router,
    private authservice: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>, private fb: FormBuilder, private _dataService: DataService, private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data) {

    this.LoginRegistrationrFrm = new FormGroup({
      emailid: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      // imagefile:new FormControl(''),
    });
  }

  LoginForm() {
    this.btnDisable = true;
    this.isLoginError = false;
    this.isLoading = true;
    this.isLoginError = false;
    var req = {
      "userName": this.LoginRegistrationrFrm.value.emailid,
      "password": this.LoginRegistrationrFrm.value.password
    };
    this.authservice.login(req).subscribe(
      res => {
        debugger;
        this.isLoading = false;
        this.cd.markForCheck();
        if (res == true) {
          // this._dataService.GetUserInfo()
          //   .subscribe((Info: any) => {
          //     if (Info != undefined || null) {
          //       this.cd.markForCheck();
          //       this.UserInfo = Info;
          //       localStorage.setItem('UserLocationDetails', JSON.stringify(this.UserInfo));
          //     }
          //     else {
          //       // alert(Data);
          //     }
          //   });
          this.alert = true;
          this.btnDisable = false;
          this.validYes = false;
          this.dialogRef.close();
          this.router.navigate(['/']);
          location.reload();
        }
        else {
          this.alert = false;
          this.validYes = true;
          // this.showError('Logged-In Un-Successful');
          this.LoginRegistrationrFrm.reset();
          this.btnDisable = false;
        }
      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.isLoading = false;
        this.cd.markForCheck();
      });
  }

  // LoginForm(){
  //   debugger
  //   // this.LoginRegistrationrFrm;
  //   this._dataService.GetAll('api/Registration/GetLogin/'+this.LoginRegistrationrFrm.value.emailid+'/'+this.LoginRegistrationrFrm.value.password).subscribe(
  //     res => {  
  //       if (res.User!=undefined) {
  //         localStorage.setItem('currentUser', JSON.stringify(res.User));
  //         localStorage.setItem('ActivityRights', JSON.stringify(res.ActivityRights));

  //          this.initActivityRights(res.ActivityRights);
  //          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));        
  //          //this.router.navigate(this.returnUrl);
  //          this.onNoClick();  
  //          Swal({
  //           title: 'Logged-In successfully',
  //           // text: "Department added succcefully",
  //           type: 'success',
  //           position: 'top'
  //         })         
  //          location.reload();

  //       }
  //        else {
  //         //  alert("Invalid Email And Password")
  //          this.validYes=true;
  //          this.LoginRegistrationrFrm.reset();

  //       }
  //     },
  //   );

  // }

  initActivityRights(res) {
    var uar = "";
    for (var i = 0; i < res.length; i++) {
      uar += res[i].Id + ",";
    }
    var userActivityRights = uar.split(",")
    this.activityRights = {
      CanView: 1,
      ManageView: 2,


    };
    this.userActivityRights = {
      ViewCourse: userActivityRights.indexOf(this.activityRights["CanView"] + "") >= 0 ? true : false,
      ManageCourse: userActivityRights.indexOf(this.activityRights["ManageView"] + "") >= 0 ? true : false,

    }
    localStorage.setItem('UserActivityRights', JSON.stringify(this.userActivityRights));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
  signUp(): void {
    this.dialogRef.close();
  }
  GetUserInfo() {
    debugger

  }
  // openLearnerSignUpDialog(): void {
  //   // let dialogRef = this.dialog.open(LearnerSignupComponent, {
  //   //   width: '600px',
  //   //   height: 'auto'
  //   // });

  //   // dialogRef.afterClosed().subscribe(result => {
  //   // });
  //   // this.onNoClick()
  // }

  // openTutorSignUpDialog(): void {
  //   let dialogRef = this.dialog.open(TutorSignupComponent, {
  //     width: '1000px',
  //     height: 'auto'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //   });

  //   this.onNoClick()
  // }
}
