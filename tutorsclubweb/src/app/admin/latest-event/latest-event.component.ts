import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LyResizingCroppingImages, LyResizingCroppingImagesConfig, CroppedImage, ImageResolution } from '@alyle/ui/resizing-cropping-images';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import { DataService } from '../../shared/services/data.service';



@Component({
  selector: 'app-latest-event',
  templateUrl: './latest-event.component.html',
  styleUrls: ['./latest-event.component.css']
})
export class LatestEventComponent implements OnInit {
  currentUser: any;
  TotalCount: any;
  //MatTable Columns List 
  displayedColumns = ['ImageUrl', 'Note', 'DateCreated', 'DateModified', 'Actions', 'Actions1'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoadingResults = true;
  constructor(private _dataService: DataService, public dialog: MatDialog) {
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    var date = new Date('6/13/2018 9:28:48 AM UTC');
    console.log(date.toString())
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.LoadImagesDetails();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  LoadImagesDetails(): void {
    debugger
    this.isLoadingResults = true;
    this.dataSource.data = [];
    this._dataService.GetAll('api/Course/GetCarouselImageDetails')
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
  openAddEvent(): void {
    let dialogRef = this.dialog.open(AddImageHomeComponent, {
      width: 'auto',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      // if(result != undefined){
      debugger
      this.LoadImagesDetails();
      // }

    });
  }

  openEditImage(row): void {
    let dialogRef = this.dialog.open(EditImageHomeComponent, {
      width: 'auto',
      height: 'auto',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      // if(result != undefined){
      this.LoadImagesDetails();
      // }

    });
  }

  onDeleteClick(row): void {
    let dialogRef = this.dialog.open(DeleteImageHomeComponent, {
      width: 'auto',
      height: 'auto',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      // if(result != undefined){
      this.LoadImagesDetails();
      // }

    });
  }
}

@Component({
  selector: 'add-Image-home',
  templateUrl: 'AddImageHome.html',
  styleUrls: ['./latest-event.component.css']
})
export class AddImageHomeComponent {
  currentUser: any;
  AddRegistrationrFrm: FormGroup;
  AddImageFrom: any;
  BASE64_MARKER: string = ';base64,';
  @ViewChild(LyResizingCroppingImages) img: LyResizingCroppingImages;
  result: string;
  // myConfig: LyResizingCroppingImagesConfig = {
  //   width: 475, // Default `250`
  //   height: 100, // Default `200`,
  //   output: ImageResolution.OriginalImage // Default ImageResolution.Default
  // };
  myConfig: LyResizingCroppingImagesConfig = {
    width: 475, // Default `250`
    height: 100, // Default `200`
    output: ImageResolution.OriginalImage // Default ImageResolution.Default

  };
  ProFileExtention: any;
  ByteImage: any;
  btnDisable: boolean;

  constructor(public dialogRef: MatDialogRef<AddImageHomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private _dataService: DataService) {
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.AddRegistrationrFrm = this._formBuilder.group({
      filename: new FormControl(''),
      note: new FormControl(''),
      RoleID: new FormControl(''),
    });
  }

  ngOnInit() {
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

  AddImage() {
    debugger
    if (this.AddRegistrationrFrm.valid == true) {

      this.btnDisable = true;
      this.AddImageFrom = this.AddRegistrationrFrm.value;
      if (this.ProFileExtention == undefined) {
        alert("Please crop photo.")
        return false;
      }
      debugger
      var reqobj = {
        "ByteImage": this.ByteImage != undefined ? this.ByteImage == null ? this.ByteImage : this.ByteImage : null,
        "FileName": null,
        "FileLocation": this.img.src != undefined ? this.img.fileName : null,
        "FileExtention": this.ProFileExtention,
        "Note": this.AddImageFrom.note,
        "RoleID": this.currentUser.RoleID,
        "CreatedBy": this.currentUser.AdminId,
        "DateCreated": new Date(),
        "DateModified": new Date(),
        "ModifiedBy": this.currentUser.AdminId,
        "Active": true,
      }

      this._dataService.Post('api/Course/AddUpdateCarouselImage', reqobj).subscribe(
        res => {
          if (res.length > 0) {
            //  alert("Image Added sucessfully");
            this.btnDisable = false;
            this.onNoClick();
            Swal({
              title: 'Event Added Sucessfully',
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
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'edit-Image-home',
  templateUrl: 'EditImageHome.html',
  styleUrls: ['./latest-event.component.css']
})
export class EditImageHomeComponent {
  Base: any;
  FileLocation: any;
  currentUser: any;
  EditRegistrationrFrm: FormGroup;
  EditCourseFrom: any;
  BASE64_MARKER: string = ';base64,';
  @ViewChild(LyResizingCroppingImages) img: LyResizingCroppingImages;
  result: string;
  myConfig: LyResizingCroppingImagesConfig = {
    width: 475, // Default `250`
    height: 100, // Default `200`
    output: ImageResolution.OriginalImage // Default ImageResolution.Default
  };
  ProFileExtention: any;
  ByteImage: any;
  btnDisable: boolean;

  constructor(public dialogRef: MatDialogRef<EditImageHomeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private _dataService: DataService) {
    debugger
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.EditRegistrationrFrm = this._formBuilder.group({
      CarouselImageId: new FormControl(''),
      filename: new FormControl(''),
      note: new FormControl(''),
      dateCreated: new FormControl(''),
      roleID: new FormControl(''),
      createdBy: new FormControl(''),
      active: new FormControl(''),
    });


  }

  ngOnInit() {
  }

  crop() {
    debugger
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


  EditImage() {
    debugger
    this.btnDisable = true;
    this.EditCourseFrom = this.EditRegistrationrFrm.value;

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

    var reqobj = {
      "ByteImage": this.Base,
      "CarouselImageId": this.data.CarouselImageId,
      "FileName": this.EditCourseFrom.filename,
      "FileLocation": this.FileLocation,
      "FileExtention": this.ProFileExtention,
      "Note": this.EditCourseFrom.note,
      "RoleID": 1,
      "CreatedBy": this.data.CreatedBy,
      "DateCreated": this.data.DateCreated,
      "DateModified": new Date(),
      "Active": this.data.Active,
    }


    this._dataService.Post('api/Course/AddUpdateCarouselImage', reqobj).subscribe(
      res => {
        if (res.length > 0) {
          //  alert("Image Edited sucessfully");
          this.btnDisable = false;
          this.onNoClick();
          Swal({
            title: 'Event Updated Sucessfully',
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
  selector: 'delete-Image-home',
  templateUrl: 'DeletImageHome.html',
  styleUrls: ['./latest-event.component.css']
})
export class DeleteImageHomeComponent {

  DeleteRegistrationrFrm: FormGroup;
  currentUser: any;

  constructor(public dialogRef: MatDialogRef<DeleteImageHomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private _dataService: DataService) {

    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));

    this.DeleteRegistrationrFrm = this._formBuilder.group({
      CarouselImageId: new FormControl(''),
    });


  }

  ngOnInit() {
  }

  DeleteEvent(ID) {

    debugger
    let reqobj = {
      "Id": ID
    }
    this._dataService.Post('api/Course/DeleteCarouselImageDetails', reqobj).subscribe(
      res => {
        if (res.isSuccess == true) {
          //  alert(res.message);
          this.onNoClick();
          Swal({
            title: ' Event Deleted Successfully',
            // text: "Department added succcefully",
            type: 'success',
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