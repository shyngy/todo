import {TaskData} from "./types";

const defaultValueTasks: TaskData[] = [
    {
        label: 'fw',
        status: 'active',
        createdAt: 'created 17 seconds ago',
        id: 0,
        time: 59,
    },
    {
        label: 'fw',
        status: 'active',
        createdAt: 'created 17 seconds ago',
        id: 1,
        time: 359,
    },
    {
        label: 'fw',
        status: 'completed',
        createdAt: 'created 17 seconds ago',
        id: 2,
        time: 549,
    },
];

export const convertSeconds = (seconds: number) => {
    const sec = seconds % 60;
    return `${Math.floor(seconds / 60)}:${sec > 10 ? sec : `0${sec.toString()}`}`;
};

export default defaultValueTasks;
