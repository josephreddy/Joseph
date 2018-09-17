import { Component, OnInit, ChangeDetectorRef, Inject, ViewChild, Pipe } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort } from '@angular/material';
import { DataService } from '../../shared/services/data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { RegisterDemoCourseComponent } from '../register-demo-course/register-demo-course.component';
import { RegisterRegularCourseComponent } from '../register-regular-course/register-regular-course.component';
import Swal from 'sweetalert2'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-explanation',
  templateUrl: './course-explanation.component.html',
  styleUrls: ['./course-explanation.component.css']
})
export class CourseExplanationComponent implements OnInit {

  searchText: any;
  currentUser: any;
  FilteredList: any[];
  parameterValue: number;
  TotalCount: any;
  dataSource = new MatTableDataSource();
  dataRegSource = new MatTableDataSource();

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sort1') sort1: MatSort;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('sort2') sort2: MatSort;
  getDemoCoursesDetailsForm: FormGroup;
  displayedColumns = ['CourseName', 'StartDate', 'Time', 'TrainingMode', 'Trainingtype', 'Duration', 'Timezone', 'TutorName', 'TCDemoId'];
  displayedColumns1 = ['CourseName', 'StartDate', 'Time', 'TrainingMode', 'Trainingtype', 'Duration', 'Timezone', 'TutorName', 'TCDemoId'];
  

