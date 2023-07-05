"use strict";(self.webpackChunkberry_material_react=self.webpackChunkberry_material_react||[]).push([[679],{97123:function(e,r,o){o.d(r,{Z:function(){return m}});var t=o(63366),a=o(87462),i=o(72791),n=o(28182),l=o(99468),c=o(66934),s=o(93736),d=o(31920);function p(e){return(0,d.Z)("MuiDialogActions",e)}(0,o(36309).Z)("MuiDialogActions",["root","spacing"]);var u=o(80184),f=["className","disableSpacing"],v=(0,c.ZP)("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:function(e,r){var o=e.ownerState;return[r.root,!o.disableSpacing&&r.spacing]}})((function(e){var r=e.ownerState;return(0,a.Z)({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!r.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})})),m=i.forwardRef((function(e,r){var o=(0,s.Z)({props:e,name:"MuiDialogActions"}),i=o.className,c=o.disableSpacing,d=void 0!==c&&c,m=(0,t.Z)(o,f),Z=(0,a.Z)({},o,{disableSpacing:d}),h=function(e){var r=e.classes,o={root:["root",!e.disableSpacing&&"spacing"]};return(0,l.Z)(o,p,r)}(Z);return(0,u.jsx)(v,(0,a.Z)({className:(0,n.Z)(h.root,i),ownerState:Z,ref:r},m))}))},39157:function(e,r,o){o.d(r,{Z:function(){return m}});var t=o(63366),a=o(87462),i=o(72791),n=o(28182),l=o(99468),c=o(66934),s=o(93736),d=o(31920);function p(e){return(0,d.Z)("MuiDialogContent",e)}(0,o(36309).Z)("MuiDialogContent",["root","dividers"]);var u=o(80184),f=["className","dividers"],v=(0,c.ZP)("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:function(e,r){var o=e.ownerState;return[r.root,o.dividers&&r.dividers]}})((function(e){var r=e.theme,o=e.ownerState;return(0,a.Z)({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},o.dividers?{padding:"16px 24px",borderTop:"1px solid ".concat(r.palette.divider),borderBottom:"1px solid ".concat(r.palette.divider)}:{".MuiDialogTitle-root + &":{paddingTop:0}})})),m=i.forwardRef((function(e,r){var o=(0,s.Z)({props:e,name:"MuiDialogContent"}),i=o.className,c=o.dividers,d=void 0!==c&&c,m=(0,t.Z)(o,f),Z=(0,a.Z)({},o,{dividers:d}),h=function(e){var r=e.classes,o={root:["root",e.dividers&&"dividers"]};return(0,l.Z)(o,p,r)}(Z);return(0,u.jsx)(v,(0,a.Z)({className:(0,n.Z)(h.root,i),ownerState:Z,ref:r},m))}))},35201:function(e,r,o){o.d(r,{Z:function(){return h}});var t=o(87462),a=o(63366),i=o(72791),n=o(28182),l=o(99468),c=o(20890),s=o(66934),d=o(93736),p=o(31920);function u(e){return(0,p.Z)("MuiDialogTitle",e)}(0,o(36309).Z)("MuiDialogTitle",["root"]);var f=o(85090),v=o(80184),m=["className","id"],Z=(0,s.ZP)(c.Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:function(e,r){return r.root}})({padding:"16px 24px",flex:"0 0 auto"}),h=i.forwardRef((function(e,r){var o=(0,d.Z)({props:e,name:"MuiDialogTitle"}),c=o.className,s=o.id,p=(0,a.Z)(o,m),h=o,x=function(e){var r=e.classes;return(0,l.Z)({root:["root"]},u,r)}(h),g=i.useContext(f.Z).titleId,b=void 0===g?s:g;return(0,v.jsx)(Z,(0,t.Z)({component:"h2",className:(0,n.Z)(x.root,c),ownerState:h,ref:r,variant:"h6",id:b},p))}))},5574:function(e,r,o){var t=o(4942),a=o(63366),i=o(87462),n=o(72791),l=o(28182),c=o(99468),s=o(96248),d=o(14036),p=o(92211),u=o(60627),f=o(81314),v=o(10703),m=o(93736),Z=o(66934),h=o(17780),x=o(85090),g=o(80507),b=o(80184),S=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],w=(0,Z.ZP)(g.Z,{name:"MuiDialog",slot:"Backdrop",overrides:function(e,r){return r.backdrop}})({zIndex:-1}),W=(0,Z.ZP)(p.Z,{name:"MuiDialog",slot:"Root",overridesResolver:function(e,r){return r.root}})({"@media print":{position:"absolute !important"}}),k=(0,Z.ZP)("div",{name:"MuiDialog",slot:"Container",overridesResolver:function(e,r){var o=e.ownerState;return[r.container,r["scroll".concat((0,d.Z)(o.scroll))]]}})((function(e){var r=e.ownerState;return(0,i.Z)({height:"100%","@media print":{height:"auto"},outline:0},"paper"===r.scroll&&{display:"flex",justifyContent:"center",alignItems:"center"},"body"===r.scroll&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})})),D=(0,Z.ZP)(v.Z,{name:"MuiDialog",slot:"Paper",overridesResolver:function(e,r){var o=e.ownerState;return[r.paper,r["scrollPaper".concat((0,d.Z)(o.scroll))],r["paperWidth".concat((0,d.Z)(String(o.maxWidth)))],o.fullWidth&&r.paperFullWidth,o.fullScreen&&r.paperFullScreen]}})((function(e){var r=e.theme,o=e.ownerState;return(0,i.Z)({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},"paper"===o.scroll&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},"body"===o.scroll&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!o.maxWidth&&{maxWidth:"calc(100% - 64px)"},"xs"===o.maxWidth&&(0,t.Z)({maxWidth:"px"===r.breakpoints.unit?Math.max(r.breakpoints.values.xs,444):"".concat(r.breakpoints.values.xs).concat(r.breakpoints.unit)},"&.".concat(h.Z.paperScrollBody),(0,t.Z)({},r.breakpoints.down(Math.max(r.breakpoints.values.xs,444)+64),{maxWidth:"calc(100% - 64px)"})),"xs"!==o.maxWidth&&(0,t.Z)({maxWidth:"".concat(r.breakpoints.values[o.maxWidth]).concat(r.breakpoints.unit)},"&.".concat(h.Z.paperScrollBody),(0,t.Z)({},r.breakpoints.down(r.breakpoints.values[o.maxWidth]+64),{maxWidth:"calc(100% - 64px)"})),o.fullWidth&&{width:"calc(100% - 64px)"},o.fullScreen&&(0,t.Z)({margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0},"&.".concat(h.Z.paperScrollBody),{margin:0,maxWidth:"100%"}))})),y={enter:f.x9.enteringScreen,exit:f.x9.leavingScreen},C=n.forwardRef((function(e,r){var o=(0,m.Z)({props:e,name:"MuiDialog"}),t=o["aria-describedby"],p=o["aria-labelledby"],f=o.BackdropComponent,Z=o.BackdropProps,g=o.children,C=o.className,M=o.disableEscapeKeyDown,P=void 0!==M&&M,R=o.fullScreen,B=void 0!==R&&R,N=o.fullWidth,T=void 0!==N&&N,j=o.maxWidth,A=void 0===j?"sm":j,F=o.onBackdropClick,I=o.onClose,E=o.open,K=o.PaperComponent,Y=void 0===K?v.Z:K,_=o.PaperProps,X=void 0===_?{}:_,H=o.scroll,L=void 0===H?"paper":H,z=o.TransitionComponent,O=void 0===z?u.Z:z,q=o.transitionDuration,G=void 0===q?y:q,J=o.TransitionProps,Q=(0,a.Z)(o,S),U=(0,i.Z)({},o,{disableEscapeKeyDown:P,fullScreen:B,fullWidth:T,maxWidth:A,scroll:L}),V=function(e){var r=e.classes,o=e.scroll,t=e.maxWidth,a=e.fullWidth,i=e.fullScreen,n={root:["root"],container:["container","scroll".concat((0,d.Z)(o))],paper:["paper","paperScroll".concat((0,d.Z)(o)),"paperWidth".concat((0,d.Z)(String(t))),a&&"paperFullWidth",i&&"paperFullScreen"]};return(0,c.Z)(n,h.D,r)}(U),$=n.useRef(),ee=(0,s.Z)(p),re=n.useMemo((function(){return{titleId:ee}}),[ee]);return(0,b.jsx)(W,(0,i.Z)({className:(0,l.Z)(V.root,C),BackdropProps:(0,i.Z)({transitionDuration:G,as:f},Z),closeAfterTransition:!0,BackdropComponent:w,disableEscapeKeyDown:P,onClose:I,open:E,ref:r,onClick:function(e){$.current&&($.current=null,F&&F(e),I&&I(e,"backdropClick"))},ownerState:U},Q,{children:(0,b.jsx)(O,(0,i.Z)({appear:!0,in:E,timeout:G,role:"presentation"},J,{children:(0,b.jsx)(k,{className:(0,l.Z)(V.container),onMouseDown:function(e){$.current=e.target===e.currentTarget},ownerState:U,children:(0,b.jsx)(D,(0,i.Z)({as:Y,elevation:24,role:"dialog","aria-describedby":t,"aria-labelledby":ee},X,{className:(0,l.Z)(V.paper,X.className),ownerState:U,children:(0,b.jsx)(x.Z.Provider,{value:re,children:g})}))})}))}))}));r.Z=C},85090:function(e,r,o){var t=(0,o(72791).createContext)({});r.Z=t},17780:function(e,r,o){o.d(r,{D:function(){return a}});var t=o(31920);function a(e){return(0,t.Z)("MuiDialog",e)}var i=(0,o(36309).Z)("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]);r.Z=i}}]);
//# sourceMappingURL=679.8f56cb43.chunk.js.map