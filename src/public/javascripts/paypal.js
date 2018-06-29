/* global __MODEL__, paypal */
/* eslint no-console: "off", no-restricted-globals: "off", no-unused-vars: "off" */

const { copy, payPal } = __MODEL__;
const AMOUNT_PAID = 'amount-paid';
const CLIENT_NAME = 'client-name';
const NOTIFICATION = 'notification';
const NOTIFICATION_BUTTON = 'notification-button';
const USD = 'USD';

function initialize() {
  const notificationButton = document.getElementById(NOTIFICATION_BUTTON);
  notificationButton.onclick = () => {
    const notification = document.getElementById(NOTIFICATION);
    notification.classList.toggle('is-hidden');
    notification.classList.toggle('is-danger');
  };
}

function form() {
  const clientName = document.getElementById(CLIENT_NAME).value;
  const amountPaid = document.getElementById(AMOUNT_PAID).value;

  const data = { amountPaid, clientName };
  const errors = [];

  if (isNaN(parseInt(amountPaid, 10))) {
    errors.push({ field: AMOUNT_PAID, message: 'amount paid is not a number' });
  } else if (parseInt(amountPaid, 10) < 0) {
    errors.push({
      field: AMOUNT_PAID,
      message: 'amount paid must be greater than zero'
    });
  }
  if (clientName.length === 0) {
    errors.push({ field: CLIENT_NAME, message: 'client name is required' });
  }
  return { data, errors };
}

(() => {
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

      payment: (_, actions) => {
        const { data, errors } = form();
        if (errors.length > 0) {
          const notification = document.getElementById(NOTIFICATION);
          notification.classList.toggle('is-hidden');
          notification.classList.toggle('is-danger');
          notification.innerHTML += copy['oh-snap'];
          notification.innerHTML += `<ul>${errors.map(
            error => `<li>${error.message}</li>`
          )}</ul>`;
          initialize();
          console.log('errors:', errors);
          return false;
        }
        return actions.payment.create({
          payment: {
            transactions: [
              { amount: { total: data.amountPaid, currency: USD } }
            ]
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
