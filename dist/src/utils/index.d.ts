import * as nodemailer from "nodemailer";
export declare const transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export declare const mailsent: (from: string, to: string, subject: string, html: string) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export declare const resetPasswordmailHtml: (email: string) => string;
