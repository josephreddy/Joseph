import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { LyResizingCroppingImages, LyResizingCroppingImagesConfig, CroppedImage } from '@alyle/ui/resizing-cropping-images';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { DataService } from '../../shared/services/data.service';
import { AddCourseComponent } from '../add-course/add-course.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-course-addlist',
  templateUrl: './course-addlist.component.html',
  styleUrls: ['./course-addlist.component.css']
})
export class CourseAddlistComponent implements OnInit {
  currentUser: any;
  TotalCount: any;
  //MatTable Columns List 
  displayedColumns = ['ImageUrl', 'CourseName', 'AliasName', 'Description', 'Active', 'DateCreated', 'DateModified', 'FileName', 'FileName1'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoadingResults = true;
  constructor(private _dataService: DataService, public dialog: MatDialog) {
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
  }

  openAddCourseDialog(): void {
    let dialogRef = this.dialog.open(AddCourseComponent, {
      width: 'auto',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      // if(result != undefined){
      this.LoadCoursesDetails();
      // }

    });
  }

  openEditCourseDialog(row): void {
    debugger
    let dialogRef = this.dialog.open(EditCourseComponent, {
      width: 'auto',
      height: 'auto',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      // if(result != undefined){
      this.LoadCoursesDetails();
      // }

    });
  }

  openDeleteCourseDialog(row): void {
    debugger
    let dialogRef = this.dialog.open(DeleteCourseComponent, {
      width: 'auto',
      height: 'auto',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      // if(result != undefined){
      this.LoadCoursesDetails();
      // }

    });
  }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.LoadCoursesDetails();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  LoadCoursesDetails(): void {
    this.isLoadingResults = true;
    this.dataSource.data = [];
    this._dataService.GetAll('api/Course/GetCourse')
      .subscribe((Data: any) => {
        this.isLoadingResults = false;
        if (Data.length > 0) {
          this.dataSource.data = Data;
          console.log(Data);
        }
        else {
          //alert(Data);
          // toastr.error(Data.endUserMessage);
        }
      });
  }
}


@Component({
  selector: 'edit-course',
  templateUrl: 'EditCourse.html',
  styleUrls: ['./course-addlist.component.css']
})
export class EditCourseComponent {
  Base: any;
  FileLocation: any;
  CatagoryList: any;
  EditCourseFrom: any;
  BASE64_MARKER: string = ';base64,';
  @ViewChild(LyResizingCroppingImages) img: LyResizingCroppingImages;
  result: string;
  myConfig: LyResizingCroppingImagesConfig = {
    width: 215, // Default `250`
    height: 215 // Default `200`
  };
  ProFileExtention: any;
  ByteImage: any;

  EditCourseRegistrationrFrm: FormGroup;
  btnDisable: boolean;
  constructor(public dialogRef: MatDialogRef<EditCourseComponent>, private _headerComponent: HeaderComponent,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private _dataService: DataService) {
    debugger;
    this.EditCourseRegistrationrFrm = this._formBuilder.group({
      catogoryId: new FormControl(''),
      courseId: new FormControl(''),
      filename: new FormControl(''),
      course: new FormControl('', [Validators.required]),
      courseName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      aliasName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      DateCreated: new FormControl(''),
      CreatedBy: new FormControl(''),
      active: new FormControl(''),
    });
  }

  ngOnInit() {
    this.BindData();
  }
  BindData() {
    debugger
    // Binding Courses
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

  EditCourseLoginForm() {
    this.btnDisable = true;
    this.EditCourseFrom = this.EditCourseRegistrationrFrm.value;

    this.FileLocation = (this.EditCourseFrom.filename == "") ? this.data.FileLocation : (this.img.src != undefined) ? this.img.fileName : null;
    this.ProFileExtention = (this.EditCourseFrom.filename == "") ? this.data.FileExtention : this.ProFileExtention;

    if (this.EditCourseFrom.filename != "") {
      this.Base = this.ByteImage != undefined ? this.ByteImage == null ? this.ByteImage : this.ByteImage : null;
    }
    else {
      this.Base = null;
    }

    //this.Base=(this.EditCourseFrom.filename !="")?  null :this.ByteImage=this.ByteImage != undefined ? this.ByteImage == null ? this.ByteImage : this.ByteImage : null;
    this.EditCourseFrom.filename = this.EditCourseFrom.filename == "" ? this.data.FileName : null;
    var req =
    {
      "ByteImage": this.Base,
      "CourseId": this.EditCourseFrom.courseId,
      "CourseName": this.EditCourseFrom.courseName,
      "Coursealias": this.EditCourseFrom.aliasName,
      "Description": this.EditCourseFrom.description,
      "FileName": this.EditCourseFrom.filename,
      "FileLocation": this.FileLocation,
      "FileExtention": this.ProFileExtention,
      "DateCreated": this.EditCourseFrom.DateCreated,
      "DateModified": new Date(),
      "CreatedBy": this.EditCourseFrom.CreatedBy,
      "Active": this.EditCourseFrom.active,
      "CategoryId": this.EditCourseFrom.catogoryId
    }

    this._dataService.Post('api/Course/AddUpdateCourse', req).subscribe(
      res => {
        if (res.length > 0) {
          //  alert("Course Add sucessfully");
          this.btnDisable = false;
          this._headerComponent.getCourseNameList();
          this.onNoClick();
          Swal({
            title: 'Course Updated Sucessfully',
            // text: "Department added succcefully",
            type: 'success',
            position: 'top'
          })
        } else {
          // alert(res.error.Message);
          this.btnDisable = false;
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
  onNoClick(): void {
    this.dialogRef.close();
  }
}



@Component({
  selector: 'delete-course-home',
  templateUrl: 'DeleteCourse.html',
  styleUrls: ['./course-addlist.component.css']
})
export class DeleteCourseComponent {

  DeleteRegistrationrFrm: FormGroup;
  currentUser: any;

  constructor(private router: Router, public dialogRef: MatDialogRef<DeleteCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private _dataService: DataService) {

    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
  }

  ngOnInit() {
  }

  DeleteCourse(ID) {
    debugger
    let reqobj = {
      "Id": ID
    }
    this._dataService.Post('api/Course/DeleteCourseDetails', reqobj).subscribe(
      res => {
        if (res.isSuccess == true) {
          //  alert(res.message);
          this.onNoClick();
          Swal({
            title: 'Course Deleted Successfully',
            // text: "Department added succcefully",
            type: 'warning',
            position: 'top'
          })
        } else {
          alert(res.message);
        }
      },
    );

  }

  onNoClick(): void {
    debugger
    this.dialogRef.close();
  }
}