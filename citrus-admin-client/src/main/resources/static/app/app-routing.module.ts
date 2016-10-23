import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { DashboardComponent }   from './components/dashboard.component';
import { LogComponent }   from './components/log.component';
import { ComingComponent }   from './components/coming.component';
import { ProjectSettingsComponent }   from './components/project.settings.component';
import { ConfigurationComponent }   from './components/configuration.component';
import { TestsComponent }   from './components/tests.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'settings', component: ProjectSettingsComponent},
    { path: 'settings/:activeTab', component: ProjectSettingsComponent},
    { path: 'configuration', component: ConfigurationComponent},
    { path: 'configuration/:activeTab', component: ConfigurationComponent},
    { path: 'tests', component: TestsComponent},
    { path: 'tests/:name', component: TestsComponent},
    { path: 'stats', component: ComingComponent},
    { path: 'new', component: ComingComponent},
    { path: 'about', component: ComingComponent },
    { path: 'log', component: LogComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers:    [
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
})
export class AppRoutingModule {}