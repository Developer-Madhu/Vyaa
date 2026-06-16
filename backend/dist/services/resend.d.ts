import "dotenv/config";
interface EmailPayload {
    to: string;
    subject: string;
    html: string;
}
export declare function sendEmail({ to, subject, html }: EmailPayload): Promise<any>;
export declare function orderConfirmationEmail(name: string, orderNumber: string, items: {
    name: string;
    size: string;
    quantity: number;
    price: number;
}[], total: number): string;
export {};
//# sourceMappingURL=resend.d.ts.map