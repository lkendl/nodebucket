/*
============================================
; Title: nodebucket
; File Name: app-routing.module.ts
; Author: Professor Krasso
; Date: 16 August 2022
; Modified By: Laura Kendl
; Description: "nodebucket is task management software designed to simplify the way you
; create, track, edit, and delete time sensitive material. This is a full-stack
; MEAN (MongoDB, Express, Angular, and Node.js) application, utilizing the concepts that
; were taught in previous courses. MongoDB will be used for data persistence. Node.js
; will be used for manipulating and returning saved records, SoapUI for unit testing,
; and Angular for user interactions" (Krasso, 2022).
; Resources:
; [Ref A] Techiediaries: https://www.techiediaries.com/
; angular-9-8-path-redirection-and-handling-404-using-wildcard-routes/ (Angular 9/8
; How-To: Path Redirection and Handling 404 Paths Using Router Wildcard Routes)
===========================================
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { HomeComponent } from './pages/home/home.component'
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '', // Anyone that follows the BaseLayoutComponent, they will be using the BaseLayout in all of the child components of that Base component.
        component: HomeComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ],
    canActivate: [AuthGuard] // Adds SignInGuard to parent.
  },
  {
    path:'session', // Session is the parent route and uses the AuthLayoutComponent and will navigate to the NotFoundComponent.
    component: AuthLayoutComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '**', // If there is any URL not found in the routing file, redirects to session/not-found.
    redirectTo: 'session/not-found' // Session is the parent route.
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
