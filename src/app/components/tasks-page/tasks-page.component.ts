import { Component, OnInit } from '@angular/core';
import { Tasks } from '../../model/tasks';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements OnInit {

  taskObj: Tasks = new Tasks();
  taskArr: Tasks[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
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
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      alert(err);
    })
  }

  editTask() {
    this.taskObj.title = this.editTaskValue;
    this.taskObj.priority = this.editTaskValue;
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

  call(etask: Tasks) {
    this.taskObj = etask;
    this.editTaskValue = etask.title;
    this.editTaskValue = etask.priority;
  }

}
