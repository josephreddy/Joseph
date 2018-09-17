import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoryComponent } from './category/category.component';
import { CourseAddlistComponent } from './course-addlist/course-addlist.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { CourseDescriptionComponent } from './course-description/course-description.component';
import { EditTutorProfileComponent } from './edit-tutor-profile/edit-tutor-profile.component';
// import { EditLearnerProfileComponent } from './edit-learner-profile/edit-learner-profile.component';
import { AdminDemoRegListComponent } from './admin-demo-reg-list/admin-demo-reg-list.component';
import { LearnerDetailsComponent } from './learner-details/learner-details.component';
import { TutorDetailsComponent } from './tutor-details/tutor-details.component';
import { LatestEventComponent } from './latest-event/latest-event.component';
import { AdminRegularCreateComponent, RegularBatchCreate, EditRegularBatch } from './admin-reg-batch-create/admin-regular-reg-list.component';
import { RegularBatchDetails } from './regular-batch-details/regular-batch-details.component';
import { LearnerRequestComponent } from './learner-request/learner-request.component';
import { DiscountMessageComponent } from './discount-message/discount-message.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'category', component: CategoryComponent, canActivate: [AuthGuard], data: { roles: ['1'] } },
            { path: 'Courseslist', component: CourseAddlistComponent, canActivate: [AuthGuard], data: { roles: ['1'] } },
            { path: 'latestEvent', component: LatestEventComponent, canActivate: [AuthGuard], data: { roles: ['1'] } },
            { path: 'courseDescription/:value', component: CourseDescriptionComponent, canActivate: [AuthGuard], data: { roles: ['1'] } },
            { path: 'LearnerList', component:  LearnerDetailsComponent, canActivate: [AuthGuard], data: { roles: ['1'] }  },
            { path: 'TutorDetails', component: TutorDetailsComponent, canActivate: [AuthGuard], data: { roles: ['1'] }  },
            { path: 'editTutorProfile/:tutorId', component: EditTutorProfileComponent, canActivate: [AuthGuard], data: { roles: ['1'] }  },
            // { path: 'editLearnerProfile/:learnerId', component: EditLearnerProfileComponent, canActivate: [AuthGuard], data: { roles: ['1'] }  },
            { path: 'demoReg', component:AdminDemoRegListComponent, canActivate: [AuthGuard], data: { roles: ['1','2'] } },
            { path: 'regReg', component:AdminRegularCreateComponent, canActivate: [AuthGuard], data: { roles: ['1','2'] } },
            { path: 'RegCreateBatch', component: RegularBatchCreate, canActivate: [AuthGuard], data: { roles: ['1','2'] }  },
            { path: 'EditRegBatch', component: EditRegularBatch, canActivate: [AuthGuard], data: { roles: ['1','2'] }  },
            { path: 'regbatchdetails/:regbatchId', component: RegularBatchDetails, canActivate: [AuthGuard], data: { roles: ['1','2'] }  },
            { path: 'learnerrequest', component: LearnerRequestComponent, canActivate: [AuthGuard], data: { roles: ['1'] }  },
            { path: 'discountMessage', component: DiscountMessageComponent, canActivate: [AuthGuard], data: { roles: ['1'] }  },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AdminRoutingModule {
}
