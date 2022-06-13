import { Component, DoCheck, OnInit } from '@angular/core';

//Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, DoCheck{

  public taskList:Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]')

  constructor() { }

  ngOnInit(): void {
  }

  public deleteItemTaskList(event:number){
    this.taskList.splice(event,1)
  }

  public deleteAllTaskList(){
    const confirmar = window.confirm("Deseja realmente apagar a lista de tarefas ?")

    if(confirmar){
      this.taskList = []
    }

  }

  public ngDoCheck():void {
     this.setLocalStorage()
  }

  public setEmitTaskList(event:string){
    this.taskList.push({task:event,checked:false})
  }

  public validationInput(event:string,index:number){
     if(!event.length){
       const confirmar = window.confirm("Task está vazia, deseja deletar ?")

       if(confirmar){
         this.deleteItemTaskList(index)
       }
     }
  }

  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort((first,last) => Number(first.checked) - Number(last.checked))
      localStorage.setItem("list",JSON.stringify(this.taskList ));
     }
  }

}
