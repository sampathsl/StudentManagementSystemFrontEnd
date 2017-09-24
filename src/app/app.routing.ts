/**
 * Created by SAMPATH on 5/14/2017.
 */

import { RouterModule, Routes } from '@angular/router';
import {StudentComponent} from "./student/student.component";

const router: Routes = [

  /*{ path : '' , redirectTo : '/api/v1/tasks' , pathMatch : 'full' },*/
  { path: '' , component : StudentComponent },

];

export const AppRoutes = RouterModule.forRoot(router);
