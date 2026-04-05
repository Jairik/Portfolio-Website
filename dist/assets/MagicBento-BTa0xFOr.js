import{r as a,j as t}from"./index-DmSgK4oL.js";import{g as h}from"./index-DDlvirwQ.js";import{A as D,m as O,g as W}from"./App-CH7_bFl8.js";const B=12,T=300,_="51, 178, 51",V=768,F=[{color:"#060010",title:"Analytics",description:"Track user behavior",label:"Insights"},{color:"#060010",title:"Dashboard",description:"Centralized data view",label:"Overview"},{color:"#060010",title:"Collaboration",description:"Work together seamlessly",label:"Teamwork"},{color:"#060010",title:"Automation",description:"Streamline workflows",label:"Efficiency"},{color:"#060010",title:"Integration",description:"Connect favorite tools",label:"Connectivity"},{color:"#060010",title:"Security",description:"Enterprise-grade protection",label:"Protection"}],z=({direction:e,onClick:d,disabled:c})=>t.jsx("button",{type:"button","aria-label":e==="left"?"Previous image":"Next image",onClick:d,disabled:c,className:"absolute top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition disabled:opacity-30 disabled:cursor-not-allowed",style:e==="left"?{left:"0.5rem"}:{right:"0.5rem"},children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-3 h-3",children:e==="left"?t.jsx("polyline",{points:"15 18 9 12 15 6"}):t.jsx("polyline",{points:"9 18 15 12 9 6"})})}),G=({card:e,baseClassName:d,cardStyle:c,enableStars:x,shouldDisableAnimations:p,particleCount:o,glowColor:v,enableTilt:s,clickEffect:N,enableMagnetism:P})=>{const[i,f]=a.useState(0),[w,k]=a.useState(!1),l=e.imageSrc||[],u=l.length>0,m=a.useCallback(()=>{u&&f(n=>(n+1)%l.length)},[u,l.length]),j=a.useCallback(()=>{u&&f(n=>(n-1+l.length)%l.length)},[u,l.length]);a.useEffect(()=>{if(!u||w)return;const n=setInterval(()=>{m()},1e4);return()=>clearInterval(n)},[u,w,m]);const I=t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"card__header flex justify-between gap-3 relative text-white items-center",children:[t.jsxs("div",{className:"flex flex-col",children:[t.jsx("span",{className:"card__label text-lg font-medium text-white/90",children:e.label||"Featured"}),e.date&&e.date!==e.label&&t.jsx("span",{className:"text-sm text-white/60",children:e.date})]}),e.logoSrc&&t.jsx("div",{className:"flex-shrink-0 w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden",children:t.jsx("img",{src:e.logoSrc,alt:`${e.title||e.label||"Card"} logo`,className:"w-12 h-12 object-contain",loading:"lazy"})})]}),t.jsxs("div",{className:"card__content flex flex-col relative text-white gap-4",children:[t.jsxs("div",{className:"space-y-2",children:[t.jsx("h3",{className:"card__title font-bold text-3xl m-0",children:e.title}),t.jsx("p",{className:"card__description text-lg leading-relaxed opacity-80",children:e.description})]}),u&&t.jsxs("div",{className:"relative w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl aspect-video",children:[t.jsx(D,{mode:"wait",children:t.jsx(O.img,{src:l[i],alt:`${e.title} screenshot ${i+1}`,className:"w-full h-full object-cover absolute inset-0",loading:"lazy",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.25}},i)}),t.jsx(z,{direction:"left",onClick:()=>{k(!0),j()},disabled:l.length<=1}),t.jsx(z,{direction:"right",onClick:()=>{k(!0),m()},disabled:l.length<=1}),t.jsxs("div",{className:"absolute bottom-3 right-4 text-xs px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white/90 border border-white/10 z-10",children:[i+1," / ",l.length]})]}),e.techStack&&e.techStack.length>0&&t.jsx("div",{className:"flex flex-wrap gap-2 pt-2",children:e.techStack.map(n=>{const $=W(n);return t.jsxs("span",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/10 transition-colors",children:[$&&t.jsx("img",{src:$,alt:n,className:"h-4 w-4 shrink-0 brightness-0 invert"}),t.jsx("span",{children:n})]},n)})}),(e.link||e.demoLink||e.demoVideoLink)&&t.jsxs("div",{className:"flex flex-wrap gap-3 text-sm",children:[e.link&&t.jsx("a",{className:"text-white hover:text-[rgb(51,178,51)] transition",href:e.link,target:"_blank",rel:"noopener noreferrer","aria-label":"View Code",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-6 h-6",children:t.jsx("path",{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"})})}),e.demoLink&&t.jsx("a",{className:"text-white hover:text-[rgb(51,178,51)] transition",href:e.demoLink,target:"_blank",rel:"noopener noreferrer","aria-label":"View Demo",children:t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-6 h-6",children:[t.jsx("circle",{cx:"12",cy:"12",r:"10"}),t.jsx("line",{x1:"2",y1:"12",x2:"22",y2:"12"}),t.jsx("path",{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]})}),e.demoVideoLink&&t.jsx("a",{className:"text-white hover:text-[rgb(51,178,51)] transition",href:e.demoVideoLink,target:"_blank",rel:"noopener noreferrer","aria-label":"Watch Video",children:t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-6 h-6",children:[t.jsx("path",{d:"M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"}),t.jsx("polygon",{points:"9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"})]})})]})]})]});return x?t.jsx(K,{id:e.anchorId,projectTag:e.projectTag,className:d,style:c,disableAnimations:p,particleCount:o,glowColor:v,enableTilt:s,clickEffect:N,enableMagnetism:P,children:I}):t.jsx("div",{id:e.anchorId,"data-project-tag":e.projectTag,className:d,style:c,ref:n=>{if(!n)return;const $=M=>{if(p)return;const C=n.getBoundingClientRect(),b=M.clientX-C.left,R=M.clientY-C.top,y=C.width/2,g=C.height/2;if(s){const E=(R-g)/g*-10,L=(b-y)/y*10;h.to(n,{rotateX:E,rotateY:L,duration:.1,ease:"power2.out",transformPerspective:1e3})}if(P){const E=(b-y)*.05,L=(R-g)*.05;h.to(n,{x:E,y:L,duration:.3,ease:"power2.out"})}},r=()=>{s&&h.to(n,{rotateX:0,rotateY:0,duration:.3,ease:"power2.out"}),P&&h.to(n,{x:0,y:0,duration:.3,ease:"power2.out"})};return n.addEventListener("mousemove",$),n.addEventListener("mouseleave",r),()=>{n.removeEventListener("mousemove",$),n.removeEventListener("mouseleave",r)}},children:I})},U=(e,d,c=_)=>{const x=document.createElement("div");return x.className="particle",x.style.cssText=`
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${c}, 1);
    box-shadow: 0 0 6px rgba(${c}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${e}px;
    top: ${d}px;
  `,x},q=e=>({proximity:e*.5,fadeDistance:e*.75}),H=(e,d,c,x,p)=>{const o=e.getBoundingClientRect(),v=(d-o.left)/o.width*100,s=(c-o.top)/o.height*100;e.style.setProperty("--glow-x",`${v}%`),e.style.setProperty("--glow-y",`${s}%`),e.style.setProperty("--glow-intensity",x.toString()),e.style.setProperty("--glow-radius",`${p}px`)},K=({children:e,className:d="",disableAnimations:c=!1,style:x,particleCount:p=B,glowColor:o=_,enableTilt:v=!0,clickEffect:s=!1,enableMagnetism:N=!1,id:P,projectTag:i})=>{const f=a.useRef(null),w=a.useRef([]),k=a.useRef([]),l=a.useRef(!1),u=a.useRef([]),m=a.useRef(!1),j=a.useRef(null),I=a.useCallback(()=>{if(m.current||!f.current)return;const{width:r,height:M}=f.current.getBoundingClientRect();u.current=Array.from({length:p},()=>U(Math.random()*r,Math.random()*M,o)),m.current=!0},[p,o]),n=a.useCallback(()=>{k.current.forEach(clearTimeout),k.current=[],j.current?.kill(),w.current.forEach(r=>{h.to(r,{scale:0,opacity:0,duration:.3,ease:"back.in(1.7)",onComplete:()=>{r.parentNode?.removeChild(r)}})}),w.current=[]},[]),$=a.useCallback(()=>{!f.current||!l.current||(m.current||I(),u.current.forEach((r,M)=>{const C=setTimeout(()=>{if(!l.current||!f.current)return;const b=r.cloneNode(!0);f.current.appendChild(b),w.current.push(b),h.fromTo(b,{scale:0,opacity:0},{scale:1,opacity:1,duration:.3,ease:"back.out(1.7)"}),h.to(b,{x:(Math.random()-.5)*100,y:(Math.random()-.5)*100,rotation:Math.random()*360,duration:2+Math.random()*2,ease:"none",repeat:-1,yoyo:!0}),h.to(b,{opacity:.3,duration:1.5,ease:"power2.inOut",repeat:-1,yoyo:!0})},M*100);k.current.push(C)}))},[I]);return a.useEffect(()=>{if(c||!f.current)return;const r=f.current,M=()=>{l.current=!0,$(),v&&h.to(r,{rotateX:5,rotateY:5,duration:.3,ease:"power2.out",transformPerspective:1e3})},C=()=>{l.current=!1,n(),v&&h.to(r,{rotateX:0,rotateY:0,duration:.3,ease:"power2.out"}),N&&h.to(r,{x:0,y:0,duration:.3,ease:"power2.out"})},b=y=>{if(!v&&!N)return;const g=r.getBoundingClientRect(),E=y.clientX-g.left,L=y.clientY-g.top,A=g.width/2,S=g.height/2;if(v){const X=(L-S)/S*-10,Y=(E-A)/A*10;h.to(r,{rotateX:X,rotateY:Y,duration:.1,ease:"power2.out",transformPerspective:1e3})}if(N){const X=(E-A)*.05,Y=(L-S)*.05;j.current=h.to(r,{x:X,y:Y,duration:.3,ease:"power2.out"})}},R=y=>{if(!s)return;const g=r.getBoundingClientRect(),E=y.clientX-g.left,L=y.clientY-g.top,A=Math.max(Math.hypot(E,L),Math.hypot(E-g.width,L),Math.hypot(E,L-g.height),Math.hypot(E-g.width,L-g.height)),S=document.createElement("div");S.style.cssText=`
        position: absolute;
        width: ${A*2}px;
        height: ${A*2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${o}, 0.4) 0%, rgba(${o}, 0.2) 30%, transparent 70%);
        left: ${E-A}px;
        top: ${L-A}px;
        pointer-events: none;
        z-index: 1000;
      `,r.appendChild(S),h.fromTo(S,{scale:0,opacity:1},{scale:1,opacity:0,duration:.8,ease:"power2.out",onComplete:()=>S.remove()})};return r.addEventListener("mouseenter",M),r.addEventListener("mouseleave",C),r.addEventListener("mousemove",b),r.addEventListener("click",R),()=>{l.current=!1,r.removeEventListener("mouseenter",M),r.removeEventListener("mouseleave",C),r.removeEventListener("mousemove",b),r.removeEventListener("click",R),n()}},[$,n,c,v,N,s,o]),t.jsx("div",{ref:f,id:P,"data-project-tag":i,className:`${d} relative overflow-hidden`,style:{...x,position:"relative",overflow:"hidden"},children:e})},J=({gridRef:e,disableAnimations:d=!1,enabled:c=!0,spotlightRadius:x=T,glowColor:p=_})=>{const o=a.useRef(null),v=a.useRef(!1);return a.useEffect(()=>{if(d||!e?.current||!c)return;const s=document.createElement("div");s.className="global-spotlight",s.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${p}, 0.15) 0%,
        rgba(${p}, 0.08) 15%,
        rgba(${p}, 0.04) 25%,
        rgba(${p}, 0.02) 40%,
        rgba(${p}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `,document.body.appendChild(s),o.current=s;const N=i=>{if(!o.current||!e.current)return;const w=e.current.closest(".bento-section")?.getBoundingClientRect(),k=w&&i.clientX>=w.left&&i.clientX<=w.right&&i.clientY>=w.top&&i.clientY<=w.bottom;v.current=k||!1;const l=e.current.querySelectorAll(".card");if(!k){h.to(o.current,{opacity:0,duration:.3,ease:"power2.out"}),l.forEach(n=>{n.style.setProperty("--glow-intensity","0")});return}const{proximity:u,fadeDistance:m}=q(x);let j=1/0;l.forEach(n=>{const $=n,r=$.getBoundingClientRect(),M=r.left+r.width/2,C=r.top+r.height/2,b=Math.hypot(i.clientX-M,i.clientY-C)-Math.max(r.width,r.height)/2,R=Math.max(0,b);j=Math.min(j,R);let y=0;R<=u?y=1:R<=m&&(y=(m-R)/(m-u)),H($,i.clientX,i.clientY,y,x)}),h.to(o.current,{x:i.clientX,y:i.clientY,duration:.1,ease:"power2.out"});const I=j<=u?.8:j<=m?(m-j)/(m-u)*.8:0;h.to(o.current,{opacity:I,duration:I>0?.2:.5,ease:"power2.out"})},P=()=>{v.current=!1,e.current?.querySelectorAll(".card").forEach(i=>{i.style.setProperty("--glow-intensity","0")}),o.current&&h.to(o.current,{opacity:0,duration:.3,ease:"power2.out"})};return document.addEventListener("mousemove",N),document.addEventListener("mouseleave",P),()=>{document.removeEventListener("mousemove",N),document.removeEventListener("mouseleave",P),o.current?.parentNode?.removeChild(o.current)}},[e,d,c,x,p]),null},Q=({children:e,gridRef:d})=>t.jsx("div",{className:"bento-section grid gap-2 p-3 w-full select-none relative",style:{fontSize:"clamp(1rem, 0.9rem + 0.5vw, 1.5rem)"},ref:d,children:e}),Z=()=>{const[e,d]=a.useState(!1);return a.useEffect(()=>{const c=()=>d(window.innerWidth<=V);return c(),window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)},[]),e},ne=({enableStars:e=!0,enableSpotlight:d=!0,enableBorderGlow:c=!0,disableAnimations:x=!1,spotlightRadius:p=T,particleCount:o=B,enableTilt:v=!1,glowColor:s=_,clickEffect:N=!0,enableMagnetism:P=!0,cards:i})=>{const f=a.useRef(null),w=Z(),k=x||w,l=i&&i.length>0?i:F;return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${s};
            --border-color: #245224;
            --background-dark: #1a1a1a;
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
            gap: 2rem;
          }
          
          .card-responsive .card {
            min-height: 500px;
            height: auto;
            display: flex;
            flex-direction: column;
            width: 100%;
          }
          
          @media (min-width: 700px) {
            .card-responsive .card {
              width: calc(50% - 1rem);
            }
          }
          
          @media (min-width: 1100px) {
            .card-responsive .card {
              width: calc(33.333% - 1.33rem);
            }
          }
          
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${s}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${s}, calc(var(--glow-intensity) * 0.4)) 30%,
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
            box-shadow: 0 4px 20px rgba(20, 70, 20, 0.4), 0 0 30px rgba(${s}, 0.2);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${s}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
          
          .particle-container:hover {
            box-shadow: 0 4px 20px rgba(20, 70, 20, 0.2), 0 0 30px rgba(${s}, 0.2);
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
              grid-template-columns: 1fr;
              width: 100%;
              margin: 0 auto;
              padding: 0;
            }
            
            .card-responsive .card {
              width: 100%;
              min-height: 400px;
            }
          }
        `}),d&&t.jsx(J,{gridRef:f,disableAnimations:k,enabled:d,spotlightRadius:p,glowColor:s}),t.jsx(Q,{gridRef:f,children:t.jsx("div",{className:"card-responsive",children:l.map((u,m)=>{const j=`card flex flex-col justify-start gap-4 relative w-full max-w-full p-6 rounded-[24px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] ${c?"card--border-glow":""}`,I={backgroundColor:u.color||"var(--background-dark)",borderColor:"var(--border-color)",color:"var(--white)","--glow-x":"50%","--glow-y":"50%","--glow-intensity":"0","--glow-radius":"200px"};return t.jsx(G,{card:u,baseClassName:j,cardStyle:I,enableStars:e,shouldDisableAnimations:k,particleCount:o,glowColor:s,enableTilt:v,clickEffect:N,enableMagnetism:P},`${u.title}-${m}`)})})})]})};export{ne as default};
