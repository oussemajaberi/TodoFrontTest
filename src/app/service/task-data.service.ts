import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  private apiUrl = 'http://127.0.0.1:8000/api/tasks';

  constructor(private httpclient:HttpClient) { }
  getAllTask(): Observable<Task[]> {
    return this.httpclient.get<Task[]>(this.apiUrl);
  }

  AddTask(TaskData: any){
    return this.httpclient.post('http://127.0.0.1:8000/api/addtask',TaskData);
  }

  markAsCompleted(id: number) {
    return this.httpclient.put(`http://127.0.0.1:8000/api/markascompleted/${id}`, { completed: true });
  }
  /*updateTask(id: number, updatedTask: any): Observable<any> {
    return this.httpclient.put(`http://127.0.0.1:8000/api/updatetask/${id}`, updatedTask);
  }*/
  updateTaskData(id:any,data:any){
    return this.httpclient.put('http://127.0.0.1:8000/api/updatetask/'+id,data);
  }
  deleteTask(id: number): Observable<any> {
    return this.httpclient.delete(`http://127.0.0.1:8000/api/deletetask/${id}`);
  }
}
