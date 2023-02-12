(()=>{var e={108:(e,t,r)=>{var o=r(464),n=r(84);function i(){return(new Date).getTime()}var u,s=Array.prototype.slice,a={};u="undefined"!=typeof global&&global.console?global.console:"undefined"!=typeof window&&window.console?window.console:{};for(var l=[[function(){},"log"],[function(){u.log.apply(u,arguments)},"info"],[function(){u.log.apply(u,arguments)},"warn"],[function(){u.warn.apply(u,arguments)},"error"],[function(e){a[e]=i()},"time"],[function(e){var t=a[e];if(!t)throw new Error("No such label: "+e);delete a[e];var r=i()-t;u.log(e+": "+r+"ms")},"timeEnd"],[function(){var e=new Error;e.name="Trace",e.message=o.format.apply(null,arguments),u.error(e.stack)},"trace"],[function(e){u.log(o.inspect(e)+"\n")},"dir"],[function(e){if(!e){var t=s.call(arguments,1);n.ok(!1,o.format.apply(null,t))}},"assert"]],c=0;c<l.length;c++){var f=l[c],d=f[0],p=f[1];u[p]||(u[p]=d)}e.exports=u},155:e=>{var t,r,o=e.exports={};function n(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function u(e){if(t===setTimeout)return setTimeout(e,0);if((t===n||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:n}catch(e){t=n}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(e){r=i}}();var s,a=[],l=!1,c=-1;function f(){l&&s&&(l=!1,s.length?a=s.concat(a):c=-1,a.length&&d())}function d(){if(!l){var e=u(f);l=!0;for(var t=a.length;t;){for(s=a,a=[];++c<t;)s&&s[c].run();c=-1,t=a.length}s=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];a.push(new p(e,t)),1!==a.length||l||u(d)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},427:function(e,t,r){"use strict";var o=r(108),n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(185));i.default.set("strictQuery",!1),i.default.connect("mongodb://localhost:55000/node-task").then((()=>{o.log("Connect to MongoDB")})).catch((e=>o.log(e)))},614:function(e,t,r){"use strict";var o=r(108),n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TaskModel=t.TaskSchema=void 0;const i=n(r(185));t.TaskSchema=new i.default.Schema({description:{type:String},completed:{type:Boolean}}),t.TaskModel=i.default.model("Task",t.TaskSchema),new t.TaskModel({description:"Learn mongoose",completed:!0}).save().then((e=>{o.log({result:e})})).catch(o.log)},791:function(e,t,r){"use strict";var o=r(108),n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.UserModel=t.UserSchema=void 0;const i=n(r(185)),u=n(r(564));t.UserSchema=new i.default.Schema({name:{type:String,required:!0,trim:!0},email:{type:String,required:!0,trim:!0,lowercase:!0,validate(e){if(!u.default.isEmail(e))throw new Error("Email is invalid")}},age:{type:Number,default:0,validate(e){if(e<0)throw new Error("Age must be a positive number")}}}),t.UserModel=i.default.model("User",t.UserSchema),new t.UserModel({name:"Dat",age:12,email:"dathoang9797gmsdail.com"}).save().then((e=>{o.log({result:e})})).catch(o.log)},430:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.routerUser=void 0;const n=o(r(860));t.routerUser=n.default.Router(),t.routerUser.get("/",((e,t)=>{t.status(200).json({message:"Welcome to xedike"})}))},752:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=o(r(860)),i=(o(r(470)),r(430));r(427),r(614),r(791);const u=(0,n.default)();u.use(n.default.json()),u.use(i.routerUser),t.default=u},728:function(e,t,r){"use strict";var o=r(155),n=r(108),i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const u=i(r(685)),s=i(r(752)),a=u.default.createServer(s.default),l=o.env.PORT||3e3;a.listen(l,(()=>{n.log("Server running on:"+l)}))},84:e=>{"use strict";e.exports=require("assert")},860:e=>{"use strict";e.exports=require("express")},185:e=>{"use strict";e.exports=require("mongoose")},470:e=>{"use strict";e.exports=require("morgan")},464:e=>{"use strict";e.exports=require("util")},564:e=>{"use strict";e.exports=require("validator")},685:e=>{"use strict";e.exports=require("http")}},t={};!function r(o){var n=t[o];if(void 0!==n)return n.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,r),i.exports}(728)})();