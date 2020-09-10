
export const LOAD_DASHBOARD_RECORD = 'LOAD_DASHBOARD_RECORD;'
export const LOAD_DASHBOARD_RECORD_SUCCESS = 'LOAD_DASHBOARD_RECORD_SUCCESS;'
export const LOAD_DASHBOARD_RECORD_FAILURE = 'LOAD_DASHBOARD_RECORD_FAILURE;'

// LOAD_PART_MASTER
export class LoadDashboardAction {
    readonly type = LOAD_DASHBOARD_RECORD;
    constructor(public payload: any) { }
}
export class LoadDashboardSuccessAction {
    readonly type = LOAD_DASHBOARD_RECORD_SUCCESS;
    constructor(public payload: any) { }
}
export class LoadDashboardFailureAction {
    readonly type = LOAD_DASHBOARD_RECORD_FAILURE;
    constructor(public payload: any) { }
}

export type Action = LoadDashboardAction
| LoadDashboardSuccessAction
| LoadDashboardFailureAction;
