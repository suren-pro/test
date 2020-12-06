import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestPageComponent } from './pages/user-page/test-page/test-page.component';
import { UserHomePageComponent } from './pages/user-page/user-home-page/user-home-page.component';
import { LearnPageComponent } from './pages/user-page/learn-page/learn-page.component';
import { CreateUserComponent } from './pages/admin-page/create-user/create-user.component';
import { NewUserComponent } from './pages/admin-page/create-user/new-user/new-user.component';
import { CreateTestComponent } from './pages/admin-page/create-test/create-test.component';
import { NewQuestionComponent } from './pages/admin-page/create-test/new-question/new-question.component';
import { NewTestComponent } from './pages/admin-page/create-test/new-test/new-test.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserPageComponent,
    MainPageComponent,
    AdminPageComponent,
    TestPageComponent,
    UserHomePageComponent,
    LearnPageComponent,
    CreateUserComponent,
    NewUserComponent,
    CreateTestComponent,
    NewQuestionComponent,
    NewTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
