import { EmployeeComponent } from './employee/employee.component';
import { LicenseComponent } from './license/license.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'licenseNumber',component:LicenseComponent},
  {path:'employeeID',component:EmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
