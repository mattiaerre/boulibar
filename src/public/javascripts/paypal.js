/* global __MODEL__, paypal */
/* eslint no-console: "off", no-unused-vars: "off" */

(() => {
  const { payPal } = __MODEL__;

  paypal.Button.render(
    {
      env: payPal.env,
      commit: true,

      style: {
        color: 'silver',
        layout: 'vertical',
        shape: 'rect',
        size: 'responsive',
        tagline: false
      },

      client: {
        production: payPal.liveClientId,
        sandbox: payPal.sandboxClientId
      },

      payment: (data, actions) => {
        const clientName = document.getElementById('client-name').value;
        const amountPaid = document.getElementById('amount-paid').value;
        // console.log('clientName:', clientName, 'amountPaid:', amountPaid);
        // check: https://developer.paypal.com/docs/checkout/integrate/#2-set-up-a-payment
        return actions.payment.create({
          payment: {
            transactions: [{ amount: { total: amountPaid, currency: 'USD' } }]
          },
          experience: {
            presentation: {
              brand_name: payPal.brandName,
              logo_image: payPal.logoImage
            }
          }
        });
      },

      onAuthorize: (data, actions) =>
        actions.payment.execute().then(() => {
          console.log('payment completed');
          // todo: send email w/ info in payment form
        }),

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
