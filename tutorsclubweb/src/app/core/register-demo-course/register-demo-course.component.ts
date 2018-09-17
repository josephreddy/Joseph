import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-register-demo-course',
  templateUrl: './register-demo-course.component.html',
  styleUrls: ['./register-demo-course.component.css']
})
export class RegisterDemoCourseComponent implements OnInit {
  parameterValue: any;
  RegisterDemoFrom: FormGroup;
  demoId: any;
  openLoginDialog(): any {
    throw new Error("Method not implemented.");
  }
  currentUser: any;
  constructor(public dialogRef: MatDialogRef<RegisterDemoCourseComponent>, private router: Router, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private _dataService: DataService) {
    debugger
    this.demoId = data;
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    }

    // this.openLoginDialog(){
    //   this.dialog.open(LoginComponent, {
    //     width: 'auto',
    //     height:'auto',
    //   });

    // }

    this.RegisterDemoFrom = this._formBuilder.group({
      firstname: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]),
      lastname: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'), Validators.maxLength(30)]),
      demoid: new FormControl(''),
      courseid: new FormControl(''),
      TutorId: new FormControl(''),
      coursename: new FormControl(''),
      startdate: new FormControl(''),
      time: new FormControl(''),
      tutor: new FormControl(''),
      contactNumber: new FormControl('', [Validators.required, Validators.compose([Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('[+0-9]*')])]),
    });


  }

  ngOnInit() {
  }

  DemoRegistrationSubmit(): void {
    debugger;
    if (this.currentUser.LearnerID != null) {
      this.parameterValue = this.currentUser.LearnerID
    }
    else {
      this.parameterValue = this.RegisterDemoFrom.value.TutorId
    }

    var demoRequestObj = {
      // "DemoId":this.RegisterDemoFrom.value.demoid,
      // "CourseId":  this.RegisterDemoFrom.value.courseid,
      // "TutorId":  this.RegisterDemoFrom.value.TutorId,
      // "FirstName": this.RegisterDemoFrom.value.firstname,
      // "LastName": this.RegisterDemoFrom.value.lastname,
      // "EmailAddress": this.RegisterDemoFrom.value.email,
      // "PhoneNumber": this.RegisterDemoFrom.value.contactNumber,
      // "CreatedDate": new Date(),
      // "Contacted": false,
      // "Status": true,
      "RegisteredCandidateDemoID": null,
      "TCDemoId": this.demoId.TCDemoId,
      "LearnerID": this.parameterValue,
      "DemoStartTime": this.demoId.StartDate,
      "RegisteredDate": new Date(),
      "Active": true
    }


    this._dataService.Post('api/Learner/AddUpdateLearnerDemoRegistered', demoRequestObj).subscribe(
      res => {
        debugger;
        if (res.isSuccess == true) {
          // alert(res.message);
          Swal({
            title: res.message,
            // text: "Department added succcefully",
            type: 'success',
            position: 'top'
          })
        } else {
          //alert(res.error.Message);
          // alert(res.error.message);
          Swal({
            title: res.error.message,
            // text: "Department added succcefully",
            type: 'success',
            position: 'top'
          })
        }
        this.onNoClick();
      },
    );
  }

  //Dailogue Window Closing
  onNoClick(): void {
    this.dialogRef.close();
  }
}
