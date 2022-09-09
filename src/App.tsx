import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import NewTaskForm from './components/NewTaskForm';
import {
  AddTask,
  ChangeCurrentFilter,
  FilterStatusList,
  OnChangeTask,
  OnDeleteTask,
  TaskData,
} from './utils/types';
import defaultValueTasks from './utils';

interface AppState {
  tasks: TaskData[];
  currentFilter: FilterStatusList;
}

class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      tasks: defaultValueTasks as TaskData[],
      currentFilter: 'all',
    };
  }

  changeCurrentFilter: ChangeCurrentFilter = (status) => {
    this.setState({ currentFilter: status });
  };

  clearCompleted = () => {
    this.setState((state) => ({
      tasks: state.tasks.filter((item) => item.status !== 'completed'),
    }));
  };

  itemsLeft = () => {
    const { tasks } = this.state;
    return tasks.reduce((acc, item) => (item.status === 'active' ? acc + 1 : acc), 0);
  };

  addTask: AddTask = (task) => {
    this.setState((state) => ({
      tasks: [{ ...task, id: state.tasks.length }, ...state.tasks],
    }));
  };

  onDeleteTask: OnDeleteTask = (id) => {
    this.setState((state) => ({
      tasks: state.tasks.filter((item) => item.id !== id),
    }));
  };

  onChangeTask: OnChangeTask = (id, task) => {
    this.setState((state) => ({
      tasks: state.tasks.map((item) => (item.id === id ? task : item)),
    }));
  };

  currentTasks = () => {
    const { currentFilter, tasks } = this.state;
    if (currentFilter === 'all') return tasks;
    return tasks.filter((item) => item.status === currentFilter);
  };

  render() {
    const { currentFilter } = this.state;
    return (
      <div className="App">
        <section className="todoapp">
          <NewTaskForm onSaveTask={this.addTask} />
          <section className="main">
            <TaskList
              onChangeTask={this.onChangeTask}
              onDeleteTask={this.onDeleteTask}
              tasks={this.currentTasks()}
            />
            <Footer
              clearCompleted={this.clearCompleted}
              changeCurrentFilter={this.changeCurrentFilter}
              currentFilter={currentFilter}
              itemsLeft={this.itemsLeft()}
            />
          </section>
        </section>
      </div>
    );
  }
}

export default App;
