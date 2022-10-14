import {Account} from '../reducers/accountReducer';

// Fake service to getAccount
export function fetchAccount(): Promise<Account> {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({
        firstName: 'Mark',
        lastName: 'Henry',
        balance: 3000,
        cardInfo: {
          accountNumber: '5647341124132020',
          expirationDate: '12/20',
          cvv: '456',
          spendingLimit: 0,
          cardFrozen: false,
        },
      });
    }, 300);
  });
}

export function updateAccount(account: Partial<Account>): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
}
