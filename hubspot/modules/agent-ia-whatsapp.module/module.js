// Démo WhatsApp : conversation visible d'emblée, jouée en animation à l'arrivée à l'écran,
// puis rejouée automatiquement 10 minutes après la fin (dès que la démo est visible).
var AIA_REPLAY_MINUTES = 10;
document.querySelectorAll('.aia-demo').forEach(function (sec) {
  var chat = sec.querySelector('[data-aia-chat]'), msgs = [].slice.call(chat.querySelectorAll('.aia-msg')), timers = [];
  if (!msgs.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  var visible = false, due = true, playing = false;
  function play() {
    due = false; playing = true;
    timers.forEach(clearTimeout); timers = [];
    msgs.forEach(function (m) { m.classList.add('aia-hidden'); m.classList.remove('aia-in'); });
    chat.scrollTop = 0;
    var delay = 400;
    msgs.forEach(function (m) {
      var isAgent = m.classList.contains('aia-agent');
      if (isAgent) {
        timers.push(setTimeout(function () {
          var t = document.createElement('div'); t.className = 'aia-typing'; t.innerHTML = '<i></i><i></i><i></i>';
          chat.appendChild(t); chat.scrollTop = chat.scrollHeight;
        }, delay));
        delay += 1100;
      }
      timers.push(setTimeout(function () {
        var t = chat.querySelector('.aia-typing'); if (t) t.remove();
        m.classList.remove('aia-hidden'); m.classList.add('aia-in');
        chat.scrollTop = chat.scrollHeight;
      }, delay));
      delay += isAgent ? 1600 : 1300;
    });
    // Fin de la démo : prochaine lecture dans 10 minutes
    timers.push(setTimeout(function () {
      playing = false;
      timers.push(setTimeout(function () { due = true; if (visible) play(); }, AIA_REPLAY_MINUTES * 60000));
    }, delay));
  }
  new IntersectionObserver(function (entries) {
    visible = entries[0].isIntersecting;
    if (visible && due && !playing) play();
  }, { threshold: 0.35 }).observe(chat);
});
