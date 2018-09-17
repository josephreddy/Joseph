import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';  
import { HomeComponent } from './home/home.component';
import { CoreComponent } from './core.component';
import { SignUpComponent } from './sign-up/sign-up.component'; 
import { LearnerSignUpComponent } from './learner-sign-up/learner-sign-up.component';
import { BSlearnerSignUpComponent } from './bslearner-sign-up/bslearner-sign-up.component';
import { TutorSignUpComponent } from './tutor-sign-up/tutor-sign-up.component';
import { RegistrationComponent } from './registration/registration.component';
import { CanDeactivateGuard } from './registration/deactivate';
import { CourseExplanationComponent } from './course-explanation/course-explanation.component';
import { ViewTutorsListComponent, ViewTutorProfileComponent } from './view-tutors-list/view-tutors-list.component';
import { DemosListComponent, AddDemoSessionComponent, ViewDemoDetailsComponent } from './demos-list/demos-list.component';
import { TutorDemoRegComponent } from './tutor-demo-reg/tutor-demo-reg.component';
import { LearnerDemoRegComponent } from './learner-demo-reg/learner-demo-reg.component';
import { EditLearnerProfileComponent } from './edit-learner-profile/edit-learner-profile.component';
import { RegularBatchListComponent } from './Regular-Batch-List/reg-list.component';
import { LearnerRegularRegComponent } from './learner-regular-reg/learner-regular-reg.component';

const routes: Routes = [
     {
    path: '',
    component: CoreComponent,
    children: [ 
      { path: '',component:HomeComponent} ,
      { path: 'signUp',component:SignUpComponent}, 
      { path: 'learner-signUp',component:LearnerSignUpComponent}, 
      { path: 'Blearner-signUp',component:BSlearnerSignUpComponent},
      { path: 'tutor-signUp',component:TutorSignUpComponent}, 
      { path: 'registration',component:RegistrationComponent, canDeactivate: [CanDeactivateGuard]},
      { path: 'registration/:TutorId',component:RegistrationComponent, canDeactivate: [CanDeactivateGuard]},      
      { path: 'CourseExplanation/:value', component:CourseExplanationComponent},
      { path: 'viewTutorsList', component:ViewTutorsListComponent},
      { path: 'viewTutorProfile/:tutorId', component:ViewTutorProfileComponent},
      { path: 'DemoList', component: DemosListComponent},
      { path: 'RegList', component: RegularBatchListComponent},
      { path: 'adddemosess', component:AddDemoSessionComponent},
      { path: 'ViewDemoDetails/:demoID', component:ViewDemoDetailsComponent},
      { path: 'tutordemoreg', component:TutorDemoRegComponent},
      { path: 'learnerdemoreg', component:LearnerDemoRegComponent},
      { path: 'learnerregularreg', component:LearnerRegularRegComponent},
      { path: 'editLearnerProfile/:learnerId', component:EditLearnerProfileComponent},
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {
}
