import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import swal from 'sweetalert2';
import { CURRENCY_LIST } from '../../shared/services/CurrencyList';

@Component({
  selector: 'app-admin-regular-reg-list',
  templateUrl: './admin-regular-reg-list.component.html',
  styleUrls: ['./admin-regular-reg-list.component.css']
})
export class AdminRegularCreateComponent implements OnInit {
  checked: boolean = false;
  ChangeZone: any;
  parameterValue: any;
  currentUser: any;
  tutorslist = new MatTableDataSource();
  animal: string;
  name: string;
  TotalCount: any;
  selectedValue: any;
  selectedValuseList: any[] = [];
  DemoId: any
  //MatTable Columns List
  getDemoCoursesDetailsForm: FormGroup;
  displayedColumns = ['Contacted', 'Status', 'LearnerName', 'Demo Id', 'Demo Course Name', 'TutorName', 'PhoneNumber', 'City', 'EmailId'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  TimeZoneConvertFrm: FormGroup;
  isLoadingResults = true;
  status: any;
  tutorID: number;
  req: any[] = [];
  isLoading: boolean = false;
  courselist = new MatTableDataSource();
  temp: any[] = [];
  temp1: any[] = [];
  backUpData = new MatTableDataSource();
  temperary: any[] = [];
  disable: boolean = false;
  SelectedDemoIds: any[] = [];
  selectedeTutorid: any;
  decision: boolean = true;
  searchText: any;
  SelectedBatch: any;
  RegularBatch: any;
  constructor(private router: Router, private _dataService: DataService, public dialog: MatDialog, private cd: ChangeDetectorRef, private _activatedRoute: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.SelectedBatch = JSON.parse(localStorage.getItem('SelectedRegBatch'));
    this.tutorID = this.SelectedBatch.TutorID
    this.RegularBatch = this.SelectedBatch.RegBatchId
    this.searchText = this._activatedRoute.snapshot.params.value;
    this.TimeZoneConvertFrm = new FormGroup({
      timezone: new FormControl(''),
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.LoadDemoCoursesDetails();
    this.GetStatus();
    this.GetTutorList();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  PushValue() {

    for (var i = 0; i < this.selectedValuseList.length; i++) {
      var reqobj = {
        "RegisteredCandidateRegBatchId": this.selectedValuseList[i].RegisteredCandidateRegBatchId,
        "TCDemoId": this.selectedValuseList[i].TCDemoID,
        "RegBatchId": this.SelectedBatch.RegBatchId,
        "CourseId": this.selectedValuseList[i].CourseId,
        "TutorID": this.selectedValuseList[i].TutorID,
        "LearnerID": this.selectedValuseList[i].LearnerID,
        "RegBatchStartTime": "2018-08-14T12:47:22.2551425+05:30",
        "RegBatchEndTime": "2018-08-14T12:47:22.2551425+05:30",
        "RegisteredDate": new Date(),
        "Active": true
      }
      this.req.push(reqobj);
    }
    var finalReq = this.req;
    this._dataService.Post('api/Learner/AddUpdateRegularBatchRegistered', finalReq)
      .subscribe((Data: any) => {
        this.selectedValuseList = [];
        this.req = [];
        if (Data.isSuccess) {
          swal({
            title: Data.message,
            type: 'success',
            position: 'top'
          })
          //this.router.navigate(['RegList']);
        }
        else {
          swal({
            title: Data.message,
            type: 'error',
            position: 'top'
          })
        }

      });

    //   debugger
    //   for (var i = 0; i < this.selectedValuseList.length; i++) {
    //   this.req.push(this.selectedValuseList[i]);
    // }
    // var finalReq={
    //   "TutorId":this.tutorID ,
    //   "BatchId":this.SelectedBatch.RegBatchId,
    //   "Learner":this.req
    // }
    // var req1=JSON.stringify(finalReq)
  }
  GetStatus() {
    debugger
    this._dataService.GetAll('api/Learner/GetStatusType')
      .subscribe((Data: any) => {
        // this.isLoadingResults = false;
        if (Data.length > 0) {
          this.status = Data;
        }
        else {
        }
      });
  }

  updateDemoStatus() {
    debugger
    this.isLoading = true;
    if (this.selectedValuseList.length != 0) {
      for (var i = 0; i < this.selectedValuseList.length; i++) {
        var reqobj = {
          "RegisteredCandidateDemoID": this.selectedValuseList[i].RegisteredCandidateDemoID,
          "TCDemoId": this.selectedValuseList[i].TCDemoID,
          "LearnerID": this.selectedValuseList[i].LearnerID,
          "LContacted": this.selectedValuseList[i].LContacted,
          "LStatusId": this.selectedValuseList[i].LContacted == false ? null : this.selectedValuseList[i].LStatusId,
          "DemoStartTime": "2018-08-14T12:47:22.2551425+05:30",
          "RegisteredDate": "2018-08-14T12:47:22.2561395+05:30",
          "Active": true
        }
        this.req.push(reqobj);
      }
      var finalReq = this.req;
      this._dataService.Post('api/Learner/UpdateLearnerDemoRegistered', finalReq)
        .subscribe((Data: any) => {
          this.isLoading = false;
          this.selectedValuseList = [];
          this.req = [];
          if (Data.isSuccess) {
            swal({
              title: Data.message,
              type: 'success',
              position: 'top'
            })
            //alert(Data.message)
            this.LoadDemoCoursesDetails();
          }
          else {
            swal({
              title: Data.message,
              type: 'error',
              position: 'top'
            })
          }
        });
    } else {
      swal({
        title: "Please Select a Value",
        type: 'warning',
        position: 'top'
      })
      this.isLoading = false;
    }

  }
  Changes(value, option) {
    debugger;
    this.selectedValuseList.forEach((item, index) => {
      if (item === value) this.selectedValuseList.splice(index, 1);
    });
    this.selectedValuseList.push(value);
  }

  onTutorSelect(value): void {
    this.decision = true
    this.selectedeTutorid = value;
    this.temp1 = [];
    this.courselist.data = [];
    // if (this.tutorID != undefined) {
    // Binding Course
    debugger
    this._dataService.GetAll('api/CourseDemo/GetDemoCoursebyTutors/' + value)
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          debugger;
          this.courselist.data = Data;
          this.temp = [];
          this.temperary = this.backUpData.data;
          for (var i = 0; i < this.temperary.length; i++) {
            if (this.temperary[i].TutorID == value) {
              this.temp.push(this.temperary[i]);
            }
          }
          this.dataSource.data = this.temp;
          this.isLoadingResults = false;
          this.cd.markForCheck();
        }
        else {
          this.courselist.data = [];
          this.dataSource.data = [];
          //alert(Data);
        }
      });
    // }
  }
  onDemoSelect(value) {
    debugger;
    this.SelectedDemoIds = value;
    var DemoSelected = this.SelectedDemoIds.toString();
    var req = {
      "TutorId": this.currentUser.RoleID == 1 ? this.selectedeTutorid : this.currentUser.TutorID,
      "TCDemoId": DemoSelected = "" ? null : DemoSelected
    };
    this._dataService.Post('api/Learner/GetLearnerConfirmedListbyTCDemoId', req)
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.dataSource.data = Data;
          this.decision = false
        } else {
          this.dataSource.data = [];
        }
      });

  }
  GetTutorList() {
    // Binding Tutors
    this._dataService.GetAll('api/Tutor/GetTutorDetails')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          var TutorNames = [];
          var TutorList = [];
          for (let i = 0; i < Data.length; i++) {
            if (TutorNames.indexOf(Data[i].TutorID) === -1) {
              TutorList.push({ "start": Data[i].FirstName, "End": Data[i].LastName, "tutorID": Data[i].TutorID });
              TutorNames.push(Data[i].TutorID);
            }
          }
          this.tutorslist.data = TutorList;
          this.cd.markForCheck();
          this.onTutorSelect(this.tutorID)
          // this.traininglist.data = [{ "ID": 1, "Name": "Skype" }, { "ID": 2, "Name": "Hangout" }, { "ID": 3, "Name": "WebEx" }, { "ID": 4, "Name": "TeamViewer" }]
        }
        else {
          //alert(Data);
        }
      });
  }
  onCheckChange(rowData, checked) {
    debugger
    if (checked.checked) {
      this.selectedValuseList.push(rowData);
    } else {
      this.selectedValuseList.forEach((item, index) => {
        if (item === rowData) this.selectedValuseList.splice(index, 1);
      });
    }
  }
  LoadDemoCoursesDetails(): void {
    debugger
    this.isLoadingResults = true;

    this.dataSource.data = [];
    if (this.currentUser != null) {
      if (this.currentUser.RoleID == 1) {
        this.parameterValue = 0
      }
      else {
        this.parameterValue = this.currentUser.TutorID
      }
    }
    debugger
    this._dataService.GetAll('api/Learner/GetLearnerDemoConfirmedList/' + this.parameterValue)
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          // this.dataSource.data = Data;
          this.backUpData.data = Data
          this.selectedValue = Data.LStatusId
          if (this.currentUser.RoleID == 2) {
            this.onTutorSelect(this.currentUser.TutorID);
            this.tutorID = this.currentUser.TutorID;
            // this.disable = true;
          }
          this.cd.markForCheck();
        }
        else {
        }
      });
  }
  CreateRegBatch() {
    debugger
    for (var i = 0; i < this.dataSource.data.length; i++) {
      // if(this.dataSource.data[i].){}
    }
    this.router.navigate(['/admin/RegCreateBatch']);
  }

  AddLearnerInBatch() {
    localStorage.setItem('SelectedRegBatch', JSON.stringify(this.dataSource.data));
    this.router.navigate(['/admin/CreateRegBatch']);
  }
  openViewDemoDialog(demoRow): void {
    this.router.navigate(['/ViewDemoDetails/', demoRow.TCDemoId]);
  }
}