  title: any;
  Id: any;
  courseDescId: any;
  AboutTrainingCourse: any;
  WhatYouWillLearn: any;
  WhyYouShouldTake: any;
  WhoShouldTake: any;
  AboutCourse: any;
  History: any;
  Reference: any;
  Documnetation: any;
  Certification: any;
  Validity: any;
  courseDesc: any;
  role: any;
  decision: any;
  SubMenu: any;
  length: any;
  // richText:string="<ol><li><i><u>asdasdasd</u></i></li><li><i><u>asdasd</u></i></li><li><i><u>asdasd</u></i></li><li><i><u>asdasd</u></i></li><li><i><u>asd</u></i></li><li><i><u>asd</u></i></li><li><i><u>asd</u></i></li><li><i><u>asd</u></i></li></ol>"
  constructor(private _dataService: DataService, private router: Router, private _activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef, public dialog: MatDialog) {
    this.router.onSameUrlNavigation = "reload";
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    // this.bannerImage = this.banner.bannerImage == null || undefined ? "assets/images/samplePaster.png" : this.banner.bannerImage;
    this.role = this.currentUser == null || undefined ? 2 : this.currentUser.RoleID
    // localStorage.setItem('currentUser', JSON.stringify(res.User));

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        // this.ngOnInit();
      }
    });

    this.searchText = this._activatedRoute.snapshot.params;
    this.get();
  }

  ngOnInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort1;

    this.dataRegSource.paginator = this.paginator1;
    this.dataRegSource.sort = this.sort2;

    this.LoadDemoCoursesDetails();
    this.LoadRegCoursesDetails();
    this.courseDetails();
  }

  courseDetails() {
    debugger
    this._dataService.GetAll('api/Course/GetCourseByCourseId/' + this.searchText.value)
      .subscribe((Data: any) => {
        this.cd.markForCheck();
        if (Data.length > 0) {
          this.title = Data["0"].CourseName;
          this.Id = Data["0"].CourseId;
        }
        else {
        }
      });
  }
  openViewDemoDialog(demoRow): void {
    this.router.navigate(['/ViewDemoDetails/', demoRow.TCDemoId]);
  }
  get() {
    debugger
    this._dataService.Get('api/Course/GetCourseDescriptionbyCourseId', this.searchText.value).subscribe(
      res => {
        this.decision = res.CourseDescriptionReq;
        this.SubMenu=res.SubmenuReq
        this.cd.markForCheck();
        if (res.length != 0) {
          // alert("old one");
          // this.courseDescId = res["0"].CourseId
          this.courseDesc = res["0"]
          // this.AboutTrainingCourse = this.courseDesc.AboutTrainingCourse;
          // this.WhatYouWillLearn = this.courseDesc.WhatYouWillLearn;
          // this.WhyYouShouldTake = this.courseDesc.WhyYouShouldTake;
          // this.WhoShouldTake = this.courseDesc.WhoShouldTake;
          // this.AboutCourse = this.courseDesc.AboutCourse;
          // this.History = this.courseDesc.History;
          // this.Reference = this.courseDesc.Reference;
          // this.Documnetation = this.courseDesc.Documnetation;
          this.Certification = this.decision.Certification;
          this.Validity = this.decision.Validity;
        } else {
          // alert("new One");
          this.courseDescId = null
        }
      },
    );
  }
  scroll(value): void {
    if (value == 1)
      document.querySelector('.aboutCourse').scrollIntoView({ behavior: 'smooth' });

    if (value == 2)
      document.querySelector('.courseContent').scrollIntoView({ behavior: 'smooth' });

    if (value == 3)
      document.querySelector('.fandq').scrollIntoView({ behavior: 'smooth' });

    if (value == 4)
      document.querySelector('.demoBatches').scrollIntoView({ behavior: 'smooth' });

    if (value == 5)
      document.querySelector('.regularBatches').scrollIntoView({ behavior: 'smooth' });

    if (value == 6)
      document.querySelector('.certification').scrollIntoView({ behavior: 'smooth' });
  }

  LoadDemoCoursesDetails(): void {
    this.dataSource.data = [];
    if (this.currentUser != null) {
      if (this.currentUser.AdminId != 1) {
        this.parameterValue = this.currentUser.TutorID
      }
      else {
        this.parameterValue = 0
      }
    }
    else {
      this.parameterValue = 0
    }

    this._dataService.GetAll('api/CourseDemo/GetDemoCoursebyCourseId/' + this.searchText.value)
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.dataSource.data = Data;
          this.Id = this.dataSource.data["0"].CourseId
        }
        else {
        }
      });
  }
  LoadRegCoursesDetails(): void {
    debugger
    this.dataRegSource.data = [];
    if (this.currentUser != null) {
      if (this.currentUser.AdminId != 1) {
        this.parameterValue = this.currentUser.TutorID
      }
      else {
        this.parameterValue = 0
      }
    }
    else {
      this.parameterValue = 0
    }
    this._dataService.GetAll('api/Learner/GetRegularBatchbyCourseId/' + this.searchText.value)
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.dataRegSource.data = Data;
          // this.Id = this.dataRegSource.data["0"].CourseId
        }
        else {
        }
      });
  }
  openRegisterDemoDialog(demoRow): void {
    if (this.currentUser == undefined) {
      let dialogRef = this.dialog.open(LoginComponent, {
        width: '500px',
        height: 'auto'
      });

      dialogRef.afterClosed().subscribe(result => {
      });

    }
    else {
      let dialogRef = this.dialog.open(RegisterDemoCourseComponent, {
        width: 'auto ',
        height: 'auto',
        data: demoRow,
      });

      dialogRef.afterClosed().subscribe(result => {
        // if (result != undefined) {
        this.LoadDemoCoursesDetails();
        // }
      });
    }
  }
  openRegisterRegularDialog(demoRow): void {
    if (this.currentUser == undefined) {
      let dialogRef = this.dialog.open(LoginComponent, {
        width: '500px',
        height: 'auto'
      });

      dialogRef.afterClosed().subscribe(result => {
      });

    }
    else {
      let dialogRef = this.dialog.open(RegisterRegularCourseComponent, {
        width: 'auto ',
        height: 'auto',
        data: demoRow,
      });

      dialogRef.afterClosed().subscribe(result => {
        // if (result != undefined) {
        this.LoadDemoCoursesDetails();
        // }
      });
    }
  }
  openSupportRequestDialog(): void {
    debugger

    if (this.currentUser == undefined) {
      let dialogRef = this.dialog.open(LoginComponent, {
        width: '500px',
        height: 'auto'
      });

      dialogRef.afterClosed().subscribe(result => {
      });

    }
    else {
      let dialogRef = this.dialog.open(SupportRequest, {
        width: '500px',
        height: 'auto',
        data: { userData: this.currentUser, CourseName: this.title, CourseId: this.Id }
      });

      dialogRef.afterClosed().subscribe(result => {
        // if (result != undefined) {
        // }
      });
    }
  }
}

