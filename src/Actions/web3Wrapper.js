export function loadWeb3(payload) {
    return {
        type: 'LOAD_WEB3_REQUESTED',
        payload
    }
}

export function setUpWeb3Modal(payload) {
    return {
        type: 'SET_UP_WEB3_MODAL_REQUESTED',
        payload
    }
}

export function connectProvider(payload) {
    return {
        type: 'CONNECT_PROVIDER_REQUESTED',
        payload
    }
}

export function loadFlashLoanContract(payload) {
    return {
        type: 'LOAD_FLASH_LOAN_CONTRACT_REQUESTED',
        payload
    }
}

export function takeOutFlashLoan(payload) {
    return {
        type: 'TAKE_OUT_FLASH_LOAN_REQUESTED',
        payload
    }
}