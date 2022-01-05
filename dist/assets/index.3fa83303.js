import{s as E,R as r,r as m,a as D}from"./vendor.428edfd0.js";const j=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerpolicy&&(a.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?a.credentials="include":n.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}};j();const f=E.button`
  border-radius: 10px;
  border: 0;
  background-color: ${t=>t.wait?"pink":"lightgrey"};  
  padding: 2px 8px;
  margin:0 4px 0 0;
  // text-transform: uppercase;
  color:white;
    &:hover {
    background-color: ${t=>t.wait?"pink":"lightblue"}; 
    text-decoration: ${t=>t.wait?"line-through":"none"};     
  }
`;async function L(t){let e=new URL(t),s="https://cors-anywhere.paul161.repl.co/"+e.host+e.pathname;return await fetch(s,{method:"HEAD"}).catch(async n=>(console.log("There has been a problem with your fetch operation: "),n))}const R=t=>{const e=/^(ftp|http|https):\/\/[^ "]+$/.test(t),s={rule:"format",passed:e,errorMessage:e?"":"badly formatted url"};return new Promise((l,n)=>{l(s)})},V=async t=>{const e=await L(t),s={rule:"livecheck",passed:e.ok,errorMessage:e.ok?"":"url is unreachable"};return new Promise((l,n)=>{l(s)})},x=t=>Object.entries(t).length===0;function N(t){const e=200,a=t.split(" ").length/e*60*1e3;return Math.ceil(a)}async function U(t,e){for(let s=0;s<t.length;s++)await e(t[s],s,t)}async function I(t,e){let s=[],l=!0;return await U(e,async n=>{if(l){const a=await n(t);console.log("result=",a),a.passed||(s.push(a),l=!1)}}),console.log("passedAllSoFar=",l),{passedAll:l,messages:s}}const T=E.div`
  display:block;
  padding:0 0 4px 0;
  margin:8px 2px;
  background:white;
  text-align:left;

  input[type=text]{
    margin-bottom:2px;
  }

  label{
    display:inline-block;
    width:50px;
  }  

  .spacer{
    display:block;
    height:4px;
  }
`;function S(t,e={}){const[s,l]=m.exports.useState(()=>x(e)),[n,a]=m.exports.useState(()=>x(e)?"":e.url),[c,d]=m.exports.useState(()=>x(e)?"":e.urlDesc),[u,y]=m.exports.useState(!1),[g,p]=m.exports.useState(""),k=[R,V],b=F(t);function v(o=""){p(o);const i=N(o);setTimeout(()=>{p("")},i*3)}function F(o){return o.find(i=>i.type==="submit")}async function A(o){o.preventDefault(),y(!0);const i=await I(n,k).catch(h=>{v("sorry something went terribly wrong.")});y(!1),i.passedAll?(e.url=n,e.urlDesc=c,e.created="created"in e?e.created:+new Date,b.func(e),w(b.afterFunc)):(v(i.messages[0].errorMessage),console.log("validation failed",i.messages[0].errorMessages))}function w(o){switch(o){case"close":l(!1);break;case"reset":a(""),d("");break;default:console.warn("unknown switch case")}}function B(o,i,h,M){o.preventDefault(),i&&i(M),h&&w(h)}function O(){return r.createElement("div",null,r.createElement("a",{target:"_blank",href:e.url},e.url),"\xA0",r.createElement(f,{onClick:()=>l(!0)},"edit"))}function P(){return r.createElement(r.Fragment,null,t.map((o,i)=>o.type==="submit"?r.createElement(f,{key:"key"+e.created+"-"+i,type:"submit",wait:u,disabled:u},u?"wait":o.value):r.createElement(f,{key:"key"+e.created+"-"+i,onClick:h=>B(h,o.func,o.afterFunc,e)},o.value)))}function C(){return r.createElement(T,null,r.createElement("form",{onSubmit:o=>{A(o)}},r.createElement("label",null,"url:"),r.createElement("input",{name:"url",type:"text",value:n,onChange:o=>a(o.target.value)}),"\xA0",r.createElement("span",null,g),r.createElement("br",null),r.createElement("label",null,"notes:"),r.createElement("input",{name:"urlDesc",type:"text",value:c,onChange:o=>d(o.target.value)}),r.createElement("br",null),r.createElement(P,null)))}return s?C():O()}const W=({className:t,bookmark:e={},editFunc:s,deleteFunc:l})=>{const n=[{type:"submit",value:"update",func:s,afterFunc:"close"},{value:"delete",func:l},{value:"cancel",afterFunc:"close"}];return r.createElement("div",{className:t},S(n,e))},$=E(W)`
  border-bottom: 1px solid lightgrey;
  margin:4px 0 4px 0;
  padding: 0 0 4px 0;
`;function J({bookmarks:t,editFunc:e,deleteFunc:s}){const l=3,[n,a]=m.exports.useState(0);var c=Math.ceil(t.length/l);const d=()=>{n>0&&a(n-1)},u=()=>{n+1<c&&a(n+1)},y=()=>r.createElement("span",null,[...Array(c)].map((g,p)=>p==n?r.createElement("span",{key:"page"+p+1},"\xA0",r.createElement("u",null,p+1),"\xA0"):r.createElement("span",{key:"page"+p+1},"\xA0",p+1,"\xA0")));return r.createElement("div",null,r.createElement("div",null,t.slice(n*l,n*l+l).map((g,p)=>r.createElement($,{key:"test"+g.created,bookmark:g,editFunc:e,deleteFunc:s}))),r.createElement("div",null,r.createElement(f,{onClick:d},"<"),r.createElement(y,null),r.createElement(f,{onClick:u},">")))}function q({addFunc:t}){return S([{type:"submit",value:"add",func:t,afterFunc:"reset"}])}const z=E.section`
  padding: 8px;
  margin:2px;
`;function H(){const[t,e]=m.exports.useState(()=>{const c=localStorage.getItem("bookmarks");return JSON.parse(c)||[]});m.exports.useEffect(()=>{localStorage.setItem("bookmarks",JSON.stringify(t))},[t]);const s=c=>{e([...t,c])},l=c=>{const d=t.map(u=>u.created===c.created?c:u);e(d)},n=c=>{const d=t.filter(u=>u.created!==c.created);e(d)},a=()=>{e([])};return r.createElement(z,null,r.createElement(f,{onClick:a},"delete all"),r.createElement("hr",null),r.createElement(q,{addFunc:s}),r.createElement(J,{bookmarks:t,editFunc:l,deleteFunc:n}))}D.render(r.createElement(r.StrictMode,null,r.createElement(H,null)),document.getElementById("root"));
