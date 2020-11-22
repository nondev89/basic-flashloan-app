import React, { useState, useEffect } from 'react';
import './App.scss';
import HomePage from './Views/HomePage'
import { useSelector, useDispatch } from 'react-redux';
import { loadWeb3, setUpWeb3Modal } from './Actions/web3Wrapper';

function App() {

  const dispatch = useDispatch()
  const networkName = useSelector(state => state.web3Wrapper.currentNetwork)

  useEffect(() => {
    if (window.ethereum) {
      if (networkName === "") dispatch(loadWeb3());
      dispatch(setUpWeb3Modal());
    }
  }, [])

  let mainContent = (
    <HomePage/>
  );
  
  if (!window.ethereum) {
    mainContent = (
    <div className="network-not-supported-body"><h1>Please use a browser that supports web3</h1></div>
    );
  }

  return (
    <div className="app">
      {mainContent}
    </div>
  );
}

export default App;
