import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-learner-demo-reg',
  templateUrl: './learner-demo-reg.component.html',
  styleUrls: ['./learner-demo-reg.component.css']
})
export class LearnerDemoRegComponent implements OnInit {
  ChangeZone: any;
  parameterValue: any;
  currentUser: any;
  tutorslist: any;
  animal: string;
  name: string;
  TotalCount: any;
  //MatTable Columns List

  getDemoCoursesDetailsForm: FormGroup;
  displayedColumns = ['LearnerName', 'CourseName', 'TutorName', 'PhoneNumber', 'City', 'Contacted', 'EmailId', 'Review'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  TimeZoneConvertFrm: FormGroup;
  isLoadingResults = true;

  constructor(private router: Router, private _dataService: DataService, public dialog: MatDialog) {
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.TimeZoneConvertFrm = new FormGroup({
      timezone: new FormControl(''),
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.LoadDemoCoursesDetails();
  }

  LoadDemoCoursesDetails(): void {
    debugger
    this.isLoadingResults = true;

    this.dataSource.data = [];
    if (this.currentUser != null) {
      if (this.currentUser.RoleID == 3) {
        this.parameterValue = this.currentUser.LearnerID
      }
      else {
        this.parameterValue = 0
      }
    }
    else {
      this.parameterValue = 0
    }
    debugger
    this._dataService.GetAll('api/Learner/GetLearnerDemoRegetailsbyLearnerId/' + this.parameterValue)
      .subscribe((Data: any) => {
        this.isLoadingResults = false;
        if (Data.length > 0) {
          this.dataSource.data = Data;
        }
        else {
        }
      });
  }
  openViewDemoDialog(demoRow): void {
    this.router.navigate(['/ViewDemoDetails/', demoRow.TCDemoId]);
  }
  submitReview(row) {
    let dialogRef = this.dialog.open(SubmitReview, {
      width: '420px',
      height: 'auto',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result != undefined) {
      this.LoadDemoCoursesDetails();
      // }
    });

  }
}

@Component({
  selector: 'app-learner-demo-reg',
  templateUrl: './submit-demo-review.component.html',
  styleUrls: ['./learner-demo-reg.component.css']
})
export class SubmitReview implements OnInit {
  currentRate = 0;
  currentRate1 = 0;
  currentRate2 = 0;
  currentRate3 = 0;
  currentRate4 = 0;
  clickedDetails: any;
  Comment: string;
  ReviewComment: FormGroup;
  ngOnInit() {
    this.onClickReview();
  }
  constructor(public dialogRef: MatDialogRef<SubmitReview>, @Inject(MAT_DIALOG_DATA) public data: any, config: NgbRatingConfig, private _dataService: DataService) {
    debugger
    config.max = 5;
    this.clickedDetails = data
    this.ReviewComment = new FormGroup({
      Comment: new FormControl(''),
    });
    // config.readonly = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClickReview() {
    var req = {
      "LearnerId": this.clickedDetails.LearnerID,
      "TutorId": this.clickedDetails.TutorID
    }
    this._dataService.Post('api/Tutor/GetTutorRatingByLearnerIdAndTutorId', req)
      .subscribe((Data: any) => {
        if (Data.length>0) {

          this.currentRate=Data[0].Communication;
          this.currentRate1=Data[0].Proficiency;
          this.currentRate2=Data[0].SubjectKnowledge;
          this.currentRate3=Data[0].Timemaintenance;
          this.currentRate4=Data[0].OverallReview;
          this.Comment=Data[0].Review;
        }
        else {
        }
      });
  }
  onSubmit() {
    debugger
    var values = {
      "ReviewId": null,
      "LearnerId": this.clickedDetails.LearnerID,
      "TutorId": this.clickedDetails.TutorID,
      "Communication": this.currentRate,
      "Proficiency": this.currentRate1,
      "SubjectKnowledge": this.currentRate2,
      "TimeMaintenance": this.currentRate3,
      "OverallReview": this.currentRate4,
      "Review": this.Comment
    }
    this._dataService.Post('api/Tutor/AddUpdateRatingsAndReview', values)
      .subscribe((Data: any) => {
        if (Data.isSuccess) {
          Swal({
            title: Data.message,
            // text: "Department added succcefully",
            type: 'success',
            position: 'top'
          })          
          this.onNoClick();
        }
        else {
          Swal({
            title: Data.error,
            // text: "Department added succcefully",
            type: 'warning',
            position: 'top'
          })           
        }
      });
  }
}