import axios from './../../axios/axios-quiz';
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR } from './actionTypes';

export const fetchQuizes = () => async dispatch => {
    dispatch(fetchQuizesStart())
    try {
        const response = await axios.get('/quizes.json')

        const quizes = []

        Object.keys(response.data).forEach((key, index) => {
            quizes.push({
                id: key,
                name: `Тест №${index + 1}`
            })
        })

        dispatch(fetchQuizesSuccess(quizes))
        
        
    } catch (e) {
        dispatch(fetchQuizesError(e))
    }
}

export const fetchQuizesStart = () => ({type:FETCH_QUIZES_START})



export const fetchQuizesSuccess = (quizes) => ({type:FETCH_QUIZES_SUCCESS, quizes})


export const fetchQuizesError = (e) => ({type:FETCH_QUIZES_ERROR, error: e})


