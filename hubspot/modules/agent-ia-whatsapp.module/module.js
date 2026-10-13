// Démo WhatsApp : la conversation est visible d'emblée, puis rejouée en animation à l'arrivée à l'écran
document.querySelectorAll('.aia-demo').forEach(function (sec) {
  var chat = sec.querySelector('[data-aia-chat]'), msgs = [].slice.call(chat.querySelectorAll('.aia-msg')), timers = [];
  if (!msgs.length) return;
  function play() {
    timers.forEach(clearTimeout); timers = [];
    var old = chat.querySelector('.aia-typing'); if (old) old.remove();
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
  }
  var replay = sec.querySelector('[data-aia-replay]');
  if (replay) replay.addEventListener('click', play);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { play(); obs.disconnect(); }
    }, { threshold: 0.35 });
    obs.observe(chat);
  }
});
