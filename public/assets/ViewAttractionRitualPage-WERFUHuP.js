import{u as M,at as $,j as e}from"./index-0aH7A4dn.js";import{ae as g,c as A,a2 as B,af as _,H as F,a as p}from"./icons-E22g7mgQ.js";import{u as z}from"./useQuery-Dlffgjvy.js";import{B as u}from"./button-Cit7xh1w.js";import{S as n}from"./skeleton-DIxRUkvC.js";import{t as j}from"./Tina_Poza_Mica_de_profil_1770802493115-DNP3kK7D.js";import{m as N}from"./proxy-B1cSRc61.js";import"./utils-km2FGkQ4.js";const H="/assets/attraction_ritual_0-CcFJIvrs.png",R="/assets/attraction_ritual_1-BPykZRQV.png",T="/assets/attraction_ritual_2-By3wHmhM.png",W="/assets/attraction_ritual_3-B00hS4Tj.png",C="/assets/attraction_ritual_4-CduI3P0U.png",D="/assets/attraction_ritual_5-ykZkfNfY.png",b=[H,R,T,W,C,D];function P(){const[s]=p.useState(()=>Date.now()),[,r]=p.useState(0);p.useEffect(()=>{const i=setInterval(()=>r(m=>m+1),15e3);return()=>clearInterval(i)},[]);const t=Date.now()-s,a=Math.floor(t/1e3),l=Math.floor(a/60),o=Math.floor(l/60);return a<60?"Just now":l===1?"1m ago":l<60?`${l}m ago`:o===1?"1h ago":o<24?`${o}h ago`:`${Math.floor(o/24)}d ago`}function c(s){return s.split(/\*\*(.+?)\*\*/g).map((t,a)=>a%2===1?e.jsx("strong",{children:t},a):e.jsx("span",{children:t},a))}function w(s){return s.split(`
`).map((t,a)=>{if(t.trim().startsWith("- ")||t.trim().startsWith("• ")){const l=t.trim().replace(/^[-•]\s*/,"");return e.jsxs("div",{className:"flex items-start gap-2 ml-2",children:[e.jsx("span",{className:"text-purple-400 mt-0.5 flex-shrink-0",children:"-"}),e.jsx("span",{children:c(l)})]},a)}if(t.match(/^\d+\.\s/)){const l=t.match(/^(\d+)\./)?.[1],o=t.replace(/^\d+\.\s*/,"");return e.jsxs("div",{className:"flex items-start gap-2 ml-2 mt-2",children:[e.jsxs("span",{className:"text-purple-500 font-semibold mt-0.5 flex-shrink-0",children:[l,"."]}),e.jsx("span",{children:c(o)})]},a)}return t.trim()===""?e.jsx("div",{className:"h-3"},a):e.jsx("p",{children:c(t)},a)})}function f({label:s,text:r,color:t,testid:a}){return e.jsxs("div",{className:"mb-3 last:mb-0",children:[e.jsx("div",{className:`text-[0.7rem] font-bold uppercase tracking-wider mb-1 ${t}`,children:s}),e.jsx("p",{className:"text-gray-700",style:{fontSize:"0.95rem",lineHeight:"1.7"},"data-testid":a,children:c(r)})]})}function y({step:s,index:r,watermarkLabel:t,testPrefix:a}){return e.jsxs("div",{className:"ritual-section","data-testid":`${a}-${r}`,children:[e.jsx("div",{className:"ritual-watermark","aria-hidden":"true",children:t}),e.jsxs("div",{className:"ritual-content",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:"flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center font-bold text-sm shadow-sm",children:r+1}),e.jsx("h3",{className:"font-bold text-lg text-gray-900 leading-snug",style:{fontFamily:"'Merriweather', serif"},children:s.title})]}),e.jsxs("div",{className:"border-l-2 border-purple-100 pl-4",children:[e.jsx(f,{label:"What I did",text:s.whatIDid,color:"text-purple-700",testid:`${a}-whatidid-${r}`}),e.jsx(f,{label:"Why I did it",text:s.why,color:"text-purple-500",testid:`${a}-why-${r}`}),e.jsx(f,{label:"What it means for you",text:s.meaning,color:"text-purple-600",testid:`${a}-meaning-${r}`})]})]})]})}function Z(){const s=M(),r=`By ${s.displayName}`,{token:t}=$(),a=P(),l=new URLSearchParams(window.location.search).get("orderId"),o=l?`${t}?orderId=${l}`:t,{data:i,isLoading:m,error:v}=z({queryKey:["/api/portal/attraction-ritual",o],enabled:!!t}),x=()=>{window.scrollTo(0,0),window.history.length>1?window.history.back():window.location.href=`/portal/${t}`};if(m)return e.jsx("div",{className:"min-h-screen bg-white",children:e.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-3xl",children:[e.jsx(n,{className:"h-9 w-36 mb-6"}),e.jsx(n,{className:"h-64 w-full rounded-lg mb-8"}),e.jsxs("div",{className:"flex items-start gap-4 mb-6",children:[e.jsx(n,{className:"h-14 w-14 rounded-full flex-shrink-0"}),e.jsxs("div",{className:"flex-1 space-y-3",children:[e.jsx(n,{className:"h-5 w-32"}),e.jsx(n,{className:"h-4 w-20"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(n,{className:"h-4 w-full"}),e.jsx(n,{className:"h-4 w-full"}),e.jsx(n,{className:"h-4 w-3/4"}),e.jsx(n,{className:"h-32 w-full mt-6"}),e.jsx(n,{className:"h-32 w-full"})]})]})});if(v||!i)return e.jsx("div",{className:"min-h-screen bg-white flex items-center justify-center p-4",children:e.jsxs("div",{className:"max-w-md w-full text-center",children:[e.jsx("p",{className:"text-red-600 mb-4",children:"Unable to load your Attraction Ritual."}),e.jsxs(u,{className:"bg-[#00A20E] hover:bg-[#008c0c] text-white","data-testid":"button-go-back",onClick:x,children:[e.jsx(g,{className:"w-4 h-4 mr-2"}),"Go Back"]})]})});const k=b[(i.ritualIndex??0)%b.length],S=Array.isArray(i.steps)&&i.steps.length>0,I=Array.isArray(i.yourSteps)&&i.yourSteps.length>0;return e.jsxs("div",{className:"min-h-screen bg-white",children:[e.jsx("style",{children:`
        .ritual-section {
          position: relative;
          border-left: 4px solid #a855f7;
          padding: 1.75rem 1.5rem 1.75rem 1.75rem;
          margin-bottom: 1.25rem;
          background: white;
          overflow: hidden;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          border-top: 1px solid #f3e8ff;
          border-right: 1px solid #f3e8ff;
          border-bottom: 1px solid #f3e8ff;
          border-radius: 0 8px 8px 0;
          box-shadow: 0 1px 3px rgba(168, 85, 247, 0.06);
        }
        @media (min-width: 640px) {
          .ritual-section { padding: 2rem 2rem 2rem 2.25rem; }
        }
        .ritual-section .ritual-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-35deg);
          font-family: 'Dancing Script', cursive;
          font-size: 3.5rem;
          color: rgba(168, 85, 247, 0.07);
          white-space: nowrap;
          letter-spacing: 0.1em;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .ritual-section .ritual-content { position: relative; z-index: 1; }
        .section-heading {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          max-width: 700px;
          margin: 2.5rem auto 1rem auto;
        }
        @media print {
          .ritual-section {
            page-break-inside: avoid;
            break-inside: avoid;
            border-left: 4px solid #a855f7 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            max-width: 100%;
            margin: 0 0 1rem 0;
            padding: 1.5rem 1.5rem 1.5rem 2rem;
            box-shadow: none;
          }
          .no-print { display: none !important; }
          .ritual-section .ritual-watermark {
            color: rgba(168, 85, 247, 0.05) !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}),e.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-3xl",children:[e.jsxs(u,{variant:"ghost",className:"text-gray-600 hover:text-gray-900 mb-6 no-print","data-testid":"button-go-back",onClick:x,children:[e.jsx(g,{className:"w-4 h-4 mr-2"}),"Go Back"]}),e.jsx(N.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"mb-8",children:e.jsxs("div",{className:"relative rounded-lg overflow-hidden mb-4 shadow-md",children:[e.jsx("img",{src:k,alt:"Your Attraction Ritual",className:"w-full h-56 sm:h-72 md:h-80 object-cover","data-testid":"img-ritual-hero"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"}),e.jsxs("div",{className:"absolute bottom-0 left-0 right-0 p-5 sm:p-6",children:[i.ritualName&&e.jsxs("div",{className:"inline-flex items-center gap-1.5 mb-2 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm",children:[e.jsx(A,{className:"w-3.5 h-3.5 text-purple-200"}),e.jsx("span",{className:"text-white/90 text-xs font-medium tracking-wide","data-testid":"text-ritual-name",children:i.ritualName})]}),e.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-white mb-1 leading-tight",style:{fontFamily:"'Merriweather', serif"},children:"Your Attraction Ritual"}),e.jsxs("p",{className:"text-white/80 text-sm",children:["Performed on ",i.ritualDate]})]})]})}),e.jsxs(N.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.15},children:[e.jsxs("div",{className:"ritual-section",children:[e.jsx("div",{className:"ritual-watermark","aria-hidden":"true",children:r}),e.jsxs("div",{className:"ritual-content",children:[e.jsxs("div",{className:"flex items-start gap-4 mb-5",children:[e.jsx("img",{src:j,alt:s.displayName,className:"w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-purple-200","data-testid":"img-tina-avatar"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold text-gray-900",children:s.displayName}),e.jsx("p",{className:"text-gray-500 text-sm","data-testid":"text-tina-timestamp",children:a})]})]}),e.jsx("div",{className:"text-gray-700",style:{fontSize:"0.95rem",lineHeight:"1.75"},children:e.jsx("p",{"data-testid":"text-personalized-message",children:i.personalizedMessage})})]})]}),S?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section-heading",children:[e.jsx(B,{className:"w-5 h-5 text-purple-600 flex-shrink-0"}),e.jsx("h2",{className:"font-bold text-xl text-gray-900",style:{fontFamily:"'Merriweather', serif"},children:"What I did for you, step by step"})]}),i.steps.map((h,d)=>e.jsx(y,{step:h,index:d,watermarkLabel:r,testPrefix:"step-ritual"},d))]}):e.jsxs("div",{className:"ritual-section",children:[e.jsx("div",{className:"ritual-watermark","aria-hidden":"true",children:r}),e.jsxs("div",{className:"ritual-content",children:[e.jsx("h2",{className:"font-bold text-xl text-gray-900 mb-4",style:{fontFamily:"'Merriweather', serif"},children:"What I did for you"}),e.jsx("div",{className:"bg-purple-50 border border-purple-100 rounded-md p-6",children:e.jsx("div",{className:"text-gray-700 leading-relaxed space-y-2",style:{fontSize:"0.95rem",lineHeight:"1.75"},"data-testid":"text-what-i-did",children:w(i.whatIDid||"")})})]})]}),I?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section-heading",children:[e.jsx(_,{className:"w-5 h-5 text-purple-600 flex-shrink-0"}),e.jsx("h2",{className:"font-bold text-xl text-gray-900",style:{fontFamily:"'Merriweather', serif"},children:"Your part — to complete the ritual"})]}),i.yourSteps.map((h,d)=>e.jsx(y,{step:h,index:d,watermarkLabel:r,testPrefix:"step-yours"},d))]}):e.jsxs("div",{className:"ritual-section",children:[e.jsx("div",{className:"ritual-watermark","aria-hidden":"true",children:r}),e.jsxs("div",{className:"ritual-content",children:[e.jsx("h2",{className:"font-bold text-xl text-gray-900 mb-4",style:{fontFamily:"'Merriweather', serif"},children:"Your step"}),e.jsx("div",{className:"text-gray-700 leading-relaxed space-y-2",style:{fontSize:"0.95rem",lineHeight:"1.75"},"data-testid":"text-your-step",children:w(i.yourStep||"")})]})]}),e.jsxs("div",{className:"section-heading",children:[e.jsx(F,{className:"w-5 h-5 text-purple-600 flex-shrink-0"}),e.jsx("h2",{className:"font-bold text-xl text-gray-900",style:{fontFamily:"'Merriweather', serif"},children:"A final word"})]}),e.jsxs("div",{className:"ritual-section",children:[e.jsx("div",{className:"ritual-watermark","aria-hidden":"true",children:r}),e.jsxs("div",{className:"ritual-content",children:[e.jsxs("div",{className:"flex items-start gap-4 mb-4",children:[e.jsx("img",{src:j,alt:s.displayName,className:"w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-purple-200"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold text-gray-900",children:s.displayName}),e.jsx("p",{className:"text-gray-500 text-sm",children:a})]})]}),e.jsx("div",{className:"text-gray-700 leading-relaxed whitespace-pre-line",style:{fontSize:"0.95rem",lineHeight:"1.75"},"data-testid":"text-closing-message",children:i.closingMessage})]})]}),e.jsx("div",{className:"text-center mt-10 pb-8 no-print",children:e.jsx(u,{variant:"ghost",className:"text-purple-600 hover:text-purple-800 underline","data-testid":"button-go-back-bottom",onClick:x,children:"Go back to your portal"})})]})]})]})}export{Z as default};
