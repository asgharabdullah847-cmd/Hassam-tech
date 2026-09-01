// Theme toggle
(function(){
  var toggle = document.getElementById('themeToggle');
  var root = document.documentElement;
  if (toggle) {
    toggle.addEventListener('click', function(){
      var current = root.getAttribute('data-theme') || 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('ht-theme', next); } catch(e){}
    });
  }
})();

// Mobile nav toggle
(function(){
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function(){
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ links.classList.remove('open'); });
    });
  }
})();

// Generic FormSubmit AJAX handler — shows inline success/error without leaving the page
function wireFormToEmail(formId, subject) {
  var form = document.getElementById(formId);
  if (!form) return;
  var btn = form.querySelector('button[type="submit"]');
  var originalText = btn ? btn.textContent : '';

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

    var data = {};
    new FormData(form).forEach(function(value, key){ data[key] = value; });
    data._subject = subject;

    fetch('https://formsubmit.co/ajax/asgharabdullah847@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function(res){ return res.json(); })
    .then(function(){
      if (btn) { btn.textContent = 'Sent — thank you!'; }
      form.reset();
      var stars = form.querySelectorAll('.star.active');
      stars.forEach(function(s){ s.classList.remove('active'); });
      setTimeout(function(){
        if (btn) { btn.textContent = originalText; btn.disabled = false; }
      }, 4000);
    })
    .catch(function(){
      if (btn) { btn.textContent = 'Something went wrong — try again'; btn.disabled = false; }
      setTimeout(function(){
        if (btn) { btn.textContent = originalText; }
      }, 3000);
    });
  });
}

wireFormToEmail('contactForm', 'New project inquiry — Hassam Tech');
wireFormToEmail('reviewForm', 'New client review — Hassam Tech');

// Star rating input
(function(){
  var wrap = document.getElementById('starInput');
  if (!wrap) return;
  var stars = wrap.querySelectorAll('.star');
  var hidden = document.getElementById('ratingValue');

  function setRating(val) {
    stars.forEach(function(s){
      s.classList.toggle('active', parseInt(s.dataset.value, 10) <= val);
    });
    if (hidden) hidden.value = val;
  }
  stars.forEach(function(s){
    s.addEventListener('click', function(){ setRating(parseInt(s.dataset.value, 10)); });
  });
  setRating(5); // default
})();

// Scroll reveal
(function(){
  var els = document.querySelectorAll('.service-row, .project-card, .process-step');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12 });
    els.forEach(function(el){ el.classList.add('reveal'); io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('reveal', 'in'); });
  }
})();
