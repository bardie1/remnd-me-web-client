import { AxiosResponse } from "axios";
import { Phone } from "../models/phone";
import ApiProtected from "../utils/apiProtected";
import { ObjectUtil } from "../utils/objectUtil";

class PhoneService extends ApiProtected {
    public constructor(){
        super()
    }

    public createPhoneNumber = (phoneNumber: string):Promise<AxiosResponse<Phone>> => {
        return this.instance.post<Phone>("phone-numbers", {phoneNumber: phoneNumber, phoneExtension: null}, {
            transformResponse: [(data) => {
                let dataParsed = JSON.parse(data);
                if (dataParsed.isError) {
                    return dataParsed;
                } else {
                    return new Phone(dataParsed);
                }
            }]
        });
    }

    public getPhoneNumbers = () : Promise<AxiosResponse<Phone[]>> => {
        return this.instance.get<Phone[]>("phone-numbers", {
            transformResponse: [(data) => {
                let dataParsed = JSON.parse(data);
                if (dataParsed.isError) {
                    return dataParsed;
                } else {
                    return ObjectUtil.convertObjectsInArray<Phone>(JSON.parse(data), Phone);
                }
            }]
        })
    }

    public updatePhoneNumber = (phone: Phone) : Promise<AxiosResponse<Phone>> => {
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

    public verifyCode = (phone: Phone, code: string): Promise<AxiosResponse<Phone>> => {
        let body = {...phone} as any;
        body.code = code;
        return this.instance.post<Phone>("phone-numbers/verify", body, {
            transformResponse: [(data) => {
                let dataParsed = JSON.parse(data);
                if (dataParsed.isError) {
                    return dataParsed;
                } else {
                    if (dataParsed.verified === false) {
                        return dataParsed
                    }
                    return new Phone(dataParsed);
                }
            }]
        });
    }
}

export default new PhoneService();