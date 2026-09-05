// MONE_CAN — JavaScript

// 1. Navbar shrinks on scroll
window.addEventListener('scroll', function() {
  var nav = document.getElementById('navbar');
  if (nav) {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
});

// 2. Mobile menu
function toggleMenu() {
  var m = document.getElementById('mobileMenu');
  if (m) m.classList.toggle('open');
}

// 3. COST CALCULATOR
var prices = {
  wedding:    75000,
  naming:     22000,
  thread:     24000,
  birthday:   18000,
  prewedding: 32000,
  corporate:  28000,
  other:      15000
};

var durationMult = { half: 1.0, full: 1.55 };

var addons = {
  album:     { min: 8000,  max: 8000  },
  reel:      { min: 3000,  max: 5000  },
  drone:     { min: 12000, max: 12000 },
  video:     { min: 45000, max: 65000 }
};

function calculate() {
  var evEl = document.getElementById('eventType');
  var duEl = document.getElementById('duration');
  if (!evEl || !duEl) return;

  var base    = prices[evEl.value] || 15000;
  var mult    = durationMult[duEl.value] || 1.0;
  var minPay  = Math.round(base * mult);
  var maxPay  = Math.round(minPay * 1.35);

  var checks = document.querySelectorAll('.chk input[type=checkbox]');
  var addonKeys = ['album','reel','drone','video'];
  checks.forEach(function(box, i) {
    if (box.checked && addonKeys[i]) {
      minPay += addons[addonKeys[i]].min;
      maxPay += addons[addonKeys[i]].max;
    }
  });

  minPay = Math.round(minPay / 500) * 500;
  maxPay = Math.round(maxPay / 500) * 500;

  var fmt = function(n){ return '\u20B9' + n.toLocaleString('en-IN'); };
  var rangeText = fmt(minPay) + ' \u2013 ' + fmt(maxPay);

  var display = document.getElementById('priceDisplay');
  if (display) display.textContent = rangeText;

  var evName  = evEl.options[evEl.selectedIndex].text;
  var durName = duEl.options[duEl.selectedIndex].text;
  var extras  = [];
  checks.forEach(function(box) {
    if (box.checked) {
      var lbl = box.parentElement.textContent.trim().split('+')[0].trim();
      extras.push(lbl);
    }
  });
  var msg = 'Hello! I used the cost calculator on your website.\n\n'
    + 'Event: ' + evName + '\n'
    + 'Duration: ' + durName + '\n'
    + (extras.length ? 'Add-ons: ' + extras.join(', ') + '\n' : '')
    + 'Estimated Range: ' + rangeText + '\n\n'
    + 'Can we discuss further?';

  var btn = document.getElementById('waCalcBtn');
  if (btn) btn.href = 'https://wa.me/919403238698?text=' + encodeURIComponent(msg);
}

document.addEventListener('DOMContentLoaded', calculate);