@Component({
  selector: 'reg-batch-create-list',
  templateUrl: './reg-batch-create.html',
  styleUrls: ['./admin-regular-reg-list.component.css']
})

export class RegularBatchCreate implements OnInit {
  ChangeZone: any;
  currentenddate: any;
  TypesVisible: boolean = false;
  tutorID: any;
  currentUser: any;
  DemoForm: any;
  upcomingRegcoursesFrm: FormGroup;
  courselist = new MatTableDataSource();
  DemoList = new MatTableDataSource();
  tutorslist = new MatTableDataSource();
  currentDate = new Date();
  isReadOnly: boolean = false;
  currentstartdate = new FormControl((new Date()).toISOString());
  traininglist = new MatTableDataSource();
  AfterNoonStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear());
  minDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
  btnDisable: boolean;
  tempDate: string;
  tempTime: any;
  FinalDateTime: any;
  trainingType = new MatTableDataSource();
  sessionType: any;
  FeesVisible: boolean;
  currenies: any;
  exchangeValue: any;
  dataSource = new MatTableDataSource();
  courseID: any;
  // displayedColumns = ['Status', 'LearnerName', 'Demo Id', 'Demo Course Name', 'TutorName', 'PhoneNumber', 'City', 'EmailId'];
  priceStatus = 1;
  tempEndDate: any;
  feeType: any;
  hours: any[] = [
    { value: '0', viewValue: '0 hr' },
    { value: '1', viewValue: '1 hr' },
    { value: '2', viewValue: '2 hr' },
    { value: '3', viewValue: '3 hr' },
    { value: '4', viewValue: '4 hr' },
    { value: '5', viewValue: '5 hr' },
    { value: '6', viewValue: '6 hr' },
    { value: '7', viewValue: '7 hr' },
    { value: '8', viewValue: '8 hr' },
    { value: '9', viewValue: '9 hr' },
    { value: '10', viewValue: '10 hr' },
    { value: '11', viewValue: '11 hr' },
    { value: '12', viewValue: '12 hr' },
  ];
  minutes: any[] = [
    { value: '00', viewValue: '00 min' },
    { value: '10', viewValue: '10 min' },
    { value: '20', viewValue: '20 min' },
    { value: '30', viewValue: '30 min' },
    { value: '40', viewValue: '40 min' },
    { value: '50', viewValue: '50 min' }
  ];
  final: string;
  constructor(private _formBuilder: FormBuilder, private _dataService: DataService, private router: Router, private cd: ChangeDetectorRef) {
    debugger
    this.currenies = CURRENCY_LIST;

    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    // this.dataSource.data = JSON.parse(localStorage.getItem('SelectedRegBatch'));
    // this.tutorID = this.dataSource.data["0"].TutorID;
    // this.courseID = this.dataSource.data["0"].CourseId;
    this.cd.markForCheck();
    if (this.currentUser.TutorID != undefined) {
      this.tutorID = this.currentUser.TutorID;
      this.isReadOnly = true;
      this.onTutorSelect(this.tutorID)
    }
    this.upcomingRegcoursesFrm = new FormGroup({
      tutor: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      startdate: new FormControl('', [Validators.required]),
      enddate: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      trainingmood: new FormControl('', [Validators.required]),
      trainingtype: new FormControl(''),
      pricetype: new FormControl('', [Validators.required]),
      // paiddemo: new FormControl('', [Validators.required]),
      Inhours: new FormControl('', [Validators.required]),
      Inminutes: new FormControl('', [Validators.required]),
      timezone: new FormControl('', [Validators.required]),
      sessionType: new FormControl('', [Validators.required]),
      Fees: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.BindData();
    this.TrainingMode();
    this.TrainingModeType();
    this.SessionType();
    this.FeeType();
    this.courselist.data = []
  }
  onCurrencyChange(currency) {
    this.final = currency + "_INR"
    this._dataService.GetCurrency(this.final)
      .subscribe((Data: any) => {
        debugger
        if (Data != undefined) {
          this.exchangeValue = Data[this.final].val;
        }
        else {
          //alert(Data);
        }
      });
  }
  ChangeTimeZone(details): void {
    this.ChangeZone = details
  }

  TrainingMode() {
    this._dataService.GetAll('api/Tutor/GetTrainingModeDetails')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.traininglist.data = Data;
          this.cd.markForCheck();
        }
        else {
          //alert(Data);
        }
      });
  }
  TrainingModeType() {
    this._dataService.GetAll('api/Tutor/GetTrainingMode')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.trainingType.data = Data;
        }
        else {
          //alert(Data);
        }
      });
  }
  FeeType() {
    this._dataService.GetAll('api/Tutor/GetFeeType')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.feeType = Data;
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

  BindData() {
    // Binding Tutors
    this._dataService.GetAll('api/Tutor/GetTutorDetails')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          var TutorNames = [];
          var TutorList = [];
          for (let i = 0; i < Data.length; i++) {
            if (TutorNames.indexOf(Data[i].TutorID) === -1) {
              TutorList.push({ "start": Data[i].FirstName, "End": Data[i].LastName, "tutorID": Data[i].TutorID });
              TutorNames.push(Data[i].TutorID);
            }
          }
          this.tutorslist.data = TutorList;
          this.cd.markForCheck();
          // this.traininglist.data = [{ "ID": 1, "Name": "Skype" }, { "ID": 2, "Name": "Hangout" }, { "ID": 3, "Name": "WebEx" }, { "ID": 4, "Name": "TeamViewer" }]
        }
        else {
          //alert(Data);
        }
      });
  }

  onTutorSelect(value): void {
    if (this.tutorID != undefined) {
      // Binding Course
      debugger
      this._dataService.GetAll('api/Course/GetCoursebyTutor/' + value)
        .subscribe((Data: any) => {
          if (Data.length > 0) {
            // var CourseID = [];
            // var CourseList=[];
            // for (let i = 0; i < Data.length; i++) {
            //   if (CourseID.indexOf(Data[i].CourseId) === -1) {
            //    CourseList.push({"CourseId":Data[i].CourseId,"CourseName":Data[i].CourseName});
            //    CourseID.push(Data[i].CourseId);
            //   }
            // }

            this.courselist.data = Data;
          }
          else {
            //alert(Data);
          }
        });
    }
  }
  onShiftChange(value): void {
    debugger
    this.TypesVisible = false;
    if (value == 2) {
      this.TypesVisible = false;
    }
    else {
      this.TypesVisible = true;
    }
  }
  onFeesChange(value): void {
    debugger
    this.FeesVisible = false;
    if (value == "false") {
      this.FeesVisible = false;
    }
    else {
      this.FeesVisible = true;
    }
  }
  AddDemoCourseForm(): void {
    debugger

    if (this.upcomingRegcoursesFrm.valid == true) {
      this.btnDisable = true;
      this.DemoForm = this.upcomingRegcoursesFrm.value;
      // let startDate = new Date(this.DemoForm.startdate.getFullYear(), this.DemoForm.startdate.getMonth(), this.DemoForm.startdate.getDate())
      let startDate = this.DemoForm.startdate;
      let endDate = this.DemoForm.enddate;
      let time = this.DemoForm.time;
      this.tempTime = time.toString();
      this.tempTime = this.tempTime.substring(16)
      this.tempTime = this.tempTime.slice(0, 8)
      this.tempDate = startDate.toString();
      this.tempDate = this.tempDate.slice(0, 16)
      this.tempEndDate = endDate.toString();
      this.tempEndDate = this.tempEndDate.slice(0, 16)
      var reqobj = {
        "RegBatchId": null,
        "TutorID": parseInt(this.DemoForm.tutor),
        "CourseId": parseInt(this.DemoForm.course),
        "StartDate": this.tempDate + this.tempTime,
        "EndDate": this.tempEndDate + this.tempTime,
        "Time": (new Date(this.DemoForm.time).getHours() + ":" + new Date(this.DemoForm.time).getMinutes()).toString(),
        "TrainingMode": this.DemoForm.trainingtype == "" ? null : this.DemoForm.trainingtype,
        "Trainingtype": this.DemoForm.trainingmood,
        // "PaidDemo": this.DemoForm.paiddemo,
        "FeeTypeId": this.DemoForm.pricetype,
        "Duration": this.DemoForm.Inhours + ':' + this.DemoForm.Inminutes,
        "Timezone": this.DemoForm.timezone,
        "SessionTypeId": this.DemoForm.sessionType,
        "Fee": (this.DemoForm.Fees * this.exchangeValue),
        "CurrencyName": this.final,
        "DataCreated": new Date(),
        "DateModified": new Date(),
        "CreatedBy": 1,
        "ModifiedBy": 1,
        "Active": true
      }
      // alert(JSON.stringify(reqobj));

      this._dataService.Post('api/Tutor/AddUpdateRegularBatch', reqobj).subscribe(
        res => {
          if (res.isSuccess == true) {
            this.btnDisable = false;
            // alert("Demo Course Added Successfully");
            this.router.navigate(['/RegList']);
            this.onNoClick();
            swal({
              title: 'Regular Batch Added Successfully',
              // text: "Department added succcefully",
              type: 'success',
              position: 'top'
            })
          }
          else {
            // alert(res.error.message);
            swal({

              title: res.error.message,
              // text: "Invalid Email And Password",
              type: 'warning',
              position: 'top',
              //  timer: 2500
            })
            this.btnDisable = false;
          }
        },
      );
    }
  }
  //Dailogue Window Closing
  onNoClick(): void {
    // this.dialogRef.close();
  }
}

