import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestPageComponent } from './pages/user-page/test-page/test-page.component';
import { UserHomePageComponent } from './pages/user-page/user-home-page/user-home-page.component';
import { LearnPageComponent } from './pages/user-page/learn-page/learn-page.component';
import { CreateUserComponent } from './pages/admin-page/create-user/create-user.component';
import { CreateTestComponent } from './pages/admin-page/create-test/create-test.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: '', component: MainPageComponent},

  // user //
  {path: 'user', redirectTo: 'user/home'},
  {path: 'user', component: UserPageComponent, canActivate: [AuthGuard], children: [
    {path: 'home', component: UserHomePageComponent},
    {path: 'test', component: TestPageComponent},
    {path: 'learn', component: LearnPageComponent}
  ]},

  // admin //
  {path: 'admin', redirectTo: 'admin/users'},
  {path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard], children: [
    {path: 'users', component: CreateUserComponent},
    {path: 'tests', component: CreateTestComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
