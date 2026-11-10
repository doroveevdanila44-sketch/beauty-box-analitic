/* Кнопка «Чат с РОБОРАБ» в шапке любого приложения. Подключается одной строкой:
   <script src="roborab-chat.js" defer></script>
   Сама находит шапку, добавляет кнопку и открывает чат РОБОРАБ поверх приложения. */
(function () {
  if (window.__rrChat) return;
  window.__rrChat = true;
  var URL_CHAT = 'https://roborabaichat.vercel.app/';
  var ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>';
  var CLOSE = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  var css = document.createElement('style');
  css.textContent =
    '.rr-header-row{grid-auto-flow:column;grid-auto-columns:auto}' +
    '.rr-chat-btn{justify-self:end}' +
    '.rr-chat-btn svg{width:20px;height:20px}' +
    '.rr-chat-layer{position:fixed;inset:0;z-index:2147483000;display:none;flex-direction:column;background:#f4f4f2}' +
    '.rr-chat-layer.on{display:flex}' +
    '.rr-chat-top{flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px;box-sizing:border-box;min-height:calc(56px + env(safe-area-inset-top,0px));padding:env(safe-area-inset-top,0px) 12px 0 20px;background:#141414;color:#fff;border-radius:0 0 28px 28px;font:italic 900 17px/1 Montserrat,Manrope,system-ui,sans-serif;position:relative;z-index:2}' +
    '.rr-chat-top small{font:600 12px/1 Manrope,system-ui,sans-serif;font-style:normal;opacity:.7;margin-left:8px}' +
    '.rr-chat-x{width:44px;height:44px;border-radius:999px;border:0;background:rgba(255,255,255,.12);color:#fff;display:grid;place-items:center;cursor:pointer}' +
    '.rr-chat-x svg{width:20px;height:20px}' +
    '.rr-chat-frame{flex:1;width:100%;border:0;margin-top:-28px;padding-top:0;background:#f4f4f2}';
  document.head.appendChild(css);
  var layer, frame, last;
  function open() {
    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'rr-chat-layer';
      layer.setAttribute('role', 'dialog');
      layer.setAttribute('aria-label', 'Чат с РОБОРАБ');
      layer.innerHTML = '<div class="rr-chat-top"><span>РОБОРАБ<small>Чат</small></span><button type="button" class="rr-chat-x" aria-label="Закрыть чат">' + CLOSE + '</button></div>';
      frame = document.createElement('iframe');
      frame.className = 'rr-chat-frame';
      frame.title = 'Чат с РОБОРАБ';
      frame.allow = 'clipboard-write';
      layer.appendChild(frame);
      layer.querySelector('.rr-chat-x').onclick = close;
      document.body.appendChild(layer);
    }
    if (!frame.src) frame.src = URL_CHAT;
    last = document.activeElement;
    layer.classList.add('on');
    document.documentElement.style.overflow = 'hidden';
    layer.querySelector('.rr-chat-x').focus();
  }
  function close() {
    if (!layer) return;
    layer.classList.remove('on');
    document.documentElement.style.overflow = '';
    if (last && last.focus) last.focus();
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && layer && layer.classList.contains('on')) close(); });
  window.RoboRabChat = { open: open, close: close };
  function mount() {
    var rows = document.querySelectorAll('[data-rr-scroll-header] .rr-header-row');
    rows.forEach(function (row) {
      if (row.querySelector('.rr-chat-btn')) return;
      var host = row.querySelector('.top-actions') || row;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'rr-header-action rr-chat-btn';
      b.setAttribute('aria-label', 'Чат с РОБОРАБ');
      b.title = 'Чат с РОБОРАБ';
      b.innerHTML = ICON;
      b.onclick = open;
      var first = host.querySelector('.rr-header-action');
      host.insertBefore(b, first || null);
    });
  }
  mount();
  new MutationObserver(mount).observe(document.documentElement, {childList: true, subtree: true});
})();
