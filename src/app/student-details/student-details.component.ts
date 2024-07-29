import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Student } from '../model/models';
import { NgFor, NgIf } from '@angular/common';
import {  FormsModule } from '@angular/forms';
import { UpdateStudentFnService } from '../service/update-student-fn.service';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {  

  allStudents!:[Student];
  loading:boolean = true;
  enteredName!:string;
  firstName!:string;
  lastName!:string;
  email!:string;
  foundStudent!:Student
  foundFlag:boolean = false;
  editFlag:boolean = false

  constructor(private apollo:Apollo,
    private readonly updateStudentFN:UpdateStudentFnService){

  }
  ngOnInit(): void {
    this.apollo.watchQuery({
      query:gql `
      {        
          getStudent {
              firstName
              lastName
              email
          }
      
      }
      `
    }).valueChanges.subscribe((res:any)=>{
      this.allStudents = res.data?.getStudent;
      this.loading=res.loading;
    })
  }

  serachStudent(){
    this.foundFlag=false;
    this.editFlag=false;
    console.log("Serchint...")
    this.apollo.watchQuery({
      query: gql`
      query GetStudentByName($firstName:String) {
        getStudentByName(firstName: $firstName) {
            id
            firstName
            lastName
            email
        }
    }
     `,
     variables:{
      firstName:this.enteredName
     }
    }).valueChanges.subscribe((res:any)=>{
      this.foundStudent = res.data?.getStudentByName;
      if(this.foundStudent!=null && this.foundStudent!=undefined){
        this.foundFlag=!res.loading;
        this.firstName=this.foundStudent.firstName;
        this.lastName = this.foundStudent.lastName;
        this.email = this.foundStudent.email;

      }
      console.log(this.foundStudent)
    })
  }

  editStudent(){
    this.editFlag=true;
  }

  updateStudent(){
    this.enteredName=this.firstName;
    if(this.foundStudent.firstName !== this.firstName){
      this.updateStudentFN.mutate({
        id:this.foundStudent.id,
        firstName:this.firstName
      })
      .subscribe(()=>{
        
        this.serachStudent();
      })
    }else{
      this.editFlag=false;
    }
  }

  cancelEdit(){
    this.editFlag=false;
  }

}
