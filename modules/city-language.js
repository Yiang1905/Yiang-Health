(function () {
  const pairs = {
    'jincheng.html': 'jincheng-zh.html',
    'jincheng-zh.html': 'jincheng.html',
    'linfen.html': 'linfen-zh.html',
    'linfen-zh.html': 'linfen.html'
  };
  function init() {
    const page = location.pathname.split('/').pop() || '';
    if (!pairs[page]) return;
    const zhPage = page.endsWith('-zh.html');
    const select = document.getElementById('lang-select');
    if (select) {
      select.innerHTML = '<option value="en">English</option><option value="zh-CN">简体中文</option>';
      select.value = zhPage ? 'zh-CN' : 'en';
      select.addEventListener('change', function () {
        const zh = select.value === 'zh-CN' || select.value === 'zh-TW';
        const target = zh ? (page.replace('.html','').replace('-zh','') + '-zh.html') : page.replace('-zh.html','.html');
        localStorage.setItem('yiang_health_lang', zh ? 'zh-CN' : 'en');
        if (target !== page) location.href = target + location.hash;
      });
    }
    const stored = localStorage.getItem('yiang_health_lang');
    const browserZh = (navigator.language || '').toLowerCase().startsWith('zh');
    const shouldZh = stored ? stored === 'zh-CN' || stored === 'zh-TW' : browserZh;
    if (shouldZh !== zhPage) {
      const target = zhPage ? page.replace('-zh.html','.html') : page.replace('.html','-zh.html');
      location.replace(target + location.hash);
      return;
    }
    document.documentElement.lang = zhPage ? 'zh-CN' : 'en';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();