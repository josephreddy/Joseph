import { Injectable } from '@angular/core';
// import { ConfirmationDialogComponent } from '../../shared/confirmation/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfirmationService {

  constructor(public dialog: MatDialog) { }

  // confirm(iconClass: string, title: string, body: string): Observable<any> {

  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = false;
  //   dialogConfig.width = "500px";

  //   dialogConfig.data = {
  //     iconClass: iconClass,
  //     title: title,
  //     body: body
  //   };
  //   // let dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
  //   // return dialogRef.afterClosed();
  // }
}
