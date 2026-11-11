(function () {
  const provinces = [
    ['Xinjiang','新疆',87.6,43.8],['Tibet','西藏',91.1,29.7],['Qinghai','青海',96.0,36.6],['Gansu','甘肃',103.8,36.1],['Ningxia','宁夏',106.3,38.5],['Inner Mongolia','内蒙古',111.7,40.8],['Heilongjiang','黑龙江',127.0,47.0],['Jilin','吉林',126.5,43.8],['Liaoning','辽宁',123.4,41.8],['Beijing','北京',116.4,39.9],['Tianjin','天津',117.2,39.1],['Hebei','河北',114.5,38.0],['Shanxi','山西',112.3,37.8],['Shaanxi','陕西',108.9,34.3],['Shandong','山东',117.0,36.7],['Henan','河南',113.6,34.7],['Jiangsu','江苏',118.8,32.1,16,-10],['Anhui','安徽',117.3,31.9,8,-8],['Shanghai','上海',121.5,31.2],['Zhejiang','浙江',120.2,30.3],['Hubei','湖北',114.3,30.6],['Sichuan','四川',104.1,30.7],['Chongqing','重庆',106.6,29.6],['Hunan','湖南',112.9,28.2],['Jiangxi','江西',115.9,28.7],['Guizhou','贵州',106.7,26.6],['Yunnan','云南',102.7,25.0],['Guangxi','广西',108.3,22.8],['Guangdong','广东',113.3,23.1],['Fujian','福建',119.3,26.1],['Hainan','海南',110.3,19.2],['Taiwan','台湾',121.0,23.7],['Hong Kong','香港',114.2,22.3,20,-5],['Macau','澳门',113.5,22.2,-18,12]
  ];
  const cityNames = [
    ['Jincheng','晋城'],['Linfen','临汾']
  ];
  const copy = {
    en:{kicker:'OUR LOCAL GUIDES',title:'Start in Shanxi. Explore Jincheng and Linfen.',intro:'Yiang Health currently focuses its detailed local guides on Jincheng and Linfen in Shanxi. Other regions remain a research directory, not a claim of complete coverage or local service.',legend:['Detailed local guides','Shanxi · local focus','Other regions · research only'],promise:'Start with the journey, not just the attraction.',promiseText:'Practical route notes, local culture, food and places to explore—clearly separated from medical care.',stage:'SHANXI LOCAL GUIDES',stageHint:'Select Jincheng or Linfen',cityLabel:'OPEN A SHANXI CITY GUIDE',caption:'Approximate locator map, not for navigation.',all:'View 18 policy pilot regions · research index ↗',pairKicker:'TWO CITIES · ONE HOME PROVINCE',pairTitle:'Discover Shanxi through Jincheng and Linfen.',pairDesc:'From the Southern Taihang mountains and iron-flower nights to the Yellow River, ancient heritage and the flavors of southern Shanxi—start with the place that speaks to you.'},
    zh:{kicker:'我们的本地指南',title:'从山西开始，先探索晋城与临汾。',intro:'Yiang Health 当前重点完善山西晋城与临汾两座城市的详细指南。其他地区仅作为政策研究目录展示，不代表已具备完整内容或当地服务。',legend:['已整理的本地指南','山西 · 当前重点','其他地区 · 仅供研究'],promise:'先弄清楚怎么到达，再决定去哪里。',promiseText:'提供交通、地方文化、美食与目的地信息，并明确区分旅行信息和医疗服务。',stage:'山西本地指南',stageHint:'选择晋城或临汾查看信息',cityLabel:'打开山西城市指南',caption:'示意定位图，不可用于导航。',all:'查看18个政策试点地区 · 研究目录 ↗',pairKicker:'两座城市 · 同一片家乡',pairTitle:'从晋城与临汾认识山西。',pairDesc:'从太行南段山水、打铁花，到黄河风光、古老遗产与晋南风味，选择你感兴趣的地方开始探索。'}
  };
  function init() {
    const lang = window.I18n ? I18n.getCurrentLang() : (localStorage.getItem('yiang_health_lang') || 'en');
    const zh = lang === 'zh-CN' || lang === 'zh-TW'; const d = zh ? copy.zh : copy.en;
    const put=(s,v)=>{const e=document.querySelector(s);if(e)e.textContent=v;};
    put('.china-map-intro .section-kicker',d.kicker);put('#china-map-title',d.title);put('.china-map-intro > p',d.intro);
    document.querySelectorAll('.china-map-legend > span').forEach((e,i)=>{if(d.legend[i])e.lastChild.textContent=' '+d.legend[i];});
    put('.china-map-promise strong',d.promise);put('.china-map-promise span',d.promiseText);
    const stage=document.querySelector('.china-map-stage-top');if(stage){const s=stage.querySelectorAll('span');if(s[0])s[0].textContent=d.stage;if(s[1])s[1].textContent=d.stageHint;}
    put('.city-links-label',d.cityLabel);put('.china-map-caption span',d.caption);put('.china-map-caption a',d.all);
    put('.scp-heading .section-kicker',d.pairKicker);put('#shanxi-city-pair-title',d.pairTitle);put('.scp-heading p',d.pairDesc);
    document.querySelectorAll('.china-city-links a').forEach((a,i)=>{if(cityNames[i])a.textContent=zh?cityNames[i][1]:cityNames[i][0];else if(i===2)a.textContent=zh?'18个政策试点地区 · 研究目录':'18 policy pilot regions · research index';});
    const markerZh={'Hulunbuir':'呼伦贝尔','Heihe':'黑河','Yanbian':'延边','Beijing':'北京','Tianjin':'天津','Shanghai':'上海','Nantong':'南通','Zhejiang':'浙江','Shandong':'山东','Guangdong':'广东','Guangxi':'广西','Hainan':'海南','Chongqing':'重庆','Chengdu':'成都','Kunming':'昆明',"Shaanxi":"陕西","Gansu":"甘肃","Urumqi":"乌鲁木齐",'Linfen':'临汾','Jincheng':'晋城','Shanxi':'山西'};
    document.querySelectorAll('.marker-label').forEach(e=>{if(!e.dataset.en)e.dataset.en=e.textContent;const base=e.dataset.en.split(' / ')[0].split(' - ')[0];e.textContent=zh?(markerZh[base]||e.dataset.en):e.dataset.en;});
    document.querySelectorAll('.china-panel-kicker').forEach(e=>{if(zh){const k=e.id==='china-panel-kicker'?'山西本地指南 · 晋城与临汾':(e.textContent==='GETTING THERE'?'如何到达':e.textContent);e.textContent=k;}else{if(e.id==='china-panel-kicker')e.textContent='SHANXI LOCAL GUIDES | JINCHENG & LINFEN';else if(e.textContent==='如何到达')e.textContent='GETTING THERE';}});
    const link=document.getElementById('china-panel-link');if(link)link.textContent=zh?'查看目的地指南 ↗':'Explore destination overview ↗';
    document.querySelectorAll('.china-route-row strong').forEach((e,i)=>{if(zh)e.textContent=['乘飞机','乘高铁','公路与当地接驳'][i];else e.textContent=['By air','By high-speed rail','By road & local transfer'][i];});
    document.querySelectorAll('.scp-card h3').forEach((e,i)=>e.textContent=zh?['晋城','临汾'][i]:['Jincheng','Linfen'][i]);
    const cardText=zh?[
      ['太行南段','打铁花表演、山地风光、古堡院落与地方美食。','探索晋城 ↗'],
      ['黄河与古老中国','壶口瀑布、陶寺遗址、洪洞寻根文化、古寺与丰富的县域饮食。','探索临汾 ↗']
    ]:[
      ['THE SOUTHERN TAIHANG','Iron-flower performances, mountain ridgelines, historic courtyards and hearty local food.','Explore Jincheng ↗'],
      ['THE YELLOW RIVER & ANCIENT CHINA','Hukou Waterfall, Taosi archaeology, Hongtong family-history traditions, temples and a rich county-by-county food culture.','Explore Linfen ↗']
    ];
    document.querySelectorAll('.scp-card').forEach((e,i)=>{const spans=e.querySelectorAll('span');if(spans[0])spans[0].textContent=cardText[i][0];const p=e.querySelector('p');if(p)p.textContent=cardText[i][1];const strong=e.querySelector('strong');if(strong)strong.textContent=cardText[i][2];});
    const panelDesc=document.getElementById('china-panel-description');if(panelDesc&&zh)panelDesc.textContent='选择地图上的城市标记，查看当地交通与行程提示。具体航班、车次、开放时间和道路情况，请出行前以官方信息为准。';
    document.querySelectorAll('.china-route-row p').forEach((e,i)=>{if(zh)e.textContent=['请按抵达机场、住宿地点与最终接驳时间综合比较航班。','核对车票上的具体车站，并提前规划车站至酒店或景点的接驳。','提前确认最后一段路程、停车与当地交通安排。'][i];});
    document.querySelectorAll('.scp-card img').forEach((e,i)=>{if(zh)e.alt=['晋城司徒小镇打铁花表演','临汾附近黄河壶口瀑布'][i];else e.alt=['Golden iron-flower sparks above Situ Town in Jincheng','The Yellow River surges through Hukou Waterfall near Linfen'][i];});
    const svg=document.getElementById('china-national-map');if(svg){let layer=svg.querySelector('#province-labels');if(!layer){layer=document.createElementNS('http://www.w3.org/2000/svg','g');layer.id='province-labels';svg.insertBefore(layer,svg.querySelector('#china-map-markers'));provinces.forEach(p=>{const x=55+(p[2]-73)/(135-73)*890+(p[4]||0),y=28+(54-p[3])/(54-18)*760+(p[5]||0);const t=document.createElementNS('http://www.w3.org/2000/svg','text');t.setAttribute('x',x);t.setAttribute('y',y);t.setAttribute('class','province-label');t.setAttribute('text-anchor','middle');t.dataset.en=p[0];t.dataset.zh=p[1];t.textContent=zh?p[1]:p[0];layer.appendChild(t);});}else layer.querySelectorAll('text').forEach(t=>t.textContent=zh?t.dataset.zh:t.dataset.en);}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.addEventListener('yiang:langchange',init);
})();
