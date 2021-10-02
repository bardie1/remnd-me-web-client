export class ObjectUtil {
    public static convertObjectsInArray<T>(arr: Array<any>, type: {new(t:any): T;}): Array<T> {
        let arrayTyped = new Array<T>();
        arr.forEach(a => {
            arrayTyped.push(Object.assign(new type(a), a));
        });
        return arrayTyped;
    }

    public static updateObjectWithoutLossingReference<T>(objectToUpdate:T, objectWithValues:T): T {

        Object.keys(objectToUpdate).forEach((k:string) => {
            const key: (keyof T) = k as keyof T;
            objectToUpdate[key] = objectWithValues[key];
        });

        return objectToUpdate;
        
    }
}