import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from './actionTypes'
import axios from './../../axios/axios-quiz';


export const createQuizQuestion = (item) => ({type: CREATE_QUIZ_QUESTION , item})

export const finishCreateQuiz = () => async (dispatch, getState) => {
    const state = getState().create
    await axios.post('/quizes.json', state.quiz)
    dispatch(resetQuizCreation())
}

export const resetQuizCreation = () => ({type: RESET_QUIZ_CREATION})