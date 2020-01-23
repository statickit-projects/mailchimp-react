import React, { useState } from 'react';
import { useStaticKit, ValidationError } from '@statickit/react';
import { addToMailchimp } from '@statickit/functions';

const OptInForm: React.FC = () => {
  const client = useStaticKit();

  const [emailAddress, setEmailAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);
    let resp = await addToMailchimp(client, { emailAddress });

    switch (resp.status) {
      case 'ok':
        setIsSubmitted(true);
        break;

      case 'argumentError':
        setErrors(resp.errors);
        setIsSubmitting(false);
        break;

      default:
        setIsSubmitting(false);
        break;
    }
  };

  if (isSubmitted) {
    return <div>Thanks for joining!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        name="email"
        value={emailAddress}
        onChange={e => setEmailAddress(e.target.value)}
      />
      <ValidationError prefix="Email" field="email_address" errors={errors} />
      <button type="submit" disabled={isSubmitting}>
        Join the list
      </button>
    </form>
  );
};

export default OptInForm;
