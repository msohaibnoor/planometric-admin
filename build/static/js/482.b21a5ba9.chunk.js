"use strict";(self.webpackChunkberry_material_react=self.webpackChunkberry_material_react||[]).push([[482,756],{44260:function(e,n,t){var a=t(57621),r=t(64554),i=t(61889),l=t(20890),s=t(56689),o=t(23786),d=t(13967),c=t(72791),u=t(91923),h=t(80184),p=(0,c.forwardRef)((function(e){var n=e.title,t=e.role,c=e.value,p=e.setValue,g=e.options,m=e.marginTop,x=(0,d.Z)();return(0,h.jsx)(a.Z,{sx:{marginBottom:x.spacing(u.dv),border:"1px solid",borderColor:x.palette.primary[200]+75,background:x.palette.background.default,marginTop:null!==m&&void 0!==m?m:"0px"},children:(0,h.jsx)(r.Z,{sx:{p:2,pl:2},children:(0,h.jsxs)(i.ZP,{container:!0,alignItems:"center",justifyContent:"space-between",spacing:u.dv,children:[(0,h.jsx)(i.ZP,{item:!0,children:(0,h.jsx)(l.Z,{variant:"h3",sx:{fontWeight:500,color:"cadetblue"},children:n})}),void 0!==c&&(0,h.jsx)(i.ZP,{item:!0,children:g&&("teacher"==t||"super_admin"==t)&&(0,h.jsx)(s.Z,{id:"standard-select-currency",select:!0,value:c,onChange:function(e){return p(e.target.value)},sx:{width:"150px",height:"44px"},children:g.map((function(e){return(0,h.jsx)(o.Z,{value:e.value,children:e.label},e.value)}))})})]})})})}));n.Z=p},2482:function(e,n,t){t.r(n),t.d(n,{default:function(){return J}});var a=t(29439),r=t(72791),i=t(16030),l=t(91923),s=t(13967),o=t(39281),d=t(79836),c=t(56890),u=t(35855),h=t(53994),p=t(53382),g=t(13400),m=t(80911),x=t(23786),Z=t(88471),v=t(52898),j=t(52601),f=t(1413),b=t(55931),y=t(5574),C=t(35201),I=t(39157),k=t(51691),S=t(20890),P=t(97123),z=t(24518),A=t(45196),N=t(80184),w=(0,r.forwardRef)((function(e,n){return(0,N.jsx)(b.Z,(0,f.Z)({direction:"up",ref:n},e))}));function D(e){var n=e.deleteOpen,t=e.setDeleteOpen,a=e.categoryData,r=e.categoryId,l=(e.brandId,e.page),o=e.limit,d=e.search,c=(0,s.Z)(),u=(0,i.I0)(),h=function(){t(!1)};return(0,N.jsx)(N.Fragment,{children:(0,N.jsxs)(y.Z,{open:n,TransitionComponent:w,keepMounted:!0,onClose:h,"aria-labelledby":"alert-dialog-slide-title1","aria-describedby":"alert-dialog-slide-description1",children:[(0,N.jsx)(C.Z,{id:"alert-dialog-slide-title1",children:"Delete Category"}),(0,N.jsx)(I.Z,{children:(0,N.jsx)(k.Z,{id:"alert-dialog-slide-description1",children:(0,N.jsx)(S.Z,{variant:"body2",component:"span",children:"Are you sure you want to delete this Category?"})})}),(0,N.jsxs)(P.Z,{sx:{pr:2.5},children:[(0,N.jsx)(z.Z,{sx:{color:c.palette.error.dark,borderColor:c.palette.error.dark},onClick:h,color:"secondary",children:"No"}),(0,N.jsx)(z.Z,{variant:"contained",size:"small",onClick:function(){u((0,A.uu)({categoryId:r,brandId:a.brandId,handleClose:h,page:l,limit:o,search:d}))},children:"Yes"})]})]})})}var E=t(72426),L=t.n(E),M=function(e){var n=e.categoryList,t=e.page,i=e.limit,l=e.search,f=e.categoryData,b=e.setCategoryData,y=e.setAddUpdateOpen,C=e.categoryId,I=e.setCategoryId,k=(0,s.Z)(),S=(0,r.useState)(!1),P=(0,a.Z)(S,2),z=P[0],A=P[1],w=(0,r.useState)(null),E=(0,a.Z)(w,2),M=E[0],B=E[1],O=(0,r.useState)(null),T=(0,a.Z)(O,2),R=T[0],F=T[1],U=function(){B(null)};return(0,N.jsxs)(o.Z,{children:[(0,N.jsx)(D,{deleteOpen:z,setDeleteOpen:A,categoryId:C,categoryData:f,page:t,limit:i,search:l}),(0,N.jsxs)(d.Z,{children:[(0,N.jsx)(c.Z,{children:(0,N.jsxs)(u.Z,{children:[(0,N.jsx)(h.Z,{align:"center",children:"Name"}),(0,N.jsx)(h.Z,{align:"center",children:"Total NFT'S"}),(0,N.jsx)(h.Z,{align:"center",children:"Brand"}),(0,N.jsx)(h.Z,{align:"center",children:"Created / Updated"}),(0,N.jsx)(h.Z,{align:"center",children:"Actions"})]})}),(0,N.jsx)(p.Z,{children:n&&n.categories&&n.categories.length>0&&n.categories.map((function(e,n){var t,a;return(0,N.jsx)(N.Fragment,{children:(0,N.jsxs)(u.Z,{onClick:function(){console.log("nfts",e)},children:[(0,N.jsx)(h.Z,{align:"center",sx:{padding:"0px"},children:e.name}),(0,N.jsx)(h.Z,{align:"center",sx:{padding:"0px"},children:e.Nfts&&e.Nfts.length}),(0,N.jsx)(h.Z,{align:"center",sx:{padding:"0px"},children:e.Brand.name}),(0,N.jsxs)(h.Z,{align:"center",children:[L()(e.createdAt).format("DD-MM-YY")," / ",L()(e.updatedAt).format("DD-MM-YY")]}),(0,N.jsxs)(h.Z,{align:"center",sx:{padding:"0px"},children:[(0,N.jsx)(g.Z,{children:(0,N.jsx)(v.Z,{fontSize:"large",color:"black","aria-controls":"menu-friend-card","aria-haspopup":"true",sx:{opacity:1.6},onClick:function(n){return function(e,n){F(n),B(e.currentTarget)}(n,e)}})}),(0,N.jsxs)(m.Z,{id:"menu-simple-card",anchorEl:M,keepMounted:!0,open:Boolean(M),onClose:U,variant:"selectedMenu",anchorOrigin:{vertical:"left",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"},sx:{padding:"0px 8px"},className:"customMenuClass",children:[(0,N.jsx)(x.Z,{onClick:function(){console.log("selectedRow",R),b({name:R.name,brandId:R.BrandId}),I(R.id),y(!0),U()},disabled:!!(null!==R&&void 0!==R&&R.Nfts&&(null===R||void 0===R||null===(t=R.Nfts)||void 0===t?void 0:t.length)>0),children:(0,N.jsxs)("div",{className:"actionItem",children:[(0,N.jsx)(g.Z,{color:"primary","aria-label":"Edit",size:"large",sx:{padding:"0px"},children:(0,N.jsx)(Z.Z,{sx:{fontSize:"1.5rem"}})}),(0,N.jsx)("p",{children:"Edit"})]})}),(0,N.jsx)(x.Z,{onClick:function(){A(!0),I(R.id),b({name:R.name,brandId:R.BrandId}),U()},disabled:!!(null!==R&&void 0!==R&&R.Nfts&&(null===R||void 0===R||null===(a=R.Nfts)||void 0===a?void 0:a.length)>0),children:(0,N.jsxs)("div",{className:"actionItem",children:[(0,N.jsx)(g.Z,{color:"primary",sx:{color:k.palette.orange.dark,borderColor:k.palette.orange.main,"&:hover ":{background:k.palette.orange.light},padding:"0px"},size:"large",children:(0,N.jsx)(j.Z,{sx:{fontSize:"1.5rem"}})}),(0,N.jsx)("p",{children:"Delete"})]})})]})]})]})})}))})]})]})},B=t(61889),O=t(28029),T=t(63466),R=t(56689),F=t(57246),U=t(58956),_=t(88910),Y=t(92506),V=t(81724),W=t(72606),H=(0,r.forwardRef)((function(e,n){return(0,N.jsx)(b.Z,(0,f.Z)({direction:"up",ref:n},e))}));function q(e){var n=e.brandArray,t=e.addUpdateOpen,a=e.setAddUpdateOpen,r=e.page,l=e.limit,o=e.search,d=e.categoryData,c=e.setCategoryData,u=e.categoryId,h=e.mainBrandId,p=(0,s.Z)(),g=(0,i.I0)(),m=V.Ry({name:V.Z_().required("Category Name is required!").max(42,"Category Name can not exceed 42 characters").matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/,"Invalid Category name")}),Z=(0,Y.TA)({enableReinitialize:!0,initialValues:{name:d.name},validationSchema:m,onSubmit:function(e){""==d.name?g((0,A.i8)({name:e.name,brandId:d.brandId,search:o,page:r,limit:l,mainBrandId:h,handleClose:v,setCategoryData:c})):g((0,A.yr)({categoryId:u,name:e.name,brandId:d.brandId,search:o,page:r,limit:l,handleClose:v,setCategoryData:c}))}}),v=function(){a(!1),c({name:"",brandId:0}),Z.resetForm()};return(0,N.jsx)(N.Fragment,{children:(0,N.jsxs)(y.Z,{className:"responsiveDialog",open:t,TransitionComponent:H,keepMounted:!0,"aria-labelledby":"alert-dialog-slide-title1","aria-describedby":"alert-dialog-slide-description1",children:[(0,N.jsx)(C.Z,{id:"alert-dialog-slide-title1",children:""==d.name?"Add Category":"Update Category"}),(0,N.jsx)(I.Z,{children:(0,N.jsxs)("form",{autoComplete:"off",onSubmit:Z.handleSubmit,children:[(0,N.jsx)(B.ZP,{item:!0,xs:12,pt:4,children:(0,N.jsx)(R.Z,{id:"name",name:"name",label:"Enter Category Name",value:Z.values.name,onChange:Z.handleChange,error:Z.touched.name&&Boolean(Z.errors.name),helperText:Z.touched.name&&Z.errors.name,fullWidth:!0,autoComplete:"given-name"})}),""==d.name&&(0,N.jsx)(B.ZP,{item:!0,xs:12,pt:4,children:(0,N.jsxs)(R.Z,{className:"brandSelectField",id:"outlined-select-budget",select:!0,fullWidth:!0,label:"Select Brand",value:d.brandId,onChange:function(e){c({name:d.name,brandId:e.target.value})},children:[(0,N.jsx)(x.Z,{value:0,children:"Choose Brand"}),n&&n.brandList&&n.brandList.map((function(e,n){return(0,N.jsx)(x.Z,{value:e.value,children:e.label},n)}))]})})]})}),(0,N.jsxs)(P.Z,{sx:{pr:2.5},children:[(0,N.jsx)(z.Z,{sx:{color:p.palette.error.dark,borderColor:p.palette.error.dark},onClick:function(){v()},color:"secondary",children:(0,N.jsx)(W.Z,{id:"cancel"})}),(0,N.jsx)(z.Z,{variant:"contained",size:"small",onClick:function(){Z.handleSubmit()},children:""==d.name?"Add":"Update"})]})]})})}var G=t(23735),$=t(44260),J=function(){var e=(0,s.Z)(),n=(0,i.I0)(),t=(0,i.v9)((function(e){return e.marketPlace.categoryList})),o=(0,i.v9)((function(e){return e.marketPlace.brandArray})),d=(0,r.useState)(0),c=(0,a.Z)(d,2),u=c[0],h=c[1],p=(0,r.useState)(""),g=(0,a.Z)(p,2),Z=g[0],v=g[1],j=(0,r.useState)(1),f=(0,a.Z)(j,2),b=f[0],y=f[1],C=(0,r.useState)(10),I=(0,a.Z)(C,2),k=I[0],P=I[1],w=(0,r.useState)(),D=(0,a.Z)(w,2),E=D[0],L=D[1],Y=(0,r.useState)({name:"",brandId:0}),V=(0,a.Z)(Y,2),W=V[0],H=V[1],J=(0,r.useState)(!1),K=(0,a.Z)(J,2),Q=K[0],X=K[1],ee=(0,r.useState)(null),ne=(0,a.Z)(ee,2),te=ne[0],ae=ne[1],re=function(){ae(null)};return(0,r.useEffect)((function(){n((0,A.B)())}),[]),(0,r.useEffect)((function(){n((0,A.tG)({brandId:0==u?"":u,search:Z,page:b,limit:k}))}),[Z,b,k,u]),(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(q,{mainBrandId:u,brandArray:o,categoryId:E,categoryData:W,setCategoryData:H,page:b,limit:k,search:Z,addUpdateOpen:Q,setAddUpdateOpen:X}),(0,N.jsx)($.Z,{title:"Category Management",marginTop:"20px"}),(0,N.jsx)(G.Z,{title:(0,N.jsxs)(B.ZP,{container:!0,spacing:l.dv,children:[(0,N.jsx)(B.ZP,{item:!0,xs:3,children:(0,N.jsx)(O.Z,{id:"input-search-list-style1",placeholder:"Search",startAdornment:(0,N.jsx)(T.Z,{position:"start",children:(0,N.jsx)(U.jVj,{stroke:1.5,size:"1rem"})}),size:"small",onChange:function(e){v(e.target.value)},sx:{height:"40px",width:"100%"},className:"customOutlinedInput"})}),(0,N.jsx)(B.ZP,{item:!0,xs:3,children:(0,N.jsxs)(R.Z,{className:"selectField",id:"outlined-select-budget",select:!0,fullWidth:!0,label:"Select Brand",value:u,onChange:function(e){h(e.target.value)},sx:{height:"40px"},children:[(0,N.jsx)(x.Z,{value:0,children:"All"}),o&&o.brandList&&o.brandList.map((function(e,n){return(0,N.jsx)(x.Z,{value:e.value,children:e.label},n)}))]})}),(0,N.jsx)(B.ZP,{item:!0,xs:6,textAlign:"end",children:(0,N.jsx)(z.Z,{variant:"contained",size:"small",onClick:function(){X(!0),H({name:"",brandId:0})},children:"Add Category"})})]}),content:!1,children:t&&t.categories&&t.categories.length>0?(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(M,{categoryList:t&&t,page:b,limit:k,search:Z,categoryId:E,setCategoryId:L,categoryData:W,setCategoryData:H,setAddUpdateOpen:X}),(0,N.jsx)(B.ZP,{item:!0,xs:12,sx:{p:3},children:(0,N.jsxs)(B.ZP,{container:!0,justifyContent:"space-between",spacing:l.dv,children:[(0,N.jsx)(B.ZP,{item:!0,children:(0,N.jsx)(F.Z,{color:"primary",showFirstButton:!0,showLastButton:!0,page:b,count:t&&t.pages,onChange:function(e,n){y(n)}})}),(0,N.jsxs)(B.ZP,{item:!0,children:[(0,N.jsxs)(z.Z,{size:"large",sx:{color:e.palette.grey[900]},color:"secondary",endIcon:(0,N.jsx)(_.Z,{}),onClick:function(e){ae(e.currentTarget)},children:[k," Rows"]}),(0,N.jsxs)(m.Z,{id:"menu-user-list-style1",anchorEl:te,keepMounted:!0,open:Boolean(te),onClose:re,variant:"selectedMenu",anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"bottom",horizontal:"right"},children:[(0,N.jsxs)(x.Z,{value:10,onClick:function(e){P(e.target.value),y(1),re()},children:[" ","10 Rows"]}),(0,N.jsxs)(x.Z,{value:25,onClick:function(e){P(e.target.value),y(1),re()},children:[" ","25 Rows"]}),(0,N.jsxs)(x.Z,{value:50,onClick:function(e){P(e.target.value),y(1),re()},children:[" ","50 Rows"," "]})]})]})]})})]}):(0,N.jsx)(N.Fragment,{children:(0,N.jsx)(B.ZP,{item:!0,children:(0,N.jsx)(S.Z,{style:{padding:"20px"},children:" No Data Available"})})})})]})}},88471:function(e,n,t){var a=t(95318);n.Z=void 0;var r=a(t(45649)),i=t(80184),l=(0,r.default)((0,i.jsx)("path",{d:"m14.06 9.02.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"}),"EditOutlined");n.Z=l},63466:function(e,n,t){t.d(n,{Z:function(){return b}});var a=t(4942),r=t(63366),i=t(87462),l=t(72791),s=t(28182),o=t(99468),d=t(14036),c=t(20890),u=t(93840),h=t(52930),p=t(66934),g=t(31920);function m(e){return(0,g.Z)("MuiInputAdornment",e)}var x=(0,t(36309).Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),Z=t(93736),v=t(80184),j=["children","className","component","disablePointerEvents","disableTypography","position","variant"],f=(0,p.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:function(e,n){var t=e.ownerState;return[n.root,n["position".concat((0,d.Z)(t.position))],!0===t.disablePointerEvents&&n.disablePointerEvents,n[t.variant]]}})((function(e){var n=e.theme,t=e.ownerState;return(0,i.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:n.palette.action.active},"filled"===t.variant&&(0,a.Z)({},"&.".concat(x.positionStart,"&:not(.").concat(x.hiddenLabel,")"),{marginTop:16}),"start"===t.position&&{marginRight:8},"end"===t.position&&{marginLeft:8},!0===t.disablePointerEvents&&{pointerEvents:"none"})})),b=l.forwardRef((function(e,n){var t=(0,Z.Z)({props:e,name:"MuiInputAdornment"}),a=t.children,p=t.className,g=t.component,x=void 0===g?"div":g,b=t.disablePointerEvents,y=void 0!==b&&b,C=t.disableTypography,I=void 0!==C&&C,k=t.position,S=t.variant,P=(0,r.Z)(t,j),z=(0,h.Z)()||{},A=S;S&&z.variant,z&&!A&&(A=z.variant);var N=(0,i.Z)({},t,{hiddenLabel:z.hiddenLabel,size:z.size,disablePointerEvents:y,position:k,variant:A}),w=function(e){var n=e.classes,t=e.disablePointerEvents,a=e.hiddenLabel,r=e.position,i=e.size,l=e.variant,s={root:["root",t&&"disablePointerEvents",r&&"position".concat((0,d.Z)(r)),l,a&&"hiddenLabel",i&&"size".concat((0,d.Z)(i))]};return(0,o.Z)(s,m,n)}(N);return(0,v.jsx)(u.Z.Provider,{value:null,children:(0,v.jsx)(f,(0,i.Z)({as:x,ownerState:N,className:(0,s.Z)(w.root,p),ref:n},P,{children:"string"!==typeof a||I?(0,v.jsxs)(l.Fragment,{children:["start"===k?(0,v.jsx)("span",{className:"notranslate",dangerouslySetInnerHTML:{__html:"&#8203;"}}):null,a]}):(0,v.jsx)(c.Z,{color:"text.secondary",children:a})}))})}))}}]);
//# sourceMappingURL=482.b21a5ba9.chunk.js.map