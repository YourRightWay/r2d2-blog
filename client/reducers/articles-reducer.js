import createUniversalGraphReducer from './universal-transition-graph-reducer'

import {
    S_INITIAL,
    PAGE_LOADING_REQUEST,
    PAGE_LOAD_SUCCESS,
    PAGE_LOAD_ERROR,
    SEND_COMMENT_FETCHING,
    SEND_COMMENT_DONE,
    SEND_COMMENT_ERR,

    GET_ARTICLES_REQUEST, GET_ARTICLES_SUCCESS, GET_ARTICLES_ERROR,
    SEND_COMMENT_REQUEST, SEND_COMMENT_SUCCESS, SEND_COMMENT_ERROR,
    GET_ARTICLE_ID
} from '../constants/api-constants'

import {
    INCREASE_COUNTER
} from '../constants/utils-constants'

let initialState = {
    STATE: 'S_INITIAL',
    LIMIT: 10,
    isFetching: false,
    articlesList: {},
    id: '',
    currentPage: 1,
    quantityPages: 0
}

let TRANSITION_GRAPH = {
    [S_INITIAL]: {
        [GET_ARTICLES_REQUEST]: (state, action) => ({
            STATE: PAGE_LOADING_REQUEST,
            isFetching: true
        }),
        [GET_ARTICLES_SUCCESS]: (state, action) => ({
            STATE: PAGE_LOAD_SUCCESS,
            isFetching: false,
            articlesList: action.articlesList,
            currentPage: action.currentPage,
            quantityPages: action.quantityPages
        }),
        [GET_ARTICLES_ERROR]: {
            STATE: PAGE_LOAD_ERROR
        },
        [GET_ARTICLE_ID]: (state, action) => ({
            id: action.id
        }),
        [INCREASE_COUNTER]: (state, action) => ({
            currentPage: ++state.currentPage
        }),
        [SEND_COMMENT_SUCCESS]: (state, action) => ({
            articlesList: Object.assign({}, state.articlesList, state.articlesList[state.id].comments.push(action.result))
        })
    }
};

export default createUniversalGraphReducer(initialState, TRANSITION_GRAPH);
