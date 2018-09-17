import { Component, OnInit } from "@angular/core";
import swal from 'sweetalert2';
import { DataService } from "../../shared/services/data.service";
import { MatTableDataSource } from "@angular/material";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'reg-batch-details',
    templateUrl: './regular-batch-details.component.html',
    styleUrls: ['./regular-batch-details.component.css']
})
export class RegularBatchDetails implements OnInit {
    currentBatch: string;
    displayedColumns = ['Contacted', 'TCDemoID', 'TutorName', 'LearnerName', 'Email Id', 'PhoneNumber'];
    dataSource = new MatTableDataSource();
    selectedValuseList: any[] = [];
    req: any[] = [];

    constructor(private _dataService: DataService, private _activatedRoute: ActivatedRoute) {
        debugger
        this.currentBatch = this._activatedRoute.snapshot.params['regbatchId'];
    }
    ngOnInit() {
        this.getBatchDetails();
    }
    getBatchDetails() {
        debugger
        this._dataService.GetAll('api/Learner/GetRegularBatchRegisteredLearner/' + this.currentBatch)
            .subscribe((Data: any) => {
                this.dataSource.data = Data;
            });
    }
    onCheckChange(rowData, checked) {
        if (checked.checked) {
            this.selectedValuseList.push(rowData.RegisteredCandidateRegBatchId);
        } else {
            this.selectedValuseList.forEach((item, index) => {
                if (item === rowData.RegisteredCandidateRegBatchId) this.selectedValuseList.splice(index, 1);
            });
        }
    }
    removeLearner() {
        this.req = [];
        for (var i = 0; i < this.selectedValuseList.length; i++) {
            var reqobj = {
                "RegLearnerId": this.selectedValuseList[i],
            }
            this.req.push(reqobj);
        }
        this._dataService.Post('api/Learner/DeleteRegularBatchRegisteredById', this.req)
            .subscribe((Data: any) => {
                if (Data.isSuccess) {
                    swal({
                        title: Data.message,
                        type: 'success',
                        position: 'top'
                    })
                    this.req=[];
                    this.selectedValuseList=[];
                    this.getBatchDetails();
                }
                else {
                    swal({
                        title: Data.message,
                        type: 'error',
                        position: 'top'
                    })
                }
            });
    }
}