@Component({
  selector: 'support-request',
  templateUrl: './support-request.component.html',
  styleUrls: ['./course-explanation.component.css']
})
export class SupportRequest implements OnInit {
  LearnerDetails: any;
  SupportRequestForm: FormGroup;
  CourseName: any;
  ChangeZone: any;
  selected: any;
  traininglist: any;
  sessionType: any;
  CourseId: any;
  trainingTypelist: any;
  constructor(public dialogRef: MatDialogRef<SupportRequest>, private _dataService: DataService, private router: Router, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder) {
    debugger
    this.LearnerDetails = data.userData;
    this.CourseName = data.CourseName;
    this.CourseId = data.CourseId
    this.SupportRequestForm = this._formBuilder.group({
      PhoneNumber: new FormControl(''),
      EmailId: new FormControl(''),
      CourseName: new FormControl(''),
      TimeZone: new FormControl('', [Validators.required]),
      Time: new FormControl('', [Validators.required]),
      BatchType: new FormControl('', [Validators.required]),
      TrainingMode: new FormControl('', [Validators.required]),
      TrainingTypelist: new FormControl('', [Validators.required]),
      Session: new FormControl('', [Validators.required]),
      Message: new FormControl('', [Validators.required]),
      StartDate: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.TrainingMode();
    this.TrainingModeType();
    this.SessionType();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ChangeTimeZone(details): void {
    this.ChangeZone = details
  }
  TrainingMode() {
    this._dataService.GetAll('api/Tutor/GetTrainingMode')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.traininglist = Data;
        }
        else {
          //alert(Data);
        }
      });
  }
  SessionType() {
    this._dataService.GetAll('api/Tutor/GetSessionType')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.sessionType = Data;
        }
        else {
          //alert(Data);
        }
      });
  }
  TrainingModeType() {
    this._dataService.GetAll('api/Tutor/GetTrainingModeDetails')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.trainingTypelist = Data;
        }
        else {
          //alert(Data);
        }
      });
  }
  onSubmit() {
    debugger
    var demoRequestObj = {
      "DemoOrRegBatchId": null,
      "LearnerId": this.LearnerDetails.LearnerID,
      "CourseId": this.CourseId,
      "Trainingtype": this.SupportRequestForm.value.TrainingTypelist,
      "TrainingMode": this.SupportRequestForm.value.TrainingMode,
      "LEmailId": this.SupportRequestForm.value.EmailId,
      "LMessage": this.SupportRequestForm.value.Message,
      "SessionTypeId": this.SupportRequestForm.value.Session,
      "LMobileNumber": this.SupportRequestForm.value.PhoneNumber,
      "TimeZone": this.SupportRequestForm.value.TimeZone,
      "Time": (new Date(this.SupportRequestForm.value.Time).getHours() + ":" + new Date(this.SupportRequestForm.value.Time).getMinutes()).toString(),
      "BatchType": this.SupportRequestForm.value.BatchType,
      "StartDate": this.SupportRequestForm.value.StartDate,
      "DateCreated": new Date(),
    }
    this._dataService.Post('api/Learner/AddCourseDemoOrRegBatchReq', demoRequestObj)
      .subscribe((Data: any) => {
        if (Data.isSuccess > 0) {
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
            title: Data.error.message,
            // text: "Department added succcefully",
            type: 'success',
            position: 'top'
          })
        }
      });
  }
  
}

@Pipe({name: 'safeHtml'})
export class Safe {
  constructor(private sanitizer:DomSanitizer){}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustHtml(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}