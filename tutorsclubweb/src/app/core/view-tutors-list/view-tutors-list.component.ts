import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { LoginComponent } from '../../login/login.component';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-view-tutors-list',
  templateUrl: './view-tutors-list.component.html',
  styleUrls: ['./view-tutors-list.component.css']
})
export class ViewTutorsListComponent implements OnInit {

  TrainingModeList: any;
  TrainingFrequencyList: any;
  SupportedSkillsList: any;
  Genderlist: any;
  FilterCourseID: any;
  courseId: any;
  dataSource: any;
  FilteredList: any;
  CourseID: any;
  selectedCourse = new FormControl('0');
  FilterFrm: FormGroup;
  FilterSideFrm: FormGroup;
  CatagoryList = ["Web Development", "Software Testing", "Database"]
  courselist: any[];
  filterdArray: any[] = [];
  TrainingTypeCheckedList: any[] = [];
  GenderCheckedList: any[] = [];
  triningFrequecyCheckedList: any[] = [];
  skillsSetCheckedList: any[] = [];
  TrainingTypeCheckedData: any = [];
  GenderCheckedData: any[] = [];
  triningFrequecyCheckedData: any[] = [];
  skillsSetCheckedData: any[] = [];

  defaultGender = "No preference";
  defaultLevel = "Any";
  selected = "default";
  defaultImage = "http://192.168.1.151/TutorsClubAPILatest/FileRepository\\2018\\07\\31\\Tutors\\20180731043614192.jpg";
  foods: any[] = [
    { value: '2', viewValue: 'No preference' },
    { value: '0', viewValue: 'Male' },
    { value: '1', viewValue: 'Female' }
  ];
  Status: any[] = [
    { value: '0', viewValue: 'Any' },
    { value: '1', viewValue: 'Elementary' },
    { value: '2', viewValue: 'Middle School' },
    { value: '3', viewValue: 'High School' },
    { value: '4', viewValue: 'College' },
    { value: '5', viewValue: 'Adult' },

  ];
  studentLevel = new FormControl('0');
  gender = new FormControl('0');
  support = new FormControl('0');
  currentUser: any;
  userDetails: any;
  parameterValue: any;
  value: any;
  isLoading: boolean = true;
  isDataLoading: boolean = false;
  step = 0;
  req: { "GenderId": string; "DaysAvailable": string; "TrainingType": string; "Skills": string; };

