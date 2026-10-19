(function () {
  const provinces = [
    ['Xinjiang','新疆',150,370],['Tibet','西藏',255,575],['Qinghai','青海',330,425],['Gansu','甘肃',420,360],['Ningxia','宁夏',475,330],['Inner Mongolia','内蒙古',570,230],['Heilongjiang','黑龙江',835,120],['Jilin','吉林',825,205],['Liaoning','辽宁',805,255],['Beijing','北京',745,270],['Tianjin','天津',760,285],['Hebei','河北',705,300],['Shanxi','山西',650,335],['Shaanxi','陕西',590,390],['Shandong','山东',765,335],['Henan','河南',680,405],['Jiangsu','江苏',770,420],['Anhui','安徽',735,455],['Shanghai','上海',805,445],['Zhejiang','浙江',800,490],['Hubei','湖北',650,475],['Sichuan','四川',510,490],['Chongqing','重庆',600,490],['Hunan','湖南',665,540],['Jiangxi','江西',730,555],['Guizhou','贵州',575,575],['Yunnan','云南',475,615],['Guangxi','广西',630,630],['Guangdong','广东',725,640],['Fujian','福建',785,560],['Hainan','海南',690,735],['Taiwan','台湾',870,610],['Hong Kong','香港',750,670],['Macau','澳门',735,675]
  ];
  const mapText = {
    en: { kicker:'OUR ROOTS · OUR ROADMAP', title:'Born in Shanxi. Built to help you explore China.', intro:'Yiang Health comes from Shanxi, China. We are starting here, then building practical city guides across the country—with the journey there made clear before the sightseeing begins.', legend:['Pilot destinations','Shanxi · our home base','More destinations to come'], promise:'First question: how do I get there?', promiseText:'Airports, high-speed rail, road access, local transfers and realistic route planning—not just attraction lists.', stage:'EXPLORE CHINA', stageHint:'Select a marker for travel notes', cityLabel:'OPEN A CITY GUIDE', caption:'Approximate locator map, not for navigation.', all:'View all pilot destinations ↗', pairKicker:'TWO CITIES · ONE HOME PROVINCE', pairTitle:'Discover Shanxi through Jincheng and Linfen.', pairDesc:'From the Southern Taihang mountains and iron-flower nights to the Yellow River, ancient heritage and the flavors of southern Shanxi—start with the place that speaks to you.' },
    'zh-CN': { kicker:'我们的起点 · 我们的路线图', title:'源自山西，帮助你探索中国。', intro:'Yiang Health 源自中国山西。我们从这里开始，逐步建立全国目的地实用指南，让游客在出发前就能了解交通与行程安排。', legend:['试点目的地','山西 · 我们的家乡','更多目的地持续增加'], promise:'规划旅程，先弄清楚怎么到达。', promiseText:'机场、高铁、公路、当地接驳与合理的行程安排，而不只是罗列景点。', stage:'探索中国', stageHint:'点击地图标记查看出行信息', cityLabel:'打开城市指南', caption:'示意定位图，不可用于导航。', all:'查看全部试点目的地 ↗', pairKicker:'两座城市 · 同一片家乡', pairTitle:'从晋城与临汾认识山西。', pairDesc:'从太行南段山水、打铁花，到黄河风光、古老遗产与晋南风味，选择你感兴趣的地方开始探索。' }
  };
  const cityNames = [
    ['Jincheng · 晋城','晋城'],['Linfen · 临汾','临汾'],['Hulunbuir','呼伦贝尔'],['Heihe','黑河'],['Yanbian · Yanji','延边 · 延吉'],['Beijing','北京'],['Tianjin','天津'],['Shanghai','上海'],['Nantong','南通'],['Zhejiang · Hangzhou','浙江 · 杭州'],['Shandong · Jinan','山东 · 济南'],['Guangdong · Guangzhou','广东 · 广州'],['Guangxi · Nanning','广西 · 南宁'],['Hainan','海南'],['Chongqing','重庆'],['Chengdu','成都'],['Kunming','昆明'],["Shaanxi · Xi’an",'陕西 · 西安'],['Gansu · Lanzhou','甘肃 · 兰州'],['Urumqi','乌鲁木齐']
  ];
  function apply() {
    const lang = window.I18n ? I18n.getCurrentLang() : 'en';
    const zh = lang === 'zh-CN' || lang === 'zh-TW';
    const d = zh ? mapText['zh-CN'] : mapText.en;
    const put = (selector, value) => { const el = document.querySelector(selector); if (el) el.textContent = value; };
    put('.china-map-intro .section-kicker', d.kicker);
    const title = document.getElementById('china-map-title'); if (title) title.textContent = d.title;
    const intro = document.querySelector('.china-map-intro > p'); if (intro) intro.textContent = d.intro;
    document.querySelectorAll('.china-map-legend > span').forEach((el,i) => { if(d.legend[i]) el.lastChild.textContent = ' ' + d.legend[i]; });
    put('.china-map-promise strong', d.promise); put('.china-map-promise span', d.promiseText);
    const stage = document.querySelector('.china-map-stage-top'); if(stage){const spans=stage.querySelectorAll('span');if(spans[0])spans[0].textContent=d.stage;if(spans[1])spans[1].textContent=d.stageHint;}
    put('.city-links-label',d.cityLabel); put('.china-map-caption span',d.caption); put('.china-map-caption a',d.all);
    put('.scp-heading .section-kicker',d.pairKicker); put('#shanxi-city-pair-title',d.pairTitle); put('.scp-heading p',d.pairDesc);
    document.querySelectorAll('.china-city-links a').forEach((a,i)=>{if(cityNames[i])a.textContent=zh?cityNames[i][1]:cityNames[i][0];});
    document.querySelectorAll('.scp-card h3').forEach((el,i)=>el.textContent=zh?['晋城','临汾'][i]:['Jincheng · 晋城','Linfen · 临汾'][i]);
    const svg = document.getElementById('china-national-map');
    if(svg){let layer=svg.querySelector('#province-labels');if(!layer){layer=document.createElementNS('http://www.w3.org/2000/svg','g');layer.id='province-labels';svg.insertBefore(layer,svg.querySelector('#china-map-markers'));provinces.forEach(p=>{const t=document.createElementNS('http://www.w3.org/2000/svg','text');t.setAttribute('x',p[2]);t.setAttribute('y',p[3]);t.setAttribute('class','province-label');t.setAttribute('text-anchor','middle');t.dataset.en=p[0];t.dataset.zh=p[1];t.textContent=zh?p[1]:p[0];layer.appendChild(t);});}else layer.querySelectorAll('text').forEach(t=>t.textContent=zh?t.dataset.zh:t.dataset.en);}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
  window.addEventListener('yiang:langchange',apply);
})();
