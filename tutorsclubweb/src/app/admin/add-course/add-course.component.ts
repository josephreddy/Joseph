import { Component, OnInit, Inject, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { LyResizingCroppingImages, LyResizingCroppingImagesConfig, CroppedImage } from '@alyle/ui/resizing-cropping-images';
import Swal from 'sweetalert2'
import { DataService } from '../../shared/services/data.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  CreatedByID: any;
  currentUser: any;
  AddCourseFrom: any;
  AddCourseRegistrationrFrm: FormGroup;

  BASE64_MARKER: string = ';base64,';
  @ViewChild(LyResizingCroppingImages) img: LyResizingCroppingImages;
  result: string;
  myConfig: LyResizingCroppingImagesConfig = {
    width: 215, // Default `250`
    height: 215 // Default `200`
  };
  ProFileExtention: any;
  ByteImage: any;
  image: boolean=true;
  btnDisable: boolean;
  courseObj: any;

  constructor(public dialogRef: MatDialogRef<AddCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private cd: ChangeDetectorRef ,private _dataService: DataService, private _headerComponent: HeaderComponent) {
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.AddCourseRegistrationrFrm = this._formBuilder.group({
      categoryID: new FormControl('', [Validators.required]),
      filename: new FormControl(''),
      course: new FormControl(''),
      aliasName: new FormControl(''),
      courseName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
  }
  CatagoryList = new MatTableDataSource();
  ngOnInit() {
    this.BindData();
  }
  crop() {

    const imgCropped: CroppedImage = this.img.crop();
    this.img.img;
    var imageName = this.img.fileName;
    var base64Index = this.img.result.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
    this.ByteImage = this.img.result.substring(base64Index);
    this.ProFileExtention = '.' + imageName.split('.').pop();
    this.image=false;
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
  BindData() {
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
  }

  // Add Course Submit Event Trigger
  AddCourseLoginForm() {
    debugger
    if (this.AddCourseRegistrationrFrm.valid == true) {
      // this.AddCourseFrom = this.AddCourseRegistrationrFrm.value;
      this.btnDisable = true;
      this.courseObj = this.AddCourseRegistrationrFrm.value;

      if (this.currentUser.RoleID == 1) {
        this.CreatedByID = this.currentUser.AdminId;
      }
      else {
        this.CreatedByID = this.currentUser.TutorId;
      }
      var reqobj = {
        "ByteImage": this.ByteImage != undefined ? this.ByteImage == null ? this.ByteImage : this.ByteImage : null,
        "FileName": "",
        "FileLocation": this.img.src != undefined ? this.img.fileName : null,
        "FileExtention": this.ProFileExtention,
        "CourseName": this.courseObj.courseName,
        "Coursealias": this.courseObj.aliasName,
        "Description": this.courseObj.description,
        "DateCreated": new Date(),
        "DateModified": new Date(),
        "CreatedBy": this.CreatedByID,
        "Active": true,
        "CategoryId": this.courseObj.categoryID,
      }

      this._dataService.Post('api/Course/AddUpdateCourse', reqobj).subscribe(
        res => {
          debugger
          if (res.length > 0) {
            this.btnDisable = false;
            debugger;
            //Get Course List From Servic
            //  getCourseNameList() {
            debugger;
            this._dataService.GetAll('api/Course/GetCateogryList')
              .subscribe((Data: any) => {
                if (Data.length > 0) {
                  debugger;
                  localStorage.setItem('currentCourses', JSON.stringify(Data));
                  this.cd.markForCheck();
                  this._headerComponent.getCourseNameList();

                }
              });
            // }
            debugger;
            //  alert("Course Add sucessfully");
            this.onNoClick();
            Swal({
              title: 'Course Added Sucessfully',
              // text: "Department added succcefully",
              type: 'success',
              position: 'top'
            })
          }
          else {
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
    else {
      // this.show = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
