import { OnInit, Component, ViewChild, ChangeDetectorRef } from "@angular/core";
import { DataService } from "../../shared/services/data.service";
import { FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import Swal from 'sweetalert2'

@Component({
    selector: 'discount-message',
    templateUrl: './discount-message.component.html',
    styleUrls: ['./discount-message.component.css']
})
export class DiscountMessageComponent implements OnInit {
    AddCourseRegistrationrFrm: FormGroup;
    displayedColumns = ['ScrollingId','ScrollingText'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    message:string;
    constructor(private _dataService: DataService, private _formBuilder: FormBuilder, private cd: ChangeDetectorRef) {
        this.AddCourseRegistrationrFrm = this._formBuilder.group({
            description: new FormControl(''),
        });
    }
    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getMessage();
    }

    postMessage() {
        debugger
        var req = {
            "scrollingId": 1,
            "scrollingText": this.AddCourseRegistrationrFrm.value.description
        }
        this._dataService.Post('api/Tutor/UpdateScrollingText', req)
            .subscribe((Data: any) => {
                if (Data.isSuccess) {
                    Swal({
                        title: 'Message Added Successfully',
                        // text: "Department added succcefully",
                        type: 'success',
                        position: 'top'
                      })
                }
                else {
                }
            });
    }
    getMessage() {
        debugger
        this._dataService.GetAll('api/Tutor/GetScrollingData')
            .subscribe((Data: any) => {
                if (Data.length>=1) {
                    this.dataSource.data = Data;
                    this.message = Data[0].ScrollingText;
                  this.cd.markForCheck();
                }
                else {
                }
            });
    }
}