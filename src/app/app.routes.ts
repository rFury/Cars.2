import { Routes } from '@angular/router';
import {CarsComponent} from './cars/cars.component';
import { AddCarComponent } from './add-car/add-car.component';
import { UpdateCarComponent } from './update-car/update-car.component';
import { FamilyGroupsComponent } from './family-groups/family-groups.component';
import { LoginComponent } from './login/login.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import { guardGuard } from './guard/guard.guard';
import { AuthGuard } from './guards/secure.guard';

const routes: Routes = [
    {
      path: 'assets/*',
      redirectTo: '/assets',
    },
    { path: 'Cars', component: CarsComponent,canActivate:[AuthGuard],data : {roles:['ADMIN']} },
    {path: 'AddCar', component: AddCarComponent,canActivate:[guardGuard]},
    {path: 'UpdateCar/:id', component: UpdateCarComponent,canActivate:[guardGuard]},
    { path: 'FamilyGroups', component: FamilyGroupsComponent },
    {path: 'Login', component: LoginComponent},
    {path: 'app-forbidden', component: ForbiddenComponent},
    { path: '', redirectTo: '/Cars', pathMatch: 'full' },
  ];
    
    
export { routes };
