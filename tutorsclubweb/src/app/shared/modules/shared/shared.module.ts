import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumbersOnlyDirective } from '../../directives/numbers-only.directive';
// import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule,
    MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule,
    MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule,
    MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { NgxCarouselModule } from 'ngx-carousel';
import { TimezonePickerModule } from 'ng2-timezone-selector';
import {Ng2TelInputModule} from 'ng2-tel-input';
@NgModule({
    imports: [CommonModule, MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule,
        MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule,
        MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
        MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule,
        MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule,
        // NgbModule.forRoot(),
        // NgbCarouselModule.forRoot(), 
        NgxCarouselModule,
        FormsModule, 
        ReactiveFormsModule,
        TimezonePickerModule,
        Ng2TelInputModule 
    ],
    declarations: [NumbersOnlyDirective],
    exports: [
        CommonModule, FormsModule, ReactiveFormsModule, NumbersOnlyDirective,
        MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule,
        MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule,
        MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
        MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule,
        MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule,
        MatToolbarModule, MatTooltipModule,
        //NgbModule,NgbCarouselModule,
         NgxCarouselModule,    TimezonePickerModule,
         Ng2TelInputModule],
})
export class SharedModule { }
