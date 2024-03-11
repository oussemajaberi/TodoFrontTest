import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskDataService } from 'src/app/service/task-data.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any = []; // Use any type
  id:any;
  completedTasks: Task[] = [];
  openTasks: Task[] = [];
  task=new Task;
  editingTask: Task | null = null;
  constructor( private taskService: TaskDataService) { }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks() {
    this.taskService.getAllTask().subscribe(res => {
      if (Array.isArray(res)) {
        // If the response is an array, assign it to this.tasks
        this.tasks = res;
        //this.filterTasks();
      } else {
        // If the response is a single object, you may need to handle it accordingly
        console.error('Invalid response format. Expected an array.');
      }
    });
  }
  /*filterTasks() {
    this.completedTasks = this.tasks.filter((task: Task) => task.completed === true);
    this.openTasks = this.tasks.filter((task: Task) => task.completed === false);
    console.log('Completed Tasks:', this.completedTasks);
    console.log('Open Tasks:', this.openTasks);
  }*/
  insertTask(){
    this.task.due_date = formatDate(this.task.due_date, 'yyyy-MM-dd HH:mm:ss', 'en-US');

    this.taskService.AddTask(this.task).subscribe(res=>{
      console.log(res);
      this.getTasks()
   })

  }

  markAsCompleted(id: number) {
    this.taskService.markAsCompleted(id).subscribe(
      res => {
        console.log(res);
        // Optionally, refresh the task list after marking as completed
        this.getTasks();
      },
      error => console.error(error)
    );
  }
  /*editTask(task: Task) {
    this.editingTask = { ...task }; // Create a copy of the task for editing
  }

  updateTask() {
    if (this.editingTask) {
      this.taskService.updateTaskData(this.editingTask.id, this.editingTask).subscribe(
        res => {
          console.log(res);
          this.getTasks();
          // Clear the editing mode
        },
        error => console.error(error)
      );
    }
  }*/
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(
      res => {
        console.log(res);
        this.getTasks(); // Refresh the task list after deletion
      },
      error => console.error(error)
    );
  }



}
