import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {TaskData} from '../../utils/types';

interface NewTaskFromProps {
    onSaveTask: (task: Omit<TaskData, 'id'>) => void;
}


const NewTaskFrom: React.FC<NewTaskFromProps> = ({onSaveTask}) => {
    const [taskLabel, setTaskLabel] = React.useState('')
    const [time, setTime] = React.useState({min: '', sec: ''})

    const onChangeNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        if (name === 'sec') setTime(({min}) => ({min, sec: value}));
        if (name === 'min') setTime(({sec}) => ({sec, min: value}));

    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskLabel(event.target.value);
    };

    const onKeyUpInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const timeSec = (+time.min) * 60 + (+time.sec);
        const isTime = time.min || time.sec;

        if (event.key === 'Enter' && taskLabel && isTime) {

            onSaveTask({
                label: taskLabel,
                createdAt: formatDistanceToNow(new Date()),
                status: 'active',
                time: timeSec,
            });

            setTaskLabel('')
            setTime({sec: '', min: ""})
        }
    };


    return (
        <header className="header">
            <h1>todos</h1>
            <form className="new-todo-form">
                <input
                    value={taskLabel}
                    onKeyUp={onKeyUpInput}
                    type="text"
                    onChange={onChangeInput}
                    className="new-todo"
                    placeholder="Task"
                />
                <input
                    onChange={onChangeNumberInput}
                    value={time.min}
                    name="min"
                    max="60"
                    min="0"
                    type="number"
                    className="new-todo-form__timer"
                    placeholder="Min"
                />
                <input
                    onChange={onChangeNumberInput}
                    value={time.sec}
                    name="sec"
                    max="60"
                    min="0"
                    type="number"
                    className="new-todo-form__timer"
                    placeholder="Sec"
                />
            </form>
        </header>
    );

}

export default NewTaskFrom;
