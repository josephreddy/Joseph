import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef, PipeTransform, Pipe } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerModule, MatNativeDateModule, ErrorStateMatcher } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { LoginComponent } from '../../login/login.component';
import { RegisterDemoCourseComponent } from '../register-demo-course/register-demo-course.component';
import { DataService } from '../../shared/services/data.service';
import { CURRENCY_LIST,COUNTRY_CURRENCY } from '../../shared/services/CurrencyList';
declare var require: any

@Component({
  selector: 'app-demos-list',
  templateUrl: './demos-list.component.html',
  styleUrls: ['./demos-list.component.css']
})
export class DemosListComponent implements OnInit {
  PresentTimeZone: string;
  ChangeZone: any;
  parameterValue: any;
  currentUser: any;
  tutorslist: any;
  animal: string;
  name: string;
  TotalCount: any;
  //MatTable Columns List

  getDemoCoursesDetailsForm: FormGroup;
  displayedColumns = ['ImageUrl', 'CourseName', 'StartDate', 'Time', 'TrainingMode', 'Trainingtype', 'Session', 'Mode', 'Duration', 'TutorName', 'Fee', 'TCDemoId', 'TCDemoId1', 'DateModified', 'DateModified1'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  TimeZoneConvertFrm: FormGroup;
  isLoadingResults = true;
  timeZone: any;
  time: any;
  demo: any;
  hour: any;
  hourSting: any;
  UserInfo: any;
  UserLocationDetails: any;
  matcher = new MyErrorStateMatcher();
  currenies: { "symbol": string; "name": string; "symbol_native": string; "decimal_digits": number; "rounding": number; "code": string; "name_plural": string; }[];
  ExchangeValues: any;
  exchangeRate: number=1;
  SelectedCurrency:any=1;
  SelectedCurrency1:any;
  symbol: any;
  Country: any;
  userCountryCode: any;
  constructor(private router: Router, private _dataService: DataService, public dialog: MatDialog, private cd: ChangeDetectorRef) {
    debugger
    this.currenies = CURRENCY_LIST;
    this.UserInfo = JSON.parse(localStorage.getItem('UserLocationDetails'));
    this.userCountryCode=this.UserInfo.countryCode
    this.Country = COUNTRY_CURRENCY[this.userCountryCode];
    this.PresentTimeZone = this.UserInfo.timezone
    // alert(this.PresentTimeZone)
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.ExchangeValues = JSON.parse(localStorage.getItem('ExchangeRates'));
    this.TimeZoneConvertFrm = new FormGroup({
      timezone: new FormControl(''),
    });
    this.onCurrencyChange(this.Country);
  }
  ChangeTimeZone(timezone): void {
    this.PresentTimeZone = timezone
    this.LoadDemoCoursesDetails();
  }

  // getExchangeValue() {
  //   this._dataService.GetCurrencyInfo()
  //     .subscribe((Info: any) => {
  //       // alert(JSON.stringify(Info))
  //       if (Info != undefined || null) {
  //         this.ExchangeValues = Info
  //       }
  //       else {
  //       }
  //     });
  // }
  openAddDemoCourseDialog(): void {
    let dialogRef = this.dialog.open(AddDemoSessionComponent, {
      width: '400px',
      height: 'auto',
      data: { name: this.name, animal: this.animal }
    });
    dialogRef.afterClosed().subscribe(result => {
      // if(result != undefined){
      // this.LoadDemoCoursesDetails();
      // }

    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.LoadDemoCoursesDetails();
    // this.getExchangeValue();
  }
  onCurrencyChange(currency) {
    debugger
    this.exchangeRate = this.ExchangeValues.rates[currency]

    for(var i=0;i<this.currenies.length;i++){
      if(this.currenies[i].code==currency){
        this.symbol=this.currenies[i].symbol_native;
      }

    }
  }

  //--------------- UpComing Demo Session Grid -------------------------//
  openRegisterDemoDialog(row): void {
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
      let dialogRef = this.dialog.open(RegisterDemoCourseComponent, {
        width: 'auto ',
        height: 'auto',
        data: row,
      });

      dialogRef.afterClosed().subscribe(result => {
        // if (result != undefined) {
        this.LoadDemoCoursesDetails();
        // }
      });
    }
  }
  //--------------- UpComing Demo Session Grid -------------------------//
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  LoadDemoCoursesDetails(): void {
    debugger
    this.isLoadingResults = true;

    this.dataSource.data = [];
    if (this.currentUser != null) {
      if (this.currentUser.RoleID == 2) {
        this.parameterValue = this.currentUser.TutorID
      }
      else {
        this.parameterValue = 0
      }
    }
    else {
      this.parameterValue = 0
    }
    debugger
    this._dataService.GetAll('api/CourseDemo/GetDemoCoursebyTutors/' + this.parameterValue)
      .subscribe((Data: any) => {
        this.isLoadingResults = false;
        this.cd.markForCheck();
        if (Data.length > 0) {
          for (var i = 0; i < Data.length; i++) {
            var moment = require('moment-timezone');
            this.timeZone = Data[i].Time
            this.demo = "2018-08-04 " + this.timeZone
            // var date = new Date(this.demo);
            var FromZone = moment.tz(this.demo, Data[i].Timezone);
            debugger
            var LocalZone = FromZone.clone().tz(this.PresentTimeZone);
            this.time = LocalZone.format();
            this.hourSting = this.time.toString()
            var sliced = this.hourSting.slice(0, -6);
            this.hour = new Date(sliced);
            Data[i].Time = this.hour;
          }
          this.dataSource.data = Data;
        }
        else {
        }
      });
  }

  //Edit Role
  editDemoCourselist(row) {

    let rowEdit = JSON.parse(JSON.stringify(row));

    let dialogRef = this.dialog.open(EditDemoCourseComponent, {
      data: row,
      width: 'auto',
      height: 'auto'
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result == undefined) {
        this.LoadDemoCoursesDetails()
        // this.paginator.pageSize=10;
      }
    });
  }

  onDeleteClick(data): void {
    let dialogRef = this.dialog.open(DeleteDemoComponent, {
      width: 'auto',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      // if(result != undefined){
      this.LoadDemoCoursesDetails();
      // }
    });
  }

  openViewDemoDialog(demoRow): void {
    this.router.navigate(['/ViewDemoDetails/', demoRow.TCDemoId]);
  }
  sample(Data) {
    debugger

    // moment().tz("America/Los_Angeles").format();
    // var FromTimeZone = moment.tz(new Date(), timeZone);
    // var LocalTimeZone = FromTimeZone.clone().tz(this.ChangeZone);
    // var london = India.clone().tz("Europe/London");
    // India.format()Data["0"].StartDate
    // alert(LocalTimeZone.format());
    // this.time=LocalTimeZone.format();
    debugger
  }
}

//Add 
@Component({
  selector: 'app-add-demo-session',
  templateUrl: './AddDemoSession.html',
  styleUrls: ['./demos-list.component.css']
})
export class AddDemoSessionComponent implements OnInit {
  ChangeZone: any;
  TypesVisible: boolean = false;
  tutorID: any;
  currentUser: any;
  DemoForm: any;
  upcomingdemocoursesFrm: FormGroup;
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
  changeDetection: boolean=true;
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
  constructor(private _formBuilder: FormBuilder, private _dataService: DataService, private router: Router, private cd: ChangeDetectorRef) {
    debugger
    this.currenies = CURRENCY_LIST;

    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));

