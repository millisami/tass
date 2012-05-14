/*!
 * Socky JavaScript Library
 *
 * @version 0.5.0
 * @author  Bernard Potocki <bernard.potocki@imanel.org>
 * @author  Stefano Verna <stefano.verna@welaika.com>
 * @licence The MIT licence.
 * @source  http://github.com/socky/socky-client-js
 */
/*!
 * Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 *
 * Inspired by base2 and Prototype
 */

(function(){var h=!1,j=/xyz/.test(function(){})?/\b_super\b/:/.*/,i=function(){};i.extend=function(a){function b(){!h&&this.init&&this.init.apply(this,arguments)}var c=this.prototype;h=!0;var d=new this;h=!1;for(var e in a)d[e]=typeof a[e]=="function"&&typeof c[e]=="function"&&j.test(a[e])?function(a,b){return function(){var d=this._super;this._super=c[a];var e=b.apply(this,arguments);this._super=d;return e}}(e,a[e]):a[e];b.prototype=d;b.constructor=b;b.extend=arguments.callee;return b};Events=i.extend({_bind:function(a,
b,c){this._callbacks=this._callbacks||{};this._callbacks[a]||(this._callbacks[a]={});(this._callbacks[a][b]||(this._callbacks[a][b]=[])).push(c);return this},_unbind:function(a,b,c){if(this._callbacks&&!b)this._callbacks[a]={};else if(a=this._callbacks[a])if(c){b=a[b];if(!b)return this;a=0;for(var d=b.length;a<d;a++)if(c===b[a]){b.splice(a,1);break}}else a[b]=[];return this},_trigger:function(a,b){var c,d,e,f;if(!this._callbacks||!(d=this._callbacks[a]))return this;if(d[b]){c=d[b].slice(0);e=0;for(f=
c.length;e<f;e++)c[e].apply(this,Array.prototype.slice.call(arguments,2))}if(d.all){c=d.all.slice(0);e=0;for(f=c.length;e<f;e++)c[e].apply(this,Array.prototype.slice.call(arguments,1))}return this}});this.Socky={};this.Socky.Client=Events.extend({init:function(a,b){Socky.Manager.is_inited()||Socky.Manager.init(b?b.assets_location:null);this._options=Socky.Utils.extend({},Socky.Manager.default_options(),b,{url:a});this._channels=new Socky.ChannelsCollection(this);this._is_connected=!1;this._connection=
this._connection_id=null;Socky.Manager.is_driver_loaded()?this.connect():this.log("WebSocket driver still unavailable, waiting...");this.raw_event_bind("socky:connection:established",Socky.Utils.bind(this._on_connection_established,this));Socky.Manager.add_socky_instance(this)},auth_transport:function(){return this._options.auth_transport},auth_endpoint:function(){return this._options.auth_endpoint},connection_id:function(){return this._connection_id},is_connected:function(){return this._is_connected},
connect:function(){if(!this._connection)if(window.WebSocket){var a=this._options.url;this.log("connecting",a);this._connection=new WebSocket(a);this._connection.onopen=Socky.Utils.bind(this.on_socket_open,this);this._connection.onmessage=Socky.Utils.bind(this.on_socket_message,this);this._connection.onclose=Socky.Utils.bind(this.on_socket_close,this);this._connection.onerror=Socky.Utils.bind(this.on_socket_error,this);setTimeout(Socky.Utils.bind(function(){if(!this._connection_open)this._connection=
null,this.send_locally({event:"socky:connection:error",reason:"down"})},this),1E4)}else this.log("WebSocket unavailable"),this._connection={}},on_socket_open:function(){this.log("connected to socket, waiting for connection_id");this._connection_open=!0},on_socket_message:function(a){a=Socky.Utils.parseJSON(a.data);if(typeof a.data=="string")a.data=Socky.Utils.parseJSON(a.data);this.log("received message",JSON.stringify(a));this._trigger("raw",a.event,a);this._trigger("public",a.event,a);if(a.channel){var b=
this.channel(a.channel);b&&b.receive_event(a.event,a)}},on_socket_error:function(a){this.log("error",a.data);this._is_connected=!1},on_socket_close:function(){this.log("disconnected");this._is_connected=!1;this.send_locally({event:"socky:connection:closed"})},log:function(){Socky.Utils.log.apply(Socky.Manager,arguments)},subscribe:function(a,b,c){a=this._channels.add(a,b,c);this._is_connected&&a.subscribe();return a},unsubscribe:function(a){var b=this.channel(a);b?(this._is_connected&&b.unsubscribe(),
this._channels.remove(a)):this.send_locally({event:"socky:unsubscribe:failure",channel:a})},send_locally:function(a){this.on_socket_message({data:a})},send:function(a){a.connection_id=this._connection_id;a=JSON.stringify(a);this.log("sending message",a);this._connection.send(a);return this},raw_event_bind:function(a,b){this._bind("raw",a,b)},raw_event_unbind:function(a,b){this._unbind("raw",a,b)},bind:function(a,b){this._bind("public",a,b)},unbind:function(a,b){this._unbind("public",a,b)},channel:function(a){return this._channels.find(a)},
close:function(){this._connection&&this._connection.close()},_on_connection_established:function(a){Socky.Utils.log("connection_id",a.connection_id);this._connection_id=a.connection_id;this._is_connected=!0;this._subscribe_pending_channels()},_subscribe_pending_channels:function(){this._channels.each(function(a){a.subscribe()})}});Socky.Utils={breaker:{},log:function(){if(console&&console.log){var a=Array.prototype.slice.call(arguments);a.unshift(">> Socky");Function.prototype.apply.apply(console.log,
[console,a])}},is_number:function(a){return!!(a===0||a&&a.toExponential&&a.toFixed)},each:function(a,b,c){if(a!=null)if(Array.prototype.forEach&&a.forEach===Array.prototype.forEach)a.forEach(b,c);else if(Socky.Utils.is_number(a.length))for(var d=0,e=a.length;d<e;d++){if(b.call(c,a[d],d,a)===Socky.Utils.breaker)break}else for(d in a)if(hasOwnProperty.call(a,d)&&b.call(c,a[d],d,a)===Socky.Utils.breaker)break},find:function(a,b,c){var d;Socky.Utils.any(a,function(a,f,g){if(b.call(c,a,f,g))return d=a,
!0});return d},any:function(a,b,c){var d=!1;if(a==null)return d;Socky.Utils.each(a,function(a,f,g){if(d=b.call(c,a,f,g))return Socky.Utils.breaker});return d},extend:function(a){Socky.Utils.each(Array.prototype.slice.call(arguments,1),function(b){for(var c in b)a[c]=b[c]});return a},bind:function(a,b,c){return function(){return a.apply(b,Array.prototype.slice.call(c||[]).concat(Array.prototype.slice.call(arguments)))}},parseJSON:function(a){try{return JSON.parse(a)}catch(b){return a}}};Socky.ChannelsCollection=
i.extend({each:function(a){Socky.Utils.each(this._channels,function(b){a(b)})},init:function(a){this._socky=a;this._channels={}},add:function(a,b,c){if(a instanceof Socky.ChannelsCollection)Socky.Utils.extend(this._channels,a._channels);else if(!this.find(a)){var d=null;d=a.indexOf("private-")===0?new Socky.PrivateChannel(a,this._socky,b):a.indexOf("presence-")===0?new Socky.PresenceChannel(a,this._socky,b,c):new Socky.Channel(a,this._socky);return this._channels[a]=d}},find:function(a){return this._channels[a]},
remove:function(a){delete this._channels[a]},channel_names:function(){var a=[],b;for(b in this._channels)a.push(b);return a}});Socky.Channel=Events.extend({init:function(a,b){this._socky=b;this._name=a;this._callbacks={};this._global_callbacks=[];this._subscribed=!1;this._auth=null;this.raw_event_bind("socky:subscribe:success",Socky.Utils.bind(this.acknowledge_subscription,this))},disconnect:function(){},acknowledge_subscription:function(a){this._subscribed=!0;this._trigger("public","socky:subscribe:success",
a.members)},is_private:function(){return!1},is_presence:function(){return!1},subscribe:function(){if(!this._started_subscribe){this._started_subscribe=!0;var a=this;this.authorize(function(b){a._auth=b.auth;a.send_event("socky:subscribe",a.generate_subscription_payload())},function(){a._socky.send_locally({event:"socky:subscribe:failure",channel:a._name})})}},generate_subscription_payload:function(){return null},unsubscribe:function(){this.send_event("socky:unsubscribe")},authorize:function(a){a({})},
send_event:function(a,b){b=b||{};b.event=a;b.channel=this._name;b.auth=this._auth;this._socky.send(b)},receive_event:function(a,b){b.event.match(/^socky:/)?this._trigger("raw",b.event,b):this._trigger("public",b.event,b.data)},raw_event_bind:function(a,b){this._bind("raw",a,b)},raw_event_unbind:function(a,b){this._unbind("raw",a,b)},bind:function(a,b){this._bind("public",a,b)},unbind:function(a,b){this._unbind("public",a,b)},trigger:function(a,b){this.send_event(a,{data:b})}});Socky.PrivateChannel=
Socky.Channel.extend({init:function(a,b,c){this._super(a,b);this._permissions=Socky.Utils.extend({},{read:!0,write:!1,presence:!1},c)},is_private:function(){return!0},authorize:function(a,b){this._socky.auth_transport()=="ajax"?this.authorize_via_ajax(a,b):this.authorize_via_jsonp(a,b)},generate_subscription_payload:function(){var a={};if(this._permissions.read===!1)a.read=!1;if(this._permissions.write===!0)a.write=!0;return a},generate_auth_payload:function(){var a={event:"socky:subscribe",channel:this._name,
connection_id:this._socky.connection_id()};Socky.Utils.extend(a,this.generate_subscription_payload());return a},generate_auth_payload_string:function(){var a=[],b=this.generate_auth_payload(),c;for(c in b)a.push(c+"="+encodeURIComponent(b[c]));return a.join("&")},authorize_via_ajax:function(a,b){var c=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");c.open("POST",this._socky.auth_endpoint(),!0);c.setRequestHeader("Content-type","application/x-www-form-urlencoded");c.onreadystatechange=
function(){if(c.readyState==4)if(c.status==200){var d=Socky.Utils.parseJSON(c.responseText);a(d)}else b();else b()};var d=this.generate_auth_payload_string();c.send(d)},authorize_via_jsonp:function(a,b){var c=this._name,d=!1;Socky.Manager._jsonp_auth_callbacks[c]=function(b){d=!0;a(b)};var e=this.generate_auth_payload_string(),f="Socky.Manager._jsonp_auth_callbacks['"+c+"']";c=this._socky.auth_endpoint();c+="?callback="+encodeURIComponent(f);c+="&"+e;e=document.createElement("script");e.src=c;c=document.getElementsByTagName("head")[0]||
document.documentElement;c.insertBefore(e,c.firstChild);setTimeout(function(){d||b()},1E4)}});Socky.PresenceChannel=Socky.PrivateChannel.extend({init:function(a,b,c){this._super(a,b,c);this._members={};this._subscription_data=JSON.stringify(c.data);this.raw_event_bind("socky:member:added",Socky.Utils.bind(this.on_member_added,this));this.raw_event_bind("socky:member:removed",Socky.Utils.bind(this.on_member_removed,this))},disconnect:function(){this._members={}},is_presence:function(){return!0},acknowledge_subscription:function(a){this._super(a);
for(var b=0;b<a.members.length;b++){var c=a.members[b];this._members[c.connection_id]=c.data}},on_member_added:function(a){this._members[a.connection_id]=a.data;this._trigger("public","socky:member:added",a.data)},on_member_removed:function(a){var b=this._members[a.connection_id];delete this._members[a.connection_id];this._trigger("public","socky:member:removed",b)},generate_subscription_payload:function(){var a=this._super();if(this._permissions.hide===!0)a.hide=!0;a.data=this._subscription_data;
return a},members:function(){return this._members}});Socky.Manager={_is_inited:!1,_is_websocket_driver_loaded:!1,_jsonp_auth_callbacks:{},_socky_instances:[],_assets_location:"http://js.socky.org/v0.5.0/assets",_flash_debug:!1,_default_options:{debug:!1,url:"ws://"+window.location.hostname+":8080/websocket",auth_endpoint:"/socky/auth",auth_transport:"ajax"},is_inited:function(){return this._is_inited},is_driver_loaded:function(){return this._is_websocket_driver_loaded},add_socky_instance:function(a){this._socky_instances.push(a)},
default_options:function(){return this._default_options},set_default_options:function(a){this._default_options=Socky.Utils.extend({},this._default_options,a)},set_assets_location:function(a){this._assets_location=a},set_flash_debug:function(a){this._flash_debug=a},init:function(a){if(!this._is_inited){this._is_inited=!0;Socky.Utils.log("inited");a&&this.set_assets_location(a);a=[];var b=Socky.Utils.bind(function(){Socky.Utils.log("Websockets driver loaded");this._web_sockets_loaded()},this);window.JSON==
void 0&&(Socky.Utils.log("no JSON support, requiring it"),a.push(this._assets_location+"/json2.min.js"));if(window.WebSocket==void 0)Socky.Utils.log("no WebSocket driver available, requiring it"),window.WEB_SOCKET_SWF_LOCATION=this._assets_location+"/WebSocketMain.swf",window.WEB_SOCKET_DEBUG=this._flash_debug,window.WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR=!0,a.push(this._assets_location+"/flashfallback.min.js");a.length>0?this._require_scripts(a,b):b()}},_web_sockets_loaded:function(){this._is_websocket_driver_loaded=
!0;Socky.Utils.each(this._socky_instances,function(a){a.is_connected()||a.connect()})},_require_scripts:function(a,b){var c=0,d;d=document.addEventListener?function(a,b){a.addEventListener("load",b,!1)}:function(a,b){a.attachEvent("onreadystatechange",function(){(a.readyState=="loaded"||a.readyState=="complete")&&b()})};for(var e=Socky.Utils.bind(function(b){c++;a.length==c&&(Socky.Utils.log("All the require script have been loaded!"),setTimeout(b,0))},this),f=Socky.Utils.bind(function(a,b){b=b||
function(){};var c=document.getElementsByTagName("head")[0],f=document.createElement("script");f.setAttribute("src",a);f.setAttribute("type","text/javascript");f.setAttribute("async",!0);Socky.Utils.log("Adding script",a);d(f,function(){e(b)});c.appendChild(f)},this),g=0;g<a.length;g++)f(a[g],b)}}})();