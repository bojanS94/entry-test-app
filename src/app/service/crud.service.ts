import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tasks } from '../model/tasks';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL: string;

  constructor(private http: HttpClient) {
    this.serviceURL = "http://localhost:3000/tasks"
  }

  addTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(this.serviceURL, task);
  }

  getAllTask(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.serviceURL);
  }

  deleteTask(task: Tasks): Observable<Tasks> {
    return this.http.delete<Tasks>(this.serviceURL + '/' + task.id);
  }

  editTask(task: Tasks): Observable<Tasks> {
    return this.http.put<Tasks>(this.serviceURL + '/' + task.id, task);
  }

}