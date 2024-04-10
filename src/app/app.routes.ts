import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    // { path: 'home', component: HomeComponent },
    { path: 'categories', component: CategoriesComponent },
    // {path: '/suppliers', component: }
    { path: '', redirectTo: 'home', pathMatch: "full" }
];
