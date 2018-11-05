import { Action } from 'ngrx/@ngrx/store'
import { Answer } from '../Models/IAnswer'

// type of actions
export const ADD_ANSWER       = '[ANSWER] Add'
export const REMOVE_ANSWER    = '[ANSWER] Remove'

// strong typing of actions
export class AddAnswer implements Action {
    readonly type = ADD_ANSWER

    constructor(public payload: Answer) {}
}
export class RemoveAnswer implements Action {
    readonly type = REMOVE_ANSWER

    constructor(public payload: number) {}
}

// exporting all actions classes
export type Actions = AddAnswer | RemoveAnswer 