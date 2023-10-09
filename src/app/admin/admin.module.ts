import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {AdminLayoutComponent} from "./shared/admin-layout/admin-layout.component";
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AddPageComponent } from './components/add-page/add-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {authGuard} from "../shared/guards/auth.guard";


const routes: Routes = [
  {path: 'admin', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'dashboard', component: DashboardPageComponent, canActivate: [authGuard]},
      {path: 'add', component: AddPageComponent, canActivate: [authGuard]},
      {path: 'orders', component: OrdersPageComponent, canActivate: [authGuard]},
      {path: 'product/:id/edit', component: EditPageComponent, canActivate: [authGuard]},
    ]}
]

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

  ],
  exports:[
    RouterModule
  ],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    OrdersPageComponent
  ],
  providers:[]
})

export class AdminModule{}
