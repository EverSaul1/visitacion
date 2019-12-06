import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportAsModule } from 'ngx-export-as';

import { AgmCoreModule } from '@agm/core';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule, NgbRatingModule, NgbTooltipModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SchoolComponent } from './schools/school.component';
import { SchoolsComponent } from './schools/schools.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './groups/group.component';
import { ChurchsComponent } from './churchs/churchs.component';
import { ChurchComponent } from './churchs/church.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentsComponent } from './students/students.component';
import { ResponsibleComponent } from './responsible/responsible.component';
import { CiclosComponent } from './ciclos/ciclos.component';
import { CicloComponent } from './ciclos/ciclo.component';
import { StudentComponent } from './students/student.component';
import { VisitationsComponent } from './visitations/visitations.component';
import { VisitationComponent } from './visitations/visitation.component';

import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { CloudinarySettings } from './settings';
import { FileUploadModule } from 'ng2-file-upload';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { ProgramvisitComponent } from './programvisit/programvisit.component';
import { ProgramvisitsComponent } from './programvisit/programvisits.component';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    PagesComponent,
    UsersComponent,
    UsersComponent,
    UserComponent,
    SchoolsComponent,
    SchoolComponent,
    GroupsComponent,
    GroupComponent,
    ChurchsComponent,
    ChurchComponent,
    ProfileComponent,
    StudentsComponent,
    ResponsibleComponent,
    CiclosComponent,
    CicloComponent,
    StudentComponent,
    VisitationsComponent,
    VisitationComponent,
    BreadcrumbsComponent,
    ProgramvisitComponent,
    ProgramvisitsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbCollapseModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    ExportAsModule,
    NgbTypeaheadModule,
    NgbRatingModule,
    FileUploadModule,
    NgbTooltipModule,
    NgxGalleryModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBmF8ILA9vJChRPR_-rdGJ9PHC10lfLIAc',
      libraries: ['places']
    }),
    CloudinaryModule.forRoot(cloudinary, CloudinarySettings),
    NgbDatepickerModule
  ]
})
export class PagesModule { }
