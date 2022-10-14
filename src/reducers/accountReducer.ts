import {ActionCreator, Dispatch} from 'redux';
import {
  combineActions,
  createAction,
  handleActions,
  Action,
} from 'redux-actions';
import {fetchAccount, updateAccount} from '../services/accountService';
import {getState} from '../store';

export type Account = {
  firstName: string;
  lastName: string;
  balance: number;
  cardInfo: {
    accountNumber: string;
    expirationDate: string;
    cvv: string;
    spendingLimit: number;
    cardFrozen: boolean;
  };
};

export type AccountState = {
  fetchState: 'DONE' | 'PENDING' | 'ERROR';
  error?: any;
  account?: Account;
};

type AccountPayload = Partial<AccountState>;

const initialAccountState: AccountState = {
  fetchState: 'DONE',
};

// Actions
export const setAccountState =
  createAction<Partial<AccountState>>('SET_USER_STATE');

// Thunk actions
export const getAccount: ActionCreator<any> = () => {
  return async (dispatch: Dispatch<Action<AccountPayload>>) => {
    dispatch(setAccountState({fetchState: 'PENDING'}));
    try {
      const account = await fetchAccount();
      dispatch(setAccountState({fetchState: 'DONE', account}));
    } catch (error) {
      dispatch(setAccountState({fetchState: 'ERROR', error}));
    }
  };
};

export const updateUserAccount: ActionCreator<any> = (
  acc: Partial<Account>,
) => {
  return async (dispatch: Dispatch<Action<AccountPayload>>) => {
    dispatch(setAccountState({fetchState: 'PENDING'}));

    try {
      await updateAccount(acc);
      dispatch(
        setAccountState({
          fetchState: 'DONE',
          account: {
            ...getState().accountState.account!,
            ...acc,
          },
        }),
      );
    } catch (error) {
      dispatch(setAccountState({fetchState: 'ERROR', error}));
    }
  };
};

// Reducers
const userReducers = handleActions<AccountState, Action<AccountPayload>>(
  {
    [`${setAccountState}`]: (state, action) => ({...state, ...action.payload}),
  },
  initialAccountState,
);

export default userReducers;
