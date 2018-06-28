/* global __MODEL__, paypal */
/* eslint no-console: "off", no-unused-vars: "off" */

(() => {
  paypal.Button.render(
    {
      env: __MODEL__.payPal.env,
      commit: true,

      style: {
        color: 'silver',
        // fundingicons: true,
        // label: 'paypal',
        layout: 'vertical',
        shape: 'rect',
        size: 'responsive',
        tagline: false
      },

      client: {
        production: __MODEL__.payPal.liveClientId,
        sandbox: __MODEL__.payPal.sandboxClientId
      },

      payment: (data, actions) => {
        const clientName = document.getElementById('client-name').value;
        const amountPaid = document.getElementById('amount-paid').value;
        console.log('clientName:', clientName, 'amountPaid:', amountPaid);
        // check: https://developer.paypal.com/docs/checkout/integrate/#2-set-up-a-payment
        return actions.payment.create({
          payment: {
            transactions: [{ amount: { total: amountPaid, currency: 'USD' } }]
          }
        });
      },

      onAuthorize: (data, actions) =>
        actions.payment.execute().then(() => {
          console.log('payment completed');
          // todo: send email w/ info in payment form
        }),

      /*
      payment: (data, actions) => {
        console.log('set up the payment here');
      },

      onAuthorize: (data, actions) => {
        console.log('execute the payment here');
      },
      */

      onCancel: (data, actions) => {
        console.log('buyer cancelled the payment');
      },

      onError: err => {
        console.log('an error occurred during the transaction');
      }
    },
    '#paypal-button-container'
  );
})();
