(function(){
const places=[
['hulunbuir','呼伦贝尔',119.76,49.17,'pilot','草原、湿地与辽阔的北方风景。区域跨度大，先核对航班、铁路到达点和最后一段公路接驳。','Hailar 东山机场；请核对季节性航班。','先查到海拉尔及具体目的地的铁路，再安排末段交通。','草原和湿地景点距离较远，建议提前安排可靠的当地车辆。','草原湿地','长距离交通','destinations.html'],
['heihe','黑河',127.5,50.25,'pilot','黑龙江畔的边境城市，适合体验东北饮食与季节性自然风景。出行前留意边境区域规定。','查询黑河机场当前航班。','核对从哈尔滨等东北枢纽出发的列车班次。','市区可安排出租车；边境区域出行前确认开放和通行要求。','黑龙江畔','边境文化','destinations.html'],
['yanbian','延边（延吉）',129.5,42.9,'pilot','朝鲜族饮食、夜市与长白山区域旅行相结合。建议将延吉市内游与长白山接驳分开安排。','延吉朝阳川机场。','查询延吉西站及区域铁路班次。','前往长白山建议提前安排接驳，不要默认从市区打车即可快速抵达。','朝鲜族美食','长白山门户','destinations.html'],
['beijing','北京',116.4,39.9,'pilot','国际交通门户，城市公共交通成熟，历史文化景点密集。','首都机场和大兴机场，请按机票选择。','北京有多个主要火车站，订票时确认车站并规划地铁接驳。','市内优先比较地铁与出租车，预留高峰拥堵时间。','国际门户','历史文化','destinations.html'],
['tianjin','天津',117.2,39.12,'pilot','港口城市、海河风光和历史街区，可与北京组合旅行。','天津滨海国际机场。','京津高铁连接便利，出发前核对车站与时刻。','市内可结合地铁和出租车，注意景点间实际距离。','海河风光','京津铁路','destinations.html'],
['shanghai','上海',121.47,31.23,'pilot','国际抵达枢纽，地铁覆盖广，适合城市漫步、园林与滨水体验。','浦东、虹桥机场承担不同航线，按行程选择。','虹桥是重要高铁枢纽，订票时确认到站是否为虹桥。','市内多利用地铁；高峰期出租车耗时可能较长。','国际枢纽','城市文化','destinations.html'],
['nantong','南通',120.86,32.02,'pilot','江海风味与较舒缓的城市节奏。前往前比较周边机场、铁路与最后一程。','比较南通及周边机场的总接驳时间。','核对南通与上海、南京方向的当前高铁班次。','公路和跨江通道可作为选择，出发前核对路况。','江海美食','舒缓城市','destinations.html'],
['zhejiang','浙江（杭州重点）',120.16,30.27,'pilot','以杭州为重点的省级试点方向，适合西湖、茶文化与江南风景体验。','杭州萧山国际机场。','杭州东站是重要高铁站，订票时确认站名。','市内地铁方便；茶村等周边景点还需规划末段接驳。','西湖','茶文化','destinations.html'],
['shandong','山东（济南重点）',117.12,36.65,'pilot','以济南为重点，泉水文化、海滨城市与区域文化路线各有特色。','济南遥墙国际机场。','济南是铁路枢纽，泰山、青岛需分别安排后续行程。','省内跨度较大，建议按区域组合景点，不要一天横穿全省。','泉城','区域铁路','destinations.html'],
['guangdong','广东（广州重点）',113.26,23.13,'pilot','粤菜、城市文化与珠三角交通网络。','广州白云国际机场。','广州南是重要高铁站，出发前核对是否应到广州南、广州东或广州站。','市内地铁实用；珠三角跨城时比较铁路与公路拥堵。','粤菜','国际交通','destinations.html'],
['guangxi','广西（南宁重点）',108.37,22.82,'pilot','喀斯特山水、米粉与南方自然景观。前往瀑布和乡村景点需预留长途接驳。','南宁吴圩国际机场。','南宁可作为铁路枢纽，偏远景区通常还需较长末段交通。','乡村景点建议安排可靠车辆，并关注强降雨天气。','喀斯特山水','米粉文化','destinations.html'],
['hainan','海南',110.34,20.04,'pilot','热带海岛、海滩与冬季避寒体验；海口和三亚并非同一片市区，需规划岛内交通。','海口与三亚机场按住宿地点选择。','环岛高铁连接主要沿海区域，确认最适合酒店的车站。','预留城际公路与度假区接驳时间，旺季提前核实价格。','海岛旅行','热带自然','destinations.html'],
['chongqing','重庆',106.55,29.56,'pilot','山城地形、江景与火锅文化。地图直线距离不等于实际出行时间。','重庆江北国际机场。','重庆有多个火车站，订票时确认北站、西站等具体站点。','山地道路与换乘复杂，提前核对出口和真实接驳时间。','山城风景','火锅文化','destinations.html'],
['chengdu','成都',104.07,30.67,'pilot','茶馆文化、川味美食与通往四川各地的旅行枢纽。','核对机票使用的机场与到达时间。','成都东站是重要高铁枢纽，按线路确认车站。','市内地铁便利；郊外自然景点通常需要提前安排交通。','茶馆文化','川味美食','destinations.html'],
['kunming','昆明',102.83,24.88,'pilot','云南区域门户，适合湖畔漫步、地方美食与进一步探索云南。','昆明长水国际机场。','昆明有高铁连接，但云南许多景点仍需较长后续行程。','按区域与季节规划，山路行车时间不可低估。','高原气候','云南美食','destinations.html'],
['shaanxi','陕西（西安重点）',108.94,34.34,'pilot','以西安为重点，历史遗产、特色美食与铁路交通相结合。','西安咸阳国际机场。','西安北站是主要高铁枢纽；兵马俑等景点还需单独接驳。','主要景点分布较开，提前确认预约要求并安排合理路线。','历史遗产','特色美食','destinations.html'],
['gansu','甘肃（兰州重点）',103.83,36.06,'pilot','丝路历史与壮阔地貌并存，省域东西跨度大，适合按交通走廊分段游览。','兰州中川国际机场。','兰州是铁路枢纽，许多西部景点仍需数小时后续交通。','按区域规划路线，避免把相距很远的景点塞进同一天。','丝路文化','西北风景','destinations.html'],
['urumqi','乌鲁木齐',87.62,43.82,'pilot','新疆重要门户，地域辽阔，航班、铁路与各地之间的距离是行程关键。','乌鲁木齐地窝堡国际机场。','核对当前铁路路线与耗时，新疆跨区域旅行距离较大。','选择可靠的当地交通，并核实各地区的出行规定。','丝路门户','地域风景','destinations.html'],
['zhengzhou','郑州',113.62,34.75,'planned','河南交通枢纽，可作为中原地区旅行与跨省高铁换乘的候选城市。','核对郑州新郑机场航线。','郑州东站是重要高铁枢纽，按具体线路确认车站。','市内地铁方便，跨城旅行需比较铁路与公路。','中原枢纽','跨省换乘','destinations.html'],
['nanjing','南京',118.8,32.06,'planned','长江沿线历史文化城市，适合作为未来扩展目的地。','南京禄口国际机场。','南京南站是重要高铁枢纽。','市内可使用地铁，老城景点注意步行与换乘距离。','历史文化','长江城市','destinations.html'],
['wuhan','武汉',114.3,30.59,'planned','长江与汉江交汇的交通枢纽，未来可拓展城市文化与区域路线。','武汉天河国际机场。','武汉站、汉口站、武昌站承担不同线路，订票时需确认。','市区可结合地铁和出租车，跨江行程预留时间。','长江枢纽','城市漫游','destinations.html'],
['xiamen','厦门',118.08,24.48,'planned','沿海城市与闽南文化体验的候选目的地。','厦门高崎国际机场。','核对厦门站与厦门北站，按酒店位置选站。','岛内外交通差异明显，预先核对酒店和景点位置。','滨海风景','闽南文化','destinations.html'],
['lhasa','拉萨',91.13,29.65,'planned','高原文化与景观的候选目的地；海拔、季节与行程节奏需要提前考虑。','拉萨贡嘎国际机场。','可核对进藏铁路路线与耗时，长途行程预留缓冲。','山地与高原路程较长，选择可靠交通并了解当地旅行要求。','高原景观','文化体验','destinations.html'],
['shanxi','山西 · 晋城首发',112.85,35.49,'home','Yiang Health 来自山西。首个深度目的地从晋城开始：南太行、司徒小镇打铁花、地方美食与古建院落。','晋城行程要比较区域机场加地面接驳的总时间，不要只看航班时长。','查询晋城东站到达班次，并提前规划到酒店、司徒小镇或山区景点的最后一程。','司徒小镇出发前核实游客入口、停车政策和限时优惠；山区需查看天气与道路情况。','山西 · 我们的家','晋城首发','jincheng.html']
];
const layer=document.getElementById('china-map-markers'); if(!layer)return;
const NS='http://www.w3.org/2000/svg';
const el=(tag,attrs)=>{const n=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));return n;};
const xy=p=>({x:55+(p[2]-73)/(135-73)*585,y:48+(54-p[3])/(54-18)*405});
const title=document.getElementById('china-panel-title'),desc=document.getElementById('china-panel-description'),tags=document.getElementById('china-panel-tags'),link=document.getElementById('china-panel-link'),kicker=document.getElementById('china-panel-kicker'),air=document.getElementById('china-route-air'),rail=document.getElementById('china-route-rail'),road=document.getElementById('china-route-road');
function select(p,g){layer.querySelectorAll('.china-marker').forEach(n=>n.classList.toggle('is-selected',n===g));title.textContent=p[1];desc.textContent=p[5];tags.replaceChildren(...p.slice(9,11).map(t=>{const s=document.createElement('span');s.textContent=t;return s;}));air.textContent=p[6];rail.textContent=p[7];road.textContent=p[8];link.href=p[11];link.textContent=p[0]==='shanxi'?'探索山西与晋城 ↗':'查看目的地概览 ↗';kicker.textContent=p[0]==='shanxi'?'我们的起点 · 首个深度指南':'试点目的地 · 前往方式';}
places.forEach(p=>{const pos=xy(p),g=el('g',{class:'china-marker'+(p[4]==='home'?' is-home':p[4]==='planned'?' is-planned':''),tabindex:'0',role:'button','aria-label':'查看'+p[1]+'交通信息'});g.appendChild(el('circle',{class:'marker-halo',cx:pos.x,cy:pos.y,r:p[4]==='home'?15:11}));g.appendChild(el('circle',{class:'marker-dot',cx:pos.x,cy:pos.y,r:p[4]==='home'?5.8:4.6}));const t=el('text',{class:'marker-label',x:pos.x+((p[0]==='hulunbuir'||p[0]==='heihe')?-8:8),y:pos.y+((p[0]==='hainan'||p[0]==='kunming')?15:-8),'text-anchor':(p[0]==='hulunbuir'||p[0]==='heihe')?'end':'start'});t.textContent=p[1].replace('（杭州重点）','').replace('（济南重点）','').replace('（广州重点）','').replace('（南宁重点）','').replace('（西安重点）','').replace('（兰州重点）','').replace(' · 晋城首发','');g.appendChild(t);g.addEventListener('click',()=>select(p,g));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(p,g);}});layer.appendChild(g);});
select(places[places.length-1],layer.lastElementChild);
})();