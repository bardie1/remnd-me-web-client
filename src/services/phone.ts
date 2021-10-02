import { AxiosResponse } from "axios";
import { Phone } from "../models/phone";
import ApiProtected from "../utils/apiProtected";

class PhoneService extends ApiProtected {
    public constructor(){
        super()
    }

    public createPhoneNumber = (phoneNumber: string, phoneExtension:string):Promise<AxiosResponse<Phone>> => {
        return this.instance.post<any>("phone-numbers", {phoneNumber: phoneNumber, phoneExtension: phoneExtension}, {
            transformResponse: [(data) => {
                return new Phone(data);
            }]
        });
    }

    public editPhoneNumber = (phone: Phone) : Promise<AxiosResponse<Phone>> => {
        return this.instance.put<Phone>("phone-numbers", phone, {
            transformResponse: [(data) => {
                return new Phone(data);
            }]
        });
    }

    public getPhoneByExternalRef = (phoneExternalRef: string): Promise<AxiosResponse<Phone>> => {
        return this.instance.get<Phone>("phone-numbers/" + phoneExternalRef, {
            transformResponse: [(data) => {
                return new Phone(data);
            }]
        });
    }

    public sendVerificationCode = (phone: Phone) : Promise<AxiosResponse<any>> => {
        return this.instance.post<any>("phone-numbers/send-verification-code",phone);
    }

    public verifyCode = (code: string): Promise<AxiosResponse<Phone>> => {
        return this.instance.post<Phone>("phone-numbers/verify", {code: code}, {
            transformResponse: [(data) => {
                return new Phone(data);
            }]
        });
    }
}

export default new PhoneService();