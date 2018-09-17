import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
@Component({
    selector: 'app-learner-request',
    templateUrl: './learner-request.component.html',
    styleUrls: ['./learner-request.component.css']
})
export class LearnerRequestComponent implements OnInit {
    ChangeZone: any;
    parameterValue: any;
    currentUser: any;
    tutorslist: any;
    animal: string;
    name: string;
    TotalCount: any;
    isLoadingResults = true;

    getDemoCoursesDetailsForm: FormGroup;
    displayedColumns = ['LearnerName', 'CourseName', 'BatchType', 'LMobileNumber', 'LEmailId', 'TrainingName', 'TrainingModeName', 'SessionTypeName', 'Time', 'StartDate'];
    dataSource = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private _dataService: DataService) {

    }
    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.LoadDemoCoursesDetails();
    }
    LoadDemoCoursesDetails(): void {
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
        debugger
        this._dataService.GetAll('api/Learner/GetCourseDemoOrRegBatchReqDetails')
            .subscribe((Data: any) => {
                this.isLoadingResults = false;
                if (Data.length > 0) {
                    this.dataSource.data = Data;
                }
                else {
                }
            });
    }
}