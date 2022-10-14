import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Background from '../components/Background';
import BalanceHeader from '../components/BalanceHeader';
import CardDetails from '../components/CardDetails';
import {getAccount} from '../reducers/accountReducer';

export default function DebitTab() {
  const dispatch = useDispatch();
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    dispatch(getAccount());
  }, []);

  return (
    <Background style={{flex: 1}}>
      <BalanceHeader
        onLayoutHeaderHeight={(height) => setHeaderHeight(height)}
      />
      <CardDetails headerOffset={headerHeight} />
    </Background>
  );
}
