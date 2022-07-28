export class Tasks {
  id!: number;
  title!: string;
  priority!: string;
  completed!: boolean;
  startDate!: string;
  endDate!: string;
  note!: string;
}

export class Priorities {
  value!: string;
  viewValue!: string;
}
