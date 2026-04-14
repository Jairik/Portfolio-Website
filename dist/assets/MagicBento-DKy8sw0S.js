import{r as s,j as t}from"./index-l15HsJdt.js";import{g as h}from"./index-DDlvirwQ.js";import{A as W,m as U,g as F}from"./App-BiI-gOdX.js";const X=12,Y=300,S="51, 178, 51",V=768,G=2,K=3,q=700,O=1100,D=2,H=[{color:"#1d1f22",title:"Analytics",description:"Track user behavior",label:"Insights"},{color:"#1d1f22",title:"Dashboard",description:"Centralized data view",label:"Overview"},{color:"#1d1f22",title:"Collaboration",description:"Work together seamlessly",label:"Teamwork"},{color:"#1d1f22",title:"Automation",description:"Streamline workflows",label:"Efficiency"},{color:"#1d1f22",title:"Integration",description:"Connect favorite tools",label:"Connectivity"},{color:"#1d1f22",title:"Security",description:"Enterprise-grade protection",label:"Protection"}],z=({direction:e,onClick:c,disabled:o})=>t.jsx("button",{type:"button","aria-label":e==="left"?"Previous image":"Next image",onClick:c,disabled:o,className:"absolute top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition disabled:opacity-30 disabled:cursor-not-allowed",style:e==="left"?{left:"0.5rem"}:{right:"0.5rem"},children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-3 h-3",children:e==="left"?t.jsx("polyline",{points:"15 18 9 12 15 6"}):t.jsx("polyline",{points:"9 18 15 12 9 6"})})}),J=({card:e,baseClassName:c,cardStyle:o,enableStars:g,shouldDisableAnimations:x,particleCount:i,glowColor:b,enableTilt:l,clickEffect:C,enableMagnetism:P})=>{const[a,y]=s.useState(0),[k,A]=s.useState(!1),d=e.imageSrc||[],u=d.length>0,f=s.useCallback(()=>{u&&y(n=>(n+1)%d.length)},[u,d.length]),E=s.useCallback(()=>{u&&y(n=>(n-1+d.length)%d.length)},[u,d.length]);s.useEffect(()=>{if(!u||k)return;const n=setInterval(()=>{f()},1e4);return()=>clearInterval(n)},[u,k,f]);const _=t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"card__header flex justify-between gap-3 relative text-white items-center",children:[t.jsxs("div",{className:"flex flex-col",children:[t.jsx("span",{className:"card__label text-lg font-medium text-white/90",children:e.label||"Featured"}),e.date&&e.date!==e.label&&t.jsx("span",{className:"text-sm text-white/60",children:e.date})]}),e.logoSrc&&t.jsx("div",{className:"flex-shrink-0 w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden",children:t.jsx("img",{src:e.logoSrc,alt:`${e.title||e.label||"Card"} logo`,className:"w-12 h-12 object-contain",loading:"lazy"})})]}),t.jsxs("div",{className:"card__content flex flex-col relative text-white gap-4",children:[t.jsxs("div",{className:"space-y-2",children:[t.jsx("h3",{className:"card__title font-bold text-3xl m-0",children:e.title}),t.jsx("p",{className:"card__description text-lg leading-relaxed opacity-80",children:e.description})]}),u&&t.jsxs("div",{className:"relative w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl aspect-video",children:[t.jsx(W,{mode:"wait",children:t.jsx(U.img,{src:d[a],alt:`${e.title} screenshot ${a+1}`,className:"w-full h-full object-cover absolute inset-0",loading:"lazy",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.25}},a)}),t.jsx(z,{direction:"left",onClick:()=>{A(!0),E()},disabled:d.length<=1}),t.jsx(z,{direction:"right",onClick:()=>{A(!0),f()},disabled:d.length<=1}),t.jsxs("div",{className:"absolute bottom-3 right-4 text-xs px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white/90 border border-white/10 z-10",children:[a+1," / ",d.length]})]}),e.techStack&&e.techStack.length>0&&t.jsx("div",{className:"flex flex-wrap gap-2 pt-2",children:e.techStack.map(n=>{const L=F(n);return t.jsxs("span",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/10 transition-colors",children:[L&&t.jsx("img",{src:L,alt:n,className:"h-4 w-4 shrink-0 brightness-0 invert"}),t.jsx("span",{children:n})]},n)})}),(e.link||e.demoLink||e.demoVideoLink)&&t.jsxs("div",{className:"flex flex-wrap gap-3 text-sm",children:[e.link&&t.jsx("a",{className:"text-white hover:text-[rgb(51,178,51)] transition",href:e.link,target:"_blank",rel:"noopener noreferrer","aria-label":"View Code",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-6 h-6",children:t.jsx("path",{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"})})}),e.demoLink&&t.jsx("a",{className:"text-white hover:text-[rgb(51,178,51)] transition",href:e.demoLink,target:"_blank",rel:"noopener noreferrer","aria-label":"View Demo",children:t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-6 h-6",children:[t.jsx("circle",{cx:"12",cy:"12",r:"10"}),t.jsx("line",{x1:"2",y1:"12",x2:"22",y2:"12"}),t.jsx("path",{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]})}),e.demoVideoLink&&t.jsx("a",{className:"text-white hover:text-[rgb(51,178,51)] transition",href:e.demoVideoLink,target:"_blank",rel:"noopener noreferrer","aria-label":"Watch Video",children:t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-6 h-6",children:[t.jsx("path",{d:"M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"}),t.jsx("polygon",{points:"9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"})]})})]})]})]});return g?t.jsx(te,{id:e.anchorId,projectTag:e.projectTag,className:c,style:o,disableAnimations:x,particleCount:i,glowColor:b,enableTilt:l,clickEffect:C,enableMagnetism:P,children:_}):t.jsx("div",{id:e.anchorId,"data-project-tag":e.projectTag,className:c,style:o,ref:n=>{if(!n)return;const L=w=>{if(x)return;const j=n.getBoundingClientRect(),p=w.clientX-j.left,N=w.clientY-j.top,v=j.width/2,m=j.height/2;if(l){const M=(N-m)/m*-10,$=(p-v)/v*10;h.to(n,{rotateX:M,rotateY:$,duration:.1,ease:"power2.out",transformPerspective:1e3})}if(P){const M=(p-v)*.05,$=(N-m)*.05;h.to(n,{x:M,y:$,duration:.3,ease:"power2.out"})}},r=()=>{l&&h.to(n,{rotateX:0,rotateY:0,duration:.3,ease:"power2.out"}),P&&h.to(n,{x:0,y:0,duration:.3,ease:"power2.out"})};return n.addEventListener("mousemove",L),n.addEventListener("mouseleave",r),()=>{n.removeEventListener("mousemove",L),n.removeEventListener("mouseleave",r)}},children:_})},Q=(e,c,o=S)=>{const g=document.createElement("div");return g.className="particle",g.style.cssText=`
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${o}, 1);
    box-shadow: 0 0 6px rgba(${o}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${e}px;
    top: ${c}px;
  `,g},Z=e=>({proximity:e*.5,fadeDistance:e*.75}),ee=(e,c,o,g,x)=>{const i=e.getBoundingClientRect(),b=(c-i.left)/i.width*100,l=(o-i.top)/i.height*100;e.style.setProperty("--glow-x",`${b}%`),e.style.setProperty("--glow-y",`${l}%`),e.style.setProperty("--glow-intensity",g.toString()),e.style.setProperty("--glow-radius",`${x}px`)},te=({children:e,className:c="",disableAnimations:o=!1,style:g,particleCount:x=X,glowColor:i=S,enableTilt:b=!0,clickEffect:l=!1,enableMagnetism:C=!1,id:P,projectTag:a})=>{const y=s.useRef(null),k=s.useRef([]),A=s.useRef([]),d=s.useRef(!1),u=s.useRef([]),f=s.useRef(!1),E=s.useRef(null),_=s.useCallback(()=>{if(f.current||!y.current)return;const{width:r,height:w}=y.current.getBoundingClientRect();u.current=Array.from({length:x},()=>Q(Math.random()*r,Math.random()*w,i)),f.current=!0},[x,i]),n=s.useCallback(()=>{A.current.forEach(clearTimeout),A.current=[],E.current?.kill(),k.current.forEach(r=>{h.to(r,{scale:0,opacity:0,duration:.3,ease:"back.in(1.7)",onComplete:()=>{r.parentNode?.removeChild(r)}})}),k.current=[]},[]),L=s.useCallback(()=>{!y.current||!d.current||(f.current||_(),u.current.forEach((r,w)=>{const j=setTimeout(()=>{if(!d.current||!y.current)return;const p=r.cloneNode(!0);y.current.appendChild(p),k.current.push(p),h.fromTo(p,{scale:0,opacity:0},{scale:1,opacity:1,duration:.3,ease:"back.out(1.7)"}),h.to(p,{x:(Math.random()-.5)*100,y:(Math.random()-.5)*100,rotation:Math.random()*360,duration:2+Math.random()*2,ease:"none",repeat:-1,yoyo:!0}),h.to(p,{opacity:.3,duration:1.5,ease:"power2.inOut",repeat:-1,yoyo:!0})},w*100);A.current.push(j)}))},[_]);return s.useEffect(()=>{if(o||!y.current)return;const r=y.current,w=()=>{d.current=!0,L(),b&&h.to(r,{rotateX:5,rotateY:5,duration:.3,ease:"power2.out",transformPerspective:1e3})},j=()=>{d.current=!1,n(),b&&h.to(r,{rotateX:0,rotateY:0,duration:.3,ease:"power2.out"}),C&&h.to(r,{x:0,y:0,duration:.3,ease:"power2.out"})},p=v=>{if(!b&&!C)return;const m=r.getBoundingClientRect(),M=v.clientX-m.left,$=v.clientY-m.top,R=m.width/2,T=m.height/2;if(b){const I=($-T)/T*-10,B=(M-R)/R*10;h.to(r,{rotateX:I,rotateY:B,duration:.1,ease:"power2.out",transformPerspective:1e3})}if(C){const I=(M-R)*.05,B=($-T)*.05;E.current=h.to(r,{x:I,y:B,duration:.3,ease:"power2.out"})}},N=v=>{if(!l)return;const m=r.getBoundingClientRect(),M=v.clientX-m.left,$=v.clientY-m.top,R=Math.max(Math.hypot(M,$),Math.hypot(M-m.width,$),Math.hypot(M,$-m.height),Math.hypot(M-m.width,$-m.height)),T=document.createElement("div");T.style.cssText=`
        position: absolute;
        width: ${R*2}px;
        height: ${R*2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${i}, 0.4) 0%, rgba(${i}, 0.2) 30%, transparent 70%);
        left: ${M-R}px;
        top: ${$-R}px;
        pointer-events: none;
        z-index: 1000;
      `,r.appendChild(T),h.fromTo(T,{scale:0,opacity:1},{scale:1,opacity:0,duration:.8,ease:"power2.out",onComplete:()=>T.remove()})};return r.addEventListener("mouseenter",w),r.addEventListener("mouseleave",j),r.addEventListener("mousemove",p),r.addEventListener("click",N),()=>{d.current=!1,r.removeEventListener("mouseenter",w),r.removeEventListener("mouseleave",j),r.removeEventListener("mousemove",p),r.removeEventListener("click",N),n()}},[L,n,o,b,C,l,i]),t.jsx("div",{ref:y,id:P,"data-project-tag":a,className:`${c} relative overflow-hidden`,style:{...g,position:"relative",overflow:"hidden"},children:e})},re=({gridRef:e,disableAnimations:c=!1,enabled:o=!0,spotlightRadius:g=Y,glowColor:x=S})=>{const i=s.useRef(null),b=s.useRef(!1);return s.useEffect(()=>{if(c||!e?.current||!o)return;const l=document.createElement("div");l.className="global-spotlight",l.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${x}, 0.15) 0%,
        rgba(${x}, 0.08) 15%,
        rgba(${x}, 0.04) 25%,
        rgba(${x}, 0.02) 40%,
        rgba(${x}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `,document.body.appendChild(l),i.current=l;const C=a=>{if(!i.current||!e.current)return;const k=e.current.closest(".bento-section")?.getBoundingClientRect(),A=k&&a.clientX>=k.left&&a.clientX<=k.right&&a.clientY>=k.top&&a.clientY<=k.bottom;b.current=A||!1;const d=e.current.querySelectorAll(".card");if(!A){h.to(i.current,{opacity:0,duration:.3,ease:"power2.out"}),d.forEach(n=>{n.style.setProperty("--glow-intensity","0")});return}const{proximity:u,fadeDistance:f}=Z(g);let E=1/0;d.forEach(n=>{const L=n,r=L.getBoundingClientRect(),w=r.left+r.width/2,j=r.top+r.height/2,p=Math.hypot(a.clientX-w,a.clientY-j)-Math.max(r.width,r.height)/2,N=Math.max(0,p);E=Math.min(E,N);let v=0;N<=u?v=1:N<=f&&(v=(f-N)/(f-u)),ee(L,a.clientX,a.clientY,v,g)}),h.to(i.current,{x:a.clientX,y:a.clientY,duration:.1,ease:"power2.out"});const _=E<=u?.8:E<=f?(f-E)/(f-u)*.8:0;h.to(i.current,{opacity:_,duration:_>0?.2:.5,ease:"power2.out"})},P=()=>{b.current=!1,e.current?.querySelectorAll(".card").forEach(a=>{a.style.setProperty("--glow-intensity","0")}),i.current&&h.to(i.current,{opacity:0,duration:.3,ease:"power2.out"})};return document.addEventListener("mousemove",C),document.addEventListener("mouseleave",P),()=>{document.removeEventListener("mousemove",C),document.removeEventListener("mouseleave",P),i.current?.parentNode?.removeChild(i.current)}},[e,c,o,g,x]),null},ne=({children:e,gridRef:c})=>t.jsx("div",{className:"bento-section grid gap-2 p-3 w-full select-none relative",style:{fontSize:"clamp(1rem, 0.9rem + 0.5vw, 1.5rem)"},ref:c,children:e}),oe=()=>{const[e,c]=s.useState(!1);return s.useEffect(()=>{const o=()=>c(window.innerWidth<=V);return o(),window.addEventListener("resize",o),()=>window.removeEventListener("resize",o)},[]),e},ie=()=>{const[e,c]=s.useState(typeof window>"u"?O:window.innerWidth);return s.useEffect(()=>{const o=()=>c(window.innerWidth);return o(),window.addEventListener("resize",o),()=>window.removeEventListener("resize",o)},[]),e},le=({enableStars:e=!0,enableSpotlight:c=!0,enableBorderGlow:o=!0,disableAnimations:g=!1,spotlightRadius:x=Y,particleCount:i=X,enableTilt:b=!1,glowColor:l=S,clickEffect:C=!0,enableMagnetism:P=!0,cards:a,tabletColumns:y=G,desktopColumns:k=K,tabletBreakpoint:A=q,desktopBreakpoint:d=O})=>{const u=s.useRef(null),f=oe(),E=ie(),_=g||f,n=a&&a.length>0?a:H,L=Math.max(1,Math.min(y,n.length)),r=Math.max(1,Math.min(k,n.length)),w=E>=d?r:E>=A?L:1,j=w===1?"100%":`calc((100% - ${(w-1)*D}rem) / ${w})`;return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${l};
            --border-color: #245224;
            --background-dark: #1d1f22;
            --white: hsl(0, 0%, 100%);
            --accent-primary: rgba(51, 178, 51, 1);
            --accent-glow: rgba(51, 178, 51, 0.2);
            --accent-border: rgba(51, 178, 51, 0.8);
          }
          
          .card-responsive {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            gap: ${D}rem;
          }
          
          .card-responsive .card {
            min-height: 500px;
            height: auto;
            display: flex;
            flex-direction: column;
            width: 100%;
          }
          
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${l}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${l}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }
          
          .card--border-glow:hover {
            box-shadow: 0 4px 20px rgba(20, 70, 20, 0.4), 0 0 30px rgba(${l}, 0.2);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${l}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
          
          .particle-container:hover {
            box-shadow: 0 4px 20px rgba(20, 70, 20, 0.2), 0 0 30px rgba(${l}, 0.2);
          }
          
          .text-clamp-1 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .text-clamp-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          @media (max-width: 599px) {
            .card-responsive {
              width: 100%;
              margin: 0 auto;
              padding: 0;
            }
            
            .card-responsive .card {
              width: 100%;
              min-height: 400px;
            }
          }
        `}),c&&t.jsx(re,{gridRef:u,disableAnimations:_,enabled:c,spotlightRadius:x,glowColor:l}),t.jsx(ne,{gridRef:u,children:t.jsx("div",{className:"card-responsive",children:n.map((p,N)=>{const v=`card flex flex-col justify-start gap-4 relative w-full max-w-full p-6 rounded-[24px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] ${o?"card--border-glow":""}`,m={flex:`0 0 ${j}`,backgroundColor:p.color||"var(--background-dark)",borderColor:"var(--border-color)",color:"var(--white)",width:j,"--glow-x":"50%","--glow-y":"50%","--glow-intensity":"0","--glow-radius":"200px"};return t.jsx(J,{card:p,baseClassName:v,cardStyle:m,enableStars:e,shouldDisableAnimations:_,particleCount:i,glowColor:l,enableTilt:b,clickEffect:C,enableMagnetism:P},`${p.title}-${N}`)})})})]})};export{le as default};
