import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { takeOutFlashLoan } from '../Actions/web3Wrapper';

function FlashLoanComponent() {

  const dispatch = useDispatch()
  const flashLoanContract = useSelector(state => state.web3Wrapper.flashLoanContract)
  const loading = useSelector(state => state.web3Wrapper.loading)
  const web3 = useSelector(state => state.web3Wrapper.web3)

  let button = (
    <Button onClick={() => dispatch(takeOutFlashLoan({asset: "0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108", flashLoanContract, web3}))} size="large" variant="contained" color="primary">
        Take out flashloan
    </Button>
  );

  if (loading) {
      button = (
        <Button size="large" variant="contained" color="primary" disabled={true}>
            Loading...
        </Button>
      );
  }

  return (
    <div className="flashloan">
        {button}
        *Locked to DAI as the contract only has excess DAI
    </div>
  );
}

export default FlashLoanComponent;
