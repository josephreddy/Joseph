import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  currentUser: any;
  TotalCount: any;
  //MatTable Columns List 
  displayedColumns = ['CategoryName', 'Active', 'CategoryId'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoadingResults=true;
  constructor(private _dataService: DataService, public dialog: MatDialog) {
    this.currentUser = JSON.parse(localStorage.getItem('UserDetails'));
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.LoadCategoriesDetails();
  }


  LoadCategoriesDetails(): void {
    this.isLoadingResults = true;
    this.dataSource.data = [];
    this._dataService.GetAll('api/Course/GetCateogry')
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

  openAddCategory(): void {
    let dialogRef = this.dialog.open(AddCategoryComponent, {
      width: 'auto',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result != undefined) {
        this.LoadCategoriesDetails();
      // }

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
  opeEditCategory(row): void {
    let dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '450px',
      height: '250px',
      data:row,
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result != undefined) {
        this.LoadCategoriesDetails();
      // }

    });
  }
}



@Component({
  selector: 'add-category',
  templateUrl: 'AddCategory.html',
  styleUrls: ['./category.component.css']
})
export class AddCategoryComponent {
  AddCategoryForm: any;

  AddCategoryRegistrationrFrm: FormGroup;
  btnDisable: boolean;
  LearnerObj: any;
  show: boolean;
  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private _dataService: DataService) {
    this.AddCategoryRegistrationrFrm = this._formBuilder.group({
      category: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  ngOnInit() {
  }


  AddCategoryLoginForm():void {
debugger
    if(this.AddCategoryRegistrationrFrm.valid==true)
    {
  
      this.btnDisable=true;
      this.LearnerObj=this.AddCategoryRegistrationrFrm.value;
    debugger
    var req =
      {
        "CategoryName": this.LearnerObj.category,
        "Active": true
      }

    this._dataService.Post('api/Course/AddUpdateCourseCategory', req).subscribe(
      res => {
        if (res.length > 0) {
          this.btnDisable=false;
          // alert("Category Add sucessfully");
        this.onNoClick();
        Swal({
          title: 'Category Added Successfully',
          // text: "Department added succcefully",
          type: 'success',
          position: 'top'
        })
      } else {
        // alert(res.error.Message);
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
  else
  {
    this.show=true;
  }

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'edit-category',
  templateUrl: 'EditCategory.html',
  styleUrls: ['./category.component.css']
})
export class EditCategoryComponent {
  EditCategoryForm: any;

  EditCategoryRegistrationrFrm: FormGroup;
  btnDisable: boolean;
  constructor(public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private _dataService: DataService) {
    this.EditCategoryRegistrationrFrm = this._formBuilder.group({
      categoryID: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required,  Validators.minLength(1)]),
    });
  }

  ngOnInit() {
  }


  EditCategoryLoginForm():void {

    if(this.EditCategoryRegistrationrFrm.valid==true)
    {
      this.btnDisable=true;
    this.EditCategoryForm = this.EditCategoryRegistrationrFrm.value;
    debugger
    var req =
      {
        "CategoryId": this.EditCategoryForm.categoryID,
        "CategoryName": this.EditCategoryForm.category,
        "Active": true
      }

    this._dataService.Post('api/Course/AddUpdateCourseCategory', req).subscribe(
      res => {
        if (res.length>0) {
        // alert(res);
        this.btnDisable=false;
        this.onNoClick();
        Swal({
          title: 'Category Updated Successfully',
          // text: "Department added succcefully",
          type: 'success',
          position: 'top'
        })
      }
      else{
        this.btnDisable=false;
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



