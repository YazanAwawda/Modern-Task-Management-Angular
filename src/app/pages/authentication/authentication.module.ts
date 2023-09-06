import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { AuthenticationRoutes } from './authentication.routing';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { SecurityComponent } from './security/security.component';
import {MaterialModule} from "../../material.module";
import {TreeviewModule} from "@charmedme/ngx-treeview";
import {AutocompleteLibModule} from "angular-ng-autocomplete";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthenticationRoutes),
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        TablerIconsModule.pick(TablerIcons),
        MaterialModule,
        TreeviewModule,
        TreeviewModule,
        AutocompleteLibModule,
    ],
  declarations: [
    AppSideLoginComponent,
    AppSideRegisterComponent,
    SecurityComponent,
  ]

})
export class AuthenticationModule {}
