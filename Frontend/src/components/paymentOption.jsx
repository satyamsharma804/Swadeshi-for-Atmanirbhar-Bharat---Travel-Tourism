import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
// import { QRCodeCanvas } from "qrcode.react";



export default function PaymentPage() {
  const [amount, setAmount] = useState(100);
  const paymentLink = `https://payment-gateway.com/pay?amount=${amount}`;

  return (
    <div className="payment-container" style={{ textAlign: "center", padding: "20px" }}>
      <h2>Scan to Pay</h2>
      <QRCode value={paymentLink} size={200} />
      <p>Amount: ${amount}</p>
      <button onClick={() => alert("Payment initiated!")}>Proceed</button>
    </div>
  );
}
