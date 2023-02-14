import sgMail from '@sendgrid/mail';
const sendGridAPIKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendGridAPIKey);

export const sendWelcomeEmail = (email: string, name: string) => {
    sgMail.send({
        to: email,
        from: "taskManager@gmail.com",
        subject: "Welcome to task manager",
        text: `Welcome to task manager ${name}!`,
        html: "<div>Hi!</div>"
    });
};