    if (this.currentUser.TutorID != undefined) {
      this.tutorID = this.currentUser.TutorID;
      this.isReadOnly = true;
      this.onTutorSelect(this.tutorID)
    }
    this.upcomingdemocoursesFrm = new FormGroup({
      tutor: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      startdate: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      trainingmood: new FormControl('', [Validators.required]),
      trainingtype: new FormControl(''),
      paiddemo: new FormControl('', [Validators.required]),
      Inhours: new FormControl('', [Validators.required]),
      Inminutes: new FormControl('', [Validators.required]),      
      timezone: new FormControl('', [Validators.required]),
      sessionType: new FormControl('', [Validators.required]),
      Fees: new FormControl(''),
      currency: new FormControl('')
    });
  }

  ngOnInit() {
    this.BindData();
    this.TrainingMode();
    this.TrainingModeType();
    this.SessionType();
    this.courselist.data = []
  }
  changeDetect(){
    this.changeDetection=false;
  }
  onCurrencyChange(currency) {
    var final = currency + "_INR"
    this._dataService.GetCurrency(final)
      .subscribe((Data: any) => {
        debugger
        if (Data != undefined) {
          this.exchangeValue = Data[final].val;
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

    if (this.upcomingdemocoursesFrm.valid == true) {
      this.btnDisable = true;
      this.DemoForm = this.upcomingdemocoursesFrm.value;
      // let startDate = new Date(this.DemoForm.startdate.getFullYear(), this.DemoForm.startdate.getMonth(), this.DemoForm.startdate.getDate())
      let startDate = this.DemoForm.startdate;
      let time = this.DemoForm.time;
      this.tempTime = time.toString();
      this.tempTime = this.tempTime.substring(16)
      this.tempTime = this.tempTime.slice(0, 8)
      this.tempDate = startDate.toString();
      this.tempDate = this.tempDate.slice(0, 16)
      var reqobj = {
        "TCDemoId": null,
        "TutorID": parseInt(this.DemoForm.tutor),
        "CourseId": parseInt(this.DemoForm.course),
        "StartDate": this.tempDate + this.tempTime,
        "Time": (new Date(this.DemoForm.time).getHours() + ":" + new Date(this.DemoForm.time).getMinutes()).toString(),
        "TrainingMode": this.DemoForm.trainingtype == "" ? null : this.DemoForm.trainingtype,
        "Trainingtype": this.DemoForm.trainingmood,
        "PaidDemo": this.DemoForm.paiddemo,
        "Duration": this.DemoForm.Inhours + ':' + this.DemoForm.Inminutes,
        "Timezone": this.DemoForm.timezone,
        "SessionTypeId": this.DemoForm.sessionType,
        "Fee": (this.DemoForm.Fees * this.exchangeValue),
        "DataCreated": new Date(),
        "DateModified": new Date(),
        "CreatedBy": 1,
        "ModifiedBy": 1,
        "Active": true
      }
      // alert(JSON.stringify(reqobj));

      this._dataService.Post('api/Tutor/AddUpdateTutorCourseDemo', reqobj).subscribe(
        res => {
          if (res.isSuccess == true) {
            this.btnDisable = false;
            // alert("Demo Course Added Successfully");
            this.router.navigate(['/DemoList']);
            this.onNoClick();
            Swal({
              title: 'Demo Course Added Successfully',
              // text: "Department added succcefully",
              type: 'success',
              position: 'top'
            })
          }
          else {
            // alert(res.error.message);
            Swal({

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



//Edit Role Component Code
@Component({
  selector: 'app-edit-demo-course',
  templateUrl: './editDemoCourse.html',
  styleUrls: ['./demos-list.component.css']
})
export class EditDemoCourseComponent implements OnInit {
  paiddemo: any;
  Trainingtype: any;
  TrainingMode: string;
  ChangeZone: any;
  mode: any;
  editDemoForm: any;
  editTime: any;
  time: any;
  isReadOnly: boolean;
  tutorID: any;
  currentUser: any;
  tutorslist = new MatTableDataSource();
  courselist = new MatTableDataSource();
  editUpComingDemoCoursesFrm: FormGroup;

  currentDate = new Date();
  traininglist: any;
  sessionType: any;
  FeesVisible: boolean;
  session: any;
  TypesVisible: boolean;
  Trainingtypes: any;
  tempTime: any;
  tempDate: any;
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
  exchangeValue: any;
  currenies: { "symbol": string; "name": string; "symbol_native": string; "decimal_digits": number; "rounding": number; "code": string; "name_plural": string; }[];
  constructor(public dialogRef: MatDialogRef<EditDemoCourseComponent>, private fb: FormBuilder, private _dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: any) {
    debugger
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.currenies = CURRENCY_LIST;
    // this.time=data.Time.split(':')
    var moment = require('moment-timezone');
    this.hrs=data.Duration== null || undefined ? '00' : data.Duration.slice(0, 2);
    this.duration = data.Duration == null || undefined ? '00' : data.Duration.slice(3, 5);
    this.time = moment(data.Time).format('LT');
    // alert(this.time)
    this.editTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear());
    this.mode = data.TrainingMode;
    this.ChangeZone = data.Timezone;
    // this.TrainingMode = this.data.TrainingMode == true ? "Online" : "offline";
    // this.Trainingtype = this.data.Trainingtype == null ? "" : this.data.Trainingtype;
    this.paiddemo = data.PaidDemo == true ? "true" : "false";
    this.session = data.SessionTypeId
    this.TrainingMode = data.Trainingtype
    this.Trainingtypes = data.TrainingMode;
    if (this.currentUser.TutorID != undefined) {
      this.tutorID = this.currentUser.TutorID;
      this.isReadOnly = true;
      this.onTutorSelect(this.tutorID)
    }
    else {
      this.tutorID = data.TutorID;
      this.isReadOnly = false;
      this.onTutorSelect(this.tutorID)
    }

    this.editUpComingDemoCoursesFrm = new FormGroup({
      tutor: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      startdate: new FormControl(''),
      time: new FormControl('', [Validators.required]),
      trainingmood: new FormControl(''),
      trainingtype: new FormControl(''),
      paiddemo: new FormControl('', [Validators.required]),
      Inhours: new FormControl('', [Validators.required]),
      Inminutes: new FormControl('', [Validators.required]),
      timezone: new FormControl('', [Validators.required]),
      sessionType: new FormControl(''),
      Fee: new FormControl(''),
      currency: new FormControl('')

    });
  }
  ngOnInit() {
    debugger
    this.BindTutor();
    this.TrainingModes();
    this.TrainingModeType();
    this.SessionType();
    this.courselist.data = []
  }
  TrainingModes() {
    debugger
    this._dataService.GetAll('api/Tutor/GetTrainingModeDetails')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.traininglist = Data;
          // alert(JSON.stringify(this.traininglist))
          // this.cd.markForCheck();
        }
        else {
          //alert(Data);
        }
      });
  }
  TrainingModeType() {
    debugger
    this._dataService.GetAll('api/Tutor/GetTrainingMode')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.Trainingtype = Data;
          // alert(JSON.stringify(this.Trainingtype))

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
  BindTutor() {
    // Binding Tutors
    this._dataService.GetAll('api/Tutor/GetTutorDetails')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.tutorslist.data = Data;
        }
        else {
          //alert(Data);
        }
      });
  }
  onTutorSelect(value): void {
    debugger
    if (this.tutorID != undefined) {
      // Binding Courses
      this._dataService.GetAll('api/Course/GetCoursebyTutor/' + this.tutorID)
        .subscribe((Data: any) => {
          if (Data.length > 0) {
            // debugger
            // var courseNames = [];
            // var courseIDs = [];
            // for (let i = 0; i < Data.length; i++) {
            //   if (courseIDs.indexOf(Data[i].CourseId) === -1) {
            //     courseIDs.push(Data[i].CourseId)
            //     courseNames.push({"ID":Data[i].CourseId,"Name":Data[i].CourseName});
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
  onCurrencyChange(currency) {
    var final = currency + "_INR"
    this._dataService.GetCurrency(final)
      .subscribe((Data: any) => {
        debugger
        if (Data != undefined) {
          this.exchangeValue = Data[final].val;
        }
        else {
          //alert(Data);
        }
      });
  }
  ChangeTimeZone(details): void {

    this.ChangeZone = details
  }
  EditDemoCourseForm(): void {
    this.editDemoForm = this.editUpComingDemoCoursesFrm.value;
    debugger
    let startDate = new Date(this.editDemoForm.startdate);
    let time = this.editDemoForm.time;
    this.tempTime = time.toString();
    this.tempTime = this.tempTime.substring(16)
    this.tempTime = this.tempTime.slice(0, 8)
    this.tempDate = startDate.toString();
    this.tempDate = this.tempDate.slice(0, 16)
    var reqobj = {
      "TCDemoId": this.data.TCDemoId,
      "TutorID": parseInt(this.editDemoForm.tutor),
      "CourseId": parseInt(this.editDemoForm.course),
      "StartDate": this.tempDate + this.tempTime,
      "Time": (new Date(this.editDemoForm.time).getHours() + ":" + new Date(this.editDemoForm.time).getMinutes()).toString(),
      "TrainingMode": this.editDemoForm.trainingtype,
      "Trainingtype": this.editDemoForm.trainingmood,
      "PaidDemo": this.paiddemo,
      "Duration": this.editDemoForm.Inhours + ':' + this.editDemoForm.Inminutes,
      "Timezone": this.editDemoForm.timezone,
      "SessionTypeId": this.editDemoForm.sessionType,
      "DataCreated": this.data.DataCreated,
      // "Fee": this.editDemoForm.Fee,
      "Fee": (this.editDemoForm.Fee * this.exchangeValue),

      "DateModified": new Date(),
      "CreatedBy": this.data.CreatedBy,
      "ModifiedBy": 1,
      "Active": true
    }
    this._dataService.Post('api/Tutor/AddUpdateTutorCourseDemo', reqobj).subscribe(
      res => {
        if (res.isSuccess == true) {
          // alert("Demo Course Edited Successfully");
          this.onNoClick();
          Swal({
            title: 'Demo Course Updated Successfully',
            // text: "Department added succcefully",
            type: 'success',
            position: 'top'
          })
        } else {
          // alert(res.error.Message);
          Swal({

            title: res.error.message,
            // text: "Invalid Email And Password",
            type: 'warning',
            position: 'top',
            showConfirmButton: false,
            timer: 1500
          })
        }
      },
    );
  }
  //Dailogue Window Closing
  onNoClick(): void {
    this.dialogRef.close();
  }

}



@Component({
  selector: 'delete-demo-session',
  templateUrl: 'DeleteDemo.html',
  styleUrls: ['./demos-list.component.css']
})
export class DeleteDemoComponent {

  currentUser: any;

  constructor(public dialogRef: MatDialogRef<DeleteDemoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private _dataService: DataService) {

    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
  }

  ngOnInit() {
  }

  Delete(ID) {
    let reqobj = {
      "Id": ID
    }
    this._dataService.Post('api/Tutor/DeleteTutorCourseDemo', reqobj).subscribe(
      res => {
        if (res.isSuccess == true) {
          //  alert(res.message);
          this.onNoClick();
          Swal({
            title: 'Demo Course Deleted Successfully',
            // text: "Department added succcefully",
            type: 'warning',
            position: 'top'
          })
        } else {
          alert(res.message);
        }
      },
    );
  }

  onNoClick(): void {
    debugger
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-view-demo-details',
  templateUrl: './viewDemoDetails.html',
  styleUrls: ['./demos-list.component.css']
})
export class ViewDemoDetailsComponent implements OnInit {
  displayedColumns = ['ImageUrl', 'CourseName', 'Tutor Name', 'StartDate', 'Timezone',];
  DemoList = new MatTableDataSource();
  currentUser: any;
  // DemoList: any[];
  ImageUrl: any;
  TutorName: any;
  Timezone: any;
  Duration: any;
  PaidDemo: any;
  Trainingtype: any;
  TrainingMode: any;
  StartDate: any;
  CourseName: any;
  TutorID: any;
  CourseId: any;
  DemoInfo: any;
  getDemoID: any;
  RegisteredCount: any;
  Fee: any;
  constructor(private router: Router, private _activatedRoute: ActivatedRoute, private _dataService: DataService, public dialog: MatDialog, private cd: ChangeDetectorRef) {
    this.getDemoID = this._activatedRoute.snapshot.params['demoID'];

    debugger
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));

    this._dataService.GetAll('api/CourseDemo/GetDemoCoursebyTCDemoId/' + this.getDemoID)
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.cd.markForCheck();
          this.DemoInfo = Data[0];
          this.CourseId = Data[0]["CourseId"];
          this.TutorID = Data[0]["TutorID"];
          this.CourseName = Data[0]["CourseName"];
          this.StartDate = Data[0]["StartDate"];
          this.TrainingMode = Data[0]["TrainingName"];
          this.Trainingtype = Data[0]["TrainingModeName"];
          this.PaidDemo = Data[0]["PaidDemo"];
          this.Fee= Data[0]["Fee"];
          this.Duration = Data[0]["Duration"];
          this.Timezone = Data[0]["Timezone"];
          this.TutorName = Data[0]["TutorName"];
          this.ImageUrl = Data[0]["ImageUrl"];
          this.LoadDemoCoursesDetails(this.CourseId)
        }
        else {
        }
      });
  }
  ngOnInit() {
    this.LearnerRegisteredCount();
  }
  LearnerRegisteredCount() {
    debugger
    this._dataService.Get('api/CourseDemo/GetDemoRegCount/', this.getDemoID)
      .subscribe((Data: any) => {
        if (Data != null || undefined) {
          this.RegisteredCount = Data;
          this.cd.markForCheck();
        }
        else {
          //alert(Data);
        }
      });
  }

  LoadDemoCoursesDetails(value): void {
    this.DemoList.data = [];
    this._dataService.GetAll('api/CourseDemo/GetDemoCoursebyCourseId/' + value)
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          // this.CourseName=Data[0]["CourseName"];
          this.cd.markForCheck();
          this.DemoList = Data.splice(0, 4);
        }
        else {
        }
      });
  }

  openRegisterDemoDialog(demoRow): void {
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
      let dialogRef = this.dialog.open(RegisterDemoCourseComponent, {
        width: 'auto ',
        height: 'auto',
        data: this.DemoInfo,
      });

      dialogRef.afterClosed().subscribe(result => {
        // if (result != undefined) {
        // }
      });
    }
  }
  //Dailogue Window Closing
  onNoClick(): void {
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Pipe({ name: 'round' })
export class RoundPipe implements PipeTransform {
  /**
   *
   * @param value
   * @returns {number}
   */
  transform(value: number): number {
    return Math.ceil(value);
  }
}