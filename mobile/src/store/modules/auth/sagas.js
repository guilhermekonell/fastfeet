import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/delivery/${id}`);

    const deliveryman = response.data;

    if (!deliveryman) {
      Alert.alert('Erro no login', 'Entregador não encontrado');
      return;
    }

    yield put(signInSuccess(id));

    // history.push('/order');
  } catch (err) {
    Alert.alert(
      'Erro no login',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signInFailure());
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
