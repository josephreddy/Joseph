import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-demo-reg-list',
  templateUrl: './admin-demo-reg-list.component.html',
  styleUrls: ['./admin-demo-reg-list.component.css']
})
export class AdminDemoRegListComponent implements OnInit {

  ChangeZone: any;
  parameterValue: any;
  currentUser: any;
  tutorslist = new MatTableDataSource();
  animal: string;
  name: string;
  TotalCount: any;
  selectedValue: any;
  selectedValuseList: any[] = [];
  DemoId: any
  //MatTable Columns List
  getDemoCoursesDetailsForm: FormGroup;
  displayedColumns = ['Contacted', 'Status', 'Description', 'LearnerName', 'Demo Id', 'Demo Course Name', 'TutorName', 'PhoneNumber', 'City', 'EmailId'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  TimeZoneConvertFrm: FormGroup;
  isLoadingResults = true;
  status: any;
  tutorID: number;
  req: any[] = [];
  isLoading: boolean = false;
  courselist = new MatTableDataSource();
  temp: any[] = [];
  temp1: any[] = [];
  backUpData = new MatTableDataSource();
  temperary: any[] = [];
  disable: boolean = false;
  constructor(private router: Router, private _dataService: DataService, public dialog: MatDialog, private cd: ChangeDetectorRef, ) {
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.TimeZoneConvertFrm = new FormGroup({
      timezone: new FormControl(''),
    });
  }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.LoadDemoCoursesDetails();
    this.GetStatus();
    this.GetTutorList();

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  GetStatus() {
    debugger
    this._dataService.GetAll('api/Learner/GetStatusType')
      .subscribe((Data: any) => {
        this.isLoadingResults = false;
        if (Data.length > 0) {
          this.status = Data;
          this.cd.markForCheck();
        }
        else {
        }
      });
  }

  updateDemoStatus() {
    debugger
    this.isLoading = true;
    if (this.selectedValuseList.length != 0) {
      for (var i = 0; i < this.selectedValuseList.length; i++) {
        var reqobj = {
          "RegisteredCandidateDemoID": this.selectedValuseList[i].RegisteredCandidateDemoID,
          "TCDemoId": this.selectedValuseList[i].TCDemoID,
          "LearnerID": this.selectedValuseList[i].LearnerID,
          "LContacted": this.selectedValuseList[i].LContacted,
          "LStatusId": this.selectedValuseList[i].LContacted == false ? null : this.selectedValuseList[i].LStatusId,
          "LStatusDescription": this.selectedValuseList[i].LStatusDescription == null || undefined ? null : this.selectedValuseList[i].LStatusDescription,
          "DemoStartTime": "2018-08-14T12:47:22.2551425+05:30",
          "RegisteredDate": "2018-08-14T12:47:22.2561395+05:30",
          "Active": true
        }
        this.req.push(reqobj);
      }
      var finalReq = this.req;
      this._dataService.Post('api/Learner/UpdateLearnerDemoRegistered', finalReq)
        .subscribe((Data: any) => {
          this.isLoading = false;
          this.selectedValuseList = [];
          this.req = [];
          if (Data.isSuccess) {
            swal({
              title: Data.message,
              type: 'success',
              position: 'top'
            })
            //alert(Data.message)
            this.LoadDemoCoursesDetails();
          }
          else {
            swal({
              title: Data.message,
              type: 'error',
              position: 'top'
            })
          }
        });
    } else {
      swal({
        title: "Please Select a Value",
        type: 'warning',
        position: 'top'
      })
      this.isLoading = false;
    }

  }
  Changes(value, option) {
    debugger;
    let dialogRef = this.dialog.open(RegDescriptionComponent, {
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      // if(result != undefined){
      this.selectedValuseList.forEach((item, index) => {
        if (item === value) this.selectedValuseList.splice(index, 1);
      });
      value.LStatusDescription=result;
      this.selectedValuseList.push(value);
      this.cd.markForCheck();
      // }
    });
  }

  AddDescription(): void {

  }
  onCheckChange(rowData) {
    if (rowData.LContacted == false) {
      this.selectedValuseList.push(rowData);
    }
  }
  onTutorSelect(value): void {
    this.temp1 = [];
    this.courselist.data = [];
    // if (this.tutorID != undefined) {
    // Binding Course
    debugger
    this._dataService.GetAll('api/CourseDemo/GetDemoCoursebyTutors/' + value)
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          debugger;
          this.courselist.data = Data;
          this.temp = [];
          this.temperary = this.backUpData.data;
          for (var i = 0; i < this.temperary.length; i++) {
            if (this.temperary[i].TutorID == value) {
              this.temp.push(this.temperary[i]);
            }
          }
          this.dataSource.data = this.temp;
        }
        else {
          this.courselist.data = [];
          this.dataSource.data = [];
          //alert(Data);
        }
      });
    // }
  }
  onDemoSelect(value) {
    this.temp1 = [];
    this.temperary = [];
    this.dataSource.data = this.temp;
    this.temperary = this.dataSource.data;
    for (var i = 0; i < this.temperary.length; i++) {
      if (this.temperary[i].TCDemoID == value) {
        this.temp1.push(this.temperary[i]);
      }
    }
    this.dataSource.data = this.temp1;

  }
  GetTutorList() {
    // Binding Tutors
    this._dataService.GetAll('api/Tutor/GetTutorDetails')
      .subscribe((Data: any) => {
        if (Data.length > 0) {
          var TutorNames = [];
          var TutorList = [];
          for (let i = 0; i < Data.length; i++) {
            if (TutorNames.indexOf(Data[i].TutorID) === -1) {
              TutorList.push({ "start": Data[i].FirstName, "End": Data[i].LastName, "tutorID": Data[i].TutorID });
              TutorNames.push(Data[i].TutorID);
            }
          }
          this.tutorslist.data = TutorList;
          this.cd.markForCheck();
          // this.traininglist.data = [{ "ID": 1, "Name": "Skype" }, { "ID": 2, "Name": "Hangout" }, { "ID": 3, "Name": "WebEx" }, { "ID": 4, "Name": "TeamViewer" }]
        }
        else {
          //alert(Data);
        }
      });
  }

  LoadDemoCoursesDetails(): void {
    debugger
    this.isLoadingResults = true;

    this.dataSource.data = [];
    if (this.currentUser != null) {
      if (this.currentUser.RoleID == 1) {
        this.parameterValue = 0
      }
      else {
        this.parameterValue = this.currentUser.TutorID
      }
    }
    debugger
    this._dataService.GetAll('api/Learner/GetLearnerDemoRegetailsbyTutorId/' + this.parameterValue)
      .subscribe((Data: any) => {
        this.isLoadingResults = false;
        if (Data.length > 0) {
          this.dataSource.data = Data;
          this.backUpData.data = Data
          this.selectedValue = Data.LStatusId
          if (this.currentUser.RoleID == 2) {
            this.onTutorSelect(this.currentUser.TutorID);
            this.tutorID = this.currentUser.TutorID;
            this.disable = true;
          }
          this.cd.markForCheck();
        }
        else {
        }
      });
  }
  CreateRegBatch() {
    debugger
    this.router.navigate(['/admin/EditRegBatch']);
  }
  openViewDemoDialog(demoRow): void {

    this.router.navigate(['/ViewDemoDetails/', demoRow.TCDemoId]);
  }
}


@Component({
  selector: 'reg-desc-reg',
  templateUrl: './reg-description.component.html',
  styleUrls: ['./admin-demo-reg-list.component.css']
})
export class RegDescriptionComponent implements OnInit {
  ngOnInit() {
  }
  constructor(
    public dialogRef: MatDialogRef<RegDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}