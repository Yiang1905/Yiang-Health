(function(){
'use strict';
const root=document.getElementById('guide-root');
const lang=()=>window.I18n&&I18n.getCurrentLang?I18n.getCurrentLang():'zh-CN';
const zh=()=>['zh-CN','zh-TW'].includes(lang());
const L=v=>typeof v==='string'?v:(v?(zh()?(v['zh-CN']||v.en||''):(v.en||'')):'');
const T=(a,b)=>zh()?a:b;
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const para=v=>L(v)?'<p>'+esc(L(v))+'</p>':'';
const head=(eyebrow,title,desc)=>'<div class="guide-head"><span class="guide-eyebrow">'+eyebrow+'</span><h2>'+title+'</h2>'+(desc?'<p>'+desc+'</p>':'')+'</div>';
const image=(src,alt,credit)=>src?'<figure class="guide-photo"><img src="'+esc(src)+'" alt="'+esc(alt)+'" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display=&#39;none&#39;"><figcaption>'+esc(alt)+' · <a href="'+esc(credit||'#')+'" target="_blank" rel="noopener noreferrer">'+T('图片来源与授权','Image source & licence')+'</a></figcaption></figure>':'';
const card=(title,body,label)=>body?'<article class="guide-card">'+(label?'<span class="guide-label">'+esc(label)+'</span>':'')+'<h3>'+esc(title)+'</h3>'+para(body)+'</article>':'';
async function load(){
 try{
  const [pr,gr]=await Promise.all([fetch('data/pilots.json'),fetch('data/guide-details.json')]);
  if(!pr.ok||!gr.ok)throw new Error('guide data unavailable');
  const meta=await pr.json(),details=await gr.json();
  const cityId=new URLSearchParams(location.search).get('id')||'beijing';
  const city=(meta.pilots||[]).find(c=>c.id===cityId);
  if(!city){root.innerHTML='<p class="guide-note">'+T('未找到该地区资料。','Destination not found.')+' <a href="destinations.html">'+T('返回试点地区','Back to pilot regions')+'</a></p>';return;}
  const x=details[cityId]||{},name=L(city.name)||cityId,region=L(city.region),imgs=x.images||{};
  document.documentElement.lang=zh()?'zh-CN':'en';
  document.title=name+'｜'+T('详细旅行与文化指南','Detailed destination guide')+'｜Yiang Health';
  const attractions=(city.attractions||[]).map((a,i)=>'<article class="guide-card"><span class="guide-label">'+T('目的地与体验','Places & experiences')+'</span><h3>'+esc(L(a))+'</h3>'+para((x.attractionNotes||[])[i])+'</article>').join('');
  const foods=(x.foodHighlights||[]).map((f,i)=>'<article><h3>'+T('地方风味 '+(i+1),'Local flavour '+(i+1))+'</h3><p>'+esc(L(f))+'</p></article>').join('');
  const districts=(x.districts||[]).map(d=>card(L(d.title),d.text,T('按区域认识目的地','Explore by area'))).join('');
  const strengths=(x.localStrengths||[]).map(s=>'<article class="guide-strength"><h3>'+esc(L(s.title))+'</h3>'+para(s.text)+'</article>').join('');
  let itinerary=[['第 1 天','Day 1',x.day1],['第 2 天','Day 2',x.day2]].map(a=>'<article><span class="day">'+T(a[0],a[1])+'</span><h3>'+esc(L(a[2]&&a[2].title)||T('主题路线','Suggested route'))+'</h3><p>'+esc(L(a[2]))+'</p></article>').join('');
  if(x.day3&&(L(x.day3.title)||L(x.day3.text)))itinerary+='<article><span class="day">'+T('第 3 天','Day 3')+'</span><h3>'+esc(L(x.day3.title))+'</h3><p>'+esc(L(x.day3.text))+'</p></article>';
  const sources=(city.officialSources||[]).map(s=>'<a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(L(s.name)||s.name)+' ↗</a>').join('');
  const institutions=(city.hospitals||[]).map(h=>'<li><strong>'+esc(L(h.name))+'</strong>：'+esc(L(h.note))+'</li>').join('');
  const infoCards=card(T('气候与最佳出行时间','Climate & seasonal planning'),city.climate)+card(T('参考消费水平','Indicative price level'),city.priceLevel)+card(T('抵达方式与当地交通','Getting there & local transport'),city.transport)+card(T('住宿参考','Accommodation notes'),city.hotelsNote)+card(T('建议住宿区域','Suggested stay areas'),x.stayAreas);
  const heroPhoto=image(imgs.landmark,imgs.landmarkLabel||name,imgs.landmarkCredit);
  root.innerHTML=
   '<p class="guide-breadcrumb"><a href="index.html">Yiang Health</a> / <a href="destinations.html">'+T('试点地区','Pilot regions')+'</a> / '+esc(name)+'</p>'+
   '<section class="guide-hero has-photo">'+heroPhoto+'<div class="guide-hero-inner"><span class="guide-kicker">YIANG HEALTH · '+T('目的地详细指南','DETAILED DESTINATION GUIDE')+'</span><h1>'+esc(name)+'</h1><p>'+esc(L(x.cityStory)||L(x.overview))+'</p><div class="guide-tags"><span>'+esc(region)+'</span><span>'+T('完整目的地介绍','Full destination guide')+'</span><span>'+T('旅行与文化信息','Travel & culture')+'</span></div></div></section>'+
   '<nav class="guide-jumps"><a href="#overview">'+T('目的地概览','Overview')+'</a><a href="#strengths">'+T('当地优势项目','Local strengths')+'</a><a href="#districts">'+T('区域介绍','Areas')+'</a><a href="#attractions">'+T('景点体验','Places')+'</a><a href="#food">'+T('地方美食','Food')+'</a><a href="#climate">'+T('气候季节','Climate')+'</a><a href="#route">'+T('行程参考','Itinerary')+'</a><a href="#practical">'+T('实用信息','Practical')+'</a></nav>'+
   '<section class="guide-section" id="overview">'+head(T('先认识这片地方','GET TO KNOW THE PLACE'),T('目的地概览','Destination overview'),T('先了解城市特点、旅行节奏和区域范围，再决定要去哪些地方。','Understand the character, pace and geography before choosing places to visit.'))+'<div class="guide-overview">'+para(x.cityStory)+para(x.overview)+para(city.tcmFocus)+'</div></section>'+
   (strengths?'<section class="guide-section" id="strengths">'+head(T('不止于观光','LOCAL CAPABILITIES'),T('当地特色产业与优势项目','Local strengths & signature sectors'),T('整理当地具有代表性的产业、产品、服务与文化资源，供旅行体验和商务了解参考；不代表项目背书或合作承诺。','A public-orientation overview of regional sectors, products, services and cultural capabilities—not endorsements or partnership claims.'))+'<div class="guide-strength-grid">'+strengths+'</div></section>':'')+
   '<section class="guide-section" id="districts">'+head(T('按区域安排，不赶路','EXPLORE BY AREA'),T('区域与街区介绍','Areas & neighbourhoods'),T('按实际地理片区介绍适合体验的内容。跨区或跨县市移动前，请先核对交通时间。','Area-based ideas help avoid unrealistic cross-city transfers.'))+'<div class="guide-grid">'+districts+'</div></section>'+
   '<section class="guide-section" id="attractions">'+head(T('值得专程了解的地方','PLACES TO EXPLORE'),T('代表性景点与体验','Places & experiences'),T('景点开放、预约、票务与接驳可能变化，出发前请通过官方渠道核实。','Opening, booking, ticketing and transfers can change. Verify before departure.'))+image(imgs.landmark,imgs.landmarkLabel||name,imgs.landmarkCredit)+'<div class="guide-grid two">'+attractions+'</div></section>'+
   '<section class="guide-section" id="food">'+head(T('从地方饮食认识城市','LOCAL FOOD CULTURE'),T('地方美食与饮食文化','Local food & dining'),T('用当地代表性食物照片配合饮食文化说明；不代表具体餐馆推荐。','Regional food imagery and context, not endorsements of individual restaurants.'))+image(imgs.food,imgs.foodLabel||T('地方美食','Local food'),imgs.foodCredit)+'<div class="guide-food-list">'+foods+'</div><div class="guide-callout" style="margin-top:14px">'+esc(T('点餐时留意食材、过敏原、辣度、汤底和计价方式；有特殊饮食需求时直接向店家确认。','Ask about ingredients, allergens, spice level, broth and pricing directly with the restaurant.'))+'</div></section>'+
   '<section class="guide-section" id="climate">'+head(T('天气决定旅行节奏','CLIMATE & SEASONS'),T('当地气候与四季风景','Climate & seasonal character'),T('结合当地代表性自然景观理解季节特点。天气会影响景区开放、道路与户外体验。','A visual introduction to local landscapes and seasonal conditions. Weather can affect access and outdoor activities.'))+image(imgs.climate,imgs.climateLabel||T('当地风光与季节','Local landscape and seasons'),imgs.climateCredit)+'<div class="guide-overview">'+para(x.seasonSummary)+para(city.climate)+'</div></section>'+
   '<section class="guide-section">'+head(T('选择适合自己的落脚点','STAY & MOVE'),T('住宿、交通与消费参考','Stay, transport & budget'),T('酒店位置应围绕主要行程选择，不要只看行政区名称或地图直线距离。','Choose accommodation around your actual itinerary, not just district names.'))+'<div class="guide-grid">'+infoCards+'</div></section>'+
   '<section class="guide-section" id="route">'+head(T('留出合理交通时间','SUGGESTED ITINERARY'),T('三天行程参考','A practical three-day starting plan'),T('这是灵活的行程框架，不是固定团程。根据预约结果、天气、体力和交通班次调整。','A flexible framework, not a fixed tour. Adjust for bookings, weather, pace and transport.'))+'<div class="guide-plan">'+itinerary+'</div></section>'+
   '<section class="guide-section" id="practical">'+head(T('出发前核对','BEFORE YOU GO'),T('实用出行提示','Practical travel notes'),T('优先确认交通、开放、预约和最后一段接驳。','Confirm transport, opening, reservations and the final transfer.'))+'<div class="guide-overview">'+para(x.practical)+para(x.advice)+'</div></section>'+
   (sources?'<section class="guide-section">'+head(T('信息核验入口','VERIFY DETAILS'),T('官方信息来源','Official information sources'),T('用于核对开放时间、交通、预约和现场规定。','Verify opening, transport, booking and local rules.'))+'<div class="guide-overview guide-source">'+sources+'</div></section>':'')+
   (institutions?'<section class="guide-section">'+head(T('公开机构信息','PUBLIC INFORMATION'),T('公开列示机构（需自行核实）','Publicly listed institutions (verify independently)'))+'<div class="guide-overview"><ul>'+institutions+'</ul><p>'+esc(T('此处仅整理公开信息，不构成医疗推荐、转诊、服务可及性或合作关系说明。','Public information only; not a medical recommendation, referral, access guarantee or partnership claim.'))+'</p></div></section>':'')+
   '<p class="guide-disclaimer">'+esc(T('Yiang Health 是独立的旅行与文化信息项目，不是政府旅游门户或旅行社。页面不诊断疾病、不提供治疗建议，也不作医疗效果承诺。产业信息为公开资料导向，具体项目与服务请向当地机构核实。图片来源与授权请点击图片说明。','Yiang Health is an independent travel and culture information project, not a government tourism portal or travel agency. It does not diagnose, treat or make medical efficacy claims. Verify business and travel details with official sources. Image credits and licences are linked in captions.'))+'</p>';
 }catch(e){console.error(e);root.innerHTML='<p class="guide-note">'+T('资料暂时无法加载，请稍后重试。','Guide data could not be loaded. Please try again later.')+'</p>';}
}
document.addEventListener('DOMContentLoaded',()=>{if(window.I18n&&I18n.init)I18n.init();load();});
if('serviceWorker'in navigator)navigator.serviceWorker.register('service-worker.js').catch(()=>{});
})();