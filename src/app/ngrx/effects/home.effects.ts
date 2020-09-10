import { HomeService } from "./../../admin/dashboards/services/home.service";
import { Injectable } from "@angular/core";
import * as homeActions from "./../actions/home.actions";
import { Effect, Actions, ofType } from "@ngrx/effects";
// import "rxjs/add/operator/switchMap";
// import "rxjs/add/operator/map";
import { catchError, switchMap, map } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class HomeEffects {
  constructor(public action$: Actions, public homeService: HomeService) {}

  @Effect() loadPartMaster$ = this.action$.pipe(
    ofType(homeActions.LOAD_DASHBOARD_RECORD),
    switchMap((action: homeActions.LoadDashboardAction) =>
      this.homeService.getAllHomeRecords(action.payload).pipe(
        map(
          (homeRecord) => new homeActions.LoadDashboardSuccessAction(homeRecord)
        ),
        catchError((homeError: any) =>
          of(new homeActions.LoadDashboardFailureAction(homeError))
        )
      )
    )
  );
}
