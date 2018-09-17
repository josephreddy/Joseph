import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { DataService } from '../../shared/services/data.service';
import { LearnerSignUpComponent } from '../../core/learner-sign-up/learner-sign-up.component';
 

@Component({
  selector: 'app-learner-details',
  templateUrl: './learner-details.component.html',
  styleUrls: ['./learner-details.component.css']
})
export class LearnerDetailsComponent implements OnInit {


  currentUser: any;
  TotalCount: any;
 //MatTable Columns List 
 displayedColumns = ['FirstName', 'LastName','EmailId','PhoneNumber','Country','State','City','Contacted','RoleID'];
 dataSource = new MatTableDataSource();
 
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
  isLoadingResults=true;
 constructor(private router: Router,public dialog: MatDialog,private _dataService: DataService) {
  this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
   
 }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.LoadLearnerDetails();
  }

  openLearnerSignUpDialog(): void {
    let dialogRef = this.dialog.open(LearnerSignUpComponent, {
      width: '600px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

    
  LoadLearnerDetails(): void {
    this.isLoadingResults = true;
    this.dataSource.data = [];
    this._dataService.GetAll('api/Learner/GetLearnerDetails')
      .subscribe((Data:any) => {
        this.isLoadingResults = false;
        if (Data.length >0) {
          this.dataSource.data = Data;
          console.log(Data);
        }
        else {
          //alert(Data);
          // toastr.error(Data.endUserMessage);
        }
      });
  }

  onDeleteClick(row):void{
    let dialogRef = this.dialog.open(DeleteLearnerComponent, {
      width: 'auto',
      height: 'auto',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger
      // if(result != undefined){
        this.LoadLearnerDetails();
      // }
    });
  }

  onEditClick(row):void{
    debugger
    this.router.navigate(['editLearnerProfile/',row.LearnerID]);
  }
}


@Component({
  selector: 'delete-learner',
  templateUrl: 'DeleteLearner.html',
  styleUrls: ['./learner-details.component.css']
})
export class DeleteLearnerComponent {

  currentUser: any;

  constructor(public dialogRef: MatDialogRef<DeleteLearnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private _dataService: DataService) {
debugger
      this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    }

    ngOnInit() {
    }

    Delete(ID) {
      let reqobj={
        "Id":ID
      }
      this._dataService.Post('api/Learner/DeleteLearnerDetails', reqobj).subscribe(
        res => {
          debugger
          if (res.isSuccess==true) {
            //  alert(res.message);
             this.onNoClick(res);
             Swal({
              title: ' Learner Deleted successfully',
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

    onNoClick(res): void {
      this.dialogRef.close(res);
    }
}