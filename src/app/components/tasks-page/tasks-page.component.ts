import { Component, OnInit } from '@angular/core';
import { Tasks } from '../../model/tasks';
import { Priorities } from '../../model/tasks';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements OnInit {

  taskObj: Tasks = new Tasks();
  taskArr: Tasks[] = [];

  priorities: Priorities[] = [
    { value: 'high-1', viewValue: 'Visok' },
    { value: 'medium-2', viewValue: 'Srednji' },
    { value: 'low-3', viewValue: 'Nizak' },
  ];

  addTaskValue: string = '';
  editTaskValue: string = '';

  note: string = '';
  editNote: string = '';

  dateStart: string = '';
  dateEnd: string = '';

  selectedPriority: string = '';

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';

    this.note = '';
    this.editNote = '';

    this.dateStart = '12.7.2022';
    this.dateEnd = '12.8.2022';

    this.taskObj = new Tasks();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("Nemoguce inicijalizovati listu taskova");
    });
  }

  addTask() {
    this.taskObj.title = this.addTaskValue;
    this.taskObj.note = this.note;
    this.taskObj.startDate = this.dateStart;

    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
      this.note = '';
    }, err => {
      alert(err);
    })
  }

  editTask() {
    this.taskObj.title = this.editTaskValue;
    this.taskObj.note = this.editNote;

    this.taskObj.startDate = this.dateStart;
    this.taskObj.endDate = this.dateEnd;

    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Greska pri update-u taska");
    })
  }

  deleteTask(etask: Tasks) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Nemoguce obrisati task!");
    });
  }

  public call(etask: Tasks) {
    this.taskObj = etask;
    this.editTaskValue = etask.title;
    this.editNote = etask.note;
  }

}
