import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { connectProvider } from '../Actions/web3Wrapper';

function HeaderComponent() {

  const dispatch = useDispatch()
  const networkName = useSelector(state => state.web3Wrapper.currentNetwork)
  const isNetworkSupported = useSelector(state => state.web3Wrapper.isNetworkSupported)
  const networkError = useSelector(state => state.web3Wrapper.error)
  const web3Modal = useSelector(state => state.web3Wrapper.web3Modal)
  const provider = useSelector(state => state.web3Wrapper.provider)
  const web3 = useSelector(state => state.web3Wrapper.web3)

  let networkClass = "success";

  if (networkError !== undefined || !isNetworkSupported) {
    networkClass = "error"
  }

  let connectButton = (
    <Button onClick={() => dispatch(connectProvider({web3Modal}))} size="small" variant="contained" color="primary">
      Connect
    </Button>
  );
  if (provider !== undefined || (web3 && web3.currentProvider._state && web3.currentProvider._state.isConnected)) connectButton = (<div>Connected</div>)
  if (!isNetworkSupported) connectButton = (<div>This network is not supported</div>)

  return (
    <div className="header">
      <div className={`header-item ${networkClass}`}>Network: {networkName} {networkError}</div>
      <div className="header-item">
        {connectButton}
      </div>
    </div>
  );
}

export default HeaderComponent;
