import React from 'react';
import { OnChangeTask, OnDeleteTask, TaskData } from '../../utils/types';

interface TaskProps extends TaskData {
  onDeleteTask: OnDeleteTask;
  onChangeTask: OnChangeTask;
}

const Task: React.FC<TaskProps> = ({ onChangeTask, onDeleteTask, ...task }) => {
  const [inputValue, setInputValue] = React.useState(task.label);
  const deleteTask = () => onDeleteTask(task.id);
  const onBlurInput = () => onChangeTask(task.id, { ...task, status: 'active' });
  const changeTask = () => onChangeTask(task.id, { ...task, status: 'editing' });

  const inputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue) {
      onChangeTask(task.id, { ...task, status: 'active', label: inputValue });
    }
  };
  const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target.checked ? 'completed' : 'active';
    onChangeTask(task.id, { ...task, status });
  };

  return (
    <li className={task.status}>
      {task.status === 'editing' ? (
        <input
          onChange={(event) => setInputValue(event.target.value)}
          onKeyUp={inputKeyUp}
          value={inputValue}
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
            <span className="description">{task.label}</span>
            <span className="created">{task.createdAt}</span>
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
};

export default Task;
