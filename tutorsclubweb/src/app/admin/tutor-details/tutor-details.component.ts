import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource, MatPaginator, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable/release/components/datatable.component';
import Swal from 'sweetalert2'; 
import { DataService } from '../../shared/services/data.service';


@Component({
  selector: 'app-tutor-details',
  templateUrl: './tutor-details.component.html',
  styleUrls: ['./tutor-details.component.css']
})
export class TutorDetailsComponent implements OnInit {
  isloading: boolean = false;
  UserActivityRights: any;
  currentUser: any;
  TotalCount: any;
  //MatTable Columns List 
  displayedColumns = ['ImageUrl', 'FirstName', 'CourseName', 'EmailID', 'Country', 'DateCreated', 'DateModifed', 'RoleID', 'RoleID1'];
  TutorList = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  TutorDetails: any;


  rows = [];
  temp = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  isLoadingResults = true;
  constructor(private router: Router, private fb: FormBuilder, private _dataService: DataService, public dialog: MatDialog) {

    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
    this.UserActivityRights = JSON.parse(localStorage.getItem('UserActivityRights'));
  }

  ngOnInit() {
    this.TutorList.paginator = this.paginator;
    this.TutorList.sort = this.sort;
    this.LoadTutorDetails();
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.TutorList.filter = filterValue;
    if (this.TutorList.paginator) {
      this.TutorList.paginator.firstPage();
    }
  }
  LoadTutorDetails(): void {
    debugger
    this.isLoadingResults = true;
    this.TutorList.data = [];
    this._dataService.GetAll('api/Tutor/GetTutorProfileDetails')
      .subscribe((Data: any) => {
        this.isLoadingResults = false;
        if (Data.length > 0) {
          this.TutorList.data = Data;
          this.TotalCount = Data.length;
          console.log(Data);
        }
        else {
          //alert(Data);
          // toastr.error(Data.endUserMessage);
        }
      });
  }

  // LoadTutorDetails(): void {
  //   this.isloading = true;
  //   this._dataService.GetAll('api/Registration/GetTutorDetails')
  //     .subscribe((Data:any) => {
  //       this.isloading = false;
  //       if (Data.length >0) {
  //         this.TutorList.data=Data;
  //         this.temp = Data;

  //         this.rows = Data;
  //         this.TutorDetails = Data;
  //         console.log(Data);
  //       }
  //       else {
  //       }
  //     });
  // }

  // updateFilter(event) {
  //   const val = event.target.value.toLowerCase();

  //   const temp = this.temp.filter(function(d) {
  //     return d.CourseName.toLowerCase().indexOf(val) !== -1 || !val;
  //   });

  //   this.TutorDetails = temp;
  //   this.table.offset = 0;
  // }

  onEditClick(data): void {
    this.router.navigate(['/registration', data.TutorID]);
  }


  // openTutorSignUpDialog(): void {
  //   debugger
  //   let dialogRef = this.dialog.open(TutorSignupComponent, {
  //     width: '1000px',
  //     height: 'auto'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {

  //   });
  // }

  onDeleteClick(data): void {
    let dialogRef = this.dialog.open(DeleteTutorComponent, {
      width: 'auto',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      // if(result != undefined){
      this.LoadTutorDetails();
      // }
    });
  }
}




@Component({
  selector: 'delete-tutor-home',
  templateUrl: 'DeleteTutor.html',
  styleUrls: ['./tutor-details.component.css']
})
export class DeleteTutorComponent {

  currentUser: any;

  constructor(public dialogRef: MatDialogRef<DeleteTutorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private _dataService: DataService) {

      debugger
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
  }

  ngOnInit() {
  }

  Delete(ID) {
    debugger
    let reqobj = {
      "Id": ID
    }
    this._dataService.Post('api/Tutor/DeleteTutorDetails', reqobj).subscribe(
      res => {
        debugger
        if (res.isSuccess == true) {
          //  alert(res.message);
          Swal({
            title: ' Tutor Deleted successfully',
            // text: "Department added succcefully",
            type: 'warning',
            position: 'top'
          })
          this.onNoClick();
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

