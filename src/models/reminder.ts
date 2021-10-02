export class Reminder {

    public constructor(reminder: Reminder) {
        this.id = reminder.id || null;
        this.externalRef = reminder.externalRef || null;
        this.title = reminder.title || null;
        this.description = reminder.description || null;
        this.dueDate = reminder.dueDate || null;
        this.recurring = reminder.recurring || false;
        this.recurringTimeframe = reminder.recurringTimeframe || null;
        this.remindDateTime = reminder.remindDateTime || null;
        this.done = reminder.done || false;
        this.userId = reminder.userId;
        this.phoneId = reminder.phoneId || null;
        this.createdAt = reminder.createdAt || null;
        this.updatedAt = reminder.updatedAt || null;
        this.sentDate = reminder.sentDate || null;
    }


    id: number | null;
    externalRef: string | null;
    title: string | null;
    description: string | null;
    dueDate: string | null;
    recurring: boolean;
    recurringTimeframe: string | null;
    remindDateTime: string | null;
    done: boolean;
    userId: string;
    phoneId: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    sentDate: string | null;
}