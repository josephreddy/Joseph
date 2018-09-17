import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginComponent } from '../../login/login.component';
import { MatDialog } from '@angular/material';
import { DataService } from '../../shared/services/data.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-tutor-sign-up',
  templateUrl: './tutor-sign-up.component.html',
  styleUrls: ['./tutor-sign-up.component.css']
})
export class TutorSignUpComponent implements OnInit {
  public mask: Array<string | RegExp>
  TutorSignUpForm: FormGroup;
  TutorData: any;
  isLoading: boolean = false;
  phoneCode: string;
  result: string;
  MobileNumber: any;
  isError: boolean = false;
  UserLocationDetails: any;
  temp: any;
  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, private _dataService: DataService, private router: Router, private authservice: AuthService, private cd: ChangeDetectorRef) {
    this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.UserLocationDetails = JSON.parse(localStorage.getItem('UserLocationDetails'));
    this.TutorSignUpForm = this._formBuilder.group({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
      Password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      MobileNumber: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }
  telInputObject(obj) {
    this.temp = obj
    if (this.UserLocationDetails.countryCode != null || undefined) {
      obj.intlTelInput('setCountry', this.UserLocationDetails.countryCode);
    }
    else {
      obj.intlTelInput('setCountry', '');
    }
    // alert(this.UserLocationDetails.geobytesinternet)
  }
  onCountryChange(great) {
    debugger
    this.phoneCode = great.iso2
  }
  openLoginDialog() {
    this.dialog.open(LoginComponent, {
      width: '500px',
      height: 'auto',
    });
  }

  TutorSignUpClick(form) {
    this.isLoading = true;
    this.isError = false;
    var req = {
      "CourseIds": null,
      "LanguageIds": null,
      "ShiftTimings": null,
      "ByteImage": null,
      "TutorID": null,
      "Title": null,
      "FirstName": form.value.FirstName,
      "LastName": form.value.LastName,
      "EmailId": form.value.Email,
      "PhoneNumber": form.value.MobileNumber,
      "PhoneNumberCode": this.phoneCode,
      "Password": form.value.Password,
      "GenderId": null,
      "Address": null,
      "City": null,
      "State": null,
      "Country": null,
      "ZipCode": null,
      "AltPhoneNumber": null,
      "AboutMe": null,
      "FileExtention": null,
      "FileLocation": null,
      "FileName": null,
      "PersonalEmailId": null,
      "PersonalNumber": null,
      "WorkExperience": null,
      "EduID": null,
      "WorkDescription": null,
      "DaysAvailable": null,
      "TimeZone": null,
      "Blog": null,
      "Hangout": null,
      "LinkedIn": null,
      "SkypeID": null,
      "YouTube": null,
      "AccountName": null,
      "AccountNumber": null,
      "LastLogin": null,
      "DateCreated": null,
      "DateModifed": null,
      "ModifedBy": 1,
      "CreatedBy": 1,
      "Active": true,
      "RoleID": 2,
      "SkillIds": null,
      "UserId": null,
      "TrainingMode": null,
      "ReferenceTypeId": null,
      "ReferenceSource": null,
      "TrainingType": null,
    };

    this._dataService.Post('api/Account/TutorRegistration', req)
      .subscribe((res: any) => {
        this.isLoading = false;
        this.cd.markForCheck();
        if (res.isSuccess) {
          this.TutorData = res;

          var req = {
            "userName": this.TutorData.EmailId,
            "password": this.TutorData.Password
          };
          this.authservice.login(req).subscribe(
            res => {
              debugger;
              if (res == true) {
                this.router.navigate(['/registration']);
              }
              else {
                // this.result=res.message
              }
            },
          );

          // this._dataService.GetAll('api/Registration/GetLogin/' +  this.TutorData.EmailId + '/' + this.TutorData.Password)
          //   .subscribe((res: any) => {
          //     if (res.User!=undefined) {
          //       localStorage.setItem('CurrentTutor',JSON.stringify(res.User));
          //       localStorage.setItem('CurrentTutorActivityRights',JSON.stringify(res.ActivityRights[0]));  
          //       this.router.navigate(['/registration']);                          
          //     }else{
          //       this.result=res.error.message;
          //       //alert(res.error.message);
          //     }
          //   });
        }
        else {
          this.isError = true;
          this.result = res.error.errors;
          //alert(res.error.message);
        }
      });
  }
}
