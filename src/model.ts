export enum TaskStatusEnum {
  Wait = 1,
  Performed,
  Canceled,
}

export interface Task {
  id: string;
  topic: string;
  date: Date;
  status: TaskStatusEnum;
}

export enum DateIntervalEnum {
  Day = 1,
  Today,
  Weekly,
  All,
}
export interface RangeItem {
  interval?: Interval;
  name: string;
}
