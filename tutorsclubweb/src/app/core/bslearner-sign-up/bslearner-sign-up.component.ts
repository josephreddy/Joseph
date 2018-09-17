import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-bslearner-sign-up',
  templateUrl: './bslearner-sign-up.component.html',
  styleUrls: ['./bslearner-sign-up.component.css']
})

export class BSlearnerSignUpComponent implements OnInit {
  phoneCode: string;
  AltphoneCode: string;
  ChangeZone: any;
  phoneNumber: any
  formGroup: FormGroup;
  LearnerObj: any;
  city: any;
  Country: any;
  State: any;
  isSuccess:boolean=false;
  message: any;
  constructor(private router: Router, private _dataService: DataService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]),
      emailid: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      contactNumber: new FormControl('', [Validators.required, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[+0-9]*')])]),
      AlternativeContactNumber: new FormControl('', [Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[+0-9]*')])]),
      country: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.pattern('[a-zA-Z_-\\s]*')]),
      state: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]),
      // zipcode:new FormControl('',[,Validators.required,Validators.pattern('^[0-9]{5}$')]),
      TimeZone: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]),
      City: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')])
    });

  }
  onClickOutside(arey) {
    if (arey.length >= 5) {

      this._dataService.GetZipCode(arey).subscribe(
        res => {
          debugger
          if (res.status =="OK") {
            debugger
            this.city=res.results["0"].address_components["1"].long_name
            this.State=res.results["0"].address_components["3"].long_name
            this.Country=res.results["0"].address_components["4"].long_name
            // alert("Learner Registered sucessfully");
          } else {
          }
        },
      );
    }
  }
  LearnerSignUp() {
    if (this.formGroup.valid == true) {
      this.LearnerObj = this.formGroup.value;
      var reqobj = {
        "FirstName": this.LearnerObj.firstName,
        "LastName": this.LearnerObj.lastName,
        "EmailId": this.LearnerObj.emailid,
        "Password": this.LearnerObj.password,
        "PhoneNumber": this.phoneCode + this.LearnerObj.contactNumber,
        "AltPhoneNumber": this.AltphoneCode + this.LearnerObj.AlternativeContactNumber,
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
        "Active": true
      }
      debugger
      this._dataService.Post('api/Learner/AddUpdateLearner', reqobj).subscribe(
        res => {
          debugger
          if (res.length > 0) {
            debugger
            this.isSuccess=true;
            this.message=res;
            // alert("Learner Registered sucessfully");
            // this.router.navigate(['/signUp']);
          } else {
            this.isSuccess=true;
            this.message=res.error;
            
          }
        },
      );
    }
    else {
    }
  }

  ChangeTimeZone(details): void {
    debugger
    this.ChangeZone = details
  }
  onCountryChange(great) {
    debugger
    this.phoneCode = '+' + great.dialCode
  }
  // getNumber1(good) {
  //   this.contactNumber=good;
  // }
  onCountryChange1(great1) {
    this.AltphoneCode = '+' + great1.dialCode
  }
  telInputObject1(obj) {
    debugger
    console.log(obj);
    obj.intlTelInput('setCountry', 'in');
  }
  telInputObject(obj) {
    debugger
    console.log(obj);
    obj.intlTelInput('setCountry', 'in');
  }
}
