import { Component, OnInit, Injectable, ViewChild, Inject, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// import { RegisterDemoCourseComponent } from '../register-demo-course/register-demo-course.component'; 
import { debug } from 'util';
import { DataService } from '../../shared/services/data.service';
import { LoginComponent } from '../../login/login.component';
import { RegisterDemoCourseComponent } from '../register-demo-course/register-demo-course.component';
import { RegisterRegularCourseComponent } from '../register-regular-course/register-regular-course.component';
import { COUNTRY_CURRENCY, CURRENCY_LIST } from '../../shared/services/CurrencyList';
// import { ViewDemoDetailsComponent } from '../demos-list/demos-list.component';
declare var require: any
export class User {
  constructor(public name: string) { }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedCategoryName: any;
  customeCourses: any;
  customeArray: any[];
  CustomDrop: {};
  OriginalCourseList: any;
  courseslist: any;
  public SearchValue: any;
  currentRate = 3;
  isLoadingResults = true;
  moreBtnVisible: boolean = false;
  selectedName: any;
  UserInfo: any;
  ExchangeValues: any;
  exchangeRate: any = 1;
  currenies: any;
  symbol: any = "₹";
  userCountryCode: any;
  Country: any;
  timeZone: any;
  demo: string;
  PresentTimeZone: string;
  time: any;
  hourSting: any;
  hour: Date;

  highlightRow(row) {
    this.selectedName = row.TCDemoId;
  }
  // GetUserInfo() {
  //   debugger
  //   this._dataService.GetUserInfo()
  //     .subscribe((Info: any) => {
  //       alert(JSON.stringify(Info))
  //       if (Info != undefined || null) {
  //         localStorage.setItem('UserLocationDetails', JSON.stringify(Info));
  //       }
  //       else {
  //         // alert(Data);
  //       }
  //     });
  // }

  formatter = (result: string) => result.toUpperCase();

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.courseslist.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  searchCourse(SearchValue): void {
    if (SearchValue != undefined) {
      for (var j = 0; j < this.OriginalCourseList.length; j++) {
        if (this.OriginalCourseList[j]["CourseName"].match(SearchValue)) {
          this.router.navigate(['/CourseExplanation/', this.OriginalCourseList[j]["CourseId"]]);
        }
      }
    }
  }

  parameterValue: any;
  obj: {};
  Menuarray: any[];
  currentUser: any;
  courseName: any;
  courseId: any;
  Courses: any;


  filteredCourses: Observable<any[]>;

  objectKeys = Object.keys;

  // --------------upcoming vdemo sessions variables ------------------//

  TotalCount: any;


  displayedColumns = ['ImageUrl', 'CourseName', 'StartDate', 'Time', 'TrainingMode', 'Fee', 'Duration', 'SessionTypeName', 'TutorName', 'Action', 'Action1'];
  displayedRegColumns = ['ImageUrl', 'CourseName', 'StartDate', 'Time', 'TrainingMode', 'Fee', 'Duration', 'SessionTypeName', 'TutorName', 'Action'];
  dataSource = new MatTableDataSource();
  dataRegSource = new MatTableDataSource();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // --------------upcoming vdemo sessions variables ------------------//
  searchtext: any;

  public carouselTileItems: Array<any>;
  public carouselTile: NgxCarousel;

  images: any[];
  public carouselBannerItems: Array<any> = [];
  public carouselBanner: NgxCarousel;

  SearchFrm: FormGroup;
  constructor(private router: Router, private _dataService: DataService, private _formBuilder: FormBuilder, public dialog: MatDialog, private cd: ChangeDetectorRef) {
    this.GetUserInfo();
    this.currenies = CURRENCY_LIST;
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.SearchFrm = this._formBuilder.group({
      Coursename: new FormControl(''),
    });
    // Data Caurosel Images
    this._dataService.GetAll('api/Course/GetCarouselImageDetails')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.cd.markForCheck();
          this.images = Data;
        }
        else {
          //alert(Data);
        }
      });
  }
  getExchangeValue() {
    debugger
    this.ExchangeValues = JSON.parse(localStorage.getItem('ExchangeRates'));
    if (this.ExchangeValues == undefined || null) {
      this._dataService.GetCurrencyInfo()
        .subscribe((Info: any) => {
          // alert(JSON.stringify(Info))
          if (Info != undefined || null) {
            this.ExchangeValues = Info
            localStorage.setItem('ExchangeRates', JSON.stringify(this.ExchangeValues));
          }
          else {
          }
        });
    }
  }
  public carouselOne: NgxCarousel;

  GetUserInfo() {
    debugger
    this._dataService.GetUserInfo()
      .subscribe((Info: any) => {
        if (Info != undefined || null) {
          this.UserInfo = Info;
          this.PresentTimeZone = this.UserInfo.timezone
          this.userCountryCode = this.UserInfo.countryCode
          this.Country = COUNTRY_CURRENCY[this.userCountryCode];
          // alert(JSON.stringify(Info))
          this.onCurrencyChange(this.Country);
          this.LoadDemoCoursesDetails();
          this.LoadRegCoursesDetails();
          localStorage.setItem('UserLocationDetails', JSON.stringify(this.UserInfo));
        }
        else {
          this.UserInfo = JSON.parse(localStorage.getItem('UserLocationDetails'));
        }
      });
  }
  onbind(): void {
    this._dataService.GetAll('api/Course/GetCourse')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.cd.markForCheck();
          this.carouselTileItems = Data
          this.carouselTileItems = this.carouselTileItems.reverse();
        }
        else {
        }
      });
  }


  ngOnInit() {
    this.onbind();
    this.getExchangeValue();
    // this.getCourseNameList()
    this.carouselOne = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner'
    }

    this.carouselTile = {
      grid: { xs: 2, sm: 2, md: 3, lg: 6, all: 0 },
      slide: 5,
      speed: 400,
      // animation: 'lazy',
      point: {
        visible: true,
      },
      load: 2,
      touch: true,
      loop: true
      //easing: 'ease'
    }



  }
  onCurrencyChange(currency) {
    debugger
    this.exchangeRate = this.ExchangeValues.rates[currency]
    for (var i = 0; i < this.currenies.length; i++) {
      if (this.currenies[i].code == currency) {
        this.symbol = this.currenies[i].symbol_native;
      }
    }
  }
  //------------------------Get Course List From Servic-----------------------------//
  // getCourseNameList() {
  //   // Binding Courses
  //   this._dataService.GetAll('api/Course/GetCateogryList')
  //     .subscribe((Data: any) => {
  //       if (Data.length > 0) {
  //         let menuarray = [];
  //         this.obj = {};

  //         for (let dataobj in Data) {
  //           this.obj[Data[dataobj]['CategoryName']] = Data[dataobj]["Courses"];
  //         }

  //         this.customeArray=[];
  //         this.CustomDrop={};
  //         for(let customobj in Data)
  //         {
  //           this.CustomDrop["CategoryName"]=Data[customobj]["CategoryName"];
  //           this.customeArray.push({"ID":Data[customobj]["CategoryId"],"CategoryName":Data[customobj]["CategoryName"]})
  //         }
  //       }
  //       this.mouseEnter(1);
  //     });

  //   this._dataService.GetAll('api/Course/GetCourse')
  //     .subscribe((Data: any) => {
  //       this.Courses = Data;
  //       if (Data.length > 0) {
  //         this.OriginalCourseList = Data;
  //         this.courseslist = [];
  //         Data.forEach(element => {
  //           this.courseslist.push(element.CourseName);
  //         });
  //       }
  //     });
  // }
  // mouseEnter(value):void{
  //   console.log(value);
  //   this._dataService.GetAll('api/Course/GetCourseByCategory/'+value)
  //   .subscribe((Data: any) => {
  //     this.customeCourses=Data;
  //   });
  // }

  //------------------------Get Course List From Servic-----------------------------//
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
    this.isLoadingResults = true;
    this.dataSource.data = [];
    this.parameterValue = 0
    this.dataSource.data = [];
    this._dataService.GetAll('api/CourseDemo/GetDemoCoursebyTutors/' + this.parameterValue)
      .subscribe((Data: any) => {
        if (Data.length == 0) {
          this.moreBtnVisible = false;
        }
        else {
          this.moreBtnVisible = true;
        }
        this.isLoadingResults = false;
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
          this.dataSource.data = Data.splice(0, 4);
          this.cd.markForCheck();

        }
        else {
        }
      });
  }
  LoadRegCoursesDetails(): void {
    debugger
    this.isLoadingResults = true;
    this.dataSource.data = [];
    this.parameterValue = 0
    this.dataSource.data = [];
    this._dataService.GetAll('api/Learner/GetRegularBatchbyTutorId/' + this.parameterValue)
      .subscribe((Data: any) => {
        if (Data.length == 0) {
          this.moreBtnVisible = false;
        }
        else {
          this.moreBtnVisible = true;
        }
        this.isLoadingResults = false;
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
          this.dataRegSource.data = Data.splice(0, 4);
          this.cd.markForCheck();

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
  openViewDemoDialog(demoRow): void {
    this.router.navigate(['/ViewDemoDetails/', demoRow.TCDemoId]);
  }

  //--------------- UpComing Demo Session Grid -------------------------//

  public carouselTileLoad(evt: any) {
    const len = this.carouselTileItems.length
    if (len <= 10) {
      for (let i = len; i < len; i++) {
        this.carouselTileItems.push(i);
      }
    }
  }

  CatagorySelection(value): void {
    if (value != undefined)
      this.router.navigate(['/CourseExplanation/']);
  }
}

@Pipe({ name: 'convertFrom24To12Format' })
export class TimeFormat implements PipeTransform {
  transform(time: any): any {
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour > 12 ? 'pm' : 'am';
    min = (min + '').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour + '').length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`
  }
}