import { verifyNonce } from "../../utils/validators"
import { biggestNumber } from "../../utils/converter"
import BLOCKCHAIN_INFO from "../../../../env"

export const sendEtherFromAccount = (
  id, ethereum, account, sourceToken, sourceAmount,
  destAddress, nonce, gas, gasPrice, keystring, accountType,
  password) => {

  const txParams = {
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gas,
    to: destAddress,
    value: sourceAmount,
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: 42
  }

  return { txParams, keystring, password }
}

export const sendTokenFromAccount = (
  id, ethereum, account, sourceToken, sourceAmount,
  destAddress, nonce, gas, gasPrice, keystring, accountType,
  password) => {

  var txData = ethereum.call("sendTokenData")(
    sourceToken, sourceAmount, destAddress)
  const txParams = {
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gas,
    to: sourceToken,
    value: '0x0',
    data: txData,
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: 42
  }
  return { txParams, keystring, password }
}

export const etherToOthersFromAccount = (
  id, ethereum, account, sourceToken, sourceAmount, destToken,
  destAddress, maxDestAmount, minConversionRate,
  throwOnFailure, nonce, gas, gasPrice, keystring, accountType,
  password) => {
  var txData = ethereum.call("exchangeData")(
    sourceToken, sourceAmount, destToken, destAddress,
    maxDestAmount, minConversionRate, throwOnFailure)
  const txParams = {
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gas,
    to: BLOCKCHAIN_INFO.network,
    value: sourceAmount,
    data: txData,
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: 42
  }
  return { txParams, keystring, password }
}

export const getAppoveToken = (ethereum, sourceToken, sourceAmount, nonce, gas, gasPrice,
  keystring, password, accountType) => {
  //const approvalData = ethereum.approveTokenData(sourceToken, sourceAmount)  
  const approvalData = ethereum.call("approveTokenData")(sourceToken, biggestNumber())
  const txParams = {
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gas,
    to: sourceToken,
    value: '0x0',
    data: approvalData,
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: 42
  }
  return { txParams, keystring, password }
}

export const tokenToOthersFromAccount = (
  id, ethereum, account, sourceToken, sourceAmount, destToken,
  destAddress, maxDestAmount, minConversionRate,
  throwOnFailure, nonce, gas, gasPrice, keystring, accountType,
  password) => {
  const exchangeData = ethereum.call("exchangeData")(
    sourceToken, sourceAmount, destToken, destAddress,
    maxDestAmount, minConversionRate, throwOnFailure)
    //console.log(nonce)
  //const newNonce = verifyNonce(nonce, 1)
  //console.log(newNonce)
  const txParams = {
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gas,
    to: BLOCKCHAIN_INFO.network,
    value: '0x0',
    data: exchangeData,
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: 42
  }
  return { txParams, keystring, password }
}

