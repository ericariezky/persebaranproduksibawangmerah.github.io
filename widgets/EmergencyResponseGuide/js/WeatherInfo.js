// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

define("dojo/_base/declare dojo/_base/lang dojo/dom-class dojo/dom-construct esri/request jimu/utils".split(" "),function(l,k,f,g,m,h){return l("WeatherInfo",null,{constructor:function(b,a,d){this.container=b;this.parent=d;this.weatherURL=a;this.weatherDict={119:["Cloudy","cloudy5.png","cloudy5.png"],377:["Moderate or heavy showers of ice pellets","hail.png","hail.png"],374:["Light showers of ice pellets","hail.png","hail.png"],350:["Ice pellets","hail.png","hail.png"],353:["Light rain shower","light_rain.png",
"light_rain.png"],302:["Moderate rain","light_rain.png","light_rain.png"],296:["Light rain","light_rain.png","light_rain.png"],293:["Patchy light rain","light_rain.png","light_rain.png"],266:["Light drizzle","light_rain.png","light_rain.png"],263:["Patchy light drizzle","light_rain.png","light_rain.png"],122:["Overcast","overcast.png","overcast.png"],359:["Torrential rain shower","shower3.png","shower3.png"],308:["Heavy rain","shower3.png","shower3.png"],365:["Moderate or heavy sleet showers","sleet.png",
"sleet.png"],362:["Light sleet showers","sleet.png","sleet.png"],320:["Moderate or heavy sleet","sleet.png","sleet.png"],317:["Light sleet","sleet.png","sleet.png"],314:["Moderate or Heavy freezing rain","sleet.png","sleet.png"],311:["Light freezing rain","sleet.png","sleet.png"],284:["Heavy freezing drizzle","sleet.png","sleet.png"],281:["Freezing drizzle","sleet.png","sleet.png"],185:["Patchy freezing drizzle nearby","sleet.png","sleet.png"],182:["Patchy sleet nearby","sleet.png","sleet.png"],395:["Moderate or heavy snow in area with thunder",
"snow4.png","snow4.png"],335:["Patchy heavy snow","snow4.png","snow4.png"],230:["Blizzard","snow4.png","snow4.png"],227:["Blowing snow","snow4.png","snow4.png"],371:["Moderate or heavy snow showers","snow5.png","snow5.png"],338:["Heavy snow","snow5.png","snow5.png"],389:["Moderate or heavy rain in area with thunder","tstorm3.png","tstorm3.png"],392:["Patchy light snow in area with thunder","snow2.png","snow2_night.png"],386:["Patchy light rain in area with thunder","tstorm1.png","tstorm1_night.png"],
368:["Light snow showers","snow2.png","snow2_night.png"],356:["Moderate or heavy rain shower","shower2.png","shower2_night.png"],332:["Moderate snow","snow3.png","snow3_night.png"],329:["Patchy moderate snow","snow2.png","snow2_night.png"],326:["Light snow","snow1.png","snow1_night.png"],323:["Patchy light snow","snow1.png","snow1_night.png"],305:["Heavy rain at times","shower2.png","shower2_night.png"],299:["Moderate rain at times","shower2.png","shower2_night.png"],260:["Freezing fog","fog.png",
"fog_night.png"],248:["Fog","fog.png","fog_night.png"],200:["Thundery outbreaks in nearby","tstorm1.png","tstorm1_night.png"],179:["Patchy snow nearby","snow1.png","snow1_night.png"],176:["Patchy rain nearby","shower1.png","shower1_night.png"],143:["Mist","mist.png","mist_night.png"],116:["Partly Cloudy","cloudy3.png","cloudy3_night.png"],113:["Clear/Sunny","sunny.png","sunny_night.png"]}},updateForIncident:function(b){this.container.innerHTML="";f.add(this.container,"loading");var a=b;"point"!==
b.type&&(a=b.getExtent().getCenter());b=a.y+","+a.x;m({url:"Yahoo"===this.parent._weatherSource?this.weatherURL+'\x26q\x3dselect wind,item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text\x3d"('+(b+')")\x26format\x3djson'):this.weatherURL+"\x26q\x3d"+b+"\x26callbackNode\x3dLocalPerspective",callbackParamName:"callback"},{useProxy:!1}).then(k.hitch(this,function(d){return"Yahoo"===this.parent._weatherSource?this._resultsHandlerYahoo(d):this._resultsHandlerDarkSky(d)}),
k.hitch(this,function(){}))},_resultsHandlerYahoo:function(b){f.remove(this.container,"loading");if(b.query.results){var a=b.query.results.channel.item.condition;b=b.query.results.channel.wind;this.container.innerHTML="";var d=g.create("div",{id:"tpc",style:"width: 100%;"},this.container);f.add(d,"IMT_tabPanelContent");if(a){var c=1;var e=a.date.split(" "),n=e[5];e=e[4].split(":");e=parseInt(e[0],10);if("AM"===n){if(6>e||12===e)c=2}else 6<e&&12>e&&(c=2);1===c?this.parent.spillTime.setValue("DY"):
this.parent.spillTime.setValue("NTE");c=a.temp;a=parseInt(a.code,10);a=this.parent.nls.temperature+"\x3cbr/\x3e\x3cimg style\x3d'height:45px' src\x3d'"+this.parent.folderUrl+"images/w/yahoo/"+a+".png' /\x3e\x3cbr/\x3e"+c+"\x26deg;";a=this.parent.config.celsius?a+" "+this.parent.nls.c:a+" "+this.parent.nls.f;a=g.create("div",{innerHTML:h.sanitizeHTML(a)},d);f.add(a,"ERGcolSmall");a=this.parent.nls.wind+"\x3cbr/\x3e\x3cspan style\x3d'font-size: 30px; line-height:47px'\x3e"+"N NNE NE ENE E ESE SE SSE S SSW SW WSW W WNW NW NNW".split(" ")[Math.floor(b.direction/
22.5+.5)%16]+"\x3c/span\x3e\x3cbr/\x3e"+b.speed+" MPH";d=g.create("div",{innerHTML:h.sanitizeHTML(a)},d);f.add(d,"ERGcolSmall");this.parent.windDirection.setValue(parseFloat(b.direction));6>=b.speed?this.parent.windSpeed.setValue("LOW"):6<b.speed&&12>=b.speed?this.parent.windSpeed.setValue("MOD"):this.parent.windSpeed.setValue("HI");this._addCredits(this.parent._weatherSource)}}else this._resetWeatherInfo(this.parent._weatherSource,this.parent.nls.weatherErrorMessage)},_resultsHandlerDarkSky:function(b){var a=
b.data.current_condition;this.container.innerHTML="";f.remove(this.container,"loading");b=g.create("div",{id:"tpc",style:"width: 100%;"},this.container);f.add(b,"IMT_tabPanelContent");if(0<a.length){a=a[0];var d=1;var c=a.localObsDateTime.split(" ");var e=c[2];c=c[1].split(":");c=parseInt(c[0],10);if("AM"===e){if(6>c||12===c)d=2}else 6<c&&12>c&&(d=2);1===d?this.parent.spillTime.setValue("DY"):this.parent.spillTime.setValue("NTE");e=a.temp_F;this.parent.config.celsius&&(e=a.temp_C);c=a.weatherCode;
c=this.weatherDict[parseInt(c,10)];c=this.parent.nls.temperature+"\x3cbr/\x3e\x3cimg style\x3d'height:45px' src\x3d'"+this.parent.folderUrl+"images/w/"+c[d]+"' /\x3e\x3cbr/\x3e"+e+"\x26deg;";c=this.parent.config.celsius?c+" "+this.parent.nls.c:c+" "+this.parent.nls.f;d=g.create("div",{innerHTML:h.sanitizeHTML(c)},b);f.add(d,"ERGcolSmall");d=a.windspeedMiles;c=" MPH";this.parent.config.celsius&&(d=a.windspeedKmph,c=" KMPH");e=a.winddir16Point;c=this.parent.nls.wind+"\x3cbr/\x3e\x3cspan style\x3d'font-size: 30px; line-height:47px'\x3e"+
e+"\x3c/span\x3e\x3cbr/\x3e"+d+c;b=g.create("div",{innerHTML:h.sanitizeHTML(c)},b);f.add(b,"ERGcolSmall");switch(e){case "N":this.parent.windDirection.setValue("180.0");break;case "NNE":this.parent.windDirection.setValue("202.5");break;case "NE":this.parent.windDirection.setValue("225.0");break;case "ENE":this.parent.windDirection.setValue("247.5");break;case "E":this.parent.windDirection.setValue("270.0");break;case "ESE":this.parent.windDirection.setValue("292.5");break;case "SE":this.parent.windDirection.setValue("315.0");
break;case "SSE":this.parent.windDirection.setValue("337.5");break;case "S":this.parent.windDirection.setValue("0.0");break;case "SSW":this.parent.windDirection.setValue("22.5");break;case "SW":this.parent.windDirection.setValue("45.0");break;case "WSW":this.parent.windDirection.setValue("67.5");break;case "W":this.parent.windDirection.setValue("90.0");break;case "WNW":this.parent.windDirection.setValue("112.5");break;case "NW":this.parent.windDirection.setValue("135.0");break;case "NNW":this.parent.windDirection.setValue("157.5")}6>=
a.windspeedMiles?this.parent.windSpeed.setValue("LOW"):6<d&&12>=d?this.parent.windSpeed.setValue("MOD"):this.parent.windSpeed.setValue("HI")}this._addCredits(this.parent._weatherSource)},_resetWeatherInfo:function(b,a){this.container.innerHTML="";var d=g.create("div",{id:"tpc",style:"width: 100%;"},this.container);f.add(d,"IMT_tabPanelContent");var c=g.create("div",{innerHTML:h.sanitizeHTML("\x3cimg style\x3d'height:76px' src\x3d'"+this.parent.folderUrl+"images/w/dunno.png' /\x3e")},d);f.add(c,"ERGcolSmallUnknown");
a=g.create("div",{innerHTML:h.sanitizeHTML("\x3cspan\x3e"+a+"\x3c/span\x3e")},d);f.add(a,"ERGcolSmall");this._addCredits(b)},_addCredits:function(b){b="Yahoo"===b?"\x3ca style\x3d'color:#6e6e6e;text-decoration:none'href\x3d'https://www.yahoo.com/news/weather/' title\x3d'Yahoo Weather' target\x3d'_blank'\x3e\x3cimg style\x3d'height:36px;margin-top: 10px;' src\x3d'"+this.parent.folderUrl+'images/yahoo.png\' /\x3e\x3cbr /\x3e\x3cspan style\x3d"font-size:11px;color:#6e6e6e"\x3ePowered by\x3cbr/\x3eYahoo\x3c/a\x3e\x3c/span\x3e':
"\x3ca style\x3d'color:#6e6e6e;text-decoration:none'href\x3d'https://darksky.net/poweredby/' title\x3d'Dark Sky' target\x3d'_blank'\x3e\x3cimg style\x3d'height:36px;margin-top: 10px;' src\x3d'"+this.parent.folderUrl+'images/darksky.png\' /\x3e\x3cbr /\x3e\x3cspan style\x3d"font-size:11px;color:#6e6e6e"\x3ePowered by\x3cbr/\x3eDark Sky\x3c/a\x3e\x3c/span\x3e';var a=g.create("div",{id:"tpc",style:"width: 100%;"},this.container);f.add(a,"IMT_tabPanelContent");b=g.create("div",{innerHTML:h.sanitizeHTML(b)},
a);f.add(b,"ERGcolSmall");f.add(b,"ERGcolLast")},_errorHandler:function(){f.remove(this.container,"loading")}})});