// Champ de saisie : ouvre l'accès gratuit dans un nouvel onglet avec la demande en ?prompt=
document.querySelectorAll('.aia-hero').forEach(function (h) {
  var url = h.dataset.url, f = h.querySelector('[data-aia-form]'), t = f.querySelector('textarea');
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = t.value.trim();
    if (!q) { t.focus(); return; }
    window.open(url + (url.indexOf('?') < 0 ? '?' : '&') + 'prompt=' + encodeURIComponent(q), '_blank', 'noopener');
  });
  t.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); f.requestSubmit(); }
  });
  h.querySelectorAll('.aia-chip').forEach(function (c) {
    c.addEventListener('click', function () { t.value = c.textContent; t.focus(); });
  });
});
