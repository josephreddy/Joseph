import { Component, OnInit, ViewChild } from '@angular/core';
import { LyResizingCroppingImages, LyResizingCroppingImagesConfig, CroppedImage } from '@alyle/ui/resizing-cropping-images';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2'
import { DataService } from '../../shared/services/data.service';
@Component({
  selector: 'app-edit-tutor-profile',
  templateUrl: './edit-tutor-profile.component.html',
  styleUrls: ['./edit-tutor-profile.component.css']
})
export class EditTutorProfileComponent implements OnInit {
  TutorpassValue: any;
  uniquearray: any[];
  Password: any;
  titleValue: any;
  ShiftArray: any[];
  NightEnd: string;
  NightStart: string;
  EveningEnd: string;
  EveningStart: string;
  AfternoonEnd: string;
  AfternoonStart: string;
  MorningEnd: string;
  currentUser: any;
  active: any;
  Datecreated: any;
  CreatedBy: any;
  TutorId: any;
  Image: any;
  shitftValues: any;
  FileUrl: any;
  Base: any;
  FileLocation: any;
  FileEx: any;
  FileLoc: any;
  timeValue: any;
  aboutMeValue: string;
  preferedlanguagesvalue: number[];
  ChangeZone: any;
  cityValue: string;
  stateValue: string;
  countryValue: string;
  AddressValue: string;
  youtubeValue: string;
  SkypeValue: string;
  HangoutValue: string;
  linkedValue: string;
  blogValue: string;
  experienceSelected: string;
  weekendSelected: any;
  WorkDesc: string;
  educationSelected: number;
  TutorForm: any;
  courseselected: any;
  Languagelist: any;
  AltPhoneNumber: string;
  phoneNumber: string;
  emailID: string;
  Lastname: string;
  Firstname: string;
  getTutorID: any;
  TutorFormGroup: FormGroup;
  BASE64_MARKER: string = ';base64,';
  ProFileExtention:any;
  ByteImage:any;	
  @ViewChild(LyResizingCroppingImages) img: LyResizingCroppingImages;
  result: string;
  myConfig: LyResizingCroppingImagesConfig = {
    width: 150, // Default `250`
    height: 150 // Default `200`
  };

  demolist = new MatTableDataSource();
  Traininglist = new MatTableDataSource();
  Educationlist = new MatTableDataSource();
  Countrieslist = new MatTableDataSource();

  PrefferrableShiftList = [{ "ShiftID": 0, "ShiftName": "All" }, { "ShiftID": 1, "ShiftName": "Morning" }, { "ShiftID": 2, "ShiftName": "AfterNoon" }, { "ShiftID": 3, "ShiftName": "Evening" }, { "ShiftID": 4, "ShiftName": "Night" }];
  MorningStart: string;
  MorningTimeVisible: boolean = false;
  AfternoonTimeVisible: boolean = false;
  EveningTimeVisible: boolean = false;
  NightTimeVisible: boolean = false;
  currentDate = new Date();
  
