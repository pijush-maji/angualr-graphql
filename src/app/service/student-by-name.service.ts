import { Injectable } from '@angular/core';
import { Query, TypedDocumentNode, gql } from 'apollo-angular';
import { Student } from '../model/models';

export interface Response{
  getStudent:Student[]
}

@Injectable({
  providedIn: 'root'
})

export class StudentByNameService extends Query<Response> {
  document = gql`
  query GetStudent {
    getStudent {
        firstName
        lastName
        email
    }
  }
  `;
  
}
