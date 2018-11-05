import { Answer } from '../Models/IAnswer'
import * as AnswerActions from '../Actions/answer.actions'

// default state
const initialState: Answer = {
    payload:new Object('Initial_State'),
    userMessage:null,
    systemMessage:null,
    statusCode:200
}

// action reducer
export function reducer(state: Answer[] = [initialState], action: AnswerActions.Actions) {
    
    // determining type of action
    switch(action.type) {
        case AnswerActions.ADD_ANSWER:
            return [...state ,action.payload];
        case AnswerActions.REMOVE_ANSWER:
            state.splice(action.payload, 1)
            return state;
        default:
           return state;
    }
}