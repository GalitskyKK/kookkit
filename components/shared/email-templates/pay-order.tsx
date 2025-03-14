import * as React from "react";

interface EmailTemplateProps {
  orderId: string;
  totalAmount: number;
  paymentUrl: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Order #{orderId}!</h1>

    <p>
      Please proceed to the payment of the order amounting to{" "}
      <b>{totalAmount} Rub.</b>
      Click
      <a href={paymentUrl}> here</a> to make the payment
    </p>
  </div>
);
