import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegisterDemoCourseComponent } from '../register-demo-course/register-demo-course.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-tutor-demo-reg',
  templateUrl: './tutor-demo-reg.component.html',
  styleUrls: ['./tutor-demo-reg.component.css']
})
export class TutorDemoRegComponent implements OnInit {


  ChangeZone: any;
  parameterValue: any;
  currentUser: any;
  tutorslist: any;
  animal: string;
  name: string;
  TotalCount: any;
 //MatTable Columns List

 getDemoCoursesDetailsForm:FormGroup;
 displayedColumns = ['LearnerName','CourseName', 'TutorName','PhoneNumber','City','Contacted','EmailId'];
 dataSource = new MatTableDataSource();

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

 TimeZoneConvertFrm:FormGroup;
 isLoadingResults=true;

 constructor(private router: Router,private _dataService: DataService,public dialog: MatDialog) {
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.TimeZoneConvertFrm = new FormGroup({
      timezone: new FormControl(''),
    });
   }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.LoadDemoCoursesDetails();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  LoadDemoCoursesDetails(): void {
    debugger
    this.isLoadingResults = true;

    this.dataSource.data = [];
    if(this.currentUser!=null)
    {
    if(this.currentUser.RoleID==2)
    {
      this.parameterValue=this.currentUser.TutorID
    }
    else
    {
      this.parameterValue=0
    }
  }
  else
  {
    this.parameterValue=0
  }
debugger
    this._dataService.GetAll('api/Learner/GetLearnerDemoRegetailsbyTutorId/'+this.parameterValue)
      .subscribe((Data:any) => {
        this.isLoadingResults = false;
        if (Data.length >0) {
          this.dataSource.data = Data;
        }
        else {
        }
      });
  }
  

  openViewDemoDialog(demoRow): void {
    this.router.navigate(['/ViewDemoDetails/',demoRow.TCDemoId]);
  }
}