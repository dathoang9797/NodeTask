(()=>{"use strict";var e={427:function(e,r,t){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});const o=a(t(185));o.default.set("strictQuery",!1),o.default.connect("mongodb://localhost:27017/node-task").then((()=>{console.log("Connect to MongoDB")})).catch((e=>console.log(e)))},201:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.ErrorController=void 0;const a=t(629),o=t(894),{errorSomeThingWrong:s,errorDuplicate:n,errorCastMongoose:i,errorValidation:d,errorInvalidToken:l,errorTokenExpired:u}=o.MessageLog;r.ErrorController=(e,r,t,o)=>{e.status=e.status||"error",e.statusCode=e.statusCode||500;{let r={...e};return"CastError"===e.name&&(r=(e=>{const r=i(e);return new a.AppErrorHandling(r,400)})(r)),11e3===r.code&&(r=(e=>{const r=e.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/),t=n(r);return new a.AppErrorHandling(t,400)})(r)),"ValidationError"===r.name&&(r=(e=>{const r=Object.values(e.errors).map((e=>e.message)),t=d(r);return new a.AppErrorHandling(t,400)})(r)),"JsonWebTokenError"===r.name&&(r=new a.AppErrorHandling(l,401)),"TokenExpiredError"===r.name&&(r=new a.AppErrorHandling(u,401)),((e,r)=>{e.isOperational?r.status(e.statusCode).json({status:e.status,message:e.message}):(console.error("ERROR 🎆",e),r.status(500).json({status:"error",message:s}))})(r,t)}}},461:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.getTaskById=r.getTask=r.createTask=void 0;const a=t(614),o=t(894);r.createTask=(0,o.catchError)((async(e,r)=>{try{const t=e.user,o=new a.TaskModel({...e.body,owner:t._id});await o.save(),r.status(201).send(o)}catch(e){r.status(400).send(e)}})),r.getTask=(0,o.catchError)((async(e,r)=>{try{const t=e.user,a={},o={};if(e.query.completed&&(a.completed="true"===e.query.completed),e.query.sortBy){const r=e.query.sortBy.split(":");o[r[0]]="desc"===r[1]?-1:1}await t.populate({path:"tasks",match:a,options:{limit:parseInt(e.query.limit),skip:parseInt(e.query.skip),sort:o}});r.send(e.user.tasks)}catch(e){r.status(500).send(e)}})),r.getTaskById=(0,o.catchError)((async(e,r)=>{try{const t=await a.TaskModel.findOne({_id:e.params.id,owner:e.user._id});t||r.status(404).send(),r.send(t)}catch(e){r.status(500).send(e)}}))},95:function(e,r,t){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0}),r.sendWelcomeEmail=void 0;const o=a(t(139));o.default.setApiKey("somekey");r.sendWelcomeEmail=(e,r)=>{o.default.send({to:e,from:"taskManager@gmail.com",subject:"Welcome to task manager",text:`Welcome to task manager ${r}!`,html:"<div>Hi!</div>"})}},145:function(e,r,t){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0}),r.auth=void 0;const o=a(t(344)),s=t(791);r.auth=async(e,r,t)=>{try{const r=e.header("Authorization").replace("Bearer ",""),a=o.default.verify(r,"thisismynewcourse"),n=await s.UserModel.findOne({_id:a._id,"tokens.token":r});if(!n)throw new Error;e.token=r,e.user=n,t()}catch(e){r.status(401).send({error:"Invalid authentication"})}}},614:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.TaskModel=void 0;const a=t(185),o=new a.Schema({description:{type:String,required:!0},completed:{type:Boolean,default:!1},owner:{type:a.Schema.Types.ObjectId,required:!0,ref:"User"}},{timestamps:!0});r.TaskModel=(0,a.model)("Task",o)},791:function(e,r,t){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0}),r.UserModel=void 0;const o=t(185),s=a(t(344)),n=a(t(96)),i=t(614),d=a(t(564)),l=new o.Schema({name:{type:String,required:!0,trim:!0},email:{type:String,required:!0,trim:!0,lowercase:!0,validate(e){if(!d.default.isEmail(e))throw new Error("Email is invalid")}},password:{type:String,required:!0,minlength:7,trim:!0,validate(e){if(e.toLowerCase().includes("passwords"))throw new Error('Password cannot contain "password"')}},age:{type:Number,default:0,validate(e){if(e<0)throw new Error("Age must be a positive number")}},tokens:[{token:{type:String}}],avatar:{type:Buffer}},{timestamps:!0});l.virtual("tasks",{ref:"Task",localField:"_id",foreignField:"owner"}),l.methods.generateAuthToken=async function(){const e=this,r=s.default.sign({_id:e._id.toSring()},"thisismynewcourse",{expiresIn:"7 days"});return e.token=e.tokens.concat({token:r}),await e.save(),r},l.methods.convertJSON=async function(){const e=this.toObject();return delete e.password,delete e.tokens,delete e.avatar,e},l.statics.findByCredentials=async(e,t)=>{const a=await r.UserModel.findOne({email:e});if(!a)throw new Error("Unable to login");if(!await n.default.compare(t,a.password))throw new Error("Unable to login");return a},l.pre("save",(async function(e){const r=this;r.isModified("password")&&(r.password=await n.default.hash(r.password,8)),e()})),l.pre("remove",{document:!0,query:!1},(async function(e){await i.TaskModel.deleteMany({owner:this._id}),e()})),r.UserModel=(0,o.model)("User",l)},622:function(e,r,t){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});const o=a(t(860)),s=t(145),n=t(461),i=o.default.Router();i.post("/tasks",s.auth,n.createTask),i.get("/tasks",s.auth,n.getTask),i.get("/tasks/:id",s.auth,n.getTaskById),r.default=i},430:function(e,r,t){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});const o=a(t(860)),s=a(t(738)),n=a(t(441)),i=t(791),d=t(145),l=t(95),u=o.default.Router();u.post("/users",(async(e,r)=>{try{const t=new i.UserModel(e.body);await t.save(),(0,l.sendWelcomeEmail)(t.email,t.name);const a=await t.generateAuthToken();r.status(201).send({user:t,token:a})}catch(e){r.status(500).send(e)}})),u.post("/users/login",(async(e,r)=>{try{const t=await i.UserModel.findByCredentials(e.body.email,e.body.password),a=await t.generateAuthToken();r.send({user:t,token:a})}catch(e){r.status(400).send(e)}})),u.post("/users/logout",d.auth,(async(e,r)=>{try{const t=e.user;t.tokens=t.tokens.filter((r=>r.token!==e.token)),await t.save(),r.send()}catch(e){r.status(500).send()}})),u.post("/users/logoutAll",d.auth,(async(e,r)=>{try{const t=e.user;t.tokens=[],await t.save(),r.send()}catch(e){r.status(500).send()}})),u.get("/users/me",d.auth,(async(e,r)=>{try{r.send(e.user)}catch(e){r.status(500).send(e)}})),u.get("/users/:id",d.auth,(async(e,r)=>{try{const t=await i.UserModel.findById(e.params.id);t||r.status(404).send(),r.send(t)}catch(e){r.status(500).send(e)}})),u.patch("/users/me",d.auth,(async(e,r)=>{try{const t=e.user,a=Object.keys(e.body),o=["name","email","password","age"];a.every((e=>o.includes(e)))||r.status(400).send({error:"Invalid updates"}),a.forEach((r=>t[r]=e.body[r])),await t.save(),r.send(e.user)}catch(e){r.status(400).send(e)}})),u.delete("/users/me",d.auth,(async(e,r)=>{try{const t=e.user;await t.remove(),r.send(e.user)}catch(e){r.status(500).send(e)}}));const c=(0,s.default)({limits:{fileSize:1e6},fileFilter(e,r,t){if(r.originalname.match(/\.(doc|docx)$/))return t(new Error("Error in upload format"));t(void 0,!0)}});u.post("/users/me/avatar",d.auth,c.single("avatar"),(async(e,r)=>{try{const t=e.user;t.avatar=await(0,n.default)(e.file.buffer).resize({width:250,height:250}).png().toBuffer(),await t.save(),r.send()}catch(e){r.status(400).send({error:e.message})}})),u.delete("/users/me/avatar",d.auth,(async(e,r)=>{try{const t=e.user;t.avatar=void 0,await t.save(),r.send()}catch(e){r.status(400).send({error:e.message})}})),u.get("/users/:id/avatar",(async(e,r)=>{try{const t=await i.UserModel.findById(e.params.id);if(!t||!t.avatar)throw new Error;r.set("Content-Type","image/jpg"),r.send(t.avatar)}catch(e){r.status(404).send()}})),r.default=u},629:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.AppErrorHandling=void 0;class t extends Error{statusCode;status;isOperational;constructor(e,r){super(e),this.statusCode=r,this.status=`${r}`.startsWith("4")?"fail":"error",this.isOperational=!0,Error.captureStackTrace(this,this.constructor)}}r.AppErrorHandling=t},125:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.catchError=void 0;r.catchError=e=>(r,t,a)=>{e(r,t,a).catch((e=>a(e)))}},109:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.MessageLog=void 0;r.MessageLog={errorSignUp:"Can't SignUp User",errorProvideEmailOrPassword:"Please provide email and password!",errorIncorrectPassword:"Incorrect email or password",errorNotHaveToken:"You are not logged in! Please log in to get access",errorCreateUser:"Can't Create User",errorSomeThingWrong:"Something went very wrong!",errorInvalidToken:"Invalid token. Please log in again!",errorTokenExpired:"Your token has expired! PLease login agian!",errorTokenNoLongerExist:"The user belonging to this token does no longer exist",errorTokenChangedPassword:"User recently changed password! Please log in again.",errorNotHavePermission:"You do not have permission to perform this action",errorNoUserWithUserName:"There is no user with email address",errorSendingEmail:"There was error sending the email. Try again later!",errorTokenInvalidOrHasExpired:" Token is invalid or has expired",messageSubjectEmailResetPassword:"Your password reset token valid for 10 min",messageTokenSentToEmail:"Token sent to email!",errorFetchUsers:"Can't fetch data user or delete the previous. Please try again later!",errorWrongRouteUpdate:"This route is not for password updates. Please use /updatepassword",errorFetchMenu:"Can't fetch data menu or delete the previous. Please try again later!",errorDeleteUser:"Can't delete user. Please try again later!",errorDeleteMenu:"Can't delete menu. Please try again later!",errorInvalidImage:"Invalid image. Please add right format!",errorCreateMenu:"Can't Create Menu",errorUpdateMenuById:"Can't update menu by id. Please try again later!",errorCreateRestaurant:"Can't Create Restaurant",errorDeleteRestaurant:"Can't delete Restaurant. Please try again later!",errorUpdateRestaurantById:"Can't update Restaurant by id. Please try again later!",errorFetchRestaurant:"Can't fetch data Restaurant or delete the previous. Please try again later!",errorCreateCategory:"Can't Create Category",errorDeleteCategory:"Can't delete Category. Please try again later!",errorUpdateCategoryById:"Can't update Category by id. Please try again later!",errorFetchCategory:"Can't fetch data Category or delete the previous. Please try again later!",errorCreateState:"Can't Create State",errorDeleteState:"Can't delete State. Please try again later!",errorUpdateStateById:"Can't update State by id. Please try again later!",errorFetchState:"Can't fetch data State or delete the previous. Please try again later!",errorCreateCity:"Can't Create City",errorDeleteCity:"Can't delete City. Please try again later!",errorUpdateCityById:"Can't update City by id. Please try again later!",errorFetchCity:"Can't fetch data City or delete the previous. Please try again later!",errorCreatePromo:"Can't Create Promo",errorDeletePromo:"Can't delete Promo. Please try again later!",errorUpdatePromoById:"Can't update Promo by id. Please try again later!",errorFetchPromo:"Can't fetch data Promo or delete the previous. Please try again later!",errorCreateStatus:"Can't Create Status",errorDeleteStatus:"Can't delete Status. Please try again later!",errorUpdateStatusById:"Can't update Status by id. Please try again later!",errorFetchStatus:"Can't fetch data Status or delete the previous. Please try again later!",errorRequestManyTime:"Too many requests from this IP,  please try again in an hour",errorUpdateProfile:"Can't update profile",errorUpdateUser:"Can't update user",errorNotRightImage:"Not an image! Please upload only images",errorCreateSubMenu:"Can't Create SubMenu",errorDeleteSubMenu:"Can't delete submenu. Please try again later!",errorUpdateSubMenuById:"Can't update submenu by id. Please try again later!",errorFetchSubMenu:"Can't fetch data submenu or delete the previous. Please try again later!",errorCreateReview:"Can't Create Review",errorDeleteReview:"Can't delete Review. Please try again later!",errorUpdateReviewById:"Can't update Review by id. Please try again later!",errorFetchReview:"Can't fetch data Review or delete the previous. Please try again later!",errorCreateOrder:"Can't Create Order",errorDeleteOrder:"Can't delete order. Please try again later!",errorUpdateOrderById:"Can't update order by id. Please try again later!",errorFetchOrder:"Can't fetch data order or delete the previous. Please try again later!",errorCreateOrderDetail:"Can't Create Order Detail",errorDeleteOrderDetail:"Can't delete order Detail. Please try again later!",errorUpdateOrderDetailById:"Can't update order Detail by id. Please try again later!",errorFetchOrderDetail:"Can't fetch data order Detail or delete the previous. Please try again later!",errorCreateMenuDetail:"Can't Create Menu Detail",errorDeleteMenuDetail:"Can't delete menu detail. Please try again later!",errorUpdateMenuDetailById:"Can't update menu detail by id. Please try again later!",errorFetchMenuDetail:"Can't fetch data menu detail or delete the previous. Please try again later!",errorCreateMenuPromo:"Can't Create Menu Promo",errorDeleteMenuPromo:"Can't delete menu promo. Please try again later!",errorUpdateMenuPromoById:"Can't update menu promo by id. Please try again later!",errorFetchMenuPromo:"Can't fetch data menu promo or delete the previous. Please try again later!",errorDuplicate:e=>`Duplicate field value: ${e}. The User has been signup. PLease try use another phone or email`,errorCastMongoose:e=>`Invalid ${e.path}: ${e.value}`,errorValidation:e=>`Invalid input data. ${e.join(". ")} `,messageForgotPassword:e=>`Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${e}.\n If you didn't forget your password, please ignore this email!`}},894:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.MessageLog=r.catchError=r.AppErrorHandling=void 0;const a=t(629);Object.defineProperty(r,"AppErrorHandling",{enumerable:!0,get:function(){return a.AppErrorHandling}});const o=t(125);Object.defineProperty(r,"catchError",{enumerable:!0,get:function(){return o.catchError}});const s=t(109);Object.defineProperty(r,"MessageLog",{enumerable:!0,get:function(){return s.MessageLog}})},752:function(e,r,t){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});const o=a(t(860)),s=(a(t(470)),a(t(430))),n=a(t(622)),i=t(201);t(427);const d=(0,o.default)();d.use(o.default.json()),d.use(s.default),d.use(n.default),d.all("*",((e,r,t)=>{r.status(404).json("Error 404")})),d.use(i.ErrorController),r.default=d},728:function(e,r,t){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});const o=a(t(685)),s=a(t(752)),n=o.default.createServer(s.default),i="3000";n.listen(i,(()=>{console.log("Server running on:"+i)}))},139:e=>{e.exports=require("@sendgrid/mail")},96:e=>{e.exports=require("bcrypt")},860:e=>{e.exports=require("express")},344:e=>{e.exports=require("jsonwebtoken")},185:e=>{e.exports=require("mongoose")},470:e=>{e.exports=require("morgan")},738:e=>{e.exports=require("multer")},441:e=>{e.exports=require("sharp")},564:e=>{e.exports=require("validator")},685:e=>{e.exports=require("http")}},r={};(function t(a){var o=r[a];if(void 0!==o)return o.exports;var s=r[a]={exports:{}};return e[a].call(s.exports,s,s.exports,t),s.exports})(728)})();