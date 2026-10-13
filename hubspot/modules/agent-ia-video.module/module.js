// Remplace l'encart par la vidéo dès qu'un lien YouTube, Vimeo ou .mp4 est renseigné
document.querySelectorAll('.aia-video-sec .aia-video').forEach(function (box) {
  var url = (box.dataset.url || '').trim();
  if (!url) return;
  var yt = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/), vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (/\.(mp4|webm)(\?|$)/i.test(url)) {
    box.innerHTML = '<video controls playsinline src="' + url + '"></video>';
  } else if (yt || vimeo) {
    var src = yt ? 'https://www.youtube-nocookie.com/embed/' + yt[1] + '?rel=0' : 'https://player.vimeo.com/video/' + vimeo[1];
    box.innerHTML = '<iframe src="' + src + '" title="Vidéo de vision de l\'agent IA Flatchr" allow="encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe>';
  }
});
