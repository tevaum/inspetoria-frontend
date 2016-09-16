import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SchoolComponent } from './school.component';
import { UserComponent } from './user.component';
import { AttendComponent } from './attend.component';

const routes: Routes = [
    {
	path: 'escolas',
	component: SchoolComponent
    },
    {
	path: 'usuarios',
	component: UserComponent
    },
    {
	path: 'atendimentos',
	component: AttendComponent
    }
];

export const AppRouter: ModuleWithProviders = RouterModule.forRoot(routes);
