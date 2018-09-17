import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router'; 
import { AdminComponent } from './admin/admin.component';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
// import {HomeComponent } from './home/home.component';
// import {AboutUsComponent} from './about-us/about-us.component';
// import { GetTutorDetailsComponent } from './get-tutor-details/get-tutor-details.component';
// import { DemosListComponent, ViewDemoDetailsComponent, AddDemoSessionComponent, EditDemoCourseComponent } from './demos-list/demos-list.component';
// import { CourseListComponent } from './course-list/course-list.component';
// import { LatestEventPicturesComponent } from './latest-event-pictures/latest-event-pictures.component';
// import { CourseAddlistComponent } from './course-addlist/course-addlist.component';
// import { RoleRegComponent } from './role-reg/role-reg.component';
// import { RegisterDemoListComponent } from './register-demo-list/register-demo-list.component';
// import { GetLearnerDetailsComponent } from './get-learner-details/get-learner-details.component';
// import { CourseExplanationComponent } from './course-explanation/course-explanation.component';
// import { ViewTutorsListComponent, ViewTutorProfileComponent } from './view-tutors-list/view-tutors-list.component';
// import { EditTutorProfileComponent } from './edit-tutor-profile/edit-tutor-profile.component';
// import { CategoryComponent } from './category/category.component';
// import { EditLearnerProfileComponent } from './edit-learner-profile/edit-learner-profile.component';
// import { SampleDemoComponent } from './sample-demo/sample-demo.component';
// import { NewComponent } from './new/new.component';
// import { LearnerSampleComponent } from './sample-demo/LearnerSampleSignup';
// import { CourseDescriptionComponent } from './course-description/course-description.component';
// import { TutorDemoRegComponent } from './tutor-demo-reg/tutor-demo-reg.component';
// import { LearnerDemoRegComponent } from './learner-demo-reg/learner-demo-reg.component';
// import { AdminDemoRegListComponent } from './admin-demo-reg-list/admin-demo-reg-list.component';


const appRoutes: Routes = [
   { path: '', loadChildren:'./core/core.module#CoreModule'}, 
    { path: 'admin', loadChildren:'./admin/admin.module#AdminModule'},
    { path: 'not-found', component:NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
  ]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
