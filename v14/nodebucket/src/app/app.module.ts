/*
============================================
; Title: nodebucket
; File Name: app.module.ts
; Author: Professor Krasso
; Date: 16 August 2022
; Modified By: Laura Kendl
; Description: "nodebucket is task management software designed to simplify the way you
; create, track, edit, and delete time sensitive material. This is a full-stack
; MEAN (MongoDB, Express, Angular, and Node.js) application, utilizing the concepts that
; were taught in previous courses. MongoDB will be used for data persistence. Node.js
; will be used for manipulating and returning saved records, SoapUI for unit testing,
; and Angular for user interactions" (Krasso, 2022).
===========================================
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AboutComponent } from './pages/about/about.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';


@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    AuthLayoutComponent,
    BaseLayoutComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MessageModule,
    MessagesModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
