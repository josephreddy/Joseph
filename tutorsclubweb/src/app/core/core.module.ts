import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { DataService } from '../shared/services/data.service';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { HomeComponent, TimeFormat } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LearnerSignUpComponent } from './learner-sign-up/learner-sign-up.component';
import { BSlearnerSignUpComponent } from './bslearner-sign-up/bslearner-sign-up.component';
import { RegistrationComponent } from './registration/registration.component';
import { TutorSignUpComponent } from './tutor-sign-up/tutor-sign-up.component';
import { CalendarModule } from './calendar/calendar.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxEditorModule } from 'ngx-editor';
import { CanDeactivateGuard } from './registration/deactivate';
import { CourseExplanationComponent, SupportRequest, Safe } from './course-explanation/course-explanation.component';
import { ViewTutorsListComponent, ViewTutorProfileComponent } from './view-tutors-list/view-tutors-list.component';
import { RegisterDemoCourseComponent } from './register-demo-course/register-demo-course.component';
import { DemosListComponent, EditDemoCourseComponent, AddDemoSessionComponent, DeleteDemoComponent, ViewDemoDetailsComponent, RoundPipe } from './demos-list/demos-list.component';
import { TutorDemoRegComponent } from './tutor-demo-reg/tutor-demo-reg.component';
import { LearnerDemoRegComponent, SubmitReview } from './learner-demo-reg/learner-demo-reg.component';
import { PhoneMaskDirective } from '../shared/directives/phone-mask.directive';
import { MomentModule } from 'ngx-moment';
import { TextMaskModule } from 'angular2-text-mask';
import { EditLearnerProfileComponent } from './edit-learner-profile/edit-learner-profile.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { RegularBatchListComponent } from './Regular-Batch-List/reg-list.component';
import { RegisterRegularCourseComponent } from './register-regular-course/register-regular-course.component';
import { RegisteredBatchDetails } from './Registered-Batch-Details/registered-batch-details';
import { LearnerRegularRegComponent } from './learner-regular-reg/learner-regular-reg.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        SharedModule,
        CalendarModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgxEditorModule,
        MomentModule,
        TextMaskModule,
        NgxMatSelectSearchModule,
        NgbModule.forRoot(),
    ],
    providers: [DataService, CanDeactivateGuard],
    declarations: [CoreComponent,
        PhoneMaskDirective,
        HomeComponent,
        SignUpComponent,
        LearnerSignUpComponent,
        BSlearnerSignUpComponent,
        RegistrationComponent,
        TutorSignUpComponent,
        CourseExplanationComponent,
        ViewTutorsListComponent,
        ViewTutorProfileComponent,
        RegisterDemoCourseComponent,
        DemosListComponent,
        EditDemoCourseComponent,
        AddDemoSessionComponent,
        DeleteDemoComponent,
        ViewDemoDetailsComponent,
        TutorDemoRegComponent,
        LearnerDemoRegComponent,
        EditLearnerProfileComponent,
        RoundPipe,
        TimeFormat,
        SupportRequest,
        RegularBatchListComponent,
        RegisterRegularCourseComponent,
        RegisteredBatchDetails,
        LearnerRegularRegComponent,
        SubmitReview,
        Safe
    ],
    entryComponents: [RegisterRegularCourseComponent, RegisterDemoCourseComponent, AddDemoSessionComponent, DeleteDemoComponent, EditDemoCourseComponent, SupportRequest, SubmitReview]
})
export class CoreModule { }
