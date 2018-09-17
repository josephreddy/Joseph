import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-register-regular-course',
  templateUrl: './register-regular-course.component.html',
  styleUrls: ['./register-regular-course.component.css']
})
export class RegisterRegularCourseComponent implements OnInit {
  parameterValue: any;
  demoId: any;
  openLoginDialog(): any {
    throw new Error("Method not implemented.");
  }
  currentUser: any;
  constructor(public dialogRef: MatDialogRef<RegisterRegularCourseComponent>, private router: Router, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private _dataService: DataService) {
    debugger
    this.demoId = data;
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

  RegularRegistrationSubmit(): void {
    debugger
    this.parameterValue = this.currentUser.LearnerID
    var demoRequestObj = {
      "RegisteredCandidateRegBatchId": null,
      "TCDemoId": null,
      "RegBatchId": this.demoId.RegBatchId,
      "CourseId": this.demoId.CourseId,
      "TutorID": this.demoId.TutorID,
      "LearnerID": this.currentUser.LearnerID,
      "RegBatchStartTime": this.demoId.StartDate,
      "RegBatchEndTime": this.demoId.EndDate,
      "RegisteredDate": new Date(),
      "Active": true
    }
    var requestObj=[]
    requestObj.push(demoRequestObj)
    this._dataService.Post('api/Learner/AddUpdateRegularBatchRegistered', requestObj).subscribe(
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
