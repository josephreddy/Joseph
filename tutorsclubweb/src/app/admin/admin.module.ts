import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { DataService } from '../shared/services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { CourseAddlistComponent, EditCourseComponent, DeleteCourseComponent } from './course-addlist/course-addlist.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CategoryComponent, AddCategoryComponent, EditCategoryComponent } from './category/category.component';
// import { CategoryComponent, AddCategoryComponent, EditCategoryComponent } from './category/category.component';
import { CroppedImage, LyResizingCroppingImages, LyResizingCroppingImagesConfig, ImageResolution, LyResizingCroppingImageModule } from '@alyle/ui/resizing-cropping-images';
import { AuthGuard } from '../shared/guard/auth.guard';
import { CourseDescriptionComponent } from './course-description/course-description.component'; 
import { EditTutorProfileComponent } from './edit-tutor-profile/edit-tutor-profile.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AdminDemoRegListComponent, RegDescriptionComponent } from './admin-demo-reg-list/admin-demo-reg-list.component';
import { DeleteLearnerComponent, LearnerDetailsComponent } from './learner-details/learner-details.component';
import { DeleteTutorComponent, TutorDetailsComponent } from './tutor-details/tutor-details.component';
import { LatestEventComponent, EditImageHomeComponent, AddImageHomeComponent, DeleteImageHomeComponent } from './latest-event/latest-event.component';
import { TextMaskModule } from 'angular2-text-mask';
import { LyIconButtonModule } from '@alyle/ui/icon-button';
import { LyIconModule } from '@alyle/ui/icon';
import { LyInputModule } from '@alyle/ui/input';
import { AdminRegularCreateComponent, RegularBatchCreate, EditRegularBatch } from './admin-reg-batch-create/admin-regular-reg-list.component';
import { RegularBatchDetails } from './regular-batch-details/regular-batch-details.component';
import { NgxEditorModule } from 'ngx-editor';
import { LearnerRequestComponent } from './learner-request/learner-request.component';
import { DiscountMessageComponent } from './discount-message/discount-message.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        LyResizingCroppingImageModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        TextMaskModule,
        LyIconButtonModule,
        LyIconModule,
        LyInputModule,
        NgxEditorModule,
        TooltipModule.forRoot(),
        CKEditorModule 
    ],
    providers: [DataService,AuthGuard],
    declarations: [AdminComponent,
        CategoryComponent,
        AddCategoryComponent,
        EditCategoryComponent,
        CourseAddlistComponent,
        EditCourseComponent,
        DeleteCourseComponent,
        AddCourseComponent,
        LatestEventComponent,
        DeleteLearnerComponent,
        DeleteTutorComponent,
        EditImageHomeComponent,
        AddImageHomeComponent,
        DeleteImageHomeComponent,
        CourseDescriptionComponent,
        TutorDetailsComponent,
        LearnerDetailsComponent,
        EditTutorProfileComponent,
        AdminDemoRegListComponent,
        AdminRegularCreateComponent,
        RegularBatchCreate,
        EditRegularBatch,
        RegularBatchDetails,
        RegDescriptionComponent,
        LearnerRequestComponent,
        DiscountMessageComponent
    ],
    entryComponents: [DeleteLearnerComponent,DeleteTutorComponent,EditCourseComponent,DeleteCourseComponent,AddCourseComponent,AddCategoryComponent,EditCategoryComponent,AddImageHomeComponent, EditImageHomeComponent, DeleteImageHomeComponent,RegDescriptionComponent]
})
export class AdminModule { }
