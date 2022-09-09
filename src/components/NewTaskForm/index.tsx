import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { TaskData } from '../../utils/types';

interface NewTaskFromProps {
  onSaveTask: (task: Omit<TaskData, 'id'>) => void;
}

interface NewTaskFromState {
  taskLabel: string;
}

class NewTaskFrom extends React.Component<NewTaskFromProps, NewTaskFromState> {
  constructor(props: NewTaskFromProps) {
    super(props);
    this.state = { taskLabel: '' };
  }

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ taskLabel: event.target.value });
  };

  onKeyUpInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { taskLabel } = this.state;
    if (event.key === 'Enter' && taskLabel) {
      if (taskLabel) return;
      const { onSaveTask } = this.props;
      onSaveTask({
        label: taskLabel,
        createdAt: formatDistanceToNow(new Date()),
        status: 'active',
      });
      this.setState({ taskLabel: '' });
    }
  };

  render() {
    const { taskLabel } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          onKeyUp={this.onKeyUpInput}
          value={taskLabel}
          onChange={this.onChangeInput}
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

export default NewTaskFrom;
