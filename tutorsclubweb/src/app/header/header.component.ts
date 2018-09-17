import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LyResizingCroppingImages, LyResizingCroppingImagesConfig, CroppedImage } from '@alyle/ui/resizing-cropping-images';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { DataService } from '../shared/services/data.service';
import { COUNTRY_LIST } from '../shared/services/CountriesList';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../shared/services/auth.service';
import { ConfigService } from '../shared/services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})

export class HeaderComponent implements OnInit {
  ribbib: boolean = true;
  currentCourses: any;
  permission: any;
  Courses: any;
  customeCourses: any;
  userActivityRights: any;
  currentUser: any;
  data: any;
  obj: {};
  customeArray: any[];
  CustomDrop: {};
  OriginalCourseList: any;
  courseslist: any;
  public SearchValue: any;
  SearchFrm: FormGroup;
  Category: any;
  public model: any;
  selected: string;
  Image: any;
  currentuser: any;
  dataRefresher: any;
  roles: { 'Admin': number; 'Tutor': number; 'Learner': number; };
  headerMessage: any;
  constructor(public dialog: MatDialog, private _dataService: DataService, private config_service: ConfigService, private http: HttpClient, private authservice: AuthService, private router: Router, private _formBuilder: FormBuilder) {
    this.router.onSameUrlNavigation = "reload";
    this.getUserData();
    this.roles = config_service.getRoles();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        // this.ngOnInit();
      }
    });

    this.SearchFrm = this._formBuilder.group({
      Coursename: new FormControl(''),
    });

    // this.userDetails();
  }
  getUserData() {
    // this.currentuser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.userActivityRights = JSON.parse(localStorage.getItem('userActivityRights'));
  }
  refreshHeaderData() {
    this.dataRefresher =
      setInterval(() => {
        this.getCourseNameList();
        //Passing the false flag would prevent page reset to 1 and hinder user interaction
      }, 10000);
  }
  getMessage() {
    debugger
    this._dataService.GetAll('api/Tutor/GetScrollingData')
        .subscribe((Data: any) => {
            if (Data.length>=1) {
              this.headerMessage=Data[0].ScrollingText;
            }
            else {
            }
        });
}
  ngOnInit() {
    this.refreshHeaderData();
    this.getCourseNameList();
    this.getMessage();
  }

  //TypeAhead Search
  courseSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.Courses.filter(v => v.CourseName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  searchFormatter = (x: { CourseName: string }) => x.CourseName;

  //Search selected Course Click
  searchCourse(SearchValue): void {
    if (SearchValue != undefined) {
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(['/CourseExplanation/', SearchValue.CourseId]);
    }
  }

  editLearnerProfile() {
    debugger
    this.router.navigate(['editLearnerProfile/', this.currentUser.LearnerID]);
  }
  //Get Course List From Servic
  getCourseNameList() {
    // this.currentCourses = JSON.parse(localStorage.getItem('currentCourses')); 
    if (this.currentCourses == null || this.currentCourses == undefined) {
      this._dataService.GetAll('api/Course/GetCateogryList')
        .subscribe((Data: any) => {
          if (Data.length > 0) {
            localStorage.setItem('currentCourses', JSON.stringify(Data));
            this.filterCourses(Data)
          }
        });
    } else {
      this.Courses = [];
      this.filterCourses(this.currentCourses)
    }
  }
  filterCourses(data) {
    this.Courses = [];
    this.Category = data;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < this.Category[i]["Courses"].length; j++) {
        this.Courses.push(this.Category[i]["Courses"][j]);
      }
    }
  }
  getCourses(value): void {
    this.customeCourses = [];
    this.customeCourses = this.Category.filter(
      x => x.CategoryId === value)[0].Courses;
  }

  // openDialog(): void {
  //   let dialogRef = this.dialog.open(SignupComponent, {
  //     width: 'auto',
  //     height: 'auto'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {

  //   });
  // }


  alertMethod(val): void {

    alert("clicked");
  }

  close(value): void {
    if (value == 1) {
      this.ribbib = false;
    }
    else {
    }
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent, {
      width: '500px',
      height: 'auto',
    });
  }

  OnLogout() {
    this.authservice.logout();
    // localStorage.removeItem('currentUser');
    // localStorage.removeItem('ActivityRights');
    // localStorage.removeItem('UserActivityRights');
    // location.reload();
    // this.router.navigate(['/']);
  }


  editTutorProfile(): void {
    debugger
    this.router.navigate(['editTutorProfile/', this.currentUser.TutorID]);
  }

}