import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user.component';
import { SchoolComponent } from './schools/school.component';
import { SchoolsComponent } from './schools/schools.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './groups/group.component';
import { ChurchsComponent } from './churchs/churchs.component';
import { ChurchComponent } from './churchs/church.component';
import { StudentsComponent } from './students/students.component';
import { CiclosComponent } from './ciclos/ciclos.component';
import { CicloComponent } from './ciclos/ciclo.component';
import { AdminGuard } from '../services/admin.guard';
import { StudentComponent } from './students/student.component';
import { VisitationComponent } from './visitations/visitation.component';
import { VisitationsComponent } from './visitations/visitations.component';
import { UserGuard } from '../services/user.guard';
import { ProgramvisitComponent } from './programvisit/programvisit.component';
import { ProgramvisitsComponent } from './programvisit/programvisits.component';


const routes: Routes = [
  {
    path: '',  component: PagesComponent,
    children: [
      {path: '',   redirectTo: '/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }},
      {
        path: 'usuarios',
        component: UsersComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Usuarios' }
      },
      {
        path: 'usuario/nuevo', 
        component: UserComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Usuario' }
      },
      {
        path: 'schools', 
        component: SchoolsComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Escuelas profesionales' }
      },
      {
        path: 'school/:id', 
        component: SchoolComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Escuela' }
      },
      {
        path: 'grupos', 
        component: GroupsComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Grupos' }
      },
      {
        path: 'grupo/:id', 
        component: GroupComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Grupo' }
      },
      {
        path: 'iglesias', 
        component: ChurchsComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Iglesias' }
      },
      {
        path: 'iglesia/:id', 
        component: ChurchComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Iglesia' }
      },
      {
        path: 'estudiantes', 
        component: StudentsComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Estudiantes' }
      },
      {
        path: 'estudiante', 
        component: StudentComponent,
        canActivate: [UserGuard],
        data: { titulo: 'Estudiante' }
      },
      {
        path: 'visita/:id', 
        component: VisitationComponent,
        data: { titulo: 'Visita' }
      },
      {
        path: 'visitas', 
        component: VisitationsComponent,
        data: { titulo: 'Visitas' }
      },
      {
        path: 'ciclos', 
        component: CiclosComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Ciclos' }
      },
      {
        path: 'ciclo/:id', 
        component: CicloComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Ciclo' }
      },
      {
        path: 'programarvisita/:id', 
        component: ProgramvisitComponent,
        data: { titulo: 'Programar visita' }
      },
      {
        path: 'programarvisitas', 
        component: ProgramvisitsComponent,
        data: { titulo: 'Programar visita' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
