'use strict';

(function () {
  var billingSwitch = document.getElementById('billingSwitch');
  var monthlyLabel = document.getElementById('monthlyLabel');
  var yearlyLabel = document.getElementById('yearlyLabel');
  var premiumPrice = document.getElementById('premiumPrice');
  var premiumSuffix = document.getElementById('premiumSuffix');

  function setBilling(isYearly) {
    if (!billingSwitch) return;
    billingSwitch.classList.toggle('is-yearly', !!isYearly);
    monthlyLabel.classList.toggle('active', !isYearly);
    yearlyLabel.classList.toggle('active', !!isYearly);
    premiumPrice.textContent = isYearly ? '$11.99' : '$1.49';
    premiumSuffix.textContent = isYearly ? '/yr' : '/mo';
  }

  if (billingSwitch) {
    billingSwitch.addEventListener('click', function () {
      setBilling(!billingSwitch.classList.contains('is-yearly'));
    });
  }

  setBilling(false);

  var faqButtons = document.querySelectorAll('.faq-q');
  Array.prototype.forEach.call(faqButtons, function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentNode;
      item.classList.toggle('open');
    });
  });
})();
