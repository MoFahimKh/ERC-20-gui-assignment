import { React, useState } from "react";

const Interactions = (props) => {
  const [transferHash, setTransferHash] = useState();
  const [approveHash, setApproveHash] = useState();
  const [transferFromHash, setTransferFromHash] = useState();

  const transferHandler = async (e) => {
    e.preventDefault();
    let transferAmount = e.target.sendAmount.value;
    let recieverAddress = e.target.recieverAddress.value;

    let txt = await props.contract.transfer(recieverAddress, transferAmount);
    console.log(txt);
    setTransferHash("Transfer confirmation hash: " + txt.hash);
  };

  const approveHandler = async (e) => {
    e.preventDefault();
    let spender = e.target.spenderAddress.value;
    let amount = e.target.approveAmount.value;

    let txt = await props.contract.approve(spender, amount);
    console.log(txt);
    setApproveHash("Approve confirmation hash: " + txt.hash);
  };

  const transferFromHandler = async (e) => {
    e.preventDefault();
    let sender = e.target.senderAddress.value;
    let receiver = e.target.receiverAddress.value;
    let amount = e.target.sendAmount.value;

    let txt = await props.contract.transferFrom(sender, receiver, amount);
    console.log(txt);
    setTransferFromHash("Transfer From confirmation hash: " + txt.hash);
  };

  return (
    <div>
      <form onSubmit={transferHandler}>
        <h3> Transfer Coins </h3>
        <p> Reciever Address </p>
        <input type="text" id="recieverAddress" />

        <p> Send Amount </p>
        <input type="number" id="sendAmount" min="0" step="1" />

        <button type="submit">Send</button>
        <div>{transferHash}</div>
      </form>

      <form onSubmit={approveHandler}>
        <h3>Approve Tokens</h3>
        <p>Spender Address</p>
        <input type="text" id="spenderAddress" />

        <p>Approve Amount</p>
        <input type="number" id="approveAmount" min="0" step="1" />

        <button type="submit">Approve</button>
        <div>{approveHash}</div>
      </form>

      <form onSubmit={transferFromHandler}>
        <h3>Transfer From</h3>
        <p>Sender Address</p>
        <input type="text" id="senderAddress" />

        <p>Receiver Address</p>
        <input type="text" id="receiverAddress" />

        <p>Send Amount</p>
        <input type="number" id="sendAmount" min="0" step="1" />

        <button type="submit">Transfer From</button>
        <div>{transferFromHash}</div>
      </form>
    </div>
  );
};

export default Interactions;
