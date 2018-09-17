import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef, PipeTransform, Pipe } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerModule, MatNativeDateModule, ErrorStateMatcher } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { LoginComponent } from '../../login/login.component';
import { RegisterDemoCourseComponent } from '../register-demo-course/register-demo-course.component';
import { DataService } from '../../shared/services/data.service';
import { CURRENCY_LIST, COUNTRY_CURRENCY } from '../../shared/services/CurrencyList';
import { MyErrorStateMatcher } from '../demos-list/demos-list.component';
import { RegisterRegularCourseComponent } from '../register-regular-course/register-regular-course.component';
declare var require: any

@Component({
  selector: 'app-regs-list',
  templateUrl: './reg-list.component.html',
  styleUrls: ['./reg-list.component.css']
})
export class RegularBatchListComponent implements OnInit {
  PresentTimeZone: string = 'Asia/Calcutta'
  ChangeZone: any;
  parameterValue: any;
  currentUser: any;
  tutorslist: any;
  animal: string;
  name: string;
  TotalCount: any;
  //MatTable Columns List

  getDemoCoursesDetailsForm: FormGroup;
  displayedColumns = ['ImageUrl', 'CourseName', 'RegBatchId', 'StartDate', 'EndDate', 'Time', 'TrainingMode', 'Trainingtype', 'Session', 'Mode', 'Duration', 'TutorName', 'Fee', 'TCDemoId', 'DateModified', 'DateModified1'];
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
  symbol: any="₹";
  userCountryCode: any;
  Country: any;
  constructor(private router: Router, private _dataService: DataService, public dialog: MatDialog, private cd: ChangeDetectorRef) {
    debugger
    this.currenies = CURRENCY_LIST;
    this.UserInfo = JSON.parse(localStorage.getItem('UserLocationDetails'));
    this.userCountryCode=this.UserInfo.countryCode
    this.Country = COUNTRY_CURRENCY[this.userCountryCode];
    this.PresentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
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
    this.LoadRegCoursesDetails();
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
  CreateRegBatch() {
    debugger
    for (var i = 0; i < this.dataSource.data.length; i++) {
      // if(this.dataSource.data[i].){}
    }
    this.router.navigate(['/admin/RegCreateBatch']);
  }
//   openAddDemoCourseDialog(): void {
//     let dialogRef = this.dialog.open(AddDemoSessionComponent, {
//       width: '400px',
//       height: 'auto',
//       data: { name: this.name, animal: this.animal }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       // if(result != undefined){
//       // this.LoadRegCoursesDetails();
//       // }

//     });
//   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.LoadRegCoursesDetails();
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
  openRegisterRegularDialog(row): void {
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
      let dialogRef = this.dialog.open(RegisterRegularCourseComponent, {
        width: 'auto ',
        height: 'auto',
        data: row,
      });

      dialogRef.afterClosed().subscribe(result => {
        // if (result != undefined) {
        this.LoadRegCoursesDetails();
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

  onEditClick(row){
    debugger
    localStorage.setItem('EditRegularBatchDetails', JSON.stringify(row));
    this.router.navigate(['/admin/EditRegBatch']);    
  }

  LoadRegCoursesDetails(): void {
    debugger
    // this._dataService.GetUserInfo()
    //   .subscribe((Info: any) => {
    //     if (Info != undefined || null) {
    //       this.UserInfo = Info;
    //     }
    //     else {
    //       // alert(Data);
    //     }
    //   });
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
    this._dataService.GetAll('api/Learner/GetRegularBatchbyTutorId/' + this.parameterValue)
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
    debugger
    localStorage.setItem('SelectedRegBatch', JSON.stringify(row));
    this.router.navigate(['/admin/regReg']);

  }

//   onDeleteClick(data): void {
//     let dialogRef = this.dialog.open(DeleteDemoComponent, {
//       width: 'auto',
//       height: 'auto',
//       data: data
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       // if(result != undefined){
//       this.LoadDemoCoursesDetails();
//       // }
//     });
//   }

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