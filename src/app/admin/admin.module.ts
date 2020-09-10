import { MaterialModule } from './../material.module';
import { HomeEffects } from './../ngrx/effects/home.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './../reducers';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './layout/components/admin/admin.component';
import { OverlayMenuComponent } from './layout/components/overlay-menu/overlay-menu.component';
import { RightSidebarComponent } from './layout/components/right-sidebar/right-sidebar.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LeftSidebarComponent } from './layout/components/left-sidebar/left-sidebar.component';
import { SettingsComponent } from './layout/components/settings/settings.component';
import { homeReducer } from '../ngrx/reducer/home.reducers';


@NgModule({
  declarations: [AdminComponent, OverlayMenuComponent, RightSidebarComponent, LeftSidebarComponent, SettingsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    MaterialModule,
    StoreModule.forRoot({reducers, homeState: homeReducer}, {metaReducers}),
    StoreDevtoolsModule.instrument({
      name: "Freemans",
      maxAge: 25,
    }),
    EffectsModule.forRoot([HomeEffects]),
  ]
})
export class AdminModule { }
