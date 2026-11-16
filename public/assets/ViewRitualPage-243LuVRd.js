import{u as j,at as g,j as e}from"./index-0aH7A4dn.js";import{ae as h,a as d}from"./icons-E22g7mgQ.js";import{u as N}from"./useQuery-Dlffgjvy.js";import{B as m}from"./button-Cit7xh1w.js";import{S as l}from"./skeleton-DIxRUkvC.js";import{t as u}from"./Tina_Poza_Mica_de_profil_1770802493115-DNP3kK7D.js";import{m as p}from"./proxy-B1cSRc61.js";import"./utils-km2FGkQ4.js";const v="/assets/3_1771331190692-29WnSWH4.jpg";function b(){const[r]=d.useState(()=>Date.now()),[,i]=d.useState(0);d.useEffect(()=>{const o=setInterval(()=>i(c=>c+1),15e3);return()=>clearInterval(o)},[]);const a=Date.now()-r,s=Math.floor(a/1e3),t=Math.floor(s/60),n=Math.floor(t/60);return s<60?"Just now":t===1?"1m ago":t<60?`${t}m ago`:n===1?"1h ago":n<24?`${n}h ago`:`${Math.floor(n/24)}d ago`}function x(r){return r.split(/\*\*(.+?)\*\*/g).map((a,s)=>s%2===1?e.jsx("strong",{children:a},s):e.jsx("span",{children:a},s))}function f(r){return r.split(`
`).map((a,s)=>{if(a.trim().startsWith("- ")||a.trim().startsWith("• ")){const t=a.trim().replace(/^[-•]\s*/,"");return e.jsxs("div",{className:"flex items-start gap-2 ml-2",children:[e.jsx("span",{className:"text-purple-400 mt-0.5 flex-shrink-0",children:"-"}),e.jsx("span",{children:x(t)})]},s)}if(a.match(/^\d+\.\s/)){const t=a.match(/^(\d+)\./)?.[1],n=a.replace(/^\d+\.\s*/,"");return e.jsxs("div",{className:"flex items-start gap-2 ml-2 mt-2",children:[e.jsxs("span",{className:"text-purple-500 font-semibold mt-0.5 flex-shrink-0",children:[t,"."]}),e.jsx("span",{children:x(n)})]},s)}return a.trim()===""?e.jsx("div",{className:"h-3"},s):e.jsx("p",{children:x(a)},s)})}function F(){const r=j(),i=`By ${r.displayName}`,{token:a}=g(),s=b(),{data:t,isLoading:n,error:o}=N({queryKey:["/api/portal/ritual-confirmation",a],enabled:!!a}),c=()=>{window.scrollTo(0,0),window.history.length>1?window.history.back():window.location.href=`/portal/${a}`};return n?e.jsx("div",{className:"min-h-screen bg-white",children:e.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-3xl",children:[e.jsx(l,{className:"h-9 w-36 mb-6"}),e.jsx(l,{className:"h-64 w-full rounded-lg mb-8"}),e.jsxs("div",{className:"flex items-start gap-4 mb-6",children:[e.jsx(l,{className:"h-14 w-14 rounded-full flex-shrink-0"}),e.jsxs("div",{className:"flex-1 space-y-3",children:[e.jsx(l,{className:"h-5 w-32"}),e.jsx(l,{className:"h-4 w-20"})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(l,{className:"h-4 w-full"}),e.jsx(l,{className:"h-4 w-full"}),e.jsx(l,{className:"h-4 w-3/4"}),e.jsx(l,{className:"h-32 w-full mt-6"}),e.jsx(l,{className:"h-32 w-full"})]})]})}):o||!t?e.jsx("div",{className:"min-h-screen bg-white flex items-center justify-center p-4",children:e.jsxs("div",{className:"max-w-md w-full text-center",children:[e.jsx("p",{className:"text-red-600 mb-4",children:"Unable to load your ritual confirmation."}),e.jsxs(m,{className:"bg-[#00A20E] hover:bg-[#008c0c] text-white","data-testid":"button-go-back",onClick:c,children:[e.jsx(h,{className:"w-4 h-4 mr-2"}),"Go Back"]})]})}):e.jsxs("div",{className:"min-h-screen bg-white",children:[e.jsx("style",{children:`
        .ritual-section {
          position: relative;
          border-left: 4px solid #a855f7;
          padding: 2rem 2rem 2rem 2.5rem;
          margin-bottom: 1.5rem;
          background: white;
          overflow: hidden;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .ritual-section .ritual-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-35deg);
          font-family: 'Dancing Script', cursive;
          font-size: 4.5rem;
          color: rgba(168, 85, 247, 0.10);
          white-space: nowrap;
          letter-spacing: 0.1em;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .ritual-section .ritual-content {
          position: relative;
          z-index: 1;
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
          }
          .no-print { display: none !important; }
          .ritual-section .ritual-watermark {
            color: rgba(168, 85, 247, 0.05) !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}),e.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-3xl",children:[e.jsxs(m,{variant:"ghost",className:"text-gray-600 hover:text-gray-900 mb-6","data-testid":"button-go-back",onClick:c,children:[e.jsx(h,{className:"w-4 h-4 mr-2"}),"Go Back"]}),e.jsx(p.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"mb-8",children:e.jsxs("div",{className:"relative rounded-lg overflow-hidden mb-8",children:[e.jsx("img",{src:v,alt:"Tina performing the ritual",className:"w-full h-64 md:h-80 object-cover","data-testid":"img-ritual-hero"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"}),e.jsxs("div",{className:"absolute bottom-0 left-0 right-0 p-6",children:[e.jsx("h1",{className:"text-2xl md:text-3xl font-bold text-white mb-1",style:{fontFamily:"'Merriweather', serif"},children:"Connection Unblocking Ritual"}),e.jsxs("p",{className:"text-white/80 text-sm",children:["Performed on ",t.ritualDate]})]})]})}),e.jsxs(p.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.15},children:[e.jsxs("div",{className:"ritual-section",children:[e.jsx("div",{className:"ritual-watermark","aria-hidden":"true",children:i}),e.jsxs("div",{className:"ritual-content",children:[e.jsxs("div",{className:"flex items-start gap-4 mb-6",children:[e.jsx("img",{src:u,alt:r.displayName,className:"w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-purple-200","data-testid":"img-tina-avatar"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold text-gray-900",children:r.displayName}),e.jsx("p",{className:"text-gray-500 text-sm","data-testid":"text-tina-timestamp",children:s})]})]}),e.jsx("div",{className:"space-y-4 text-gray-700",style:{fontSize:"0.95rem",lineHeight:"1.75"},children:e.jsx("p",{children:t.personalizedMessage})})]})]}),e.jsxs("div",{className:"ritual-section",children:[e.jsx("div",{className:"ritual-watermark","aria-hidden":"true",children:i}),e.jsxs("div",{className:"ritual-content",children:[e.jsx("h2",{className:"font-bold text-xl text-gray-900 mb-4",style:{fontFamily:"'Merriweather', serif"},children:"Phase 1: My Spiritual Work For You"}),e.jsx("div",{className:"bg-purple-50 border border-purple-100 rounded-md p-6",children:e.jsx("div",{className:"text-gray-700 leading-relaxed",style:{fontSize:"0.95rem",lineHeight:"1.75"},children:e.jsx("p",{children:t.phase1Summary})})})]})]}),e.jsxs("div",{className:"ritual-section",children:[e.jsx("div",{className:"ritual-watermark","aria-hidden":"true",children:i}),e.jsxs("div",{className:"ritual-content",children:[e.jsx("h2",{className:"font-bold text-lg text-gray-900 mb-4",style:{fontFamily:"'Merriweather', serif"},children:"How You May Feel"}),e.jsx("div",{className:"text-gray-700 leading-relaxed space-y-2",children:f(t.howYouWillFeel)})]})]}),e.jsxs("div",{className:"ritual-section",children:[e.jsx("div",{className:"ritual-watermark","aria-hidden":"true",children:i}),e.jsxs("div",{className:"ritual-content",children:[e.jsx("h2",{className:"font-bold text-xl text-gray-900 mb-4",style:{fontFamily:"'Merriweather', serif"},children:"Phase 2: The Sacred Salt Bath Ritual"}),e.jsx("div",{className:"text-gray-700 leading-relaxed space-y-2",style:{fontSize:"0.95rem",lineHeight:"1.75"},children:f(t.phase2Instructions)})]})]}),e.jsxs("div",{className:"ritual-section",children:[e.jsx("div",{className:"ritual-watermark","aria-hidden":"true",children:i}),e.jsxs("div",{className:"ritual-content",children:[e.jsx("h3",{className:"font-bold text-purple-900 mb-3",style:{fontFamily:"'Merriweather', serif"},children:"The Latin Incantation"}),e.jsx("div",{className:"font-serif italic text-purple-800 text-lg leading-relaxed whitespace-pre-line",children:t.latinIncantation})]})]}),e.jsxs("div",{className:"ritual-section",children:[e.jsx("div",{className:"ritual-watermark","aria-hidden":"true",children:i}),e.jsxs("div",{className:"ritual-content",children:[e.jsxs("div",{className:"flex items-start gap-4 mb-4",children:[e.jsx("img",{src:u,alt:r.displayName,className:"w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-purple-200"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold text-gray-900",children:r.displayName}),e.jsx("p",{className:"text-gray-500 text-sm",children:s})]})]}),e.jsx("div",{className:"text-gray-700 leading-relaxed whitespace-pre-line",style:{fontSize:"0.95rem",lineHeight:"1.75"},children:t.closingMessage})]})]}),e.jsx("div",{className:"text-center mt-10 pb-8",children:e.jsx(m,{variant:"ghost",className:"text-purple-600 hover:text-purple-800 underline","data-testid":"button-go-back-bottom",onClick:c,children:"Go back to your portal"})})]})]})]})}export{F as default};
