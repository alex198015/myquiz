import axios from './../../axios/axios-quiz';
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR,
         FETCH_QUIZE_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY } from './actionTypes';

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

export const fetchQuizById = (quizId) => async dispatch => {
    dispatch(fetchQuizesStart())
    try{
        const response = await axios.get(`/quizes/${quizId}.json`)
        const quiz = response.data
  
       dispatch(fetchQuizSuccess(quiz))
    }catch(e){
        dispatch(fetchQuizesError(e))
    }
}

export const quizAnswerClick = (answerId) => (dispatch, getState) => {
    const state = getState().quiz
    if (state.answerState) {
        const key = Object.keys(state.answerState)[0]
        if (state.answerState[key] === 'success') {
          return
        }
      }
  
      const question = state.quiz[state.activeQuestion]
      const results = state.results
  
      if (question.rightAnswerId === answerId) {
        if (!results[question.id]) {
          results[question.id] = 'success'
        }
        dispatch(quizSetState({[answerId]: 'success'}, results))
        // this.setState({
        //   answerState: {[answerId]: 'success'},
        //   results
        // })
  
        const timeout = window.setTimeout(() => {
          if (isQuizFinished(state)) {
              dispatch(finishQuiz())
            // this.setState({
            //   isFinished: true
            // })
          } else {
            dispatch(quizNextQuestion(state.activeQuestion + 1))
            // this.setState({
            //   activeQuestion: this.state.activeQuestion + 1,
            //   answerState: null
            // })
          }
          window.clearTimeout(timeout)
        }, 1000)
      } else {
        results[question.id] = 'error'
        dispatch(quizSetState({[answerId]: 'error'}, results))
        // this.setState({
        //   answerState: {[answerId]: 'error'},
        //   results
        // })
      }

    
}

function isQuizFinished(state) {
    
    return state.activeQuestion + 1 === state.quiz.length
  }

export const fetchQuizSuccess = (quiz) => ({type: FETCH_QUIZE_SUCCESS, quiz})

export const fetchQuizesStart = () => ({type: FETCH_QUIZES_START})

export const fetchQuizesSuccess = (quizes) => ({type: FETCH_QUIZES_SUCCESS, quizes})

export const fetchQuizesError = (e) => ({type: FETCH_QUIZES_ERROR, error: e})

export const quizSetState = (answerState, results) => ({type: QUIZ_SET_STATE , answerState, results})

export const finishQuiz = () => ({type:FINISH_QUIZ})

export const quizNextQuestion = (number) => ({type: QUIZ_NEXT_QUESTION,number})

export const retryQuiz = () => ({type: QUIZ_RETRY})