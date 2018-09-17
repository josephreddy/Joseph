import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { Router, NavigationStart, ActivatedRoute, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { CanDeactivateGuard } from './deactivate';
import { COUNTRY_LIST } from '../../shared/services/CountriesList';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  public mask: Array<string | RegExp>
  Afternoonmax: Date;
  Afternoonmin: Date;
  Morningmax: Date;
  Morningmin: Date;
  Eveningmin: Date;
  Eveningmax: Date;
  Nightmin: Date;
  Nightmax: Date;

  ShiftDetailslength: number;
  ShiftDetails: any[] = [];
  ReferenceSource: any;
  ReferenceType: any;
  TrainingType: any;
  ReferenceTypeList: any;
  TrainingModeList: any;
  TrainingTypeList: any;
  TrainingMode: any;
  skillsSet: any;
  SupportedSkillsList: any;
  TrainingFrequencyList: any;
  PersonalphoneCode: any;
  PaypalNumberCode: string;
  isLinear = true;
  favoriteSeason: string;
  selectedGender: string;
  // payoutstypes: string[] = ['Bank Account', 'PayPal'];
  PublicprofileForm: FormGroup;
  SharedInfoForm: FormGroup;
  SocialInfoForm: FormGroup;
  PayoutsForm: FormGroup;
  CourseList: any[];
  // AddedSeubjectsList:any[];
  AddedSeubjectsList: any[] = [];
  SubmitSubjectsList: any[] = [];
  ShiftIDs: any[] = [];
  i: number = 1;
  isSame: boolean = false;
  MorningStart: string;
  MorningTimeVisible: boolean = false;
  AfternoonTimeVisible: boolean = false;
  EveningTimeVisible: boolean = false;
  NightTimeVisible: boolean = false;
  PrefferrableShiftList = [{ "ShiftID": 1, "ShiftName": "Morning" }, { "ShiftID": 2, "ShiftName": "AfterNoon" }, { "ShiftID": 3, "ShiftName": "Evening" }, { "ShiftID": 4, "ShiftName": "Night" }];
  ChangeZone: any;
  phoneCode: string;
  AltphoneCode: string;
  City: any;
  State: any;
  Country: any;
  currentDate = new Date();
  BASE64_MARKER: string = ';base64,';
  FORMAT_MARKER: string = ':image/';
  isTrainigModeVisible: boolean = false;
  isReferenceTypeVisible: boolean = false;

  // Morningmin = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 0);
  // Morningmax = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 11, 59);

  // Afternoonmin = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 12);
  // Afternoonmax = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 15, 59);

  // Eveningmin = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 16);
  // Eveningmax = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 19, 59);

  // Nightmin = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 20);
  // Nightmax = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 23, 59);

  MorningStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 6);
  MorningEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 11, 59);

  AfterNoonStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 12);
  AfterNoonEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 15, 59);

  EveningStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 16);
  EveningEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 19, 59);

  NightStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 20);
  NightEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 23, 59);
  url: '';
  firstForm: any;
  secondForm: any;
  thirdForm: any;
  fourthForm: any;
  MorningEnd: string;
  AfternoonStart: string;
  AfternoonEnd: string;
  EveningStart: string;
  EveningEnd: string;
  NightStart: string;
  NightEnd: string;
  ShiftArray: any[];
  Languagelist: any;
  ByteImage: string;
  ProFileExtention: string;
  currentUser: any;
  Genderlist: any;
  TutorDetails: any;
  accountname: any;
  Address: any;
  AboutMe: any;
  PhoneNumber: any;
  EmailId: any;
  AccountNumber: any;
  GenderId: any;
  AltPhoneNumber: any;
  ZipCode: any;
  PersonalEmailId: any;
  PersonalNumber: any;
  WorkExperience: any;
  TimeZone: any;
  LastName: any;
  FirstName: any;
  WeekendAvailable: any;
  Blog: any;
  Hangout: any;
  LinkedIn: any;
  SkypeID: any;
  YouTube: any;
  LangID: number[] = [];
  SkillsId: number[] = [];
  select: number[] = [0];
  lang: any;
  CourseId: any;
  ShiftID: number[] = [];
  shiftss: any;
  length: any;
  preferrLanguage: any = 1;
  private routeSub: any;
  fileExtension: string;
  image: any;
  base64: any;
  result: any;
  ImageUrl: any;
  get: boolean = true;
  change1: boolean;
  payoutstypes: any;
  AccountIFCS: any;
  PaypalEmail: any;
  PaypalNumber: any;
  PaypalCountry: any;
  AccountType: any = 1;
  countries: any;
  change2: boolean;
  change3: boolean;
  change4: boolean;
  PhoneNumberCode: any;
  hu: string;
  decision: any;
  FileName: any;
  FileLocation: any;
  FileExtention: any;
  shiftsData: any[] = [];
  checked: boolean = false;
  TutorId: any;
  userId: any;
  UserInfo: any;
  flag: string;
  flag1: any;
  flag2: any;
  temp: any;
  temp2: any;
  temp1: any;
  setPosition: any;
  UserLocationDetails: any;


  constructor(private _formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute, private _dataService: DataService, private router: Router, private cd: ChangeDetectorRef, private _headerComponent: HeaderComponent) {
    debugger;
    this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    // alert(JSON.stringify(this.UserLocationDetails))
    this._headerComponent.getUserData();
    this.countries = COUNTRY_LIST;
    this.TutorId = this._activatedRoute.snapshot.params['TutorId'];
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.FirstName = this.currentUser.FirstName;
    this.LastName = this.currentUser.LastName;
    this.EmailId = this.currentUser.EmailId;
    this.LastName = this.currentUser.LastName;
    this.PhoneNumber = this.currentUser.PhoneNumber;
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.PublicprofileForm = this._formBuilder.group({
      FirstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      LastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      Gender: new FormControl('', [Validators.required]),
      Street: new FormControl('', [Validators.required]),
      City: new FormControl('', [Validators.required]),
      State: new FormControl('', [Validators.required]),
      AboutMe: new FormControl('', [Validators.required, Validators.minLength(20)]),
      Country: new FormControl('', [Validators.required]),
      Pincode: new FormControl('', [Validators.required]),
      MobileNumber: new FormControl('', [Validators.compose([Validators.required])]),
      AltMobileNumber: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
      Course: new FormControl(''),
      RawImage: new FormControl('')
    });
    this.SharedInfoForm = this._formBuilder.group({
      Email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
      PersonalMobileNumber: new FormControl('', [Validators.required]),
      ShiftTimings: new FormControl('', [Validators.required]),
      Mopentime: new FormControl('', ),
      Mclosetime: new FormControl(''),
      Aopentime: new FormControl(''),
      Aclosetime: new FormControl(''),
      Eopentime: new FormControl(''),
      Eclosetime: new FormControl(''),
      Nopentime: new FormControl(''),
      Nclosetime: new FormControl(''),
      WeekendAvailable: new FormControl('', [Validators.required]),
      TrainingMode: new FormControl('', [Validators.required]),
      TrainingType: new FormControl('', [Validators.required]),
      // skillsSet:new FormControl(''),
      skillsSet: new FormControl('', [Validators.required]),
      Experience: new FormControl('', [Validators.required, Validators.pattern('[+0-9]*')]),
      TimeZone: new FormControl('', [Validators.required]),
      PrefferLanguage: new FormControl('', [Validators.required]),
    });
    this.SocialInfoForm = this._formBuilder.group({
      Blog: new FormControl('', Validators.pattern(reg)),
      LinkedIn: new FormControl('', Validators.pattern(reg)),
      HangOut: new FormControl('', Validators.pattern(reg)),
      Youtube: new FormControl('', Validators.pattern(reg)),
      Skype: new FormControl('', ),
    });
    this.PayoutsForm = this._formBuilder.group({
      AccountName: new FormControl('', [Validators.required]),
      AccountNumber: new FormControl('', [Validators.required]),
      AccountIFCS: new FormControl('', [Validators.required]),
      PaypalEmail: new FormControl(''),
      PaypalNumber: new FormControl(''),
      PaypalCountry: new FormControl(''),
      AccountTypeId: new FormControl(''),
      ReferenceType: new FormControl(''),
    });
  }

  getLocation() {
    debugger
    var x = document.getElementById("demo");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  showPosition(position) {
    var x = document.getElementById("demo");
    x.innerHTML = "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude;
  }


  ngOnInit() {

    this.getLocation()
    // this.routeSub = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     // save your data
    //   }
    // });
    // this.GetUserInfo();
    this.GetPaymentType();
    this.GetCourseList();
    this.GetLanguages();
    this.GetGender();
    this.GetTrainingFrequency();
    this.GetSupportedSkills();
    this.GetTrainingMode();
    this.GetTutorByTutorID();
    this.GetTrainingModeDetails();
    this.GetReferenceTypeDetails();
  }

  keyPress(event: any) {
    debugger;
    const numberpattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!numberpattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  GetUserInfo() {
    debugger
    this._dataService.GetUserInfo()
      .subscribe((Info: any) => {
        if (Info != undefined || null) {
          this.UserInfo = Info;
          this.ChangeZone = this.UserInfo.data.timezone.id
        }
        else {
          // alert(Data);
        }
      });
  }
  countryChanges(selectedcountry): void {
    debugger
    this.PaypalCountry = selectedcountry
  }

  GetSupportedSkills() {
    this._dataService.GetAll('api/Tutor/GetSupportedSkills')
      .subscribe((SupportedSkills: any) => {
        if (SupportedSkills.length > 0) {
          this.SupportedSkillsList = SupportedSkills;
        }
        else {
        }
      });
  }

  GetTrainingMode() {
    this._dataService.GetAll('api/Tutor/GetTrainingMode')
      .subscribe((TrainingType: any) => {
        if (TrainingType.length > 0) {
          this.TrainingTypeList = TrainingType;
        }
        else {
        }
      });
  }

  GetTrainingModeDetails() {
    this._dataService.GetAll('api/Tutor/GetTrainingModeDetails')
      .subscribe((TrainingModeDetails: any) => {
        if (TrainingModeDetails.length > 0) {
          this.TrainingModeList = TrainingModeDetails;
        }
        else {
        }
      });
  }

  GetTrainingFrequency() {
    this._dataService.GetAll('api/Tutor/GetTrainingFrequency')
      .subscribe((TrainingFrequency: any) => {
        if (TrainingFrequency.length > 0) {
          this.TrainingFrequencyList = TrainingFrequency;
        }
        else {
        }
      });
  }

  GetReferenceTypeDetails() {
    this._dataService.GetAll('api/Tutor/GetReferenceTypeDetails')
      .subscribe((ReferenceType: any) => {
        if (ReferenceType.length > 0) {
          this.ReferenceTypeList = ReferenceType;
        }
        else {
        }
      });
  }

  GetGender() {
    this._dataService.GetAll('api/Tutor/GetGenderDetails')
      .subscribe((Gender: any) => {
        if (Gender.length > 0) {
          this.Genderlist = Gender;
        }
        else {
        }
      });
  }
  GetTutorByTutorID() {
    debugger
    if (this.currentUser.RoleID == 1) {
      this.userId = this.TutorId;
    }
    else {
      this.userId = this.currentUser.TutorID;
    }
    this._dataService.GetAll('api/Tutor/GetTutorDetailsByTutorId/' + this.userId)
      .subscribe((TutorDetails: any) => {
        this.cd.markForCheck();
        var dt = new Date();
        var year = dt.getFullYear();
        var month = dt.getMonth();
        var date = dt.getDate();
        if (TutorDetails.length > 0) {
          debugger
          this.TutorDetails = TutorDetails['0']

          if (this.TutorDetails.CourseId > 0) {
            for (var i = 0; i < TutorDetails.length; i++) {
              this.AddedSeubjectsList.push({ 'CourseId': TutorDetails[i].CourseId, 'CourseName': TutorDetails[i].CourseName });
              this.SubmitSubjectsList.push(TutorDetails[i].CourseId);
            }
          }
          if (this.TutorDetails.LangID > 0) {
            for (var i = 0; i < TutorDetails.length; i++) {
              this.LangID.push(TutorDetails[i].LangID);
            }
          }
          if (this.TutorDetails.SkillsId > 0) {
            for (var i = 0; i < TutorDetails.length; i++) {
              this.SkillsId.push(TutorDetails[i].SkillsId);
            }
          }
          if (this.TutorDetails.ShiftID > 0) {
            for (var i = 0; i < TutorDetails.length; i++) {
              this.ShiftIDs.push(TutorDetails[i].ShiftID);
              this.ShiftDetails.push({ "ShiftId": TutorDetails[i].ShiftID, "StartTime": TutorDetails[i].StartTime, "EndTime": TutorDetails[i].EndTime });
            }
          }
          this.shiftss = this.ShiftIDs.filter(this.onlyUnique);
          this.onShiftChange(this.shiftss)
          this.ShiftDetails = this.ShiftDetails.filter(this.onlyUnique)

          this.ShiftDetailslength = this.ShiftDetails == null || undefined ? 0 : this.ShiftDetails.length
          for (let i = 0; i < this.ShiftDetailslength; i++) {
            if (this.ShiftDetails[i].ShiftId == "1") {
              var MrngStartTime = this.ShiftDetails[i].StartTime;
              var MrngStartTimeSplit = MrngStartTime.split(':');
              var MrngEndTime = this.ShiftDetails[i].EndTime;
              var MrngEndTimeSplit = MrngEndTime.split(':');
              this.MorningStartTime = new Date(year, month, date, MrngStartTimeSplit[0], MrngStartTimeSplit[1], MrngStartTimeSplit[2]);
              this.MorningEndTime = new Date(year, month, date, MrngEndTimeSplit[0], MrngEndTimeSplit[1], MrngEndTimeSplit[2]);
              // this.Morningmin = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 0);
              // this.Morningmax = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 11, 59);     
            }
            if (this.ShiftDetails[i].ShiftId == "2") {
              var AftStartTime = this.ShiftDetails[i].StartTime;
              var AftStartTimeSplit = AftStartTime.split(':');
              var AftEndTime = this.ShiftDetails[i].EndTime;
              var AftEndTimeSplit = AftEndTime.split(':');
              this.AfterNoonStartTime = new Date(year, month, date, AftStartTimeSplit[0], AftStartTimeSplit[1], AftStartTimeSplit[2]);
              this.AfterNoonEndTime = new Date(year, month, date, AftEndTimeSplit[0], AftEndTimeSplit[1], AftEndTimeSplit[2]);
              //this.Afternoonmin = new Date(2018, 8, 9, 12,0);
              // this.Afternoonmax = new Date(2018, 8, 9, 15, 59); 
              // this.SharedInfoForm.controls['Aopentime'].updateValueAndValidity();
              // this.SharedInfoForm.controls['Aclosetime'].updateValueAndValidity();                    
            }
            if (this.ShiftDetails[i].ShiftId == "3") {
              var EvngStartTime = this.ShiftDetails[i].StartTime;
              var EvngStartTimeSplit = EvngStartTime.split(':');
              var EvngEndTime = this.ShiftDetails[i].EndTime;
              var EvngEndTimeSplit = EvngEndTime.split(':');
              this.EveningStartTime = new Date(year, month, date, EvngStartTimeSplit[0], EvngStartTimeSplit[1], EvngStartTimeSplit[2]);
              this.EveningEndTime = new Date(year, month, date, EvngEndTimeSplit[0], EvngEndTimeSplit[1], EvngEndTimeSplit[2]);
            }
            if (this.ShiftDetails[i].ShiftId == "4") {
              var NghtStartTime = this.ShiftDetails[i].StartTime;
              var NghtStartTimeSplit = NghtStartTime.split(':');
              var NghtEndTime = this.ShiftDetails[i].EndTime;
              var NghtEndTimeSplit = NghtEndTime.split(':');
              this.NightStartTime = new Date(year, month, date, NghtStartTimeSplit[0], NghtStartTimeSplit[1], NghtStartTimeSplit[2]);
              this.NightEndTime = new Date(year, month, date, NghtEndTimeSplit[0], NghtEndTimeSplit[1], NghtEndTimeSplit[2]);
            }

          }
          this.AddedSeubjectsList = this.multiDimensionalUnique(this.AddedSeubjectsList);
          this.SubmitSubjectsList = this.SubmitSubjectsList.filter(this.onlyUnique);
          this.accountname = this.TutorDetails.AccountName;
          this.FirstName = this.TutorDetails.FirstName;
          this.LastName = this.TutorDetails.LastName;
          this.Address = this.TutorDetails.Address;
          this.City = this.TutorDetails.City;
          this.State = this.TutorDetails.State;
          this.Country = this.TutorDetails.Country;
          this.AccountNumber = this.TutorDetails.AccountNumber;
          this.AboutMe = this.TutorDetails.AboutMe;
          this.PhoneNumber = this.TutorDetails.PhoneNumber;
          this.EmailId = this.TutorDetails.EmailId;
          this.AboutMe = this.TutorDetails.AboutMe;
          this.AboutMe = this.TutorDetails.AboutMe;
          this.GenderId = this.TutorDetails.GenderId;
          this.AltPhoneNumber = this.TutorDetails.AltPhoneNumber;
          this.ZipCode = this.TutorDetails.ZipCode;
          this.PersonalEmailId = this.TutorDetails.PersonalEmailId;
          this.PersonalNumber = this.TutorDetails.PersonalNumber;
          this.WorkExperience = this.TutorDetails.WorkExperience;
          this.ChangeZone = this.TutorDetails.TimeZone;
          this.ImageUrl = this.TutorDetails.ImageUrl;
          this.Blog = this.TutorDetails.Blog;
          this.Hangout = this.TutorDetails.Hangout;
          this.LinkedIn = this.TutorDetails.LinkedIn;
          this.SkypeID = this.TutorDetails.SkypeID;
          this.YouTube = this.TutorDetails.YouTube;
          this.CourseId = this.TutorDetails.CourseId;
          this.AccountIFCS = this.TutorDetails.AccountIFCS;
          this.PaypalEmail = this.TutorDetails.PaypalEmail;
          this.PaypalNumber = this.TutorDetails.PaypalNumber;
          this.PaypalCountry = this.TutorDetails.PaypalCountry;
          this.AccountType = this.TutorDetails.AccountType == null ? 1 : this.TutorDetails.AccountType;
          this.flag = this.TutorDetails.PhoneNumberCode;
          this.flag1 = this.TutorDetails.AltPhoneNumberCode == null || undefined ? this.flag : this.TutorDetails.AltPhoneNumberCode;
          this.flag2 = this.TutorDetails.PersonalNumberCode == null || undefined ? this.flag : this.TutorDetails.PersonalNumberCode;
          // this.LangID= this.TutorDetails.LangID;
          //this.ShiftID.push(this.TutorDetails.ShiftID);
          this.lang = this.LangID.filter(this.onlyUnique);
          this.SkillsId = this.SkillsId.filter(this.onlyUnique);
          this.WeekendAvailable = this.TutorDetails.DaysAvailable;
          //this.TrainingMode=this.TutorDetails.TrainingMode;
          this.TrainingMode = this.TutorDetails.TrainingMode;
          this.PayoutsForm.value.AccountTypeId = this.AccountType;

          this.FileName = this.TutorDetails.FileName;
          this.FileLocation = this.TutorDetails.FileLocation;
          this.FileExtention = this.TutorDetails.FileExtention;
          this.TrainingMode = this.TutorDetails.TrainingMode;
          this.TrainingType = this.TutorDetails.TrainingType;
          this.ReferenceType = this.TutorDetails.ReferenceTypeId;
          this.ReferenceSource = this.TutorDetails.ReferenceSource
          this.onMediaTypeSelect("Hi");
          this.onTrainingTypeChange(this.TrainingMode);
          this.onReferenceTypeChange(this.ReferenceType);
          debugger
          this.telInputObject(this.temp);
          this.telInputObject1(this.temp1);
          this.telInputObject2(this.temp2);

        }
        else {

        }
      });
  }

  onMediaTypeSelect(selectedMediaType) {
    debugger;
    if (this.PayoutsForm.value.AccountTypeId == 1 || this.PayoutsForm.value.AccountTypeId == null) {
      this.PayoutsForm.addControl('AccountName', new FormControl("", Validators.required));
      this.PayoutsForm.addControl('AccountNumber', new FormControl("", Validators.required));
      this.PayoutsForm.addControl('AccountIFCS', new FormControl("", Validators.required));
      this.PayoutsForm.removeControl('PaypalEmail');
      this.PayoutsForm.removeControl('PaypalNumber');
      this.PayoutsForm.removeControl('PaypalCountry');
      // this.PaypalEmail=null;
      // this.PaypalNumber=null;
      // this.PaypalCountry=null;
      this.PayoutsForm.value.PaypalEmail = null;
    }
    if (this.PayoutsForm.value.AccountTypeId == 2) {
      this.PayoutsForm.addControl('PaypalEmail', new FormControl("", Validators.required));
      this.PayoutsForm.addControl('PaypalNumber', new FormControl("", Validators.required));
      this.PayoutsForm.addControl('PaypalCountry', new FormControl("", Validators.required));
      this.PayoutsForm.removeControl('AccountName');
      this.PayoutsForm.removeControl('AccountNumber');
      this.PayoutsForm.removeControl('AccountIFCS');
      // this.accountname=null;
      // this.AccountNumber=null;
      // this.AccountIFCS=null;
    }
  }

  GetLanguages() {
    this._dataService.GetAll('api/Tutor/GetLanguageDetails')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.Languagelist = Data;
        }
        else {
          // alert(Data);
        }
      });
  }
  GetCourseList() {
    this._dataService.GetAll('api/Course/GetCourse')
      .subscribe((res: any) => {
        if (res.length > 0) {
          this.CourseList = res;
        }
        else {
        }
      });
  }
  GetPaymentType() {
    debugger
    this._dataService.GetAll('api/Tutor/GetAccountType')
      .subscribe((res: any) => {
        if (res.length > 0) {
          this.payoutstypes = res;
        }
        else {
        }
      });
  }

  checkUnique(form) {
    if (this.AddedSeubjectsList.length > 0) {
      this.AddedSeubjectsList.forEach((item, index) => {
        if (item.CourseId === form.value.Course.CourseId) {
          this.isSame = true;
        }
      });
    }
    return this.isSame;
  }

  AddCourses(form) {
    debugger
    if (form.value.Course.CourseId != undefined) {
      this.checkUnique(form);
      if (this.isSame != true) {
        this.AddedSeubjectsList.push({ 'CourseId': form.value.Course.CourseId, 'CourseName': form.value.Course.CourseName });
        this.SubmitSubjectsList.push(form.value.Course.CourseId);
        this.i = this.i + 1;
      } else {
        Swal({
          title: 'Course already added',
          type: 'warning',
          position: 'top'
        })
        this.isSame = false;
      }
    } else {
      Swal({
        title: 'Please Select Course',
        type: 'warning',
        position: 'top'
      })
    }

  }

  DeleteCourses(doc) {
    this.AddedSeubjectsList.forEach((item, index) => {
      if (item === doc) this.AddedSeubjectsList.splice(index, 1);
      if (item === doc) this.SubmitSubjectsList.splice(index, 1);
    });
  }

  PublicProfileSave(Value) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.decision = Value
    if (Value == false) {
      this.TutorSignUp();
    }
    else {
      this.TutorSignUp();
      if (this.currentUser.RoleID == 1) {
        this.router.navigate(['/admin/TutorDetails']);
      }
      else {
        this.router.navigate(['/']);
      }
    }
  }

  onTrainingTypeChange(selectedValue) {
    debugger
    if (selectedValue == 1 || selectedValue == 3) {
      this.PayoutsForm.value.TrainingMode = "";
      this.isTrainigModeVisible = true;
      this.SharedInfoForm.addControl('TrainingMode', new FormControl("", Validators.required));
    } else {
      this.isTrainigModeVisible = false;
      this.SharedInfoForm.removeControl('TrainingMode');
    }
  }
  onReferenceTypeChange(value) {
    if (value == 5) {
      this.isReferenceTypeVisible = true;
      this.PayoutsForm.addControl('ReferenceSource', new FormControl("", Validators.required));
    } else {
      this.isReferenceTypeVisible = false;
      this.PayoutsForm.removeControl('ReferenceSource');
    }
  }



  onShiftChange(value): void {
    debugger
    this.MorningTimeVisible = false;
    this.AfternoonTimeVisible = false;
    this.EveningTimeVisible = false;
    this.NightTimeVisible = false;
    value.forEach(item => {
      if (item == 0) {
        this.MorningTimeVisible = false;
        this.AfternoonTimeVisible = false;
        this.EveningTimeVisible = false;
        this.NightTimeVisible = false;
      }
      if (item == 1) {
        this.MorningTimeVisible = true;
        this.MorningStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 6);
        this.MorningEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 11, 59);
      }
      if (item == 2) {
        this.AfternoonTimeVisible = true;
        this.AfterNoonStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 12);
        this.AfterNoonEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 15, 59);
      }
      if (item == 3) {
        this.EveningTimeVisible = true;
        this.EveningStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 16);
        this.EveningEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 19, 59);
      }
      if (item == 4) {
        this.NightTimeVisible = true;
        this.NightStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 20);
        this.NightEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 23, 59);
      }

    });
    var len = this.PrefferrableShiftList.length;
    if (len == value.length)
      this.checked = true;
    else
      this.checked = false;
  }

  //Multiple CheckBox Selection
  onCheckedChange(checked) {
    debugger
    if (checked) {
      this.MorningTimeVisible = true;
      this.AfternoonTimeVisible = true;
      this.EveningTimeVisible = true;
      this.NightTimeVisible = true;
      this.MorningStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 6);
      this.MorningEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 11, 59);

      this.AfterNoonStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 12);
      this.AfterNoonEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 15, 59);

      this.EveningStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 16);
      this.EveningEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 19, 59);

      this.NightStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 20);
      this.NightEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 23, 59);
      for (var i = 0; i < this.PrefferrableShiftList.length; i++) {
        this.shiftsData.push(this.PrefferrableShiftList[i].ShiftID);
      }
      if (this.shiftsData.length > 0)
        this.shiftss = this.shiftsData;
    }
    else {
      this.MorningTimeVisible = false;
      this.AfternoonTimeVisible = false;
      this.EveningTimeVisible = false;
      this.NightTimeVisible = false;
      this.shiftss = [];
    }
  }

  ChangeTimeZone(details): void {

    debugger
    this.ChangeZone = details
  }
  telInputObject(obj) {
    debugger
    this.temp = obj
    console.log(obj);
    if (this.flag != undefined || null) {
      obj.intlTelInput('setCountry', this.flag);
    }
    else {
      obj.intlTelInput('setCountry', '');
    }
  }
  onCountryChange(great) {
    debugger
    this.phoneCode = great.iso2
  }
  onCountryChange1(great) {
    debugger
    this.AltphoneCode = great.iso2
  }
  telInputObject1(obj) {
    debugger
    this.temp1 = obj
    console.log(obj);
    obj.intlTelInput('setCountry', this.flag1);
  }
  onCountryChange2(great) {
    this.PersonalphoneCode = great.iso2
  }
  telInputObject2(obj) {
    debugger
    this.temp2 = obj
    console.log(obj);
    if (this.flag != undefined || null) {
      obj.intlTelInput('setCountry', this.flag2);
    }
    else {
      obj.intlTelInput('setCountry', '');
    }
  }
  onCountryChange3(great) {
    this.PaypalNumberCode = great.iso2
  }
  telInputObject3(obj) {
    debugger
    console.log(obj);
    obj.intlTelInput('setCountry', 'in');
  }
  onClickOutside(input) {
    if (input.length >= 5) {

      this._dataService.GetZipCode(input).subscribe(
        res => {
          debugger
          if (res.status == "OK") {
            debugger
            this.City = res.results["0"].address_components["1"].long_name
            this.State = res.results["0"].address_components["3"].long_name
            this.Country = res.results["0"].address_components["4"].long_name
          } else {
          }
        },
      );
    }
  }

  onSelectFile(inputValue: any): void {
    var file: File = inputValue.target.files[0];
    this.fileExtension = '.' + file.name.split('.').pop();
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.ImageUrl = myReader.result;
      this.cd.markForCheck();
      var base64Index = this.ImageUrl.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
      this.base64 = this.ImageUrl.substring(base64Index);
    }
    myReader.readAsDataURL(file);
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  multiDimensionalUnique(arr) {
    debugger
    var uniques = [];
    var itemsFound = {};
    for (var i = 0, l = arr.length; i < l; i++) {
      var stringified = JSON.stringify(arr[i]);
      if (itemsFound[stringified]) { continue; }
      uniques.push(arr[i]);
      itemsFound[stringified] = true;
    }
    return uniques;
  }
  TutorSignUp() {
    // this.btnDisable = true
    debugger;
    this.firstForm = this.PublicprofileForm.value;
    this.secondForm = this.SharedInfoForm.value;
    this.thirdForm = this.SocialInfoForm.value;
    this.fourthForm = this.PayoutsForm.value;
    this.MorningStart = (new Date(this.secondForm.Mopentime).getHours() + ":" + new Date(this.secondForm.Mopentime).getMinutes()).toString();
    this.MorningEnd = (new Date(this.secondForm.Mclosetime).getHours() + ":" + new Date(this.secondForm.Mclosetime).getMinutes()).toString();

    this.AfternoonStart = (new Date(this.secondForm.Aopentime).getHours() + ":" + new Date(this.secondForm.Aopentime).getMinutes()).toString();
    this.AfternoonEnd = (new Date(this.secondForm.Aclosetime).getHours() + ":" + new Date(this.secondForm.Aclosetime).getMinutes()).toString();

    this.EveningStart = (new Date(this.secondForm.Eopentime).getHours() + ":" + new Date(this.secondForm.Eopentime).getMinutes()).toString();
    this.EveningEnd = (new Date(this.secondForm.Eclosetime).getHours() + ":" + new Date(this.secondForm.Eclosetime).getMinutes()).toString();

    this.NightStart = (new Date(this.secondForm.Nopentime).getHours() + ":" + new Date(this.secondForm.Nopentime).getMinutes()).toString();
    this.NightEnd = (new Date(this.secondForm.Nclosetime).getHours() + ":" + new Date(this.secondForm.Nclosetime).getMinutes()).toString();


    this.ShiftArray = [];
    // this.htmlDesc = this.categorydetails.htmlDesc == null || undefined ? "null" : this.categorydetails.htmlDesc;

    this.length = this.secondForm.ShiftTimings == null || undefined ? 0 : this.secondForm.ShiftTimings.length
    for (let i = 0; i < this.length; i++) {
      if (this.secondForm.ShiftTimings[i] == "1" && this.ShiftArray[i] != this.secondForm.ShiftTimings[i])
        this.ShiftArray.push({ "ShiftId": this.secondForm.ShiftTimings[i], "StartTime": this.MorningStart, "EndTime": this.MorningEnd });

      if (this.secondForm.ShiftTimings[i] == "2" && this.ShiftArray[i] != this.secondForm.ShiftTimings[i])
        this.ShiftArray.push({ "ShiftId": this.secondForm.ShiftTimings[i], "StartTime": this.AfternoonStart, "EndTime": this.AfternoonEnd });

      if (this.secondForm.ShiftTimings[i] == "3" && this.ShiftArray[i] != this.secondForm.ShiftTimings[i])
        this.ShiftArray.push({ "ShiftId": this.secondForm.ShiftTimings[i], "StartTime": this.EveningStart, "EndTime": this.EveningEnd });

      if (this.secondForm.ShiftTimings[i] == "4" && this.ShiftArray[i] != this.secondForm.ShiftTimings[i])
        this.ShiftArray.push({ "ShiftId": this.secondForm.ShiftTimings[i], "StartTime": this.NightStart, "EndTime": this.NightEnd });

      if (this.secondForm.ShiftTimings[i] == "0" && this.ShiftArray[i] != this.secondForm.ShiftTimings[i])
        this.ShiftArray.push({ "ShiftId": this.secondForm.ShiftTimings[i], "StartTime": "00:01", "EndTime": "23:59" });

    }
    this.ShiftArray = this.ShiftArray.filter(this.onlyUnique); // returns ['a', 1, 2, '1']
    // this.htmlDesc = this.categorydetails.htmlDesc == null || undefined ? "null" : this.categorydetails.htmlDesc;
    if (this.SubmitSubjectsList.length > 0) {
      debugger
      this.SubmitSubjectsList = this.SubmitSubjectsList.filter(this.onlyUnique); // returns ['a', 1, 2, '1']
    }
    if (this.secondForm.PrefferLanguage != undefined && this.secondForm.PrefferLanguage.length > 0) {
      debugger
      this.preferrLanguage = this.secondForm.PrefferLanguage;
      this.preferrLanguage = this.preferrLanguage.filter(this.onlyUnique); // returns ['a', 1, 2, '1']
      // this.preferrLanguage = this.secondForm.PrefferLanguage == null || undefined ? "1" : this.secondForm.PrefferLanguage.toString();
    }
    if (this.secondForm.skillsSet != undefined && this.secondForm.skillsSet.length > 0) {
      debugger
      this.skillsSet = this.secondForm.skillsSet;
      this.skillsSet = this.skillsSet.filter(this.onlyUnique); // returns ['a', 1, 2, '1']
      // this.preferrLanguage = this.secondForm.PrefferLanguage == null || undefined ? "1" : this.secondForm.PrefferLanguage.toString();
    }
    this.TutorId = this.currentUser.TutorID == undefined || null ? this.TutorId : this.currentUser.TutorID;
    var reqobj =
    {
      "ByteImage": this.base64 != undefined ? this.base64 == null ? this.base64 : this.base64 : null,
      "TutorID": this.TutorId,
      "Title": null,
      "FirstName": this.firstForm.FirstName,
      "LastName": this.firstForm.LastName,
      "EmailID": this.firstForm.Email,
      "Password": this.currentUser.Password,
      "GenderId": this.firstForm.Gender,
      "Address": this.firstForm.Street,
      "Country": this.firstForm.Country,
      "ZipCode": this.firstForm.Pincode,
      "State": this.firstForm.State,
      "City": this.firstForm.City,
      "AboutMe": this.firstForm.AboutMe,
      "PhoneNumber": this.firstForm.MobileNumber,
      "AltPhoneNumber": this.firstForm.AltMobileNumber,
      "CourseIds": this.SubmitSubjectsList.toString(),
      "PersonalEmailId": this.secondForm.Email,
      "PersonalNumber": this.secondForm.PersonalMobileNumber,
      "DaysAvailable": this.secondForm.WeekendAvailable,
      "WorkExperience": this.secondForm.Experience,
      "ShiftTimings": this.ShiftArray,
      "TimeZone": this.secondForm.TimeZone == undefined || null ? this.ChangeZone : this.secondForm.TimeZone,
      "LanguageIds": this.preferrLanguage.toString(),
      "FileExtention": this.fileExtension == undefined || null ? this.TutorDetails.FileExtention : this.fileExtension,
      "FileLocation": this.TutorDetails.FileLocation,
      "FileName": this.TutorDetails.FileName,
      "EduID": null,
      "WorkDescription": null,
      "Blog": this.thirdForm.Blog,
      "Hangout": this.thirdForm.HangOut,
      "LinkedIn": this.thirdForm.LinkedIn,
      "SkypeID": this.thirdForm.Skype,
      "YouTube": this.thirdForm.Youtube,
      "AccountName": this.fourthForm.AccountName,
      "AccountNumber": this.fourthForm.AccountNumber,
      "AccountIFCS": this.fourthForm.AccountIFCS,
      "PaypalEmail": this.fourthForm.PaypalEmail,
      "PaypalNumber": this.fourthForm.PaypalNumber,
      "PaypalCountry": this.fourthForm.PaypalCountry,
      "AccountType": this.fourthForm.AccountTypeId,
      "LastLogin": new Date(),
      "DateCreated": new Date(),
      "DateModifed": new Date(),
      "ModifedBy": 1,
      "CreatedBy": 1,
      "Active": true,
      "RoleID": 2,
      "PhoneNumberCode": this.phoneCode,
      "AltPhoneNumberCode": this.AltphoneCode,
      "PersonalNumberCode": this.PersonalphoneCode,
      "PaypalNumberCode": this.PaypalNumber,
      "UserId": this.currentUser.UserId,
      "SkillIds": this.secondForm.skillsSet.toString(),
      "TrainingType": this.secondForm.TrainingMode,
      "TrainingMode": this.secondForm.TrainingType,
      "ReferenceTypeId": this.fourthForm.ReferenceType,
      "ReferenceSource": this.fourthForm.ReferenceSource
      // "TrainingMode": this.secondForm.TrainingMode
    }
    this._dataService.Post('api/Tutor/UpdateTutor', reqobj).subscribe(
      res => {
        debugger
        if (res.isSuccess == true) {
          if (this.decision == true) {
            Swal({
              title: 'Tutor Registered And Updated Sucessfully',
              type: 'success',
              position: 'top'
            })
          }
        } else {
        }
      },
    );
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    debugger
    this.change1 = this.PublicprofileForm.dirty;
    this.change2 = this.SharedInfoForm.dirty;
    this.change3 = this.SocialInfoForm.dirty;
    this.change4 = this.PayoutsForm.dirty;

    if (((this.change1 == true) || (this.change2 == true) || (this.change3 == true)) && (this.decision == false)) {
      return confirm("There are Unsaved changes. Do you want to Discard them");
    }
    else
      return true;
  }
}