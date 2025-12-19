// Small script to add page transition (fade) and button ripple effect
(function(){
  function onReady(){
    // page enter animation
    document.documentElement.classList.add('page-enter');

    // Intercept internal link clicks for page-exit animation
    document.addEventListener('click', function(e){
      var a = e.target.closest('a');
      if(!a) return;
      var href = a.getAttribute('href');
      // Only intercept same-page navigation (not external links or anchors)
      if(!href || href.startsWith('http') || href.startsWith('#') || a.target === '_blank') return;

      e.preventDefault();
      document.documentElement.classList.remove('page-enter');
      document.documentElement.classList.add('page-exit');
      setTimeout(function(){ window.location = href; }, 340);
    }, true);

    // Button ripple effect
    document.addEventListener('click', function(e){
      var btn = e.target.closest('.btn');
      if(!btn) return;
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      var size = Math.max(rect.width, rect.height) * 0.6;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      btn.appendChild(ripple);
      setTimeout(function(){ ripple.remove(); }, 650);
    }, true);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady);
  else onReady();
})();