import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { TaskData } from '../../utils/types';

interface NewTaskFromProps {
  onSaveTask: (task: Omit<TaskData, 'id'>) => void;
}

interface NewTaskFromState {
  taskLabel: string;
  min: number;
  sec: number;
}

class NewTaskFrom extends React.Component<NewTaskFromProps, NewTaskFromState> {
  constructor(props: NewTaskFromProps) {
    super(props);
    this.state = {
      taskLabel: '',
      min: 0,
      sec: 0,
    };
  }

  onChangeNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'sec') this.setState({ sec: +value });
    if (name === 'min') this.setState({ min: +value });
  };

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ taskLabel: event.target.value });
  };

  onKeyUpInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { taskLabel, min, sec } = this.state;
    const time = min * 60 + sec;

    const isTime = min || sec;
    if (event.key === 'Enter' && taskLabel && isTime) {
      const { onSaveTask } = this.props;
      onSaveTask({
        label: taskLabel,
        createdAt: formatDistanceToNow(new Date()),
        status: 'active',
        time,
      });
    }
  };

  render() {
    const { taskLabel } = this.state;
    return (
      <header className="header">
        <form className="new-todo-form">
          <input
            value={taskLabel}
            onKeyUp={this.onKeyUpInput}
            type="text"
            onChange={this.onChangeInput}
            className="new-todo"
            placeholder="Task"
          />
          <input
            onChange={this.onChangeNumberInput}
            name="min"
            max="60"
            min="0"
            type="number"
            className="new-todo-form__timer"
            placeholder="Min"
          />
          <input
            onChange={this.onChangeNumberInput}
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
}

export default NewTaskFrom;
