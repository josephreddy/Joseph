import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDescriptionComponent implements OnInit {
  [x: string]: any;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  first: any;
  second: any;
  third: any;
  searchText: any;
  isNew: boolean;
  courseDescId: any;
  courseDesc: any;
  fieldArray: Array<any> = [];
  subMenu: Array<any> = [];
  newAttribute: any = {};
  selectedValuseList: any[] = [];
  firstField = true;
  firstFieldName = 'First Item name';
  isEditItems: boolean = true;
  deleting: number;
  constructor(private router: Router, private _formBuilder: FormBuilder, private _dataService: DataService, private _activatedRoute: ActivatedRoute) {
    debugger
    this.searchText = this._activatedRoute.snapshot.params.value;
    this.CourseDescription();
    this.GetCourse();
  }

  Config: {} =
    {
      "uiColor": "#D3D3D3",
      "toolbarCanCollapse": "true",
      "toolbarGroups": [
        { "name": 'basicstyles', "groups": ['basicstyles'] },
        { "name": 'paragraph', "groups": ['list', 'indent', 'blocks', 'align', 'bidi'] },
        { "name": 'styles' },
        { "name": 'colors' },
      ],
    }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      AboutTrainingCourse: ['', [Validators.required, Validators.maxLength(2500), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]],
      WhatYouWillLearn: ['', [Validators.required, Validators.maxLength(2500), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]],
      WhyYouShouldTake: ['', [Validators.required, Validators.maxLength(2500), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]],
      WhoShouldTake: ['', [Validators.required, Validators.maxLength(2500), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]],
    });
    this.secondFormGroup = this._formBuilder.group({
      AboutCourse: ['', [Validators.required, Validators.maxLength(2500), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]],
      History: ['', [Validators.required, Validators.maxLength(2500), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]],
      Documnetation: ['', [Validators.required, Validators.maxLength(2500), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]],
      Reference: ['', [Validators.required, Validators.maxLength(2500), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]],
    });
    this.thirdFormGroup = this._formBuilder.group({
      Certification: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]],
      Validity: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(4), Validators.pattern('[a-zA-Z_-\\s]*')]],
    });
  }

  CourseDescription() {
    debugger
    this._dataService.Get('api/Course/GetCourseDescriptionbyCourseId', this.searchText).subscribe(
      res => {
        debugger
        if (res.SubmenuReq.length != 0) {
          // alert("old one");
          this.isNew = false
          // this.courseDescId = res["0"].CourseId
          this.courseDesc = res.CourseDescriptionReq;
          this.subMenu = res.SubmenuReq;
          this.fieldArray = this.subMenu
          this.Certification = this.courseDesc.Certification;
          this.Validity = this.courseDesc.Validity;
        } else {
          // alert("new One");
          this.isNew = true
          this.courseDescId = 0
        }
      },
    );
  }

  GetCourse() {
    this._dataService.Get('api/Course/GetCourseByCourseId', this.searchText).subscribe(
      res => {
        this.course = res["0"].CourseName;
        this.courseDescId = res["0"].CourseId;

      },
    );
  }

  Submit() {
    debugger
    this.first = this.firstFormGroup.value;
    this.second = this.secondFormGroup.value;
    this.third = this.thirdFormGroup.value;

    var req = {

      // this.role=this.currentUser == null||undefined ? 2 : this.currentUser.RoleID

      "CourDescId": this.courseDesc == null || undefined ? this.courseDescId : this.courseDesc.CourDescId,
      "AboutTrainingCourse": this.first.AboutTrainingCourse,
      "WhatYouWillLearn": this.first.WhatYouWillLearn,
      "WhyYouShouldTake": this.first.WhyYouShouldTake,
      "WhoShouldTake": this.first.WhoShouldTake,
      "AboutCourse": this.second.AboutCourse,
      "History": this.second.History,
      "Reference": this.second.Reference,
      "Documnetation": this.second.Documnetation,
      "Certification": this.third.Certification,
      "Validity": this.third.Validity,
      "CourseId": this.searchText
    }
    this._dataService.Post('api/Course/AddUpdateCourseDescription', req).subscribe(
      res => {
        debugger
        if (res.isSuccess) {
          alert(res.message);
          this.router.navigate(['/CourseExplanation', this.searchText]);
        } else {
          alert(res.message);
        }
      },
    );
  }

  addFieldValue(index) {
    if (this.fieldArray.length <= 10) {
      this.fieldArray.push(this.newAttribute);
      this.newAttribute = {};
    } else {
    }
  }

  onSaveClick() {
    debugger
    for (var i = 0; i < this.fieldArray.length; i++) {
      this.req = {
        "SubMenuId": this.fieldArray[i].SubMenuId == undefined ? 0 : this.fieldArray[i].SubMenuId,
        "CourseId": this.searchText,
        "SubMenuName": this.fieldArray[i].SubMenuName,
        "CourseDescription": this.fieldArray[i].CourseDescription
      }
      this.selectedValuseList.push(this.req);

    }
    this._dataService.Post('api/Course/AddUpdateSubMenuForCourse', this.selectedValuseList).subscribe(
      res => {
        debugger
        if (res.isSuccess) {
          alert(res.message);
          this.selectedValuseList = [];
          this.Submit()
          // this.CourseDescription();
        } else {
          alert(res.message);
        }
      },
    );
  }
  deleteFieldValue(index) {
    debugger
    this.deleting = this.fieldArray[index].SubMenuId
    this.fieldArray.splice(index, 1);
    if (this.deleting != undefined) {
      this._dataService.Get('api/Course/DeleteCourseSubMenuById/', this.deleting).subscribe(
        res => {
          debugger
          if (res.isSuccess) {
            alert(res.message);
            this.selectedValuseList = [];
          } else {
            alert(res.message);
          }
        },
      );
    }
  }

  onEditCloseItems() {
    // this.isEditItems = false;
  }
}
