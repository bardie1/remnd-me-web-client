import { AxiosResponse } from "axios";
import { Reminder } from "../models/reminder";
import ApiProtected from "../utils/apiProtected";
import { ObjectUtil } from "../utils/objectUtil";

class ReminderService extends ApiProtected {
    public constructor() {
        super()
    }

    public getReminders = (): Promise<AxiosResponse<Reminder[]>> => {
        return this.instance.get<Reminder[]>("reminders", {
            transformResponse: [(data) => {
                return ObjectUtil.convertObjectsInArray<Reminder>(JSON.parse(data), Reminder);
            }]
        });
    }
}

export default new ReminderService();