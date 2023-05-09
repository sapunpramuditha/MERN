import React, { Component } from 'react';
import './PaymentPage.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
// import 'animate.css';


class PaymentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      cardHolderName: '',
      cardExpiry: '',
      cardCVC: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Perform payment processing logic here
    // You can access card details from this.state object
    alert('Payment processed successfully!');
  }

  render() {
    const { cardNumber, cardHolderName, cardExpiry, cardCVC } = this.state;

    return (
      <div className="payment-page-container">
        <div className="payment-card">
          <div className="payment-card-header">
            <FontAwesomeIcon icon={faCreditCard} className="payment-card-icon" />
            <h1 className="payment-card-title">Payment</h1>
          </div>
          <form className="payment-form" onSubmit={this.handleSubmit}>
            <label className="payment-label">Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              value={cardNumber}
              onChange={this.handleInputChange}
              className="payment-input"
            />
            <br />
            <label className="payment-label">Card Holder Name:</label>
            <input
              type="text"
              name="cardHolderName"
              value={cardHolderName}
              onChange={this.handleInputChange}
              className="payment-input"
            />
            <br />
            <div className="payment-card-details">
              <div className="payment-card-expiry">
                <label className="payment-label">Card Expiry:</label>
                <input
                  type="text"
                  name="cardExpiry"
                  value={cardExpiry}
                  onChange={this.handleInputChange}
                  className="payment-input"
                />
              </div>
              <div className="payment-card-cvc">
                <label className="payment-label">Card CVC:</label>
                <input
                  type="text"
                  name="cardCVC"
                  value={cardCVC}
                  onChange={this.handleInputChange}
                  className="payment-input"
                />
              </div>
            </div>
            <br />
            <button type="submit" className="payment-submit-btn">Pay Now</button>
          </form>
        </div>
      </div>
    );
  }
}

export default PaymentPage;
