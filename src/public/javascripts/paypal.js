/* global paypal */
/* eslint no-console: "off", no-unused-vars: "off" */

(() => {
  paypal.Button.render(
    {
      env: 'production', // 'production' | 'sandbox',
      commit: true,

      style: {
        color: 'gold',
        size: 'responsive'
      },

      payment: (data, actions) => {
        console.log('set up the payment here');
      },

      onAuthorize: (data, actions) => {
        console.log('execute the payment here');
      },

      onCancel: (data, actions) => {
        console.log('buyer cancelled the payment');
      },

      onError: err => {
        console.log('an error occurred during the transaction');
      }
    },
    '#paypal-button'
  );
})();