  public Morningmin = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 0);
  public Morningmax = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 11, 59);

  public Afternoonmin = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 12);
  public Afternoonmax = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 15, 59);

  public Eveningmin = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 16);
  public Eveningmax = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 19, 59);

  public Nightmin = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 20);
  public Nightmax = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 23, 59);

  MorningStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 6);
  MorningEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 11, 59);

  AfterNoonStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 12);
  AfterNoonEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 15, 59);

  EveningStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 16);
  EveningEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 19, 59);

  NightStartTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 20);
  NightEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), 23, 59);
  phoneCode: string;
  AltphoneCode: string;

  constructor(private _formBuilder: FormBuilder,private router:Router,private _activatedRoute:ActivatedRoute,private _dataService: DataService) {

    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    
    this.getTutorID = this._activatedRoute.snapshot.params['tutorId'];
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));

    this.GetTutor(this.getTutorID);


      this.TutorFormGroup = this._formBuilder.group({
        title: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.minLength(10)]),
        firstName: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(4)]),
        lastName: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(4)]),
        emailid: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'), Validators.maxLength(30)]),
        password: new FormControl(''),
        contactNumber: new FormControl('', [Validators.required, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[+0-9]*')])]),
        AlternativeContactNumber: new FormControl('', [Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[+0-9]*')])]),
        
        education: new FormControl('', [Validators.required]),
        course: new FormControl('', [Validators.required]),
        shifts: new FormControl('', [Validators.required]),
        Mopentime: new FormControl('', ),
        Mclosetime: new FormControl(''),
        Aopentime: new FormControl(''),
        Aclosetime: new FormControl(''),
        Eopentime: new FormControl(''),
        Eclosetime: new FormControl(''),
        Nopentime: new FormControl(''),
        Nclosetime: new FormControl(''),
        weekendAvailable: new FormControl('', [Validators.required]),
        experience: new FormControl('', [Validators.required, Validators.min(1)]),
  
        blog: new FormControl('', Validators.pattern(reg)),
        linked: new FormControl('', Validators.pattern(reg)),
        hangout: new FormControl('', Validators.pattern(reg)),
        youtube: new FormControl('', Validators.pattern(reg)),
        skype: new FormControl('', Validators.minLength(4)),
        workExp: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(10)]),

        time: new FormControl(''),
        address: new FormControl('', [Validators.maxLength(200), Validators.minLength(10)]),
        country:new FormControl('', [Validators.required, Validators.maxLength(16),Validators.minLength(4),  Validators.pattern('[a-zA-Z_-\\s]*')]),
        city: new FormControl('', [Validators.required, Validators.maxLength(16),Validators.minLength(4),  Validators.pattern('[a-zA-Z_-\\s]*')]),
        state: new FormControl('', [Validators.required, Validators.maxLength(16),Validators.minLength(4),  Validators.pattern('[a-zA-Z_-\\s]*')]),
        PrefferLanguage: new FormControl('', [Validators.required]),
        imagefile: new FormControl(''),
        aboutMe:new FormControl(''),

        filename:new FormControl(''),
        TutorID:new FormControl(''),
        DateCreated:new FormControl(''),
        CreatedBy:new FormControl(''),
        active:new FormControl(''),
      });

   }

  ngOnInit() {
    this.BindData();
  }


  GetTutor(Value):void{
    this.TutorId=Value
    debugger
    this._dataService.GetAll('api/Tutor/GetTutorDetailsByTutorId/'+Value)
    .subscribe((Data: any) => {
      if (Data.length > 0) {
        var courseNames = [];
        var ShiftsNames = [];
        var LangNames = [];
        for (let i = 0; i < Data.length; i++) {
          if (courseNames.indexOf(Data[i].CourseId) === -1) {
            courseNames.push(Data[i].CourseId);
          }

          if (ShiftsNames.indexOf(Data[i].StartTime) === -1) {
            ShiftsNames.push({"Start":Data[i].StartTime,"End":Data[i].EndTime});
          }

          if (LangNames.indexOf(Data[i].LangID) === -1) {
            LangNames.push(Data[i].LangID);
          }

        }
        this.shitftValues=[];
        ShiftsNames.forEach(element => {
          var timing= parseInt(element.Start.substr(0, element.Start.indexOf(':'))); 
          if(timing>=6 && timing < 12)
          {
            var reStart = element.Start.split(":");
            var reEnd = element.End.split(":");
            this.MorningStartTime=new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), reStart[0],reStart[1]);
            this.MorningEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), reEnd[0],reEnd[1]);
            this.MorningTimeVisible = true;
            this.shitftValues.push(1);
          }

          if(timing>=12 && timing < 16)
          {
            var reStart = element.Start.split(":");
            var reEnd = element.End.split(":");
            this.AfterNoonStartTime=new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), reStart[0],reStart[1]);
            this.AfterNoonEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), reEnd[0],reEnd[1]);
            this.AfternoonTimeVisible = true;
            this.shitftValues.push(2);
          }
     

          
          if(timing>=16 && timing < 20)
          {
            var reStart = element.Start.split(":");
            var reEnd = element.End.split(":");
            this.EveningStartTime=new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), reStart[0],reStart[1]);
            this.EveningEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), reStart[0],reStart[1]);
            this.EveningTimeVisible = true;
            this.shitftValues.push(3);
          }

          if(timing>=20 && timing < 24)
          {
            var reStart = element.Start.split(":");
            var reEnd = element.End.split(":");
            this.NightStartTime=new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), reStart[0],reStart[1]);
            this.NightEndTime = new Date(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(), reStart[0],reStart[1]);
            this.NightTimeVisible = true;
            this.shitftValues.push(4);
          }

        });
        debugger
        this.uniquearray = []
        for (let i = 0; i < this.shitftValues.length; i++) {
          if (this.uniquearray.indexOf(this.shitftValues[i]) == -1) {
            this.uniquearray.push(this.shitftValues[i])
          }
        }
        // this.TutorId=Data[0].TutorID;
        this.titleValue=Data[0].Title;
        this.Image=Data[0].ImageUrl;
        this.Firstname = Data[0].FirstName;
        this.Lastname = Data[0].LastName;
        this.emailID = Data[0].EmailID;
        this.phoneNumber = Data[0].PhoneNumber;
        this.AltPhoneNumber = Data[0].AltPhoneNumber;

        
        this.WorkDesc = Data[0].WorkDescription;
        this.weekendSelected = (Data[0].WeekendAvailable).toString();
        this.experienceSelected = (Data[0].WorkExperience).toString();
        this.blogValue = Data[0].Blog;
        this.linkedValue = Data[0].LinkedIn;
        this.HangoutValue = Data[0].Hangout;
        this.SkypeValue = Data[0].SkypeID;

        this.youtubeValue = Data[0].YouTube;
        this.AddressValue = Data[0].Address;
        this.timeValue=Data[0].TimeZone;
        this.countryValue = Data[0].Country;
        this.stateValue =Data[0].State;
        this.cityValue = Data[0].City;
        this.CreatedBy=Data[0].CreatedBy;
        this.Datecreated=Data[0].DateCreated;
        this.active=Data[0].Active;
        this.aboutMeValue = Data[0].AboutMe;
        this.Password = Data[0].Password;

        this.courseselected = courseNames;
        this.educationSelected = Data[0].EduID;
        this.preferedlanguagesvalue =LangNames;

        this.FileLoc=Data[0].ProfileLocation;
        this.FileEx=Data[0].ProFileExtention;
        this.FileUrl=Data[0].ProfileURl;
      }
      else {
        //alert(Data);
      }
    });
  }
    // Dynamic Shift Timings populating 
    onShiftChange(value): void {
      debugger
      this.MorningTimeVisible = false;
      this.AfternoonTimeVisible = false;
      this.EveningTimeVisible = false;
      this.NightTimeVisible = false;
      this.TutorFormGroup.value.shifts.forEach(item => {
        if (item == 'All') {
          this.MorningTimeVisible = false;
          this.AfternoonTimeVisible = false;
          this.EveningTimeVisible = false;
          this.NightTimeVisible = false;
        }
        if (item == 1) {
          this.MorningTimeVisible = true;
        }
        if (item == 2) {
          this.AfternoonTimeVisible = true;
        }
        if (item == 3) {
          this.EveningTimeVisible = true;
        }
        if (item == 4) {
          this.NightTimeVisible = true;
        }
  
  
      });
    }
    ChangeTimeZone(details): void {
      this.ChangeZone = details
    }
  crop() {
    const imgCropped: CroppedImage = this.img.crop();
    this.img.img;		
    var imageName = this.img.fileName;		
    var base64Index = this.img.result.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;		
    this.ByteImage = this.img.result.substring(base64Index);		
    this.ProFileExtention = '.' + imageName.split('.').pop();
  }
  oncropped(e) {
    console.log('cropped', e);
  }
  
  onloaded() {
    console.log('img loaded');
  }
  onerror() {
    console.warn('img not loaded');
  }

  //DropDown Binding Data
  BindData() {

    // Binding Courses
    this._dataService.GetAll('api/Course/GetCourse')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.demolist.data = Data;
        }
        else {
          //alert(Data);
        }
      });

    //Binding Languages
    this._dataService.GetAll('api/Tutor/GetLanguageDetails')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.Languagelist = Data;
        }
        else {
          // alert(Data);
        }
      });

    // Binding Courses
    this._dataService.GetAll('api/Tutor/GetEducationDetails')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.Educationlist.data = Data;
        }
        else {
          alert(Data);
        }
      });

    // Binding Countries
    // this._dataService.GetAll('api/Registration/GetCountryDetails')
    //   .subscribe((Data: any) => {
    //     if (Data.length > 0) {
    //       this.Countrieslist.data = Data;
    //     }
    //     else {
    //       alert(Data);
    //     }
    //   });
  }

  onCountryChange(great) {
    debugger
    this.phoneCode = '+' + great.dialCode
  }
  telInputObject(obj) {
    debugger
    console.log(obj);
    obj.intlTelInput('setCountry', 'in');
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
    obj.intlTelInput('setCountry', 'in');
  }
  TutorEdit() {
    debugger
    this.TutorForm = this.TutorFormGroup.value;
        
    this.MorningStart = (new Date(this.TutorForm.Mopentime).getHours() + ":" + new Date(this.TutorForm.Mopentime).getMinutes()).toString();
    this.MorningEnd = (new Date(this.TutorForm.Mclosetime).getHours() + ":" + new Date(this.TutorForm.Mclosetime).getMinutes()).toString();

    this.AfternoonStart = (new Date(this.TutorForm.Aopentime).getHours() + ":" + new Date(this.TutorForm.Aopentime).getMinutes()).toString();
    this.AfternoonEnd = (new Date(this.TutorForm.Aclosetime).getHours() + ":" + new Date(this.TutorForm.Aclosetime).getMinutes()).toString();

    this.EveningStart = (new Date(this.TutorForm.Eopentime).getHours() + ":" + new Date(this.TutorForm.Eopentime).getMinutes()).toString();
    this.EveningEnd = (new Date(this.TutorForm.Eclosetime).getHours() + ":" + new Date(this.TutorForm.Eclosetime).getMinutes()).toString();

    this.NightStart = (new Date(this.TutorForm.Nopentime).getHours() + ":" + new Date(this.TutorForm.Nopentime).getMinutes()).toString();
    this.NightEnd = (new Date(this.TutorForm.Nclosetime).getHours() + ":" + new Date(this.TutorForm.Nclosetime).getMinutes()).toString();


    this.ShiftArray = [];

    for (let i = 0; i < this.TutorForm.shifts.length; i++) {
      if (this.TutorForm.shifts[i] == "1")
        this.ShiftArray.push({ "ShiftId": this.TutorForm.shifts[i], "StartTime": this.MorningStart, "EndTime": this.MorningEnd });

      if (this.TutorForm.shifts[i] == "2")
        this.ShiftArray.push({ "ShiftId": this.TutorForm.shifts[i], "StartTime": this.AfternoonStart, "EndTime": this.AfternoonEnd });

      if (this.TutorForm.shifts[i] == "3")
        this.ShiftArray.push({ "ShiftId": this.TutorForm.shifts[i], "StartTime": this.EveningStart, "EndTime": this.EveningEnd });

      if (this.TutorForm.shifts[i] == "4")
        this.ShiftArray.push({ "ShiftId": this.TutorForm.shifts[i], "StartTime": this.NightStart, "EndTime": this.NightEnd });
    }


    this.FileLocation=(this.TutorForm.filename =="")?  this.FileLoc : (this.img.src != undefined) ? this.img.fileName : null;
    this.ProFileExtention=(this.TutorForm.filename =="")?  this.FileEx :  this.ProFileExtention;

    if(this.TutorForm.filename !="")
    {
      this.Base=this.ByteImage != undefined ? this.ByteImage == null ? this.ByteImage : this.ByteImage : null;
    }
    else
    {
      this.Base=null;
    }

    this.FileLocation=this.FileLocation.split('\\');
    let value="";
    for(let i=0;i<this.FileLocation.length;i++)
    {
      if(i==3)
      {
        value=value+this.FileLocation[i];
      }
      else
      {
        value=value+this.FileLocation[i]+"\\\\";
      }

        console.log(this.FileLocation[i])
    }
    debugger
    this.TutorForm.filename=this.TutorForm.filename==""? this.FileUrl : null;
    var reqobj={
        "CourseIds": this.TutorForm.course.toString(),
        "LanguageIds":  this.TutorForm.PrefferLanguage.toString(),
        "ShiftTimings": this.ShiftArray,
        "ByteImage":this.Base,
        "TutorID":this.TutorId,
        "Title":this.TutorForm.title,
        "FirstName": this.TutorForm.firstName,
        "LastName":this.TutorForm.lastName,
        "EmailID":  this.TutorForm.emailid,
        "Password":this.TutorForm.password,
        "PhoneNumber": this.TutorForm.contactNumber,
        "AltPhoneNumber": this.TutorForm.AlternativeContactNumber,
        "EduID":  this.TutorForm.education,
        "WorkDescription":  this.TutorForm.workExp,
        "WorkExperience":  this.TutorForm.experience,
        "Blog": this.TutorForm.blog,
        "Hangout": this.TutorForm.hangout,
        "LinkedIn":this.TutorForm.linked,
        "SkypeID":  this.TutorForm.skype,
        "YouTube":this.TutorForm.youtube,
        "WeekendAvailable": this.TutorForm.weekendAvailable,
        "Address":this.TutorForm.address,
        "Country": this.TutorForm.country,
        "TimeZone":this.TutorForm.time,
        "State":  this.TutorForm.state,
        "City": this.TutorForm.city,
        "AboutMe": this.TutorForm.aboutMe,
        "ProFileExtention":  this.ProFileExtention,
        "ProfileLocation": value,
        "ProfileURl":  this.TutorForm.filename,
        "LastLogin": new Date(),
        "DateCreated":  this.TutorForm.DateCreated,
        "DateModifed":new Date(),
        "ModifedBy": 1,
        "CreatedBy": 1,
        "Active": true,
        "RoleID": 2
    }
    let TutorpassValue=this.TutorForm.TutorID;
    this._dataService.Post('api/Tutor/AddUpdateTutor', reqobj).subscribe(
      res => {
        debugger
        if (res.length > 0) {
          // alert("Edited Tutor Profile sucessfully");
          Swal({
            title: 'Edited Tutor Profile sucessfully',
            // text: "Department added succcefully",
            type: 'success',
            position: 'top'
          })
          //this.GetTutor(TutorpassValue);
          this.router.navigate(['/getTutorDetails']);


        } else {
          // alert(res.error.Message);
          Swal({
      
            title: res.error,
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
