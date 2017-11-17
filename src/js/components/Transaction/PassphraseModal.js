import React from "react"

const PassphraseModal = (props) => {
  function submitTransaction(e) {
    e.preventDefault();
    let password = document.querySelector('#passphrase').value;
    props.onClick(password);
  }
  return (
    <div >
      <div className="title text-center">Enter Passphrase</div>
      <a className="x" onClick={() => props.onCancel()}>&times;</a>
      <div className="content with-overlap">
        <div className="row">
          <div className="column">
            <center>
              {/* <p>You are about to transfer<br/><strong>1.234567 ETH</strong>&nbsp;to&nbsp;<strong>0xde0b29 ... 697bae</strong></p> */}
              {props.recap}
              <form onSubmit={(e) => submitTransaction(e)}>
                <label className={!!props.passwordError ? "error" : ""}>
                  <input className="text-center" id="passphrase" type="password" placeholder="Enter your passphrase to confirm"
                    onChange={(e) => props.onChange(e)} autoFocus />
                  {!!props.passwordError &&
                    <span className="error-text">{props.passwordError}</span>
                  }
                </label>
              </form>
            </center>
          </div>
        </div>
      </div>
      <div className="overlap">
        <a className="button accent process-submit"
          onClick={(e) => submitTransaction(e)}>
          Confirm
        </a>
      </div>
    </div>
  )
}

export default PassphraseModal
