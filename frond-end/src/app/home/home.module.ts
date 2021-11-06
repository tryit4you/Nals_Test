import { ProfileComponent } from './../profile/profile.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './home-routing.module';
import { LayoutHomeComponent } from './layout-home.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ],
    declarations: [
        LayoutHomeComponent,
        HomeComponent,
        ProfileComponent
    ]
})
export class HomeModule { }