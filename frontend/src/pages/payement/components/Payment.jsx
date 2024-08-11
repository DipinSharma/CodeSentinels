import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Payment({userId,docId,startTime,endTime,day}) {
  const [card,setCard] = useState(null)
  const navigate=useNavigate();
  const handlePayment = async () => {

    const result = await card.tokenize();
    // console.log(result)
    if (result.status === 'OK') {
      const response = await fetch('http://localhost:5000/payments/processPayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: result.token,
          amount: 2000, userId,docId,startTime,endTime,day
        })
      });
      const paymentResult = await response.json(); 
      console.log(paymentResult,day)
      alert(`payment id:${paymentResult.payment}`)
      if(paymentResult.payment.id){
        navigate(`/videoChat/${paymentResult.sessionId}`);
      }
      //navigate
    }
  }

  useEffect(() => {
    async function fxn() {
      const payments = new window.Square.payments('sandbox-sq0idb-aoN3mY920RnHEY6PaimsqA', 'sandbox');
      const cardi = await payments.card();
      await cardi.attach('#card-container');
      setCard(cardi);
    } fxn()
  }, []);

  return (
    <div> 
      <div id="card-container"></div>
      {/* <button id="card-button">Pay</button> */}
      <button id='but' onClick={handlePayment}>Pay</button>
    </div>
  );
}

export default Payment