import { call, put, takeEvery } from 'redux-saga/effects';
import Web3Modal from "web3modal";
import Web3 from 'web3';



function getWeb3() {
    if (window.ethereum) {
        return new Web3(window.ethereum);
    } else {
        return new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_WEB3_PROVIDER + process.env.REACT_APP_PROJECT_ID));
    }
}

function getWeb3Modal() {
    const providerOptions = {
        /* If needed import from somewhere else but not needed for metamask */
    };
    return new Web3Modal({
        network: "ropsten", //import that too later
        cacheProvider: false,
        providerOptions
      });
}

function subscribe(provider) {
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      console.log(accounts);
      console.log("ACCOUNTS CHANGED");
      window.location.reload(false);
    });
  
    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      console.log(chainId);
      console.log("CHAIN CHANGED");
      window.location.reload(false);
    });
  
    // Subscribe to provider connection
    provider.on("connect", (info) => {
      console.log(info);
      console.log("WALLET CONNECTED");
      window.location.reload(false);
    });
  
    // Subscribe to provider disconnection
    provider.on("disconnect", (error) => {
      console.log(error);
      console.log("WALLET DISCONNECTED");
      window.location.reload(false);
    });
}

function getFlashLoanContract(web3) {
    const flashloanAbi = require('../Contracts/FlashloanAbi.json');
    return new web3.eth.Contract(
        flashloanAbi,
        process.env.REACT_APP_FLASHLOAN_CONTRACT
    );;
}

function* loadWeb3(action) {
    try {
        const web3 = yield call(getWeb3);
        const networkID = yield call(web3.eth.net.getId);
        yield call(loadFlashLoanContract, web3);
        yield put({ type: 'LOAD_WEB3_SUCCESS',  networkID, web3 });
    } catch(e) {
        yield put({ type: 'LOAD_WEB3_FAILED',  message: e.message});
    }
}

function* setUpLoanEventListener(payload) {
    const web3 = payload.web3;
    const contract = payload.contract;
    try {
        const blockNumber = yield call(web3.eth.getBlockNumber);
        const loanEvent = contract.events.Loan({
            filter: {_from: web3.currentProvider.selectedAddress},
            fromBlock: blockNumber //only get events from after load
        })
        
        loanEvent.on('data', function(event){
            console.log(event)
            alert("Loan executed") //basic notification, could be improved
        })

        loanEvent.on('changed', (event) => {
            console.log(event)
        })

        loanEvent.on('error', (error) => {
            console.log(error)
        })
    } catch(e) {
        yield put({ type: 'LOAD_FLASH_LOAN_CONTRACT_FAILED',  message: e.message});
    }
    
}

function* loadFlashLoanContract(web3) {
    try {
        const contract = yield call(getFlashLoanContract, web3);
        yield call(setUpLoanEventListener, {web3, contract});
        yield put({ type: 'LOAD_FLASH_LOAN_CONTRACT_SUCCESS',  contract });
    } catch(e) {
        yield put({ type: 'LOAD_FLASH_LOAN_CONTRACT_FAILED',  message: e.message});
    }
}

function* setUpWeb3Modal(action) {
    try {
        const web3Modal = yield call(getWeb3Modal);
        yield put({ type: 'SET_UP_WEB3_MODAL_SUCCESS',  web3Modal });
    } catch(e) {
        yield put({ type: 'SET_UP_WEB3_MODAL_FAILED',  message: e.message});
    }
}

function* connectProvider(action) {
    try {
        const web3Modal = action.payload.web3Modal;
        const provider = yield call(web3Modal.connect);
        subscribe(provider);
        yield put({ type: 'CONNECT_PROVIDER_SUCCESS',  provider });
    } catch(e) {
        yield put({ type: 'CONNECT_PROVIDER_FAILED',  message: e.message});
    }
}

function* takeOutFlashLoan(action) {
    try {
        const contract = action.payload.flashLoanContract;
        const web3 = action.payload.web3;
        yield call(contract.methods.flashloan(action.payload.asset).send, {from: web3.currentProvider.selectedAddress})
        yield put({ type: 'TAKE_OUT_FLASH_LOAN_SUCCESS' });
    } catch(e) {
        yield put({ type: 'TAKE_OUT_FLASH_LOAN_FAILED',  message: e.message});
    }
}

function* web3WrapperSaga() {
    yield takeEvery('LOAD_WEB3_REQUESTED', loadWeb3);
    yield takeEvery('SET_UP_WEB3_MODAL_REQUESTED', setUpWeb3Modal);
    yield takeEvery('CONNECT_PROVIDER_REQUESTED', connectProvider);
    yield takeEvery('LOAD_FLASH_LOAN_CONTRACT_REQUESTED', loadFlashLoanContract);
    yield takeEvery('TAKE_OUT_FLASH_LOAN_REQUESTED', takeOutFlashLoan);
}

export default web3WrapperSaga;