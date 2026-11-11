(function () {
  const places = [
    ['hulunbuir','Hulunbuir',119.76,49.17,'pilot','Open grasslands, wetlands and vast northern landscapes. Distances between sights can be substantial, so plan the final road transfer.','Hailar Dongshan Airport; check seasonal routes.','Compare rail arrivals in Hailar with your exact destination.','Arrange reliable local transport for remote grassland and wetland sites.','Grasslands','Long-distance travel','destinations.html'],
    ['heihe','Heihe',127.5,50.25,'pilot','A Heilongjiang River border city with northeastern food and seasonal nature experiences. Check current rules before visiting border areas.','Check current flights to Heihe Airport.','Compare train services from Harbin and other regional hubs.','Taxis can work in town; confirm access rules for border-area visits.','Riverfront city','Border culture','destinations.html'],
    ['yanbian','Yanbian / Yanji',129.5,42.9,'pilot','Explore Korean-Chinese food, night markets and the wider Changbai Mountain region. Plan Yanji and mountain transfers separately.','Yanji Chaoyangchuan Airport.','Check services to Yanji West railway station.','Book a confirmed transfer for Changbai Mountain rather than assuming a quick city taxi ride.','Local cuisine','Changbai gateway','destinations.html'],
    ['beijing','Beijing',116.4,39.9,'pilot','A major international gateway with extensive public transport and dense historic and cultural sights.','Choose Beijing Capital or Daxing Airport according to your flight.','Several major railway stations serve different routes; check the station on your ticket.','Metro is often practical; allow extra time for peak-hour traffic.','International gateway','History & culture','destinations.html'],
    ['tianjin','Tianjin',117.2,39.12,'pilot','A port city known for Haihe River scenery and historic neighbourhoods, easy to combine with Beijing.','Tianjin Binhai International Airport.','High-speed rail links Tianjin and Beijing; confirm station and departure time.','Combine metro and taxis, checking distances between sights.','River scenery','Beijing connection','destinations.html'],
    ['shanghai','Shanghai',121.47,31.23,'pilot','An international arrival hub for waterfront walks, gardens, food and urban culture, with an extensive metro network.','Choose Pudong or Hongqiao according to your route.','Hongqiao is a major high-speed rail hub; confirm the station on your ticket.','Metro is useful across the city; allow for peak-hour delays by car.','Global gateway','Urban culture','destinations.html'],
    ['nantong','Nantong',120.86,32.02,'pilot','A quieter Jiangsu destination shaped by river, sea and regional food. Compare the full journey, including the last transfer.','Compare Nantong and nearby airports by total transfer time.','Check current rail services to Shanghai and Nanjing.','Road and river-crossing routes may help; check live traffic before departure.','River & sea','Local food','destinations.html'],
    ['zhejiang','Zhejiang / Hangzhou',120.16,30.27,'pilot','Hangzhou is the focus: West Lake, tea culture and classic Jiangnan scenery.','Hangzhou Xiaoshan International Airport.','Hangzhou East is a major high-speed rail station.','Metro works well in the city; tea villages need a separate last-mile plan.','West Lake','Tea culture','destinations.html'],
    ['shandong','Shandong / Jinan',117.12,36.65,'pilot','Jinan is a useful starting point for spring-water culture; coastal cities and Mount Tai require separate regional planning.','Jinan Yaoqiang International Airport.','Jinan is a rail hub; plan separate onward journeys to Mount Tai or Qingdao.','The province is large; group sights by area rather than crossing it in one day.','Spring-water city','Regional rail','destinations.html'],
    ['guangdong','Guangdong / Guangzhou',113.26,23.13,'pilot','Cantonese food, city culture and the Pearl River Delta transport network make this a flexible regional base.','Guangzhou Baiyun International Airport.','Guangzhou South is a major high-speed rail station; check the exact station on your ticket.','Metro is practical in town; compare rail and road for cross-city trips.','Cantonese food','Global connections','destinations.html'],
    ['guangxi','Guangxi / Nanning',108.37,22.82,'pilot','Karst landscapes, rice noodles and southern nature. Waterfalls and rural sights may require long transfers.','Nanning Wuxu International Airport.','Nanning is a rail hub, but many scenic areas need onward ground transport.','Use a reliable driver for rural sights and check severe-weather alerts.','Karst scenery','Rice-noodle culture','destinations.html'],
    ['hainan','Hainan',110.34,20.04,'pilot','A tropical island destination for beaches and warm-weather escapes. Haikou and Sanya are far apart, so plan island transport.','Choose Haikou or Sanya airport based on your stay.','The island high-speed railway serves key coastal areas; choose the station nearest your hotel.','Allow time for intercity travel and resort transfers, especially in peak season.','Island escape','Tropical nature','destinations.html'],
    ['chongqing','Chongqing',106.55,29.56,'pilot','Mountain-city views, river scenery and hotpot culture. Straight-line distance is not a reliable guide to travel time here.','Chongqing Jiangbei International Airport.','Check whether your ticket uses Chongqing North, West or another station.','Terrain and complex interchanges can add time; check exits and transfers in advance.','Mountain city','Hotpot culture','destinations.html'],
    ['chengdu','Chengdu',104.07,30.67,'pilot','Teahouse culture, Sichuan food and a gateway to journeys across Sichuan.','Confirm the airport shown on your ticket and your arrival time.','Chengdu East is a major high-speed rail hub.','Metro is useful in town; countryside and nature trips usually need separate transport.','Teahouses','Sichuan cuisine','destinations.html'],
    ['kunming','Kunming',102.83,24.88,'pilot','A gateway to Yunnan for lakeside walks, regional food and onward exploration.','Kunming Changshui International Airport.','Rail connections are available, but many Yunnan sights need lengthy onward travel.','Plan by region and season; mountain roads can make journeys longer than expected.','Highland climate','Yunnan cuisine','destinations.html'],
    ['shaanxi',"Shaanxi / Xi’an",108.94,34.34,'pilot','Xi’an combines major historic heritage, regional food and strong rail connections.','Xi’an Xianyang International Airport.','Xi’an North is the main high-speed rail hub; sights such as the Terracotta Army need onward transfers.','Sights are spread out; check entry requirements and allow realistic transfer time.','Historic heritage','Regional food','destinations.html'],
    ['gansu','Gansu / Lanzhou',103.83,36.06,'pilot','Silk Road history and dramatic landscapes across a very large province. Plan in sections along practical transport corridors.','Lanzhou Zhongchuan International Airport.','Lanzhou is a rail hub, but many western sights still require hours of onward travel.','Build a regional route and avoid combining distant sights in one day.','Silk Road','Northwest landscapes','destinations.html'],
    ['urumqi','Urumqi',87.62,43.82,'pilot','A key Xinjiang gateway. Long distances make flight, rail and onward-transfer planning essential.','Urumqi Tianshan International Airport; check your ticket details.','Check current rail routes and journey times before planning cross-region travel.','Use reliable local transport and check any current travel requirements for each area.','Regional gateway','Wide-open landscapes','destinations.html'],
    ['zhengzhou','Zhengzhou',113.62,34.75,'planned','A central-China transport hub and a possible future base for exploring Henan and connecting between provinces.','Check current routes to Zhengzhou Xinzheng Airport.','Zhengzhou East is a major high-speed rail hub.','Metro is useful in the city; compare rail and road for onward trips.','Central China','Rail connections','destinations.html'],
    ['nanjing','Nanjing',118.8,32.06,'planned','A Yangtze River city with deep historical layers, suitable for a future culture-focused guide.','Nanjing Lukou International Airport.','Nanjing South is a major high-speed rail station.','Use the metro in town and check walking distances around the old city.','History','Yangtze city','destinations.html'],
    ['wuhan','Wuhan',114.3,30.59,'planned','A transport hub where the Yangtze and Han rivers meet, with room for future city and regional itineraries.','Wuhan Tianhe International Airport.','Wuhan, Hankou and Wuchang stations serve different routes; verify your ticket.','Combine metro and taxis, allowing time for cross-river trips.','River junction','City walks','destinations.html'],
    ['xiamen','Xiamen',118.08,24.48,'planned','A coastal city and a potential base for exploring Minnan culture and seaside scenery.','Xiamen Gaoqi International Airport.','Check whether Xiamen or Xiamen North best matches your accommodation.','Island and mainland transfers differ; check the location of your hotel and sights.','Coastal scenery','Minnan culture','destinations.html'],
    ['lhasa','Lhasa',91.13,29.65,'planned','A high-altitude cultural and landscape destination. Elevation, season and a gradual itinerary deserve careful planning.','Lhasa Gonggar Airport.','Check the current rail route and allow for a long journey.','Distances and altitude matter; use reliable transport and check current local requirements.','High-altitude scenery','Culture','destinations.html'],
    ['linfen','Linfen',111.52,36.09,'home','Linfen is a southern-Shanxi base for Hukou Waterfall, Taosi archaeology, Hongtong family-history traditions, temples and distinctive local food. Plan the prefecture by area because attractions are widely spread.','Compare Linfen Yaodu and nearby airports by total door-to-door time.','Check trains to Linfen West and the exact station on your ticket.','Use a full-day road plan for Hukou Waterfall and verify weather, scenic-area notices and return transport.','Yellow River landscapes','Local food & heritage','linfen.html'],
    ['shanxi','Shanxi - Jincheng first',112.85,35.49,'home','Yiang Health comes from Shanxi. Our first in-depth local guide starts in Jincheng: Southern Taihang scenery, Situ Town iron-flower performances, regional food and historic courtyards.','Compare nearby airports plus ground transfers by total door-to-door time, not flight time alone.','Check current services to Jincheng East and plan the final transfer to your hotel or attraction.','Before visiting Situ Town, verify the visitor entrance, parking arrangements and any dated offers. Check weather and road conditions for mountain trips.','Our home province','First local guide','jincheng.html#situ']
  ];

  const layer = document.getElementById('china-map-markers');
  if (!layer) return;
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs) => {
    const n = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key, value]) => n.setAttribute(key, value));
    return n;
  };
  const xy = p => ({ x: 55 + (p[2] - 73) / (135 - 73) * 890, y: 28 + (54 - p[3]) / (54 - 18) * 760 });
  const title = document.getElementById('china-panel-title');
  const desc = document.getElementById('china-panel-description');
  const tags = document.getElementById('china-panel-tags');
  const link = document.getElementById('china-panel-link');
  const kicker = document.getElementById('china-panel-kicker');
  const air = document.getElementById('china-route-air');
  const rail = document.getElementById('china-route-rail');
  const road = document.getElementById('china-route-road');
  const expanded = document.getElementById('china-panel-expanded');
  const pilotDataPromise = fetch('data/pilots.json').then(r => { if (!r.ok) throw new Error('pilot data unavailable'); return r.json(); }).catch(() => null);
  const guideDetailsPromise = fetch('data/guide-details.json').then(r => { if (!r.ok) throw new Error('guide details unavailable'); return r.json(); }).catch(() => ({}));
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const localized = (value, zh) => typeof value === 'string' ? value : (value && (value[zh ? 'zh-CN' : 'en'] || value.en || value['zh-CN'])) || '';
  async function showPilotDetails(place, zh) {
    if (!expanded) return;
    if (place[4] !== 'pilot') { expanded.hidden = true; expanded.innerHTML = ''; return; }
    const [data, guideDetails] = await Promise.all([pilotDataPromise, guideDetailsPromise]);
    const city = data && (data.pilots || []).find(item => item.id === place[0]);
    const extra = guideDetails && guideDetails[place[0]] || {};
    if (!city) { expanded.hidden = false; expanded.textContent = zh ? '暂时无法加载该地区的详细资料。' : 'Detailed destination data is temporarily unavailable.'; return; }
    const name = localized(city.name, zh);
    const section = (heading, body) => body ? '<section class="china-guide-block"><h4>' + esc(heading) + '</h4>' + body + '</section>' : '';
    const paragraph = value => value ? '<p>' + esc(localized(value, zh)) + '</p>' : '';
    const list = values => values && values.length ? '<ul>' + values.map(v => '<li>' + esc(localized(v, zh)) + '</li>').join('') + '</ul>' : '';
    const institutions = (city.hospitals || []).map(h => '<li><strong>' + esc(localized(h.name, zh)) + '</strong><span>' + esc(localized(h.note, zh)) + '</span></li>').join('');
    const attractionNotes = (city.attractions || []).map((a,i) => '<li><strong>' + esc(localized(a, zh)) + '</strong><span>' + esc(localized((extra.attractionNotes || [])[i], zh)) + '</span></li>').join('');
    const foodHighlights = list(extra.foodHighlights || []);
    const dayPlan = [extra.day1, extra.day2].filter(Boolean).map((v,i) => '<p><strong>' + (zh ? (i===0?'第1天：':'第2天：') : (i===0?'Day 1: ':'Day 2: ')) + '</strong>' + esc(localized(v, zh)) + '</p>').join('');
    const sources = (city.officialSources || []).map(x => '<a href="' + esc(x.url) + '" target="_blank" rel="noopener noreferrer">' + esc(x.name) + '</a>').join(' · ');
    expanded.innerHTML = '<div class="china-guide-grid">' +
      section(zh ? '目的地概览' : 'Destination overview', paragraph(extra.overview)) +
      section(zh ? '气候与适合出行的季节' : 'Climate & seasonal planning', paragraph(city.climate)) +
      section(zh ? '当地美食' : 'Local food', paragraph(city.food) + foodHighlights) +
      section(zh ? '值得了解的目的地' : 'Places to explore', attractionNotes ? '<ul class=\"china-institution-list\">' + attractionNotes + '</ul>' : list(city.attractions)) +
      section(zh ? '交通与抵达方式' : 'Getting there', paragraph(city.transport)) +
      section(zh ? '住宿参考' : 'Where to stay', paragraph(city.hotelsNote) + paragraph(extra.stayAreas)) +
      section(zh ? '两日行程参考' : 'Two-day starting plan', dayPlan) +
      section(zh ? '当地出行提示' : 'Local travel notes', paragraph(extra.practical)) +
      section(zh ? '中医药与康养文化背景' : 'TCM & wellness context', paragraph(city.tcmFocus)) +
      section(zh ? '公开机构信息（需自行核实）' : 'Public institution information (verify independently)', institutions ? '<ul class="china-institution-list">' + institutions + '</ul>' : '') +
      section(zh ? '官方信息来源' : 'Official information sources', '<p>' + sources + '</p>') +
      '</div><div class="china-guide-footer"><span>' + esc(name) + (zh ? ' · 试点地区详细指南' : ' · Pilot destination guide') + '</span><a class="btn btn-primary" href="city.html?id=' + encodeURIComponent(city.id) + '">' + (zh ? '打开完整城市指南' : 'Open full destination guide') + '</a></div>';
    expanded.hidden = false;
  }

  function selectPlace(place, marker) {
    layer.querySelectorAll('.china-marker').forEach(node => node.classList.toggle('is-selected', node === marker));
    const lang = window.I18n ? I18n.getCurrentLang() : 'en';
    const zh = lang === 'zh-CN' || lang === 'zh-TW';
    const namesZh = {hulunbuir:'呼伦贝尔',heihe:'黑河',yanbian:'延边 / 延吉',beijing:'北京',tianjin:'天津',shanghai:'上海',nantong:'南通',zhejiang:'浙江 · 杭州',shandong:'山东 · 济南',guangdong:'广东 · 广州',guangxi:'广西 · 南宁',hainan:'海南',chongqing:'重庆',chengdu:'成都',kunming:'昆明',shaanxi:'陕西 · 西安',gansu:'甘肃 · 兰州',urumqi:'乌鲁木齐',zhengzhou:'郑州',nanjing:'南京',wuhan:'武汉',xiamen:'厦门',lhasa:'拉萨',linfen:'临汾',shanxi:'山西 · 晋城'};
    title.textContent = zh ? (namesZh[place[0]] || place[1]) : place[1];
    desc.textContent = zh ? '选择的地区资料正在展开。请查看下方的气候、美食、景点、交通、住宿与公开信息。' : place[5];
    showPilotDetails(place, zh);
    tags.replaceChildren(...place.slice(9, 11).map(label => {
      const span = document.createElement('span');
      span.textContent = zh ? (place[0] === 'shanxi' ? '山西家乡' : place[0] === 'linfen' ? '黄河风光' : '目的地指南') : label;
      return span;
    }));
    air.textContent = zh ? '按抵达机场、住宿地点与最终接驳时间综合比较航班。' : place[6];
    rail.textContent = zh ? '核对车票上的具体车站，并提前规划车站至酒店或景点的接驳。' : place[7];
    road.textContent = zh ? '提前确认最后一段路程、停车与当地交通安排。' : place[8];
    link.href = place[4] === 'pilot' ? ('city.html?id=' + encodeURIComponent(place[0])) : (zh ? (place[0] === 'linfen' ? 'linfen-zh.html' : 'jincheng-zh.html') : (place[0] === 'linfen' ? 'linfen.html' : 'jincheng.html'));
    link.textContent = zh ? (place[4] === 'pilot' ? '打开完整地区指南 →' : (place[0] === 'linfen' ? '探索临汾完整指南 →' : '探索晋城完整指南 →')) : (place[4] === 'pilot' ? 'Open full destination guide' : (place[0] === 'linfen' ? 'Explore Linfen local guide' : 'Explore Jincheng local guide'));
    const isLocalGuide = place[4] === 'home';
    kicker.textContent = zh ? (isLocalGuide ? (place[0] === 'linfen' ? '山西本地指南 · 临汾' : '山西家乡 · 晋城指南') : place[4] === 'planned' ? '未来目的地 · 出行提示' : '试点地区 · 详细目的地指南') : (isLocalGuide ? (place[0] === 'linfen' ? 'SHANXI LOCAL GUIDE | LINFEN' : 'SHANXI LOCAL GUIDE | JINCHENG') : (place[4] === 'planned' ? 'FUTURE DESTINATION | TRAVEL NOTES' : 'PILOT DESTINATION | FULL GUIDE'));
  }

  const homePlaces = places.filter(place => place[4] === "pilot" || place[4] === "home");
  homePlaces.forEach(place => {
    const pos = xy(place);
    const marker = el('g', {
      class: 'china-marker' + (place[4] === 'home' ? ' is-home' : place[4] === 'planned' ? ' is-planned' : ''),
      tabindex: '0', role: 'button', 'data-city': place[0], 'aria-label': 'View travel information for ' + place[1]
    });
    marker.appendChild(el('circle', { class: 'marker-halo', cx: pos.x, cy: pos.y, r: place[4] === 'home' ? 15 : 11 }));
    marker.appendChild(el('circle', { class: 'marker-dot', cx: pos.x, cy: pos.y, r: place[4] === 'home' ? 5.8 : 4.6 }));
    const left = ['hulunbuir', 'heihe'].includes(place[0]);
    const lower = ['hainan', 'kunming'].includes(place[0]);
    const label = el('text', {
      class: 'marker-label', x: pos.x + (left ? -8 : 8), y: pos.y + (lower ? 15 : -8),
      'text-anchor': left ? 'end' : 'start'
    });
    label.textContent = place[0] === 'shanxi' ? 'Jincheng' : place[1].replace(' / Hangzhou', '').replace(' / Jinan', '').replace(' / Guangzhou', '').replace(' / Nanning', '').replace(" / Xi'an", '').replace(' / Lanzhou', '').replace(' - Jincheng first', '');
    marker.appendChild(label);
    marker.addEventListener('click', () => selectPlace(place, marker));
    marker.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectPlace(place, marker);
      }
    });
    layer.appendChild(marker);
  });
  selectPlace(homePlaces[homePlaces.length - 1], layer.lastElementChild);
})();
