import { all } from 'redux-saga/effects'
import web3WrapperSaga from './web3Wrapper'

export default function* rootSaga() {
    yield all([
        web3WrapperSaga()
    ])
}