import * as React from "react";

interface EmailTemplateProps {
  code: string;
}

export const Verification: React.FC<EmailTemplateProps> = ({ code }) => (
  <div>
    <p>
      Verification code:
      <h1>{code}</h1>
    </p>

    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
        Confirm registration
      </a>
    </p>
  </div>
);
