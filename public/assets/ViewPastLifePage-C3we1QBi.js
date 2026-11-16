import{u as y,at as v,j as e}from"./index-0aH7A4dn.js";import{u as k}from"./useQuery-Dlffgjvy.js";import{a1 as g,ae as u,K as S,ag as I,c as L,H as $,a as p}from"./icons-E22g7mgQ.js";import{B as m}from"./button-Cit7xh1w.js";import{S as r}from"./skeleton-DIxRUkvC.js";import{t as b}from"./Tina_Poza_Mica_de_profil_1770802493115-DNP3kK7D.js";import{m as j}from"./proxy-B1cSRc61.js";import"./utils-km2FGkQ4.js";function M(){const[s]=p.useState(()=>Date.now()),[,l]=p.useState(0);p.useEffect(()=>{const a=setInterval(()=>l(x=>x+1),15e3);return()=>clearInterval(a)},[]);const n=Date.now()-s,d=Math.floor(n/1e3),i=Math.floor(d/60),o=Math.floor(i/60);return d<60?"Just now":i===1?"1m ago":i<60?`${i}m ago`:o===1?"1h ago":o<24?`${o}h ago`:`${Math.floor(o/24)}d ago`}function F(){const s=y(),l=`By ${s.displayName}`,{token:n}=v(),d=M(),i=new URLSearchParams(window.location.search).get("orderId"),o=i?`${n}?orderId=${i}`:n,{data:a,isLoading:x,error:N}=k({queryKey:["/api/portal/past-life",o],enabled:!!n,refetchInterval:t=>t.state.data?.pending?15e3:!1}),h=()=>{window.scrollTo(0,0),window.history.length>1?window.history.back():window.location.href=`/portal/${n}`},w=()=>{if(!a?.sketchImage)return;const t=document.createElement("a");t.href=a.sketchImage,t.download="your-past-life-sketch.png",document.body.appendChild(t),t.click(),document.body.removeChild(t)},f=!!a?.pending;return x||f?e.jsx("div",{className:"min-h-screen bg-white",children:e.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-3xl",children:[e.jsx(r,{className:"h-9 w-36 mb-6"}),f&&e.jsxs("div",{className:"text-center mb-8","data-testid":"text-pending",children:[e.jsx(g,{className:"w-8 h-8 text-amber-500 mx-auto mb-3 animate-pulse"}),e.jsx("p",{className:"text-gray-700 font-medium",children:"I'm still finishing your Past Life Sketch…"}),e.jsx("p",{className:"text-gray-500 text-sm mt-1",children:"This page will update automatically. You can also come back in a few minutes."})]}),e.jsx(r,{className:"h-80 w-full rounded-lg mb-8"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{className:"h-4 w-full"}),e.jsx(r,{className:"h-4 w-full"}),e.jsx(r,{className:"h-4 w-3/4"}),e.jsx(r,{className:"h-32 w-full mt-6"}),e.jsx(r,{className:"h-32 w-full"})]})]})}):N||!a?e.jsx("div",{className:"min-h-screen bg-white flex items-center justify-center p-4",children:e.jsxs("div",{className:"max-w-md w-full text-center",children:[e.jsx("p",{className:"text-red-600 mb-4",children:"Unable to load your Past Life Sketch."}),e.jsxs(m,{className:"bg-[#00A20E] hover:bg-[#008c0c] text-white","data-testid":"button-go-back",onClick:h,children:[e.jsx(u,{className:"w-4 h-4 mr-2"}),"Go Back"]})]})}):e.jsxs("div",{className:"min-h-screen bg-white",children:[e.jsx("style",{children:`
        .pl-section {
          position: relative;
          border-left: 4px solid #d97706;
          padding: 1.75rem 1.5rem 1.75rem 1.75rem;
          margin-bottom: 1.25rem;
          background: white;
          overflow: hidden;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          border-top: 1px solid #fef3c7;
          border-right: 1px solid #fef3c7;
          border-bottom: 1px solid #fef3c7;
          border-radius: 0 8px 8px 0;
          box-shadow: 0 1px 3px rgba(217, 119, 6, 0.06);
        }
        @media (min-width: 640px) {
          .pl-section { padding: 2rem 2rem 2rem 2.25rem; }
        }
        .pl-section .pl-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-35deg);
          font-family: 'Dancing Script', cursive;
          font-size: 3.5rem;
          color: rgba(217, 119, 6, 0.07);
          white-space: nowrap;
          letter-spacing: 0.1em;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .pl-section .pl-content { position: relative; z-index: 1; }
        .pl-heading {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          max-width: 700px;
          margin: 2.5rem auto 1rem auto;
        }
        @media print {
          .pl-section {
            page-break-inside: avoid;
            break-inside: avoid;
            border-left: 4px solid #d97706 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            max-width: 100%;
            margin: 0 0 1rem 0;
            padding: 1.5rem 1.5rem 1.5rem 2rem;
            box-shadow: none;
          }
          .no-print { display: none !important; }
        }
      `}),e.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-3xl",children:[e.jsxs(m,{variant:"ghost",className:"text-gray-600 hover:text-gray-900 mb-6 no-print","data-testid":"button-go-back",onClick:h,children:[e.jsx(u,{className:"w-4 h-4 mr-2"}),"Go Back"]}),e.jsxs(j.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"mb-8",children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsxs("div",{className:"inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full bg-amber-50 border border-amber-200",children:[e.jsx(g,{className:"w-3.5 h-3.5 text-amber-600"}),e.jsx("span",{className:"text-amber-700 text-xs font-medium tracking-wide",children:"Your Past Life"})]}),e.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight",style:{fontFamily:"'Merriweather', serif"},"data-testid":"text-past-name",children:a.pastName}),e.jsxs("p",{className:"text-gray-600 text-sm","data-testid":"text-life-summary",children:[a.lifeYears," · ",a.place]}),e.jsx("p",{className:"text-amber-700 text-sm mt-1 capitalize","data-testid":"text-occupation",children:a.occupation})]}),a.sketchImage&&e.jsx("div",{className:"relative rounded-lg overflow-hidden shadow-md max-w-md mx-auto mb-3",children:e.jsx("img",{src:a.sketchImage,alt:`Sketch of ${a.pastName}, your past life`,className:"w-full object-cover","data-testid":"img-past-life-sketch"})}),a.sketchImage&&e.jsx("div",{className:"text-center no-print",children:e.jsxs(m,{variant:"outline",className:"border-amber-300 text-amber-700 hover:bg-amber-50","data-testid":"button-download-sketch",onClick:w,children:[e.jsx(S,{className:"w-4 h-4 mr-2"}),"Download your sketch"]})})]}),e.jsxs(j.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.15},children:[e.jsxs("div",{className:"pl-section",children:[e.jsx("div",{className:"pl-watermark","aria-hidden":"true",children:l}),e.jsxs("div",{className:"pl-content",children:[e.jsxs("div",{className:"flex items-start gap-4 mb-5",children:[e.jsx("img",{src:b,alt:s.displayName,className:"w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-amber-200","data-testid":"img-tina-avatar"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold text-gray-900",children:s.displayName}),e.jsx("p",{className:"text-gray-500 text-sm","data-testid":"text-tina-timestamp",children:d})]})]}),e.jsx("div",{className:"text-gray-700",style:{fontSize:"0.95rem",lineHeight:"1.75"},children:e.jsx("p",{"data-testid":"text-opening-message",children:a.openingMessage})})]})]}),(a.sections||[]).map((t,c)=>e.jsxs("div",{children:[e.jsxs("div",{className:"pl-heading",children:[e.jsx(I,{className:"w-5 h-5 text-amber-600 flex-shrink-0"}),e.jsx("h2",{className:"font-bold text-xl text-gray-900",style:{fontFamily:"'Merriweather', serif"},children:t.title})]}),e.jsxs("div",{className:"pl-section","data-testid":`section-past-life-${c}`,children:[e.jsx("div",{className:"pl-watermark","aria-hidden":"true",children:l}),e.jsx("div",{className:"pl-content",children:e.jsx("div",{className:"text-gray-700 leading-relaxed whitespace-pre-line",style:{fontSize:"0.95rem",lineHeight:"1.75"},"data-testid":`text-section-content-${c}`,children:t.content})})]})]},c)),a.karmicLessons&&a.karmicLessons.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"pl-heading",children:[e.jsx(L,{className:"w-5 h-5 text-amber-600 flex-shrink-0"}),e.jsx("h2",{className:"font-bold text-xl text-gray-900",style:{fontFamily:"'Merriweather', serif"},children:"What this life is asking of you"})]}),a.karmicLessons.map((t,c)=>e.jsxs("div",{className:"pl-section","data-testid":`section-karmic-${c}`,children:[e.jsx("div",{className:"pl-watermark","aria-hidden":"true",children:l}),e.jsxs("div",{className:"pl-content",children:[e.jsx("p",{className:"font-semibold text-gray-900 mb-2",style:{fontSize:"0.95rem"},children:t.title}),e.jsx("div",{className:"text-gray-700 leading-relaxed",style:{fontSize:"0.95rem",lineHeight:"1.75"},children:t.content})]})]},c))]}),e.jsxs("div",{className:"pl-heading",children:[e.jsx($,{className:"w-5 h-5 text-amber-600 flex-shrink-0"}),e.jsx("h2",{className:"font-bold text-xl text-gray-900",style:{fontFamily:"'Merriweather', serif"},children:"A final word"})]}),e.jsxs("div",{className:"pl-section",children:[e.jsx("div",{className:"pl-watermark","aria-hidden":"true",children:l}),e.jsxs("div",{className:"pl-content",children:[e.jsxs("div",{className:"flex items-start gap-4 mb-4",children:[e.jsx("img",{src:b,alt:s.displayName,className:"w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-amber-200"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold text-gray-900",children:s.displayName}),e.jsx("p",{className:"text-gray-500 text-sm",children:d})]})]}),e.jsx("div",{className:"text-gray-700 leading-relaxed whitespace-pre-line",style:{fontSize:"0.95rem",lineHeight:"1.75"},"data-testid":"text-closing-message",children:a.closingMessage})]})]}),e.jsx("div",{className:"text-center mt-10 pb-8 no-print",children:e.jsx(m,{variant:"ghost",className:"text-amber-600 hover:text-amber-800 underline","data-testid":"button-go-back-bottom",onClick:h,children:"Go back to your portal"})})]})]})]})}export{F as default};
