import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { COUNTRY_LIST } from '../../shared/services/CountriesList';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-edit-learner-profile',
  templateUrl: './edit-learner-profile.component.html',
  styleUrls: ['./edit-learner-profile.component.css']
})
export class EditLearnerProfileComponent implements OnInit {

  zipcodeValue: any;
  TimeZone: any;
  cityValue: any;
  stateValue: any;
  countryValue: any;
  timeValue: any;
  AltPhoneNumber: any;
  phoneNumber: any;
  emailID: any;
  Lastname: any;
  Firstname: any;
  Password: any;
  Active: any;
  Datecreated: any;
  Createdby: any;
  LearnerID: any;
  getLearnerID: any;
  LearnerFrm: FormGroup;
  countries: { "name": string; "dial_code": string; "code": string; }[];
  phoneCode: any;
  AltphoneCode: any;
  public mask: Array<string | RegExp>
  currentUser: any;
  temp: any;
  temp1: any;
  flag1: any;
  flag: any;
  ivalue: number=0;
  changeDetection: boolean=true;
  
  constructor(private router: Router, private _activatedRoute: ActivatedRoute, private _dataService: DataService, private http: HttpClient, private cd: ChangeDetectorRef) {
    this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    debugger
    this.countries = COUNTRY_LIST;
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.getLearnerID = this._activatedRoute.snapshot.params['learnerId'];
    this.GetLearner(this.getLearnerID)
    this.LearnerFrm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]),
      emailid: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
      password: new FormControl(''),
      contactNumber: new FormControl('', [Validators.required]),
      // contactNumber: new FormControl('', [Validators.required, Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[+0-9]*')])]),
      AlternativeContactNumber: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]),
      state: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]),
      // zipcode:new FormControl('',[,Validators.required,Validators.pattern('^[0-9]{5}$')]),
      zipcode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]),
      time: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]),
      learnerID: new FormControl(''),
      dateCreated: new FormControl(''),
      createdBy: new FormControl(''),
      active: new FormControl(''),
    });
    // this.telInputObject(this.temp);
    // this.telInputObject1(this.temp1);
  }

  ngOnInit() {
  }

  keyPress(event: any) {
    debugger;
    const numberpattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!numberpattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onCountryChange(great) {
    debugger
    this.phoneCode = great.iso2
  }
  telInputObject(obj) {
    debugger
    this.temp = obj
    console.log(obj);
    if (this.temp != undefined) {
      obj.intlTelInput('setCountry', this.flag);
    }
    else {
      obj.intlTelInput('setCountry', 'in');
    }

  }
  countryChanges(selectedcountry): void {
    if (this.ivalue > 1) {
      this.stateValue = "";
      this.cityValue = "";
      // this.ChangeTimeZone = "";
      this.zipcodeValue = "";

    }
    this.ivalue++;
  }
  onCountryChange1(great1) {
    this.AltphoneCode = great1.iso2
  }
  telInputObject1(obj) {
    debugger
    this.temp1 = obj
    console.log(obj);
    if (this.temp1 != undefined) {
      obj.intlTelInput('setCountry', this.flag1);
    }
    else {
      obj.intlTelInput('setCountry', 'in');
    }
  }
  GetLearner(Value): void {
    this._dataService.GetAll('api/Learner/GetLearnerById/' + Value)
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          debugger
          this.cd.markForCheck();
          this.LearnerID = Data[0].LearnerID;
          this.Password = Data[0].Password;
          this.Createdby = 1;
          this.Datecreated = Data[0].DateCreated;
          this.Active = Data[0].Active;
          this.Firstname = Data[0].FirstName;
          this.Lastname = Data[0].LastName;
          this.emailID = Data[0].EmailId;
          this.phoneNumber = Data[0].PhoneNumber;
          this.AltPhoneNumber = Data[0].AltPhoneNumber;
          this.TimeZone = Data[0].TimeZone;
          this.countryValue = Data[0].Country;
          this.stateValue = Data[0].State;
          this.cityValue = Data[0].City;
          this.zipcodeValue = Data[0].ZipCode;
          this.flag = Data[0].PhoneNumberCode;
          this.flag1 = Data[0].AltPhoneNumberCode.slice(0,2)
          this.telInputObject1(this.temp1);
          this.telInputObject(this.temp);
        }
      });
  }
  ChangeTimeZone(details): void {
    this.TimeZone = details
  }
  changeDetect(){
    this.changeDetection=false;
  }
  LearnerEdit(): void {
    debugger
    var reqobj = {
      "LearnerID": this.getLearnerID,
      "FirstName": this.LearnerFrm.value.firstName,
      "LastName": this.LearnerFrm.value.lastName,
      "EmailId": this.LearnerFrm.value.emailid,
      "Password": this.Password,
      "PhoneNumber": this.LearnerFrm.value.contactNumber,
      "AltPhoneNumber": this.LearnerFrm.value.AlternativeContactNumber,
      "Country": this.LearnerFrm.value.country,
      "State": this.LearnerFrm.value.state,
      "City": this.LearnerFrm.value.city,
      "ZipCode": this.LearnerFrm.value.zipcode,
      "TimeZone": this.LearnerFrm.value.time,
      "Contacted": false,
      "VisaStatus": null,
      "RoleID": 3,
      "DateCreated": this.Datecreated,
      "DateModified": new Date(),
      "ModifiedBy": 1,
      "CreatedBy": this.Createdby,
      "Active": this.Active,
      "PhoneNumberCode": this.phoneCode,
      "AltPhoneNumberCode": this.AltphoneCode

    }

    this._dataService.Post('api/Learner/UpdateLearner', reqobj).subscribe(
      res => {
        debugger
        if (res.isSuccess == true) {
          // alert("Edited Learner Profile sucessfully");
          Swal({
            title: res.StatusMessage,
            // text: "Department added succcefully",
            type: 'success',
            position: 'top'
          })
          //this.GetTutor(TutorpassValue);
          if (this.currentUser.RoleID == 1) {
            this.router.navigate(['/admin/LearnerList']);
          }
          else {
            this.router.navigate(['/']);
          }

        } else {
          // alert(res.error.Message);
          Swal({

            title: res.message,
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
}
