import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';



const pagesRoutes: Routes = [
    { path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBars'} },
            { path: 'graphics1', component: Graphics1Component, data: {titulo: 'Gráficas'} },
            { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Tema'}},
            { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

