(this.webpackJsonpmeet=this.webpackJsonpmeet||[]).push([[0],{200:function(e,t,n){},202:function(e,t,n){},204:function(e,t,n){},356:function(e,t,n){},357:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(66),c=n.n(o),s=(n(200),n(26)),i=n.n(s),u=n(51),l=n(23),h=n(31),d=n(24),f=n(25),p=(n(202),n(3)),v=function(e){Object(d.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={showDetailsToggle:!1},e.handleButtonClicked=function(){e.setState({showDetailsToggle:!e.state.showDetailsToggle})},e}return Object(h.a)(n,[{key:"render",value:function(){var e=this,t=this.props.event;return Object(p.jsxs)("div",{className:"event",children:[Object(p.jsx)("h1",{className:"event-name",children:t.summary}),Object(p.jsx)("p",{className:"start-time",children:t.start.dateTime}),Object(p.jsx)("p",{className:"location",children:t.location}),this.state.showDetailsToggle?Object(p.jsxs)("div",{className:"about-event",children:[Object(p.jsx)("h2",{children:"About Event:"}),Object(p.jsx)("p",{className:"event-description",children:t.description}),Object(p.jsx)("button",{className:"toggle-details",onClick:function(){return e.handleButtonClicked()},children:"Hide Event Details"})]}):Object(p.jsx)("button",{className:"toggle-details",onClick:function(){return e.handleButtonClicked()},children:"Show Event Details"})]})}}]),n}(a.Component),m=function(e){Object(d.a)(n,e);var t=Object(f.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var e=this.props.events;return Object(p.jsx)("ul",{className:"EventList",children:e.map((function(e){return Object(p.jsx)("li",{children:Object(p.jsx)(v,{event:e})},e.id)}))})}}]),n}(a.Component),b=function(e){Object(d.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).getStyle=function(){return{color:a.color,fontWeight:"bold"}},a.color=null,a}return Object(h.a)(n,[{key:"render",value:function(){return Object(p.jsx)("div",{className:"Alert",children:Object(p.jsx)("p",{style:this.getStyle(),children:this.props.text})})}}]),n}(a.Component),j=function(e){Object(d.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).color="blue",a}return n}(b),g=function(e){Object(d.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).color="red",a}return n}(b),w=function(e){Object(d.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).color="orange",a}return n}(b),O=function(e){Object(d.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={query:"",suggestions:[],showSuggestions:void 0},e.handleInputChanged=function(t){var n=t.target.value;e.setState({showSuggestions:!0});var a=e.props.locations.filter((function(e){return e.toUpperCase().indexOf(n.toUpperCase())>-1}));if(0!==a.length)return e.setState({query:n,suggestions:a,infoText:""});e.setState({query:n,infoText:"We cannot find the city you are looking for. Please try another city.",suggestions:[]})},e.handleItemClicked=function(t){e.setState({query:t,suggestions:[],showSuggestions:!1,infoText:""}),e.props.updateEvents(t)},e}return Object(h.a)(n,[{key:"render",value:function(){var e=this;return Object(p.jsxs)("div",{className:"CitySearch",children:[Object(p.jsx)(j,{text:this.state.infoText}),Object(p.jsx)("input",{type:"text",className:"city",value:this.state.query,onChange:this.handleInputChanged,onFocus:function(t){t.preventDefault(),e.setState({showSuggestions:!0})}}),Object(p.jsxs)("ul",{className:"suggestions",style:this.state.showSuggestions?{}:{display:"none"},children:[this.state.suggestions.map((function(t){return Object(p.jsx)("li",{onClick:function(){return e.handleItemClicked(t)},children:t},t)})),Object(p.jsx)("li",{onClick:function(){return e.handleItemClicked("all")},children:Object(p.jsx)("b",{children:"See all cities"})},"all")]})]})}}]),n}(a.Component),x=function(e){Object(d.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={eventsNumber:32},e.handleInputChanged=function(t){var n=t.target.value;n<1||n>32||isNaN(n)?e.setState({errorText:"Select a number from 1 to 32",eventsNumber:n}):(e.setState({eventsNumber:n,errorText:""}),e.props.updateNumber(n))},e}return Object(h.a)(n,[{key:"render",value:function(){var e=this;return Object(p.jsxs)("div",{className:"numberOfEvents",children:[Object(p.jsx)("input",{type:"text",className:"events-number-input",value:this.state.eventsNumber,onChange:this.handleInputChanged,onBlur:function(t){t.preventDefault(),e.setState({errorText:""})}}),Object(p.jsx)(g,{text:this.state.errorText})]})}}]),n}(a.Component);n(204);var y=function(e){return e.showWelcomeScreen?Object(p.jsxs)("div",{className:"WelcomeScreen",children:[Object(p.jsx)("h1",{children:"Welcome   to   the   Meet   app"}),Object(p.jsx)("h4",{children:"Log   in   to   see   upcoming   events   around   the   world   for full-stack developers"}),Object(p.jsx)("div",{className:"button_cont",align:"center",children:Object(p.jsxs)("div",{class:"google-btn",children:[Object(p.jsx)("div",{class:"google-icon-wrapper",children:Object(p.jsx)("img",{class:"google-icon",src:"https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",alt:"Google   sign-in"})}),Object(p.jsx)("button",{onClick:function(){e.getAccessToken()},rel:"nofollow noopener",class:"btn-text",children:Object(p.jsx)("b",{children:"Sign in with google"})})]})}),Object(p.jsx)("a",{href:"https://YOUR_GITHUB_USERNAME.github.io/meet/privacy.html",rel:"nofollow   noopener",children:"Privacy   policy"})]}):null},k=n(18),S=n(358),T=n(365),N=n(74),C=n(180),E=n(93),W=function(e){var t=e.events,n=["React","JavaScript","Node","jQuery","AngularJS"],r=["#0047AB","#58508d","#bc5090","#ff6361","#ffa600"];Object(a.useEffect)((function(){i((function(){return n.map((function(e){var n=t.filter((function(t){return t.summary.split(" ").includes(e)})).length;return{name:e,value:n}}))}))}),[t]);var o=Object(a.useState)([]),c=Object(k.a)(o,2),s=c[0],i=c[1];return Object(p.jsx)(S.a,{height:400,children:Object(p.jsxs)(T.a,{width:400,height:400,children:[Object(p.jsx)(N.a,{align:"right"}),Object(p.jsx)(C.a,{data:s,cx:200,cy:200,labelLine:!1,outerRadius:80,dataKey:"value",label:function(e){var t=e.name,n=e.percent;return"".concat(t," ").concat((100*n).toFixed(0),"%")},children:s.map((function(e,t){return Object(p.jsx)(E.a,{fill:r[t]},"cell-".concat(t))}))})]})})},A=n(189),Z=[{kind:"calendar#event",etag:'"3181161784712000"',id:"4eahs9ghkhrvkld72hogu9ph3e_20200519T140000Z",status:"confirmed",htmlLink:"https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MTlUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",created:"2020-05-19T19:17:46.000Z",updated:"2020-05-27T12:01:32.356Z",summary:"Learn JavaScript",description:"Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.",location:"London, UK",creator:{email:"fullstackwebdev@careerfoundry.com",self:!0},organizer:{email:"fullstackwebdev@careerfoundry.com",self:!0},start:{dateTime:"2020-05-19T16:00:00+02:00",timeZone:"Europe/Berlin"},end:{dateTime:"2020-05-19T17:00:00+02:00",timeZone:"Europe/Berlin"},recurringEventId:"4eahs9ghkhrvkld72hogu9ph3e",originalStartTime:{dateTime:"2020-05-19T16:00:00+02:00",timeZone:"Europe/Berlin"},iCalUID:"4eahs9ghkhrvkld72hogu9ph3e@google.com",sequence:0,reminders:{useDefault:!0},eventType:"default"},{kind:"calendar#event",etag:'"3181159875584000"',id:"3qtd6uscq4tsi6gc7nmmtpqlct_20200520T120000Z",status:"confirmed",htmlLink:"https://www.google.com/calendar/event?eid=M3F0ZDZ1c2NxNHRzaTZnYzdubW10cHFsY3RfMjAyMDA1MjBUMTIwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",created:"2020-05-19T19:14:30.000Z",updated:"2020-05-27T11:45:37.792Z",summary:"React is Fun",description:"Love HTML, CSS, and JS? Want to become a cool front-end developer? \n\nReact is one of the most popular front-end frameworks. There is a huge number of job openings for React developers in most cities. \n\nJoin us in our free React training sessions and give your career a new direction. ",location:"Berlin, Germany",creator:{email:"fullstackwebdev@careerfoundry.com",self:!0},organizer:{email:"fullstackwebdev@careerfoundry.com",self:!0},start:{dateTime:"2020-05-20T14:00:00+02:00",timeZone:"Europe/Berlin"},end:{dateTime:"2020-05-20T15:00:00+02:00",timeZone:"Europe/Berlin"},recurringEventId:"3qtd6uscq4tsi6gc7nmmtpqlct",originalStartTime:{dateTime:"2020-05-20T14:00:00+02:00",timeZone:"Europe/Berlin"},iCalUID:"3qtd6uscq4tsi6gc7nmmtpqlct@google.com",sequence:0,reminders:{useDefault:!0},eventType:"default"}];Z=JSON.parse(JSON.stringify(Z));var D=n(120),I=n.n(D),L=n(77),B=n.n(L),M=function(e){var t=e.map((function(e){return e.location}));return Object(A.a)(new Set(t))},J=function(){var e=Object(u.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=".concat(t)).then((function(e){return e.json()})).catch((function(e){return e.json()}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(u.a)(i.a.mark((function e(){var t,n,a,r,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(B.a.start(),!window.location.href.startsWith("http://localhost")){e.next=4;break}return B.a.done(),e.abrupt("return",Z);case 4:if(navigator.onLine){e.next=8;break}return t=localStorage.getItem("lastEvents"),B.a.done(),e.abrupt("return",t?JSON.parse(t).events:[]);case 8:return e.next=10,q();case 10:if(!(n=e.sent)){e.next=20;break}return U(),a="https://85s6317vx8.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/"+n,e.next=16,I.a.get(a);case 16:return(r=e.sent).data&&(o=M(r.data.events),localStorage.setItem("lastEvents",JSON.stringify(r.data)),localStorage.setItem("locations",JSON.stringify(o))),B.a.done(),e.abrupt("return",r.data.events);case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),U=function(){if(window.history.pushState&&window.location.pathname){var e=window.location.protocol+"//"+window.location.host+window.location.pathname;window.history.pushState("","",e)}else e=window.location.protocol+"//"+window.location.host,window.history.pushState("","",e)},q=function(){var e=Object(u.a)(i.a.mark((function e(){var t,n,a,r,o,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=localStorage.getItem("access_token"),e.t0=t,!e.t0){e.next=6;break}return e.next=5,J(t);case 5:e.t0=e.sent;case 6:if(n=e.t0,t&&!n.error){e.next=21;break}return e.next=10,localStorage.removeItem("access_token");case 10:return a=new URLSearchParams(window.location.search),e.next=13,a.get("code");case 13:if(r=e.sent){e.next=20;break}return e.next=17,I.a.get("https://85s6317vx8.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url");case 17:return o=e.sent,c=o.data.authUrl,e.abrupt("return",window.location.href=c);case 20:return e.abrupt("return",r&&_(r));case 21:return e.abrupt("return",t);case 22:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=Object(u.a)(i.a.mark((function e(t){var n,a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=encodeURIComponent(t),e.next=3,fetch("https://85s6317vx8.execute-api.eu-central-1.amazonaws.com/dev/api/token/"+n).then((function(e){return e.json()})).catch((function(e){return e}));case 3:return a=e.sent,(r=a.access_token)&&localStorage.setItem("access_token",r),e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),F=n(362),H=n(363),P=n(185),z=n(186),G=n(78),Y=n(190),K=(n(356),function(e){Object(d.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={events:[],locations:[],numberOfEvents:32,currentLocation:"all",showWelcomeScreen:void 0},e.updateEvents=function(t){R().then((function(n){var a=("all"===t?n:n.filter((function(e){return e.location===t}))).slice(0,e.state.numberOfEvents);e.setState({events:a,currentLocation:t})}))},e.updateNumber=function(t){e.setState({numberOfEvents:t}),e.updateEvents(e.state.currentLocation)},e.getData=function(){var t=e.state,n=t.locations,a=t.events;return n.map((function(e){var t=a.filter((function(t){return t.location===e})).length;return{city:e.split(", ").shift(),number:t}}))},e}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=Object(u.a)(i.a.mark((function e(){var t,n,a,r,o=this;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.mounted=!0,t=localStorage.getItem("access_token"),e.next=4,J(t);case 4:if(!e.sent.error){e.next=8;break}e.t0=!1,e.next=9;break;case 8:e.t0=!0;case 9:n=e.t0,a=new URLSearchParams(window.location.search),r=a.get("code"),this.setState({showWelcomeScreen:!(r||n)}),(r||n)&&this.mounted&&R().then((function(e){o.mounted&&o.setState({events:e.slice(0,o.state.numberOfEvents),locations:M(e)}),navigator.onLine?o.setState({warningText:""}):o.setState({warningText:"You are currently in Offline Mode. Events may not be up to date. Please reconnect to the internet for an updated list of events."})}));case 14:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this.mounted=!1}},{key:"render",value:function(){if(void 0===this.state.showWelcomeScreen)return Object(p.jsx)("div",{className:"App"});var e=this.state,t=e.locations,n=e.numberOfEvents,a=e.events;return Object(p.jsxs)("div",{className:"App",children:[Object(p.jsx)("h1",{children:"Meet App"}),Object(p.jsx)(w,{text:this.state.warningText}),Object(p.jsx)("h4",{children:"Choose your city"}),Object(p.jsx)(O,{locations:t,updateEvents:this.updateEvents}),Object(p.jsx)("h4",{children:"Select the number of events to show on screen"}),Object(p.jsx)(x,{updateNumber:this.updateNumber,numberOfEvents:n}),Object(p.jsxs)("div",{className:"data-vis-wrapper",children:[Object(p.jsx)(W,{events:a}),Object(p.jsx)(S.a,{height:400,children:Object(p.jsxs)(F.a,{margin:{top:20,right:20,bottom:10,left:10},children:[Object(p.jsx)(H.a,{}),Object(p.jsx)(P.a,{type:"category",dataKey:"city",name:"City"}),Object(p.jsx)(z.a,{type:"number",dataKey:"number",name:"Number of Events",allowDecimals:!1}),Object(p.jsx)(G.a,{cursor:{strokeDasharray:"3 3"}}),Object(p.jsx)(Y.a,{data:this.getData(),fill:"#8884d8"})]})})]}),Object(p.jsx)(m,{events:this.state.events}),Object(p.jsx)(y,{showWelcomeScreen:this.state.showWelcomeScreen,getAccessToken:function(){q()}})]})}}]),n}(a.Component)),V=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function X(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var Q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,366)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),o(e),c(e)}))};n(187).config("b2c651e8dea94ff6bb1802bf2fc48fe0").install(),c.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(K,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/meet",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/meet","/service-worker.js");V?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):X(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):X(t,e)}))}}(),Q()}},[[357,1,2]]]);
//# sourceMappingURL=main.bf5b641e.chunk.js.map