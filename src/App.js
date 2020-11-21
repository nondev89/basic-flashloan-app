import React, { useState, useEffect } from 'react';
import './App.scss';
import HomePage from './Views/HomePage'
import { useSelector, useDispatch } from 'react-redux';
import { loadWeb3, setUpWeb3Modal } from './Actions/web3Wrapper';

function App() {

  const dispatch = useDispatch()
  const networkName = useSelector(state => state.web3Wrapper.currentNetwork)

  useEffect(() => {
    if (networkName === "") dispatch(loadWeb3());
    dispatch(setUpWeb3Modal());
  }, [])


  return (
    <div className="app">
      <HomePage/>
    </div>
  );
}

export default App;
