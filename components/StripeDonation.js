// Module imports
import React from 'react'
import StripeCheckout from 'react-stripe-checkout'





// Component imports
import Component from './Component'





export default class StripeDonation extends Component {
  constructor(props) {
    super(props)

    this._bindMethods([
      'handleChange',
    ])

    this.state = {
      donationAmount: '1',
      customAmount: '',
      realDonationAmount: 100,
    }
  }

  handleChange(event) {
    const newState = { }
    const {
      name,
      value,
    } = event.target

    newState[name] = value

    this.setState(newState)

    const realAmount = (this.state.donationAmount === 'Other' ? this.state.customAmount : this.state.donationAmount) * 100
    this.setState({ realDonationAmount: realAmount })
  }

  render() {
    const amounts = [
      '1',
      '5',
      '10',
      '20',
      'Other',
    ]

    return (
      <div className="stripe-donation-container">
        <div className="stripe-donation-amounts">
          {
            amounts.map(amount => (
              <div className="stripe-donation-amount">
                <input
                  type="radio"
                  name="donationAmount"
                  value={amount}
                  key={amount}
                  id={`stripe-donation-amount-${amount}`}
                  checked={this.state.donationAmount === amount}
                  onChange={this.handleChange} />
                <label
                  htmlFor={`stripe-donation-amount-${amount}`}
                  className={this.state.donationAmount === amount ? 'button' : 'button secondary'}>
                  {`${amount === 'Other' ? '' : '$'}${amount}`}
                </label>
              </div>
            ))
          }
          <div className="stripe-donation-amount stripe-donation-custom">
            <input
              type="text"
              name="customAmount"
              className="stripe-donation-custom-amount"
              style={{ display: (this.state.donationAmount === 'Other' ? 'inline-block' : 'none') }}
              placeholder="20.00"
              value={this.state.customAmount}
              onChange={this.handleChange} />
          </div>
        </div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
          amount={this.state.realDonationAmount}
          />
      </div>
    )
  }
}
