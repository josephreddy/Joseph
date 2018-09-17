
import $ from 'jquery';
import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { Router } from '@angular/router';
import { COUNTRY_LIST } from '../../shared/services/CountriesList';
// import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../../login/login.component';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../header/header.component';
// import { MomentModule } from 'ngx-moment';
declare var require: any
import Swal from 'sweetalert2'


@Component({
  selector: 'app-learner-sign-up',
  templateUrl: './learner-sign-up.component.html',
  styleUrls: ['./learner-sign-up.component.css']
})
export class LearnerSignUpComponent implements OnInit {
  public mask: Array<string | RegExp>
  currentUser: any;
  LernerData: any;
  learnersignup: FormGroup;
  ChangeZone: any;
  ivalue: number = 0;
  state: any;
  city: any;
  country: any;
  zip: any;
  phoneCode: string;
  AltphoneCode: string;
  countries: { "name": string; "dial_code": string; "code": string; }[];
  TimeZone: any;
  LearnerObj: any;
  isError: boolean = false;
  isLoading: boolean = false;
  State: any;
  Country: any;
  City: any;
  result: string;
  UserInfo: any;
  time: any;
  UserLocationDetails: any;
  due: string;
  search: boolean = true
  temp: any;
  temp1: any;
  constructor(public dialog: MatDialog, private fb: FormBuilder, private _dataService: DataService, private authservice: AuthService, private router: Router, private cd: ChangeDetectorRef, private _headerComponent: HeaderComponent) {
    this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.countries = COUNTRY_LIST;
    // this.UserLocationDetails = JSON.parse(localStorage.getItem('UserLocationDetails'));
    // this.http.get('http://freegeoip.net/json/?callback')
    //   .subscribe(data => {
    //     this.TimeZone = data["time_zone"];
    //     this.country = data["country_name"];
    //     this.state = data["region_name"];
    //     this.city = data["city"];
    //     this.zip = data["zip_code"];
    //     this.ChangeZone = data["time_zone"];
    //   })

    // alert(london.format());     
    // this.toTimeZone(new Date(), 'Europe/London');
    this.learnersignup = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z_-\\s]*')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z_-\\s]*')]),
      emailid: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      contactNumber: new FormControl('', [Validators.compose([Validators.required])]),
      AlternativeContactNumber: new FormControl('', [Validators.compose([Validators.required])]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      // zipcode:new FormControl('',[,Validators.required,Validators.pattern('^[0-9]{5}$')]),
      TimeZone: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]),
      City: new FormControl('', [Validators.required]),
    });
  }


  ngOnInit() {
    debugger
    this.UserDetails();
    // this.GetUserInfo()
    this.ChangeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  // GetUserInfo() {
  //   debugger
  //   this._dataService.GetUserInfo()
  //     .subscribe((Info: any) => {
  //       if (Info != undefined || null) {
  //         this.cd.markForCheck();
  //         this.UserInfo = Info;
  //         this.ChangeZone = this.UserInfo.data.timezone.id
  //         this.City = this.UserInfo.data.city
  //         this.State = this.UserInfo.data.state
  //         this.Country = this.UserInfo.data.country
  //       }
  //       else {
  //         // alert(Data);
  //       }
  //     });
  // }
  openLoginDialog() {
    this.dialog.open(LoginComponent, {
      width: '500px',
      height: 'auto',
    });
  }

  onClickOutside(arey) {
    
    this.search = false;
    this.Country = null
    this.City = null
    this.State = null
    if (arey.length >= 5) {
      this._dataService.GetZipCode(arey).subscribe(
        res => {
          if (res.status == "OK") {
            for (var x = 0; x < res.results["0"].address_components.length; x++) {
              if (res.results["0"].address_components[x].types["0"] == "country") {
                this.Country = res.results["0"].address_components[x].long_name
                // alert(this.country)
              }
              if (res.results["0"].address_components[x].types["0"] == "locality") {
                this.City = res.results["0"].address_components[x].long_name
                // alert(this.City)
              }
              if (res.results["0"].address_components[x].types["0"] == "administrative_area_level_1") {
                this.State = res.results["0"].address_components[x].long_name
                // alert(this.State)
              }
            }
            this.search = true;
            this.cd.markForCheck();
            // alert("Learner Registered sucessfully");
          } else {
            this.cd.markForCheck();
            this.search = true;
          }
        },
      );
    }
  }
  ChangeTimeZone(details): void {
    this.ChangeZone = details
  }
  keyPress(event: any) {
    const numberpattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!numberpattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  countryChanges(selectedcountry): void {
    if (this.ivalue > 1) {
      this.state = "";
      this.city = "";
      this.ChangeZone = "";
      this.zip = "";

    }
    this.ivalue++;
  }
  onCountryChange(great) {
    this.phoneCode = great.iso2
  }
  telInputObject(obj) {
    debugger
    this.temp=obj
    if (this.UserLocationDetails.countryCode != null || undefined) {
      obj.intlTelInput('setCountry', this.UserLocationDetails.countryCode);
    }
    else {
      obj.intlTelInput('setCountry', '');
    }
    // alert(this.UserLocationDetails.geobytesinternet)
  }
  onCountryChange1(great1) {
    this.AltphoneCode = great1.iso2
  }
  telInputObject1(obj) {
    debugger
    this.temp1=obj
    if (this.UserLocationDetails.countryCode != null || undefined) {
      obj.intlTelInput('setCountry', this.UserLocationDetails.countryCode);
    }
    else {
      obj.intlTelInput('setCountry', '');
    }
  }

  LearnerSignUp() {
    this.isLoading = true;
    this.isError = false;
    this.LearnerObj = this.learnersignup.value;
    var reqobj = {
      "FirstName": this.LearnerObj.firstName,
      "LastName": this.LearnerObj.lastName,
      "EmailId": this.LearnerObj.emailid,
      "Password": this.LearnerObj.password,
      "PhoneNumber": this.LearnerObj.contactNumber,
      "AltPhoneNumber": this.LearnerObj.AlternativeContactNumber,
      "Country": this.LearnerObj.country,
      "State": this.LearnerObj.state,
      "City": this.LearnerObj.City,
      "ZipCode": this.LearnerObj.zipcode,
      "TimeZone": this.ChangeZone,
      "Contacted": false,
      "VisaStatus": null,
      "RoleID": 3,
      "DateCreated": new Date(),
      "DateModified": new Date(),
      "ModifiedBy": 1,
      "CreatedBy": 1,
      "Active": true,
      "PhoneNumberCode": this.phoneCode,
      "AltPhoneNumberCode": this.AltphoneCode,
      "learnerID": null,
      "userId": null,
    }
    this._dataService.Post('api/Account/LearnerRegistration', reqobj).subscribe(
      res => {
        this.isLoading = false;
        if (res.isSuccess) {
          this.LernerData = res;
          var req = {
            "userName": this.LernerData.EmailId,
            "password": this.LernerData.Password
          };
          this.authservice.login(req).subscribe(
            res => {
              if (res == true) {
                this.cd.markForCheck();
                this._headerComponent.getUserData();
                this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
                this.router.navigate(['/']);
                location.reload();
                Swal({
                  title: 'Learner Registered Sucessfully',
                  type: 'success',
                  position: 'top'
                })
              }
              else {
                // this.result=res.message
                this.cd.markForCheck();
              }
            },
          );
        }
        else {
          this.isError = true;
          this.result = res.error.errors;
        }
      }, );
  }
  UserDetails() {
    debugger
    this._dataService.GetUserInfo().subscribe(
      res => {
        debugger
        this.UserLocationDetails=res
        this.telInputObject(this.temp)
        this.telInputObject1(this.temp1)
      },
    );
  }

}
