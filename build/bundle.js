(()=>{"use strict";var e={"./src/Configs/DB_Connect.ts":
/*!***********************************!*\
  !*** ./src/Configs/DB_Connect.ts ***!
  \***********************************/function(e,t,s){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=o(s(/*! mongoose */"mongoose"));r.default.set("strictQuery",!1),r.default.connect("mongodb://localhost:55000/node-task").then((()=>{console.log("Connect to MongoDB")})).catch((e=>console.log(e)))},"./src/Routers/TaskRouter.ts":
/*!***********************************!*\
  !*** ./src/Routers/TaskRouter.ts ***!
  \***********************************/function(e,t,s){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=o(s(/*! express */"express")).default.Router();r.get("/",((e,t)=>{t.status(200).json({message:"Welcome to Hoang Quy Dat 1997"})})),t.default=r},"./src/Routers/UserRouter.ts":
/*!***********************************!*\
  !*** ./src/Routers/UserRouter.ts ***!
  \***********************************/function(e,t,s){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=o(s(/*! express */"express")).default.Router();r.get("/",((e,t)=>{t.status(200).json({message:"Welcome to Hoang Quy Dat 1997"})})),t.default=r},"./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/function(e,t,s){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=o(s(/*! express */"express")),u=o(s(/*! morgan */"morgan")),n=o(s(/*! @Routers/UserRouter */"./src/Routers/UserRouter.ts")),a=o(s(/*! @Routers/TaskRouter */"./src/Routers/TaskRouter.ts"));s(/*! ./Configs/DB_Connect */"./src/Configs/DB_Connect.ts");const l=(0,r.default)();l.use((0,u.default)("dev")),l.use(r.default.json()),l.use(n.default),l.use(a.default),t.default=l},"./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/function(e,t,s){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=o(s(/*! http */"http")),u=o(s(/*! ./app */"./src/app.ts")),n=r.default.createServer(u.default),a=process.env.PORT||3e3;n.listen(a,(()=>{console.log("Server running on:"+a)}))},express:
/*!**************************!*\
  !*** external "express" ***!
  \**************************/e=>{e.exports=require("express")},mongoose:
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/e=>{e.exports=require("mongoose")},morgan:
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/e=>{e.exports=require("morgan")},http:
/*!***********************!*\
  !*** external "http" ***!
  \***********************/e=>{e.exports=require("http")}},t={};(function s(o){var r=t[o];if(void 0!==r)return r.exports;var u=t[o]={exports:{}};return e[o].call(u.exports,u,u.exports,s),u.exports})("./src/server.ts")})();