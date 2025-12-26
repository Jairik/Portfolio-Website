import{a as s,j as r,A as B,m as D,b as h}from"./index-Dtn11p0_.js";const Y=12,z=300,_="132, 0, 255",T=768,O=[{color:"#060010",title:"Analytics",description:"Track user behavior",label:"Insights"},{color:"#060010",title:"Dashboard",description:"Centralized data view",label:"Overview"},{color:"#060010",title:"Collaboration",description:"Work together seamlessly",label:"Teamwork"},{color:"#060010",title:"Automation",description:"Streamline workflows",label:"Efficiency"},{color:"#060010",title:"Integration",description:"Connect favorite tools",label:"Connectivity"},{color:"#060010",title:"Security",description:"Enterprise-grade protection",label:"Protection"}],X=({direction:e,onClick:l,disabled:a})=>r.jsx("button",{type:"button","aria-label":e==="left"?"Previous image":"Next image",onClick:l,disabled:a,className:"absolute top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition disabled:opacity-30 disabled:cursor-not-allowed",style:e==="left"?{left:"0.5rem"}:{right:"0.5rem"},children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-3 h-3",children:e==="left"?r.jsx("polyline",{points:"15 18 9 12 15 6"}):r.jsx("polyline",{points:"9 18 15 12 9 6"})})}),W=({card:e,baseClassName:l,cardStyle:a,enableStars:g,shouldDisableAnimations:m,particleCount:o,glowColor:w,enableTilt:i,clickEffect:$,enableMagnetism:p})=>{const[n,C]=s.useState(0),[x,M]=s.useState(!1),c=e.imageSrc||[],d=c.length>0,v=s.useCallback(()=>{d&&C(t=>(t+1)%c.length)},[d,c.length]),y=s.useCallback(()=>{d&&C(t=>(t-1+c.length)%c.length)},[d,c.length]);s.useEffect(()=>{if(!d||x)return;const t=setInterval(()=>{v()},1e4);return()=>clearInterval(t)},[d,x,v]);const P=r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"card__header flex justify-between gap-3 relative text-white items-center",children:[r.jsxs("div",{className:"flex flex-col",children:[r.jsx("span",{className:"card__label text-lg font-medium text-white/90",children:e.label||"Featured"}),e.date&&e.date!==e.label&&r.jsx("span",{className:"text-sm text-white/60",children:e.date})]}),e.logoSrc&&r.jsx("div",{className:"flex-shrink-0 w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden",children:r.jsx("img",{src:e.logoSrc,alt:`${e.title||e.label||"Card"} logo`,className:"w-12 h-12 object-contain",loading:"lazy"})})]}),r.jsxs("div",{className:"card__content flex flex-col relative text-white gap-4",children:[r.jsxs("div",{className:"space-y-2",children:[r.jsx("h3",{className:"card__title font-bold text-3xl m-0",children:e.title}),r.jsx("p",{className:"card__description text-lg leading-relaxed opacity-80",children:e.description})]}),d&&r.jsxs("div",{className:"relative w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl aspect-video",children:[r.jsx(B,{mode:"wait",children:r.jsx(D.img,{src:c[n],alt:`${e.title} screenshot ${n+1}`,className:"w-full h-full object-cover absolute inset-0",loading:"lazy",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.25}},n)}),r.jsx(X,{direction:"left",onClick:()=>{M(!0),y()},disabled:c.length<=1}),r.jsx(X,{direction:"right",onClick:()=>{M(!0),v()},disabled:c.length<=1}),r.jsxs("div",{className:"absolute bottom-3 right-4 text-xs px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white/90 border border-white/10 z-10",children:[n+1," / ",c.length]})]}),e.techStack&&e.techStack.length>0&&r.jsx("div",{className:"flex flex-wrap gap-2 pt-2",children:e.techStack.map(t=>r.jsx("span",{className:"px-3 py-1 rounded-md bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/10 transition-colors",children:t},t))}),(e.link||e.demoLink||e.demoVideoLink)&&r.jsxs("div",{className:"flex flex-wrap gap-3 text-sm",children:[e.link&&r.jsx("a",{className:"text-white hover:text-[rgb(51,178,51)] transition",href:e.link,target:"_blank",rel:"noopener noreferrer","aria-label":"View Code",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-6 h-6",children:r.jsx("path",{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"})})}),e.demoLink&&r.jsx("a",{className:"text-white hover:text-[rgb(51,178,51)] transition",href:e.demoLink,target:"_blank",rel:"noopener noreferrer","aria-label":"View Demo",children:r.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-6 h-6",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("line",{x1:"2",y1:"12",x2:"22",y2:"12"}),r.jsx("path",{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]})}),e.demoVideoLink&&r.jsx("a",{className:"text-white hover:text-[rgb(51,178,51)] transition",href:e.demoVideoLink,target:"_blank",rel:"noopener noreferrer","aria-label":"Watch Video",children:r.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-6 h-6",children:[r.jsx("path",{d:"M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"}),r.jsx("polygon",{points:"9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"})]})})]})]})]});return g?r.jsx(U,{className:l,style:a,disableAnimations:m,particleCount:o,glowColor:w,enableTilt:i,clickEffect:$,enableMagnetism:p,children:P}):r.jsx("div",{className:l,style:a,ref:t=>{if(!t)return;const j=k=>{if(m)return;const A=t.getBoundingClientRect(),R=k.clientX-A.left,u=k.clientY-A.top,f=A.width/2,E=A.height/2;if(i){const L=(u-E)/E*-10,N=(R-f)/f*10;h.to(t,{rotateX:L,rotateY:N,duration:.1,ease:"power2.out",transformPerspective:1e3})}if(p){const L=(R-f)*.05,N=(u-E)*.05;h.to(t,{x:L,y:N,duration:.3,ease:"power2.out"})}},b=()=>{i&&h.to(t,{rotateX:0,rotateY:0,duration:.3,ease:"power2.out"}),p&&h.to(t,{x:0,y:0,duration:.3,ease:"power2.out"})};return t.addEventListener("mousemove",j),t.addEventListener("mouseleave",b),()=>{t.removeEventListener("mousemove",j),t.removeEventListener("mouseleave",b)}},children:P})},V=(e,l,a=_)=>{const g=document.createElement("div");return g.className="particle",g.style.cssText=`
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${a}, 1);
    box-shadow: 0 0 6px rgba(${a}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${e}px;
    top: ${l}px;
  `,g},F=e=>({proximity:e*.5,fadeDistance:e*.75}),G=(e,l,a,g,m)=>{const o=e.getBoundingClientRect(),w=(l-o.left)/o.width*100,i=(a-o.top)/o.height*100;e.style.setProperty("--glow-x",`${w}%`),e.style.setProperty("--glow-y",`${i}%`),e.style.setProperty("--glow-intensity",g.toString()),e.style.setProperty("--glow-radius",`${m}px`)},U=({children:e,className:l="",disableAnimations:a=!1,style:g,particleCount:m=Y,glowColor:o=_,enableTilt:w=!0,clickEffect:i=!1,enableMagnetism:$=!1})=>{const p=s.useRef(null),n=s.useRef([]),C=s.useRef([]),x=s.useRef(!1),M=s.useRef([]),c=s.useRef(!1),d=s.useRef(null),v=s.useCallback(()=>{if(c.current||!p.current)return;const{width:t,height:j}=p.current.getBoundingClientRect();M.current=Array.from({length:m},()=>V(Math.random()*t,Math.random()*j,o)),c.current=!0},[m,o]),y=s.useCallback(()=>{C.current.forEach(clearTimeout),C.current=[],d.current?.kill(),n.current.forEach(t=>{h.to(t,{scale:0,opacity:0,duration:.3,ease:"back.in(1.7)",onComplete:()=>{t.parentNode?.removeChild(t)}})}),n.current=[]},[]),P=s.useCallback(()=>{!p.current||!x.current||(c.current||v(),M.current.forEach((t,j)=>{const b=setTimeout(()=>{if(!x.current||!p.current)return;const k=t.cloneNode(!0);p.current.appendChild(k),n.current.push(k),h.fromTo(k,{scale:0,opacity:0},{scale:1,opacity:1,duration:.3,ease:"back.out(1.7)"}),h.to(k,{x:(Math.random()-.5)*100,y:(Math.random()-.5)*100,rotation:Math.random()*360,duration:2+Math.random()*2,ease:"none",repeat:-1,yoyo:!0}),h.to(k,{opacity:.3,duration:1.5,ease:"power2.inOut",repeat:-1,yoyo:!0})},j*100);C.current.push(b)}))},[v]);return s.useEffect(()=>{if(a||!p.current)return;const t=p.current,j=()=>{x.current=!0,P(),w&&h.to(t,{rotateX:5,rotateY:5,duration:.3,ease:"power2.out",transformPerspective:1e3})},b=()=>{x.current=!1,y(),w&&h.to(t,{rotateX:0,rotateY:0,duration:.3,ease:"power2.out"}),$&&h.to(t,{x:0,y:0,duration:.3,ease:"power2.out"})},k=R=>{if(!w&&!$)return;const u=t.getBoundingClientRect(),f=R.clientX-u.left,E=R.clientY-u.top,L=u.width/2,N=u.height/2;if(w){const I=(E-N)/N*-10,S=(f-L)/L*10;h.to(t,{rotateX:I,rotateY:S,duration:.1,ease:"power2.out",transformPerspective:1e3})}if($){const I=(f-L)*.05,S=(E-N)*.05;d.current=h.to(t,{x:I,y:S,duration:.3,ease:"power2.out"})}},A=R=>{if(!i)return;const u=t.getBoundingClientRect(),f=R.clientX-u.left,E=R.clientY-u.top,L=Math.max(Math.hypot(f,E),Math.hypot(f-u.width,E),Math.hypot(f,E-u.height),Math.hypot(f-u.width,E-u.height)),N=document.createElement("div");N.style.cssText=`
        position: absolute;
        width: ${L*2}px;
        height: ${L*2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${o}, 0.4) 0%, rgba(${o}, 0.2) 30%, transparent 70%);
        left: ${f-L}px;
        top: ${E-L}px;
        pointer-events: none;
        z-index: 1000;
      `,t.appendChild(N),h.fromTo(N,{scale:0,opacity:1},{scale:1,opacity:0,duration:.8,ease:"power2.out",onComplete:()=>N.remove()})};return t.addEventListener("mouseenter",j),t.addEventListener("mouseleave",b),t.addEventListener("mousemove",k),t.addEventListener("click",A),()=>{x.current=!1,t.removeEventListener("mouseenter",j),t.removeEventListener("mouseleave",b),t.removeEventListener("mousemove",k),t.removeEventListener("click",A),y()}},[P,y,a,w,$,i,o]),r.jsx("div",{ref:p,className:`${l} relative overflow-hidden`,style:{...g,position:"relative",overflow:"hidden"},children:e})},q=({gridRef:e,disableAnimations:l=!1,enabled:a=!0,spotlightRadius:g=z,glowColor:m=_})=>{const o=s.useRef(null),w=s.useRef(!1);return s.useEffect(()=>{if(l||!e?.current||!a)return;const i=document.createElement("div");i.className="global-spotlight",i.style.cssText=`
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${m}, 0.15) 0%,
        rgba(${m}, 0.08) 15%,
        rgba(${m}, 0.04) 25%,
        rgba(${m}, 0.02) 40%,
        rgba(${m}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `,document.body.appendChild(i),o.current=i;const $=n=>{if(!o.current||!e.current)return;const x=e.current.closest(".bento-section")?.getBoundingClientRect(),M=x&&n.clientX>=x.left&&n.clientX<=x.right&&n.clientY>=x.top&&n.clientY<=x.bottom;w.current=M||!1;const c=e.current.querySelectorAll(".card");if(!M){h.to(o.current,{opacity:0,duration:.3,ease:"power2.out"}),c.forEach(t=>{t.style.setProperty("--glow-intensity","0")});return}const{proximity:d,fadeDistance:v}=F(g);let y=1/0;c.forEach(t=>{const j=t,b=j.getBoundingClientRect(),k=b.left+b.width/2,A=b.top+b.height/2,R=Math.hypot(n.clientX-k,n.clientY-A)-Math.max(b.width,b.height)/2,u=Math.max(0,R);y=Math.min(y,u);let f=0;u<=d?f=1:u<=v&&(f=(v-u)/(v-d)),G(j,n.clientX,n.clientY,f,g)}),h.to(o.current,{left:n.clientX,top:n.clientY,duration:.1,ease:"power2.out"});const P=y<=d?.8:y<=v?(v-y)/(v-d)*.8:0;h.to(o.current,{opacity:P,duration:P>0?.2:.5,ease:"power2.out"})},p=()=>{w.current=!1,e.current?.querySelectorAll(".card").forEach(n=>{n.style.setProperty("--glow-intensity","0")}),o.current&&h.to(o.current,{opacity:0,duration:.3,ease:"power2.out"})};return document.addEventListener("mousemove",$),document.addEventListener("mouseleave",p),()=>{document.removeEventListener("mousemove",$),document.removeEventListener("mouseleave",p),o.current?.parentNode?.removeChild(o.current)}},[e,l,a,g,m]),null},H=({children:e,gridRef:l})=>r.jsx("div",{className:"bento-section grid gap-2 p-3 w-full select-none relative",style:{fontSize:"clamp(1rem, 0.9rem + 0.5vw, 1.5rem)"},ref:l,children:e}),K=()=>{const[e,l]=s.useState(!1);return s.useEffect(()=>{const a=()=>l(window.innerWidth<=T);return a(),window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)},[]),e},Q=({enableStars:e=!0,enableSpotlight:l=!0,enableBorderGlow:a=!0,disableAnimations:g=!1,spotlightRadius:m=z,particleCount:o=Y,enableTilt:w=!1,glowColor:i=_,clickEffect:$=!0,enableMagnetism:p=!0,cards:n})=>{const C=s.useRef(null),x=K(),M=g||x,c=n&&n.length>0?n:O;return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${i};
            --border-color: #392e4e;
            --background-dark: #1a1a1a;
            --white: hsl(0, 0%, 100%);
            --purple-primary: rgba(132, 0, 255, 1);
            --purple-glow: rgba(132, 0, 255, 0.2);
            --purple-border: rgba(132, 0, 255, 0.8);
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
                rgba(${i}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${i}, calc(var(--glow-intensity) * 0.4)) 30%,
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
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(${i}, 0.2);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${i}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
          
          .particle-container:hover {
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.2), 0 0 30px rgba(${i}, 0.2);
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
        `}),l&&r.jsx(q,{gridRef:C,disableAnimations:M,enabled:l,spotlightRadius:m,glowColor:i}),r.jsx(H,{gridRef:C,children:r.jsx("div",{className:"card-responsive",children:c.map((d,v)=>{const y=`card flex flex-col justify-start gap-4 relative w-full max-w-full p-6 rounded-[24px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] ${a?"card--border-glow":""}`,P={backgroundColor:d.color||"var(--background-dark)",borderColor:"var(--border-color)",color:"var(--white)","--glow-x":"50%","--glow-y":"50%","--glow-intensity":"0","--glow-radius":"200px"};return r.jsx(W,{card:d,baseClassName:y,cardStyle:P,enableStars:e,shouldDisableAnimations:M,particleCount:o,glowColor:i,enableTilt:w,clickEffect:$,enableMagnetism:p},`${d.title}-${v}`)})})})]})};export{Q as default};
