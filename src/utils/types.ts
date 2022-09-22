export interface TaskData {
  label: string;
  status: 'editing' | 'active' | 'completed';
  createdAt: string;
  id: string;
  time: number;
  completedAt?: string;
}

export type FilterStatusList = 'all' | 'active' | 'completed';

export type AddTask = (task: Omit<TaskData, 'id'>) => void;
export type OnChangeTask = (id: string, task: TaskData) => void;
export type OnDeleteTask = (id: string) => void;
export type ChangeCurrentFilter = (status: FilterStatusList) => void;
