/* global paypal */
/* eslint no-console: "off", no-unused-vars: "off" */

(() => {
  paypal.Button.render(
    {
      env: 'sandbox', // 'production' | 'sandbox',
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
        sandbox:
          'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
        production: '<insert production client id>'
      },

      payment: (data, actions) =>
        actions.payment.create({
          payment: {
            transactions: [{ amount: { total: '0.01', currency: 'USD' } }]
          }
        }),

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
