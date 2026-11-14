import { useState } from 'react';
import { vnd } from '../format.js';

const NAME_MSG = 'Enter your name.';
const PHONE_MSG = 'Enter a 10-digit phone number starting with 0.';
const CART_MSG = 'Add something to the cart first.';
const NOTE_MAX = 200;

export default function CheckoutForm({ itemCount, total, onOrderPlaced }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false); // has Place order been pressed at least once?
  const [confirmation, setConfirmation] = useState('');

  const nameError = name.trim() === '' ? NAME_MSG : '';
  const phoneError = /^0\d{9}$/.test(phone) ? '' : PHONE_MSG;
  const cartError = itemCount === 0 ? CART_MSG : '';

  const showName = submitted && nameError !== '';
  const showPhone = submitted && phoneError !== '';
  const showCart = submitted && cartError !== '';

  function handleNameChange(e) {
    setName(e.target.value);
    if (confirmation) setConfirmation('');
  }

  function handlePhoneChange(e) {
    setPhone(e.target.value);
    if (confirmation) setConfirmation('');
  }

  function handleNoteChange(e) {
    setNote(e.target.value);
    if (confirmation) setConfirmation('');
  }

  function handleSubmit(event) {
    event.preventDefault(); // never reload the page or put the fields in the address bar
    setSubmitted(true);
    if (nameError || phoneError || cartError) {
      setConfirmation('');
      return;
    }
    const items = `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`;
    setConfirmation(`Order placed for ${name.trim()}: ${items}, ${vnd(total)}.`);
    setName('');
    setPhone('');
    setNote('');
    setSubmitted(false);
    onOrderPlaced();
  }

  return (
    <form aria-label="Checkout" onSubmit={handleSubmit}>
      {confirmation && <p className="alert alert-success">{confirmation}</p>}

      <div className="mb-3">
        <label htmlFor="checkout-name" className="form-label">Name</label>
        <input
          id="checkout-name"
          type="text"
          className={showName ? 'form-control is-invalid' : 'form-control'}
          value={name}
          onChange={handleNameChange}
          aria-invalid={showName ? 'true' : undefined}
          aria-describedby={showName ? 'checkout-name-error' : undefined}
        />
        {showName && <p id="checkout-name-error" className="invalid-feedback d-block">{nameError}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="checkout-phone" className="form-label">Phone</label>
        <input
          id="checkout-phone"
          type="tel"
          className={showPhone ? 'form-control is-invalid' : 'form-control'}
          value={phone}
          onChange={handlePhoneChange}
          aria-invalid={showPhone ? 'true' : undefined}
          aria-describedby={showPhone ? 'checkout-phone-error' : undefined}
        />
        {showPhone && <p id="checkout-phone-error" className="invalid-feedback d-block">{phoneError}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="checkout-note" className="form-label">Note (optional)</label>
        <textarea
          id="checkout-note"
          className="form-control"
          maxLength={NOTE_MAX}
          value={note}
          onChange={handleNoteChange}
          aria-describedby="checkout-note-count"
        />
        <span id="checkout-note-count" className="form-text">{note.length}/{NOTE_MAX}</span>
      </div>

      {showCart && <p className="alert alert-warning">{cartError}</p>}

      <button type="submit" className="btn btn-success">Place order</button>
    </form>
  );
}
