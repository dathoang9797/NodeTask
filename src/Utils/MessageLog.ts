import { ErrorCastError } from '@App/Controllers/ErrorController';

const errorSignUp = "Can't SignUp User";
const errorCreateUser = "Can't Create User";
const errorFetchUsers = "Can't fetch data user or delete the previous. Please try again later!";
const errorDeleteUser = "Can't delete user. Please try again later!";
const errorUpdateProfile = "Can't update profile";
const errorUpdateUser = "Can't update user";


const errorCreateTask = "Can't Create Task";
const errorFetchTasks = "Can't fetch data Task or delete the previous. Please try again later!";
const errorDeleteTask = "Can't delete Task. Please try again later!";
const errorUpdateTask = "Can't update Task";

const errorSomeThingWrong = 'Something went very wrong!';
const errorInvalidToken = 'Invalid token. Please log in again!';
const errorTokenExpired = 'Your token has expired! PLease login agian!';
const errorDuplicate = (value: RegExpMatchArray) =>
    `Duplicate field value: ${value}. The User has been signup. PLease try use another phone or email`;
const errorCastMongoose = (err: ErrorCastError) => `Invalid ${err.path}: ${err.value}`;
const errorValidation = (errors: string[]) => `Invalid input data. ${errors.join('. ')} `;

const messageSubjectEmailResetPassword = 'Your password reset token valid for 10 min';
const messageTokenSentToEmail = 'Token sent to email!';

const messageForgotPassword = (resetUrl: string) =>
    `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}.\n If you didn't forget your password, please ignore this email!`;

export const MessageLog = {
    errorSignUp,
    errorCreateUser,
    messageSubjectEmailResetPassword,
    messageTokenSentToEmail,
    errorFetchUsers,
    errorDeleteUser,
    errorUpdateProfile,
    errorUpdateUser,
    
    errorCreateTask,
    errorFetchTasks,
    errorDeleteTask,
    errorUpdateTask,

    errorSomeThingWrong,
    errorInvalidToken,
    errorTokenExpired,

    errorDuplicate,
    errorCastMongoose,
    errorValidation,
    messageForgotPassword
};