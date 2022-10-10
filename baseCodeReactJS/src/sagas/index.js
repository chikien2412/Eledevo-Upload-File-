import { all } from 'redux-saga/effects';
import ItemSaga from './itemSaga';
export default function* rootSaga() {
  yield all([
    ...ItemSaga
  ]);
}

