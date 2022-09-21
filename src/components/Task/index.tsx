import React from 'react';
import {OnChangeTask, OnDeleteTask, TaskData} from '../../utils/types';
import {convertSeconds} from '../../utils';


interface TaskProps {
    onDeleteTask: OnDeleteTask;
    onChangeTask: OnChangeTask;
    task: TaskData;
}

const Task: React.FC<TaskProps> = ({task, onDeleteTask, onChangeTask}) => {
    let completed = 0
    const [label, setLabel] = React.useState('')
    const [timeData, setTimeData] = React.useState<[number, boolean]>([task.time, false])
    const onPause = () => {
        setTimeData((state) => [state[0], false]);
    };

    const onPlay = () => {
        if (timeData[1]) return
        setTimeData((state) => [state[0], true]);
        completed = new Date().getTime() + timeData[0] * 1000;
        const interval = setInterval(() => {
            setTimeData(([time, play]) => {
                if (!play || time <= 0) clearInterval(interval);
                const newTime = (completed - new Date().getTime()) / 1000;
                return [Math.trunc(newTime), play]
            })

        }, 200);
    };

    const deleteTask = () => {
        onDeleteTask(task.id);
    };

    const onBlurInput = () => {
        onChangeTask(task.id, {...task, status: 'active'});
    };

    const changeTask = () => {

        onChangeTask(task.id, {...task, status: 'editing'});
    };

    const inputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && label) {
            onChangeTask(task.id, {...task, status: 'active', label});
        }
    };

    const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const status = event.target.checked ? 'completed' : 'active';
        onChangeTask(task.id, {...task, status});
    };


    return (
        <li className={task.status}>
            {task.status === 'editing' ? (
                <input
                    onChange={(event) => setLabel(event.target.value)}
                    onKeyUp={inputKeyUp}
                    value={label || task.label}
                    onBlur={onBlurInput}
                    type="text"
                    className="edit"
                    placeholder="Editing task"
                />
            ) : (
                <div className="view">
                    <input
                        className="toggle"
                        checked={task.status === 'completed'}
                        onChange={onChangeCheckbox}
                        type="checkbox"
                    />
                    <section>
                        <span className="title">{task.label}</span>
                        <span className="description">
                <button onClick={onPlay} type="button" className="icon icon-play"/>
                <button onClick={onPause} type="button" className="icon icon-pause"/>
                <span>{convertSeconds(timeData[0])}</span>
              </span>

                        <span className="description">{task.createdAt}</span>
                    </section>
                    <button
                        aria-label="icon-edit"
                        type="button"
                        onClick={changeTask}
                        className="icon icon-edit"
                    />
                    <button
                        aria-label="icon-destroy"
                        type="button"
                        onClick={deleteTask}
                        className="icon icon-destroy"
                    />
                </div>
            )}
        </li>
    );

}

export default Task;
