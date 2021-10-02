export class Phone {
    public constructor(phoneNumber: Phone) {
        this.id = phoneNumber.id || null;
        this.externalRef = phoneNumber.externalRef || null;
        this.phoneNumber = phoneNumber.phoneNumber;
        this.phoneExtension = phoneNumber.phoneExtension;
        this.verified = phoneNumber.verified || false;
        this.userId = phoneNumber.userId;
        this.createdAt = phoneNumber.createdAt || null;
        this.updatedAt = phoneNumber.updatedAt || null;
        this.verificationCode = phoneNumber.verificationCode || null;
    }

    id: number | null;
    externalRef: string | null;
    phoneNumber: string | null;
    phoneExtension: string | null;
    verified: boolean;
    verificationCode: string | null;
    userId: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;

}