@Component({
  selector: 'reg-batch-edit',
  templateUrl: './reg-batch-edit.html',
  styleUrls: ['./admin-regular-reg-list.component.css']
})

export class EditRegularBatch implements OnInit {
  ChangeZone: any;
  TypesVisible: boolean = false;
  tutorID: any;
  currentUser: any;
  DemoForm: any;
  upcomingRegcoursesFrm: FormGroup;
  courselist = new MatTableDataSource();
  DemoList = new MatTableDataSource();
  tutorslist = new MatTableDataSource();
  currentDate = new Date();
  isReadOnly: boolean = false;
  currentstartdate = new FormControl((new Date()).toISOString());
  traininglist = new MatTableDataSource();
  AfterNoonStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear());
  minDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
  btnDisable: boolean;
  tempDate: string;
  tempTime: any;
  FinalDateTime: any;
  trainingType = new MatTableDataSource();
  sessionType: any;
  FeesVisible: boolean;
  currenies: any;
  exchangeValue: any;
  dataSource = new MatTableDataSource();
  courseID: any;
  // displayedColumns = ['Status', 'LearnerName', 'Demo Id', 'Demo Course Name', 'TutorName', 'PhoneNumber', 'City', 'EmailId'];
  priceStatus = 1;
  tempEndDate: any;
  feeType: any;
  RegularBatchDetails: any;
  currencys: any
  hours: any[] = [
    { value: '00', viewValue: '0 hr' },
    { value: '01', viewValue: '1 hr' },
    { value: '02', viewValue: '2 hr' },
    { value: '03', viewValue: '3 hr' },
    { value: '04', viewValue: '4 hr' },
    { value: '05', viewValue: '5 hr' },
    { value: '06', viewValue: '6 hr' },
    { value: '07', viewValue: '7 hr' },
    { value: '08', viewValue: '8 hr' },
    { value: '09', viewValue: '9 hr' },
    { value: '10', viewValue: '10 hr' },
    { value: '11', viewValue: '11 hr' },
    { value: '12', viewValue: '12 hr' },
  ];
  minutes: any[] = [
    { value: '00', viewValue: '00 min' },
    { value: '10', viewValue: '10 min' },
    { value: '20', viewValue: '20 min' },
    { value: '30', viewValue: '30 min' },
    { value: '40', viewValue: '40 min' },
    { value: '50', viewValue: '50 min' }
  ];
  duration: any;
  hrs: any;
  exchangeCurrency: void;
  fromCurrency: any;
  Fee: number;
  final: string;
  constructor(private _formBuilder: FormBuilder, private _dataService: DataService, private router: Router, private cd: ChangeDetectorRef) {
    debugger
    this.currenies = CURRENCY_LIST;
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.RegularBatchDetails = JSON.parse(localStorage.getItem('EditRegularBatchDetails'));
    this.hrs = this.RegularBatchDetails.Duration == null || undefined ? '00' : this.RegularBatchDetails.Duration.slice(0, 2);
    this.duration = this.RegularBatchDetails.Duration == null || undefined ? '00' : this.RegularBatchDetails.Duration.slice(3, 5);
    this.exchangeCurrency = this.RegularBatchDetails.CurrencyName;
    this.onstartCurrency(this.exchangeCurrency);
    // this.dataSource.data = JSON.parse(localStorage.getItem('SelectedRegBatch'));
    // this.tutorID = this.dataSource.data["0"].TutorID;
    // this.courseID = this.dataSource.data["0"].CourseId;
    this.cd.markForCheck();
    if (this.currentUser.TutorID != undefined) {
      this.tutorID = this.currentUser.TutorID;
      this.isReadOnly = true;
      this.onTutorSelect(this.tutorID)
    }
    else {
      this.onTutorSelect(this.RegularBatchDetails.TutorID)
    }
    this.upcomingRegcoursesFrm = new FormGroup({
      tutor: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      startdate: new FormControl('', [Validators.required]),
      enddate: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      trainingmood: new FormControl('', [Validators.required]),
      trainingtype: new FormControl(''),
      pricetype: new FormControl('', [Validators.required]),
      // paiddemo: new FormControl('', [Validators.required]),
      Inhours: new FormControl('', [Validators.required]),
      Inminutes: new FormControl('', [Validators.required]),
      timezone: new FormControl('', [Validators.required]),
      sessionType: new FormControl('', [Validators.required]),
      Fees: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      // currency: new FormControl('', [Validators.required])
    });
  }


  ngOnInit() {
    this.BindData();
    this.TrainingMode();
    this.TrainingModeType();
    this.SessionType();
    this.FeeType();
    this.courselist.data = []
  }
  onCurrencyChange(currency) {
    debugger
    this.final = currency + "_INR"
    this._dataService.GetCurrency(this.final)
      .subscribe((Data: any) => {
        debugger
        if (Data != undefined) {
          this.exchangeValue = Data[this.final].val;
        }
        else {
          //alert(Data);
        }
      });
  }
  onstartCurrency(currency) {
    debugger
    this.fromCurrency = currency.slice(0, 3);
    currency = "INR_" + this.fromCurrency;
    this.currencys = this.fromCurrency;
    this._dataService.GetCurrency(currency)
      .subscribe((Data: any) => {
        debugger
        if (Data != undefined) {
          this.exchangeValue = Data[currency].val;
          this.Fee = Math.round(this.RegularBatchDetails.Fee * this.exchangeValue)
        }
        else {
          //alert(Data);
        }
      });
    this.cd.markForCheck();

  }
  ChangeTimeZone(details): void {
    this.ChangeZone = details
  }

  TrainingMode() {
    this._dataService.GetAll('api/Tutor/GetTrainingModeDetails')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.traininglist.data = Data;
          this.cd.markForCheck();
        }
        else {
          //alert(Data);
        }
      });
  }
  TrainingModeType() {
    this._dataService.GetAll('api/Tutor/GetTrainingMode')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.trainingType.data = Data;
        }
        else {
          //alert(Data);
        }
      });
  }
  FeeType() {
    this._dataService.GetAll('api/Tutor/GetFeeType')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.feeType = Data;
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

  BindData() {
    // Binding Tutors
    this._dataService.GetAll('api/Tutor/GetTutorDetails')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          var TutorNames = [];
          var TutorList = [];
          for (let i = 0; i < Data.length; i++) {
            if (TutorNames.indexOf(Data[i].TutorID) === -1) {
              TutorList.push({ "start": Data[i].FirstName, "End": Data[i].LastName, "tutorID": Data[i].TutorID });
              TutorNames.push(Data[i].TutorID);
            }
          }
          this.tutorslist.data = TutorList;
          this.cd.markForCheck();
          // this.traininglist.data = [{ "ID": 1, "Name": "Skype" }, { "ID": 2, "Name": "Hangout" }, { "ID": 3, "Name": "WebEx" }, { "ID": 4, "Name": "TeamViewer" }]
        }
        else {
          //alert(Data);
        }
      });
  }

  onTutorSelect(value): void {
    debugger
    if (value != undefined) {
      // Binding Course
      debugger
      this._dataService.GetAll('api/Course/GetCoursebyTutor/' + value)
        .subscribe((Data: any) => {
          if (Data.length > 0) {
            // var CourseID = [];
            // var CourseList=[];
            // for (let i = 0; i < Data.length; i++) {
            //   if (CourseID.indexOf(Data[i].CourseId) === -1) {
            //    CourseList.push({"CourseId":Data[i].CourseId,"CourseName":Data[i].CourseName});
            //    CourseID.push(Data[i].CourseId);
            //   }
            // }

            this.courselist.data = Data;
          }
          else {
            //alert(Data);
          }
        });
    }
  }
  onShiftChange(value): void {
    debugger
    this.TypesVisible = false;
    if (value == 2) {
      this.TypesVisible = false;
    }
    else {
      this.TypesVisible = true;
    }
  }
  onFeesChange(value): void {
    debugger
    this.FeesVisible = false;
    if (value == "false") {
      this.FeesVisible = false;
    }
    else {
      this.FeesVisible = true;
    }
  }
  AddDemoCourseForm(): void {
    debugger

    if (this.upcomingRegcoursesFrm.valid == true) {
      this.btnDisable = true;
      this.DemoForm = this.upcomingRegcoursesFrm.value;
      // let startDate = new Date(this.DemoForm.startdate.getFullYear(), this.DemoForm.startdate.getMonth(), this.DemoForm.startdate.getDate())
      let startDate = this.DemoForm.startdate;
      let endDate = this.DemoForm.enddate;
      let time = this.DemoForm.time;
      this.tempTime = time.toString();
      this.tempTime = this.tempTime.substring(16)
      this.tempTime = this.tempTime.slice(0, 8)
      this.tempDate = startDate.toString();
      this.tempDate = this.tempDate.slice(0, 16)
      this.tempEndDate = endDate.toString();
      this.tempEndDate = this.tempEndDate.slice(0, 16)
      var reqobj = {
        "RegBatchId": this.RegularBatchDetails.RegBatchId,
        "TutorID": parseInt(this.DemoForm.tutor),
        "CourseId": parseInt(this.DemoForm.course),
        "StartDate": this.tempDate + this.tempTime,
        "EndDate": this.tempEndDate + this.tempTime,
        "Time": (new Date(this.DemoForm.time).getHours() + ":" + new Date(this.DemoForm.time).getMinutes()).toString(),
        "TrainingMode": this.DemoForm.trainingtype == "" ? null : this.DemoForm.trainingtype,
        "Trainingtype": this.DemoForm.trainingmood,
        // "PaidDemo": this.DemoForm.paiddemo,
        "FeeTypeId": this.DemoForm.pricetype,
        "Duration": this.DemoForm.Inhours + ':' + this.DemoForm.Inminutes,
        "Timezone": this.DemoForm.timezone,
        "SessionTypeId": this.DemoForm.sessionType,
        "Fee": (this.DemoForm.Fees * this.exchangeValue),
        "CurrencyName": this.final == null || undefined ? this.exchangeCurrency : this.final,
        "DataCreated": new Date(),
        "DateModified": new Date(),
        "CreatedBy": 1,
        "ModifiedBy": 1,
        "Active": true
      }
      // alert(JSON.stringify(reqobj));

      this._dataService.Post('api/Tutor/AddUpdateRegularBatch', reqobj).subscribe(
        res => {
          if (res.isSuccess == true) {
            this.btnDisable = false;
            // alert("Demo Course Added Successfully");
            this.router.navigate(['/RegList']);
            this.onNoClick();
            swal({
              title: 'Demo Course Added Successfully',
              // text: "Department added succcefully",
              type: 'success',
              position: 'top'
            })
          }
          else {
            // alert(res.error.message);
            swal({

              title: res.error.message,
              // text: "Invalid Email And Password",
              type: 'warning',
              position: 'top',
              //  timer: 2500
            })
            this.btnDisable = false;
          }
        },
      );
    }

  }

  //Dailogue Window Closing
  onNoClick(): void {
    // this.dialogRef.close();
  }
}