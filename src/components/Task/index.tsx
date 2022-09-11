import React from 'react';
import { OnChangeTask, OnDeleteTask, TaskData } from '../../utils/types';
import { convertSeconds } from '../../utils';

interface TaskProps {
  onDeleteTask: OnDeleteTask;
  onChangeTask: OnChangeTask;
  task: TaskData;
}

interface TaskState {
  label: string;
  isPlay: boolean;
  time: number;
}

class Task extends React.Component<TaskProps, TaskState> {
  completed: number;

  constructor(props: TaskProps) {
    super(props);
    this.completed = 0;
    this.state = {
      label: '',
      isPlay: false,
      time: props.task.time,
    };
  }

  onPause = () => {
    this.setState({ isPlay: false });
  };

  onPlay = () => {
    this.setState({ isPlay: true });

    // eslint-disable-next-line react/destructuring-assignment
    this.completed = new Date().getTime() + this.state.time * 1000;

    const interval = setInterval(() => {
      const { isPlay, time } = this.state;
      if (!isPlay || time <= 0) {
        clearInterval(interval);
      }
      const newTime = (this.completed - new Date().getTime()) / 1000;
      this.setState({
        time: Math.trunc(newTime),
      });
    }, 100);
  };

  deleteTask = () => {
    const { onDeleteTask, task } = this.props;
    onDeleteTask(task.id);
  };

  onBlurInput = () => {
    const { onChangeTask, task } = this.props;
    onChangeTask(task.id, { ...task, status: 'active' });
  };

  changeTask = () => {
    const { onChangeTask, task } = this.props;
    onChangeTask(task.id, { ...task, status: 'editing' });
  };

  inputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { label } = this.state;
    const { onChangeTask, task } = this.props;
    if (event.key === 'Enter' && label) {
      onChangeTask(task.id, { ...task, status: 'active', label });
    }
  };

  onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChangeTask, task } = this.props;
    const status = event.target.checked ? 'completed' : 'active';
    onChangeTask(task.id, { ...task, status });
  };

  render() {
    const { task } = this.props;
    const { label, time } = this.state;

    return (
      <li className={task.status}>
        {task.status === 'editing' ? (
          <input
            onChange={(event) => this.setState({ label: event.target.value })}
            onKeyUp={this.inputKeyUp}
            value={label}
            onBlur={this.onBlurInput}
            type="text"
            className="edit"
            placeholder="Editing task"
          />
        ) : (
          <div className="view">
            <input
              className="toggle"
              checked={task.status === 'completed'}
              onChange={this.onChangeCheckbox}
              type="checkbox"
            />
            <section>
              <span className="title">{task.label}</span>
              <span className="description">
                <button onClick={this.onPlay} type="button" className="icon icon-play" />
                <button onClick={this.onPause} type="button" className="icon icon-pause" />
                <span>{convertSeconds(time)}</span>
              </span>

              <span className="description">{task.createdAt}</span>
            </section>
            <button
              aria-label="icon-edit"
              type="button"
              onClick={this.changeTask}
              className="icon icon-edit"
            />
            <button
              aria-label="icon-destroy"
              type="button"
              onClick={this.deleteTask}
              className="icon icon-destroy"
            />
          </div>
        )}
      </li>
    );
  }
}

export default Task;
