let initialState = {
    loading: false,
    currentNetwork: "",
    currentNetworkID: 0,
    networkNames: { //import later
        1: 'Main Net',
        2: 'Morden',
        3: 'Ropsten',
        4: 'Rinkeyby',
        42: 'Kovan'
    },
    supportedNetwork: 'Ropsten',
    isNetworkSupported: false,
    web3: undefined,
    flashloanContract: undefined,
    providerOptions: {},
    provider: undefined,
    web3Modal: undefined,
    flashLoanContract: undefined,
    error: undefined
}

const web3WrapperReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOAD_WEB3_REQUESTED':
            return {
                ...state,
                loading: true
            }
        case 'LOAD_WEB3_SUCCESS':
            let networkID = action.networkID;
            return {
                ...state,
                loading: false,
                currentNetworkID: networkID,
                currentNetwork: state.networkNames[networkID],
                isNetworkSupported: ((state.networkNames[networkID] !== state.supportedNetwork) ? false : true),
                web3: action.web3,
                error: undefined
            }
        case 'LOAD_WEB3_FAILED':
            return {
                ...state,
                loading: false,
                error: action.message,
                currentNetwork: "Error"
            }
        case 'SET_UP_WEB3_MODAL_REQUESTED':
            return {
                ...state,
                loading: true
            }
        case 'SET_UP_WEB3_MODAL_SUCCESS':
            return {
                ...state,
                web3Modal: action.web3Modal,
                loading: false
            }
        case 'SET_UP_WEB3_MODAL_FAILED':
            return {
                ...state,
                error: action.message,
                loading: false
            }
        case 'CONNECT_PROVIDER_SUCCESS':
            return {
                ...state,
                provider: action.provider 
            }
        case 'CONNECT_PROVIDER_FAILED':
            return {
                ...state,
                error: action.message
            }
        case 'LOAD_FLASH_LOAN_CONTRACT_REQUESTED':
            return {
                ...state,
                error: action.message,
                loading: true,
            }
        case 'LOAD_FLASH_LOAN_CONTRACT_SUCCESS':
            return {
                ...state,
                flashLoanContract: action.contract,
                error: action.message,
                loading: false,
            }
        case 'LOAD_FLASH_LOAN_CONTRACT_FAILED':
            return {
                ...state,
                error: action.message,
                loading: false,
            }
        case 'TAKE_OUT_FLASH_LOAN_REQUESTED':
            return {
                ...state,
                loading: true,
            }
        case 'TAKE_OUT_FLASH_LOAN_SUCCESS':
            return {
                ...state,
                loading: false,
            }
        case 'TAKE_OUT_FLASH_LOAN_FAILED':
            return {
                ...state,
                error: action.message,
                loading: false,
            }
        default: 
            return state
    }
}

export default web3WrapperReducer;