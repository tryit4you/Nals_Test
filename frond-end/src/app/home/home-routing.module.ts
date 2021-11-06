import { LayoutHomeComponent } from './layout-home.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';


const routes: Routes = [
    {
        path: '', component: LayoutHomeComponent,
        children: [
            { path: 'trang-chu', component:HomeComponent  },
            { path: 'profile', component: ProfileComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }