import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { SubmitReview } from '../learner-demo-reg/learner-demo-reg.component';

@Component({
  selector: 'app-learner-regular-reg',
  templateUrl: './learner-regular-reg.component.html',
  styleUrls: ['./learner-regular-reg.component.css']
})
export class LearnerRegularRegComponent implements OnInit {

  ChangeZone: any;
  parameterValue: any;
  currentUser: any;
  tutorslist: any;
  animal: string;
  name: string;
  TotalCount: any;
  //MatTable Columns List

  getDemoCoursesDetailsForm: FormGroup;
  displayedColumns = ['LearnerName', 'CourseName', 'TutorName', 'PhoneNumber', 'City', 'Contacted', 'EmailId','Review'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  TimeZoneConvertFrm: FormGroup;
  isLoadingResults = true;

  constructor(private router: Router, private _dataService: DataService, public dialog: MatDialog, private cd: ChangeDetectorRef) {
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.TimeZoneConvertFrm = new FormGroup({
      timezone: new FormControl(''),
    });
  }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.LoadRegularCoursesDetails();
  }



  LoadRegularCoursesDetails(): void {
    debugger
    this.isLoadingResults = true;

    this.dataSource.data = [];
    if (this.currentUser != null) {
      if (this.currentUser.RoleID == 3) {
        this.parameterValue = this.currentUser.LearnerID
      }
      else {
        this.parameterValue = 0
      }
    }
    else {
      this.parameterValue = 0
    }
    this._dataService.GetAll('api/Learner/GetRegularBatchRegisteredLearnerbyLearnerId/' + this.parameterValue)
      .subscribe((Data: any) => {
        this.isLoadingResults = false;
        if (Data.length > 0) {
          this.dataSource.data = Data;
        }
        else {
        }
      });
  }
  openViewDemoDialog(demoRow): void {
    this.router.navigate(['/ViewDemoDetails/', demoRow.TCDemoId]);
  }
  submitReview(row) {
    debugger
    let dialogRef = this.dialog.open(SubmitReview, {
      width: '420px',
      height: 'auto',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result != undefined) {
      this.LoadRegularCoursesDetails();
      // }
    });

  }
}
// displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
// dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

// @ViewChild(MatPaginator) paginator: MatPaginator;

// ngOnInit() {
//   this.dataSource.paginator = this.paginator;
// }
// }

// export interface PeriodicElement {
// name: string;
// position: number;
// weight: number;
// symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
// {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
// {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
// {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
// {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
// {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
// {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
// {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
// {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
// {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
// {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
// {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
// {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
// {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
// {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
// {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
// {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
// {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
// {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
// {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];