export interface Event {
    id: number;
    icons: string[];
    title: string;
    time: string;
    desc: string;
    location: string;
    class: string;
}

export interface CalendarEventObject {
    day: string;
    current: boolean;
    events: any[];
}
