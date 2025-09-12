import { Dayjs } from "dayjs";

function randomTimestamp(date: Dayjs): number {
    
    const startOfDay = date.startOf("day").valueOf();
    const endOfDay = date.endOf("day").valueOf();

    const randomTime = startOfDay + Math.floor(Math.random() * (endOfDay - startOfDay + 1));

    return randomTime;
}

function generateTimestamp(date: Dayjs, existingTimestamp: number[]): number{
    let timestamp = null;
    do{
        timestamp = randomTimestamp(date);
    }while(existingTimestamp.includes(timestamp));
    return timestamp;
}

export default generateTimestamp;