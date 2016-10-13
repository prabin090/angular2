import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HeroesComponent } from './heroes.component';

import {DashboardComponent } from './dashboard.component';
import {HeroDetailComponent} from './hero-detail.component';
import {ProgressPieChartService} from './progresspiechart.service';

const appRoutes: Routes = [
    {
        path: 'heroes',
        component: HeroesComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'detail/:id',
        component: HeroDetailComponent
    },
     {
        path: 'detail/:id',
        component: ProgressPieChartService
    },
    
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);