import { ProjectService } from './../services/project/project.service';
import { TaskService } from './../services/task/task.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  data: any[];
  tab: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  projects: any[]
  tn: TreeNode[];
  taskDialog: boolean;
  submitted: boolean;
  create: boolean;
  task : any;

  items: MenuItem[];

    home: MenuItem;
  constructor(private taskService: TaskService, private projectService: ProjectService,private messageService: MessageService) { }

  ngOnInit(): void {

    this.items = [
      {label: 'Projects'},
      {label: 'Tasks'},
      
  ];

  this.submitted = false;
  this.create = false;
  this.task = {};
  console.log(this.task);
  
  this.home = {icon: 'pi pi-home', routerLink: '/'};
    this.taskService.getAllTasks().subscribe(res => {
      //console.log(res);
      //this.data = <TreeNode[]> [{'data':res[0]}];
      //console.log(this.data);

    })
    this.projectService.getProductsSmall().subscribe((res) => {
      console.log(res);
      this.tab = res;
      console.log(this.tab);
      this.data = [];
      for (let i = 0; i < this.tab.length; i++) {
        //this.data[i].data = this.tab[i];
        //this.data[i].children = this.tab[i].tasks;

        //this.tn =[{'data':res[0].tasks[0]}];
        this.tn = [];
        for (let j = 0; j < this.tab[i].tasks.length; j++) {
          this.tn.push({ 'data': res[i].tasks[j] })

        }
        this.data.push(<TreeNode>{ 'data': res[i], 'children': this.tn });
        console.log(i);

      }
      console.log(this.data);


    })
  }

  openNew(){
    this.task = {};

    this.create = true;

    
    this.submitted = false;
    this.taskDialog = true;

  }
  hideDialog() {
    this.taskDialog = false;
    this.submitted = false;
  }
  saveProduct() {
    this.submitted = true;
    //console.log(this.project);

    if (this.task.name.trim()) {
      if (this.task.projectId) {
        /*
        this.projects[this.findIndexById(this.project.projectId)] = this.project;
        console.log("9bal updaaaaaaaaaaaaaaaaaaate");
        console.log(this.project);


        this.projectService.update(this.project).subscribe(res => {
          console.log("ba3ed el update call");
          console.log(res);


        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });*/
      }
      else {

        // this.project['associates']= [];
        console.log("yoooooooooooooooooooo");
        console.log(this.task);
        var project = this.tab[0];
        project.tasks.push(this.task)
        this.data[0].children.push({'data':this.task});
        console.log(this.data);
        
        
        
        console.log(project);
        this.task.project={'projectId':8};
        this.taskService.add(this.task).subscribe(res=>{
          console.log("res ajout");
          console.log(res);
          
          
        })
        this.projectService.update(project).subscribe(res => {
          console.log("ba3ed el update call");
          console.log(res);


        })
     //   });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'task Created', life: 3000 });
      }
      //
      //this.projects = [...this.projects];
      this.taskDialog = false;
      this.task = {};
      //console.log(this.projects);

    }
  }

}