  setStep(index: number) {
    this.step = index;
  }
  constructor(private _dataService: DataService, private cd: ChangeDetectorRef) {
    debugger
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));

    this.userDetails = this.currentUser == null || undefined ? null : this.currentUser.TutorID;
    this.FilterFrm = new FormGroup({
      courseid: new FormControl(''),
    });

    this.FilterSideFrm = new FormGroup({
      triningType: new FormControl(''),
      gender: new FormControl(''),
      triningFrequecy: new FormControl(''),
      skillsSet: new FormControl(''),
    });

  }
  ngOnInit() {
    this.GetGender();
    this.GetSupportedSkills();
    this.BindTutorList();
    this.GetTrainingFrequency();
    this.GetTrainingMode();
  }



  searchbtn(value): void {
    this.filterdArray = [];
    filteredTutors = [];
    debugger
    this.value = value
    if (value == null) {
      this.FilteredList = this.dataSource;
    }
    else {
      for (var i = 0; i < this.dataSource.length; i++) {
        if (this.dataSource[i].CourseName != null) {
          this.filterdArray.push(this.dataSource[i]);
        }
      }
      var filteredTutors = this.filterdArray.filter(
        tutor => tutor.CourseName.includes(value)
      );

      this.FilteredList = filteredTutors;
    }
  }

  GetGender() {
    this._dataService.GetAll('api/Tutor/GetGenderDetails')
      .subscribe((Gender: any) => {
        if (Gender.length > 0) {
          this.Genderlist = Gender;
          this.cd.markForCheck();
        }
        else {
          // alert(Data);
        }
      });
  }

  GetSupportedSkills() {
    this._dataService.GetAll('api/Tutor/GetSupportedSkills')
      .subscribe((SupportedSkills: any) => {
        if (SupportedSkills.length > 0) {
          this.SupportedSkillsList = SupportedSkills;
          this.cd.markForCheck();
        }
        else {
          // alert(Data);
        }
      });
  }

  GetTrainingFrequency() {
    this._dataService.GetAll('api/Tutor/GetTrainingFrequency')
      .subscribe((TrainingFrequency: any) => {
        if (TrainingFrequency.length > 0) {
          this.TrainingFrequencyList = TrainingFrequency;
          this.cd.markForCheck();
        }
        else {
          // alert(Data);
        }
      });
  }
  GetTrainingMode() {
    this._dataService.GetAll('api/Tutor/GetTrainingMode')
      .subscribe((TrainingMode: any) => {
        if (TrainingMode.length > 0) {
          this.TrainingModeList = TrainingMode;
          this.cd.markForCheck();
        }
        else {
          // alert(Data);
        }
      });
  }
  onSubmit() {
    debugger
    this._dataService.Post('api/Tutor/GetTutorProfileDetailsbySearch', this.req)
      .subscribe((responce: any) => {
        this.isDataLoading = false;
        if (responce.length > 0) {
          this.FilteredList = responce;
          this.cd.markForCheck();
        }
        else {
          this.FilteredList = responce;
          this.cd.markForCheck();
        }
      });
  }
  onFilterchange(checked, form, value, index1) {
    this.isDataLoading = true;
    if (form.value.triningType == true) {
      if (value.TrainingModeId != undefined) {
        this.TrainingTypeCheckedData.push(value);
        this.TrainingTypeCheckedList.push(value.TrainingModeId);
      }
    }
    if (form.value.triningType == false) {
      this.TrainingTypeCheckedData.forEach((item, index) => {
        if (item === value) this.TrainingTypeCheckedData.splice(index, 1);
        if (item === value) this.TrainingTypeCheckedList.splice(index, 1);
      });
    }
    if (form.value.gender == true) {
      if (value.GenderId != undefined) {
        this.GenderCheckedData.push(value);
        this.GenderCheckedList.push(value.GenderId);
      }
    }
    if (form.value.gender == false) {
      this.GenderCheckedData.forEach((item, index) => {
        if (item === value) this.GenderCheckedData.splice(index, 1);
        if (item === value) this.GenderCheckedList.splice(index, 1);
      });
    }
    if (form.value.triningFrequecy == true) {
      if (value.TrainingFrequencyId != undefined) {
        this.triningFrequecyCheckedData.push(value);
        this.triningFrequecyCheckedList.push(value.TrainingFrequencyId);
      }
    }
    if (form.value.triningFrequecy == false) {
      this.triningFrequecyCheckedData.forEach((item, index) => {
        if (item === value) this.triningFrequecyCheckedData.splice(index, 1);
        if (item === value) this.triningFrequecyCheckedList.splice(index, 1);
      });
    }
    if (form.value.skillsSet == true) {
      if (value.SkillsId != undefined) {
        this.skillsSetCheckedData.push(value);
        this.skillsSetCheckedList.push(value.SkillsId);
      }
    }
    if (form.value.skillsSet == false) {
      this.skillsSetCheckedData.forEach((item, index) => {
        if (item === value) this.skillsSetCheckedData.splice(index, 1);
        if (item === value) this.skillsSetCheckedList.splice(index, 1);
      });
    }
    this.req = {
      "GenderId": this.GenderCheckedList.toString() == "" ? null : this.GenderCheckedList.toString(),
      "DaysAvailable": this.triningFrequecyCheckedList.toString() == "" ? null : this.triningFrequecyCheckedList.toString(),
      "TrainingType": this.TrainingTypeCheckedList.toString() == "" ? null : this.TrainingTypeCheckedList.toString(),
      "Skills": this.skillsSetCheckedList.toString() == "" ? null : this.skillsSetCheckedList.toString()
    };

  }

  BindTutorList(): void {
    debugger
    this.dataSource = [];
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
    var req = {
      "GenderId": null,
      "DaysAvailable": null,
      "TrainingType": null,
      "Skills": null
    };
    this._dataService.Post('api/Tutor/GetTutorProfileDetailsbySearch', req)
      .subscribe((Data: any) => {
        this.isLoading = false;
        if (Data.length > 0) {
          debugger
          this.dataSource = Data;
          this.cd.markForCheck();
          this.FilteredList = Data;
          console.log(this.dataSource);
        }
        else {
        }
      });

    // Binding Catagories
    this._dataService.GetAll('api/Course/GetCateogry')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.CatagoryList = Data;
        }
        else {
          //alert(Data);
        }
      });

    // Binding Courses
    this._dataService.GetAll('api/Course/GetCourse')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.courselist = Data;
        }
        else {
          //alert(Data);
        }
      });
  }
}

