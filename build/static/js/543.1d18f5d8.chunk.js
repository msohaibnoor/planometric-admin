"use strict";(self.webpackChunkberry_material_react=self.webpackChunkberry_material_react||[]).push([[543],{84543:function(e,n,t){t.r(n);var a=t(15861),r=t(29439),s=t(87757),c=t.n(s),o=t(72791),l=t(74569),i=t.n(l),u=t(61889),d=t(56689),p=t(24518),f=t(16030),h=t(89731),v=t(75985),m=t(80184);n.default=function(){var e=(0,f.v9)((function(e){return e.auth.token})),n=(0,o.useState)(null),t=(0,r.Z)(n,2),s=t[0],l=t[1],x=(0,o.useState)(!1),w=(0,r.Z)(x,2),b=w[0],g=w[1],k=function(){var n=(0,a.Z)(c().mark((function n(){var t,a,r;return c().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(s&&"csv"===(null===s||void 0===s?void 0:s.name.split(".")[1])){n.next=3;break}return g(!0),n.abrupt("return");case 3:return n.prev=3,(t=new FormData).append("file",s),n.next=8,i().post("".concat(h.T,"admin/csv-upload"),t,{headers:{Authorization:"Bearer "+e}});case 8:a=n.sent,r=a.data,v.Am.success(r.data.message),l(null),n.next=17;break;case 14:n.prev=14,n.t0=n.catch(3),console.log(n.t0);case 17:case"end":return n.stop()}}),n,null,[[3,14]])})));return function(){return n.apply(this,arguments)}}(),y=function(){var n=(0,a.Z)(c().mark((function n(){var t,a,r,s;return c().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,i().get("".concat(h.T,"admin/files/download-grasshopper-script?fileToDownload=plants"),{responseType:"arraybuffer",headers:{Authorization:"Bearer ".concat(e)}});case 3:t=n.sent,console.log(t.data),a=new Blob([t.data],{type:"application/octet-stream"}),r=window.URL.createObjectURL(a),(s=document.createElement("a")).style.display="none",s.href=r,s.download="plant-database.csv",document.body.appendChild(s),s.click(),window.URL.revokeObjectURL(r),n.next=19;break;case 16:n.prev=16,n.t0=n.catch(0),console.error("Error downloading the .3dm file:",n.t0);case 19:case"end":return n.stop()}}),n,null,[[0,16]])})));return function(){return n.apply(this,arguments)}}();return(0,m.jsxs)(u.ZP,{display:"flex",justifyContent:"center",alignItems:"center",gap:"30px",children:[(0,m.jsxs)("form",{children:[(0,m.jsx)("h1",{children:"Update Plants Database"}),(0,m.jsx)(d.Z,{sx:{marginTop:"25px"},id:"walletAddress",name:"walletAddress",label:"Select file",type:"file",autoComplete:"given-name",focused:!0,error:b,onChange:function(e){"csv"===e.currentTarget.files[0].name.split(".")[1]&&(l(e.currentTarget.files[0]),g(!1))},helperText:"only .csv files allowed"}),(0,m.jsx)("div",{children:(0,m.jsx)(p.Z,{variant:"contained",size:"small",onClick:k,sx:{marginTop:"25px"},children:"Update"})})]}),(0,m.jsx)(p.Z,{variant:"contained",size:"large",onClick:y,children:"Download Current File"})]})}}}]);
//# sourceMappingURL=543.1d18f5d8.chunk.js.map