import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Student } from '../model/models';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  firstName!:string
  foundStudent!:Student
  foundFlag:boolean = false;
  editFlag:boolean = false

  constructor(private apollo:Apollo){

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
            firstName
            lastName
            email
        }
    }
     `,
     variables:{
      firstName:this.firstName
     }
    }).valueChanges.subscribe((res:any)=>{
      this.foundStudent = res.data?.getStudentByName;
      if(this.foundStudent!=null && this.foundStudent!=undefined){
        this.foundFlag=!res.loading;
      }
      console.log(this.foundStudent)
    })
  }

  editStudent(){
    this.editFlag=true;
  }

}