@Component({
  selector: 'app-view-tutor-profile',
  templateUrl: './tutorProfile.html',
  styleUrls: ['./view-tutors-list.component.css'],

})
export class ViewTutorProfileComponent implements OnInit {

  ProfileClasses = '';
  SessionClasses = '';
  reviewRatingClasses = '';
  questionAnswerClasses = '';
  sampleTipsClasses = '';
  isProfileClassesVisible: boolean = true;
  isSessionClassesVisible: boolean = false;
  isreviewRatingClassesVisible: boolean = false;
  isQueAnsClassesVisible: boolean = false;
  isSamTipsClassesVisible: boolean = false;
  langName: string;
  CourseName: string;
  // DemoList: any[];
  parameterValue: any;
  currentUser: any;
  CityName: any;
  Image: any;
  EducationName: any;
  Address: any;
  CountryName: any;
  StateName: any;
  Courselist: any[] = [];
  EmailID: any;
  LastName: any;
  FirstName: any;
  PhoneNumber: any;
  AltPhoneNumber: any;
  AboutMe: any;
  Title: any;
  Tutordata: any;
  WeekendAvailable: any;
  languagelist: any[] = [];
  Blog: any;
  LinkedIn: any;
  YouTube: any;
  SkypeID: any;
  Coursename: any;
  WorkExperience: any;
  fourth: boolean = false;
  third: boolean = false;
  second: boolean = false;
  first: boolean = true;
  searchText: any;
  commentForm: FormGroup;
  CommentForm: boolean;
  commentspinner: boolean = false;
  cmtcount: any;
  items: any;
  comment = new FormControl('', [Validators.required]);
  parentitems: any;
  childCommentForm: FormGroup;
  isReplyCommentForm: boolean;
  isCommentForm: boolean;
  itemDetails: any;
  Comment: any;
  Description = new FormControl('');
  childcomments: any;
  userId: any;
  values: number[];
  currentRate = 3.5;
  DemoList = new MatTableDataSource();
  RegularList = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  display: any;
  communication: any;
  SubjectKnowledge: any;
  Proficiency: any;
  TimeMaintenance: any;
  sampleImage: string = "assets/Images/icons/user_32.png";
  totalRating: any;
  // sample: any;
  fivestarRating: any;
  onestarRating: any;
  twostarRating: any;
  threestarRating: any;
  fourstarRating: any;
  City: any;
  Country: any;
  ZipCode: any;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private router: Router, private _activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef, private _dataService: DataService) {
    debugger
    this.searchText = this._activatedRoute.snapshot.params['tutorId'];
    debugger
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));

    // if(this.currentUser.TutorID!=undefined|| null){

    //   this.userId=this.currentUser.TutorID;
    // }
    // if (this.currentUser.LearnerID!=undefined|| null) {
    //   this.userId=this.currentUser.LearnerID;
    // }
    // if (this.currentUser.UserId!=undefined|| null) {
    //   this.userId=this.currentUser.UserId;
    // }

    this.CommentForm = true;
    this.commentspinner = false;
  }
  displayedColumns = ['ImageUrl', 'CourseName', 'Tutor Name', 'StartDate', 'Time', 'Timezone', 'SessionTypeName', 'TrainingName', 'TrainingMode',];
  // displayedColumns = ['ImageUrl', 'CourseName', 'StartDate', 'Time', 'TrainingMode', 'Trainingtype', 'Duration', 'Timezone', 'TutorName', 'DataCreated', 'TCDemoId', 'DateModified'];

  ngOnInit() {
    this.DemoList.paginator = this.paginator;
    this.DemoList.sort = this.sort;
    this.childCommentForm = this.fb.group({
      Description: this.Description,
    })

    this.commentForm = this.fb.group({
      comment: this.comment,
    });

    debugger
    this.getData();
  }

  getData() {
    debugger;
    this._dataService.GetAll('api/Tutor/GetTutorDetailsByTutorId/' + this.searchText)
      .subscribe((Data: any) => {
        this.cd.markForCheck();
        if (Data.length > 0) {
          this.Tutordata = Data[0];
          this.communication = this.Tutordata.Commuunication == undefined || null ? 0 : this.Tutordata.Commuunication
          this.SubjectKnowledge = this.Tutordata.SubjectKnowledge == undefined || null ? 0 : this.Tutordata.SubjectKnowledge
          this.Proficiency = this.Tutordata.Proficiency == undefined || null ? 0 : this.Tutordata.Proficiency
          this.TimeMaintenance = this.Tutordata.TimeMaintenance == undefined || null ? 0 : this.Tutordata.TimeMaintenance
          // this.communication = 4
          // this.SubjectKnowledge = 4
          // this.Proficiency = 4
          // this.TimeMaintenance = 4
          // this.cd.markForCheck();
          this.totalRating = this.Tutordata.OverallReview == undefined || null ? 0 : this.Tutordata.OverallReview
          this.FirstName = Data[0].FirstName;
          this.LastName = Data[0].LastName;
          this.EmailID = Data[0].EmailId;
          this.PhoneNumber = Data[0].PhoneNumber;
          this.AltPhoneNumber = Data[0].AltPhoneNumber;
          this.AboutMe = Data[0].AboutMe;
          this.Title = Data[0].Title;
          this.EducationName = Data[0].EducationName;
          this.WeekendAvailable = Data[0].WeekendAvailable;
          this.Blog = Data[0].Blog;
          this.LinkedIn = Data[0].LinkedIn;
          this.YouTube = Data[0].YouTube;
          this.SkypeID = Data[0].SkypeID;
          this.WorkExperience = Data[0].WorkExperience;
          this.CountryName = Data[0].Country;
          this.Address = Data[0].Address;
          this.StateName = Data[0].State;
          this.City = Data[0].City;
          this.Country = Data[0].Country;
          this.ZipCode = Data[0].ZipCode;
          this.Coursename = Data[0].CourseName;
          this.CityName = Data[0].City;
          this.Image = Data[0].ImageUrl == undefined || null ? this.sampleImage : Data[0].ImageUrl;
          this.fivestarRating = Data[0].AverageFiveStarRating
          this.fourstarRating = Data[0].AverageFourStarRating
          this.threestarRating = Data[0].AverageThreeStarRating
          this.twostarRating = Data[0].AverageTwoStarRating
          this.onestarRating = Data[0].AverageOneStarRating
          // this.fivestarRating = 1
          // this.fourstarRating = 1
          // this.threestarRating = 1
          // this.twostarRating = 1
          // this.onestarRating = 1
          this.LoadDemoCoursesDetails(Data[0].TutorID);
          this.LoadRegCoursesDetails(Data[0].TutorID);
          // this.sample.push(Data[0].FirstName)
          for (let i = 0; i < Data.length; i++) {
            this.Courselist.push({ 'CourseName': Data[i].CourseName });
            // this.Courselist = Data[i].CourseName + "," + this.Courselist;
          }
          this.Courselist = this.multiDimensionalUnique(this.Courselist)
          this.display = this.Courselist["0"].CourseName
          this.CourseName = this.Courselist.toString();

          for (let i = 0; i < Data.length; i++) {
            this.languagelist.push(Data[i].LanguageName);
            // this.Courselist = Data[i].CourseName + "," + this.Courselist;
          }
          this.languagelist = this.languagelist.filter(this.onlyUnique);
          this.langName = this.languagelist.toString();
          this.getComments();
        }
        else {
          //alert(Data);
        }
      });
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

  openCity(value): void {
    debugger
    if (value == 1) {
      this.first = true;
      this.second = false;
      this.third = false;
      this.fourth = false;


    }
    else if (value == 2) {
      this.first = false;
      this.second = true;
      this.third = false;
      this.fourth = false;
    }
    else if (value == 3) {
      this.first = false;
      this.second = false;
      this.third = true;
      this.fourth = false;
    }
    else if (value == 4) {
      this.first = false;
      this.second = false;
      this.third = false;
      this.fourth = true;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.DemoList.filter = filterValue;
    if (this.DemoList.paginator) {
      this.DemoList.paginator.firstPage();
    }
  }
  applyFilterReg(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.RegularList.filter = filterValue;
    if (this.RegularList.paginator) {
      this.RegularList.paginator.firstPage();
    }
  }
  LoadDemoCoursesDetails(value): void {
    this.DemoList.data = [];

    this._dataService.GetAll('api/CourseDemo/GetDemoCoursebyTutors/' + value)
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.DemoList.data = Data;
        }
        else {
        }
      });
  }
  LoadRegCoursesDetails(value): void {
    this.DemoList.data = [];

    this._dataService.GetAll('api/Learner/GetRegularBatchbyTutorId/' + value)
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          this.RegularList.data = Data;
        }
        else {
        }
      });
  }


  openLoginDialog() {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  getComments() {
    debugger
    var Id = this.Tutordata.TutorID;
    this.commentspinner = false;
    // var UserId = this.currentUser == null || undefined ? null : this.currentUser.id;
    this._dataService.GetAll('api/Tutor/GetTutorComments/' + Id).subscribe((res) => {
      if (res.IsSuccess) {
        // Swal({
        //   title: 'Got All Comments',
        //   // text: "Department added succcefully",
        //   type: 'success',
        //   position: 'top'
        // })
        // alert("get comments");
        this.commentspinner = true;

        this.items = res.Result.PostDetails;
        // this.cmtcount = res.Result.PostDetails.length;

        this.parentitems = this.items.filter(
          parentitem =>
            parentitem.ParentCommentId == null);
        this.parentitems = this.parentitems.reverse();
        this.cmtcount = this.parentitems.length;

        this.childcomments = this.items.filter(
          childcomment =>
            childcomment.ParentCommentId != null);
      } else {
        // toastr.error(res.endUserMessage, 'ERROR');
        this.commentspinner = true;
        // alert("comments are not getting ");
        // Swal({
        //   title: 'comments are not getting',
        //   // text: "Department added succcefully",
        //   type: 'success',
        //   position: 'top'
        // })
      }
    })

  }


  reply(item) {
    debugger
    if (this.currentUser != null) {
      item.isReplyCommentForm = true;
      item.isCommentForm = false;
      this.childCommentForm.reset();
    } else {
      this.openLoginDialog();
    }
  }


  onItemEdit(item) {
    debugger
    if (this.currentUser != null) {
      this.itemDetails = item;
      item.isCommentForm = true;
      item.isReplyCommentForm = false;
    }
    else {
      this.openLoginDialog();
    }
  }



  onItemDelete(item) {
    debugger
    let itm = {
      "Id": item.TCommentId,
      "TutorId": item.TutorId,
      "UserId": item.UserId,

    }
    if (this.currentUser != null) {
      this.commentspinner = false;
      this._dataService.Post('api/Tutor/DeleteTutorComment', itm).subscribe((res) => {
        if (res.IsSuccess == true) {
          alert("deleted sucessfully");
          //toastr.success(res.endUserMessage, 'Success');
          this.getComments();
        } else {
          // toastr.error(res.endUserMessage, 'Error');
          alert("not deleted");
        }
      })
    } else {
      this.openLoginDialog();
    }
  }



  childreply(childitem) {
    debugger;
    if (this.currentUser != null) {
      childitem.isReplyCommentForm = true;
      childitem.isCommentForm = false;
      this.childCommentForm.reset();
    } else {
      this.openLoginDialog();
    }
  }





  onSubmitComment() {
    debugger;
    this.commentspinner = false;
    if (this.currentUser != null) {
      let childComment = {
        "TCommentId": 0,
        "TutorId": this.Tutordata.TutorID,
        "Description": this.Comment,
        "ParentCommentId": null,
        "UserId": (this.currentUser.LearnerID || this.currentUser.TutorID || this.currentUser.AdminId)
      }

      this._dataService.Post('api/Tutor/AddUpdateTutorComments', childComment).subscribe((res) => {
        if (res.IsSuccess) {
          // toastr.success(res.endUserMessage, 'Success');
          // alert("commented sucessfully");
          Swal({
            title: res.EndUserMessage,
            // text: "Department added succcefully",
            type: 'success',
            position: 'top'
          })
          this.Comment = null;
          this.commentspinner = true;
          this.getComments();
        } else {
          this.commentspinner = false;
          // toastr.error(res.endUserMessage, 'Error');
          // alert("commented is not done");
          Swal({
            title: 'commented is not done',
            // text: "Department added succcefully",
            type: 'success',
            position: 'top'
          })
        }
      })
      this.commentspinner = false;
      this.commentForm.reset();
      this.isReplyCommentForm = false;
    } else {
      this.openLoginDialog();
      this.commentspinner = false;
    }

  }


  onChildSubmitComment(item) {
    debugger;
    this.commentspinner = false;
    if (this.currentUser != null) {
      let childComment = {
        "TCommentId": 0,
        "TutorId": this.Tutordata.TutorID,
        "Description": this.childCommentForm.value.Description,
        "ParentCommentId": item.TCommentId,
        "UserId": (this.currentUser.LearnerID || this.currentUser.TutorID || this.currentUser.AdminId)
      }

      this._dataService.Post('api/Tutor/AddUpdateTutorComments', childComment).subscribe((res) => {
        if (res.IsSuccess) {
          //toastr.success(res.endUserMessage, 'Success');
          this.commentspinner = true;
          this.getComments();
        } else {
          this.commentspinner = false;
          // toastr.error(res.endUserMessage, 'Error');
        }
      })

      this.commentspinner = false;
      this.childCommentForm.reset();
      this.isReplyCommentForm = false;
    } else {
      this.openLoginDialog();
      this.commentspinner = false;
    }
  }

  onUpdateComment(item) {
    debugger
    this.commentspinner = false;
    let childComment = {
      "TCommentId": item.TCommentId,
      "TutorId": item.TutorId,
      "Description": item.comment,
      "ParentCommentId": null,
      "UserId": item.UserId
    }

    this._dataService.Post('api/Tutor/AddUpdateTutorComments', childComment).subscribe((res) => {
      if (res.IsSuccess) {
        // toastr.success(res.endUserMessage, 'Success');
        this.commentspinner = true;
        this.getComments();
      } else {
        this.commentspinner = false;
        // toastr.error(res.endUserMessage, 'Error');
      }
    })
    this.commentspinner = false;
    this.commentForm.reset();
    this.childCommentForm.reset();
    this.isCommentForm = false;
  }

  onChildUpdateComment(childitem) {
    debugger
    this.commentspinner = false;
    let childComment = {
      "TCommentId": childitem.TCommentId,
      "TutorId": childitem.TutorId,
      "Description": childitem.comment,
      "ParentCommentId": childitem.ParentCommentId,
      "UserId": childitem.UserId
    }

    this._dataService.Post('api/Tutor/AddUpdateTutorComments', childComment).subscribe((res) => {
      if (res.IsSuccess) {
        //toastr.success(res.endUserMessage, 'Success');
        this.commentspinner = true;
        this.getComments();
      } else {
        this.commentspinner = false;
        // toastr.error(res.endUserMessage, 'Error');
      }
    })
    this.commentspinner = false;
    // this.commentForm.reset();
    this.isCommentForm = false;
  }


  reset(item) {
    item.isReplyCommentForm = false;
  }

  resetchild(childitem) {
    childitem.isReplyCommentForm = false;
  }

  resetupdatechild(childitem) {
    childitem.isCommentForm = false;
  }

  reseteditform(item) {
    item.isCommentForm = false;
  }
  clear() {
    this.commentForm.reset();
  }

}



