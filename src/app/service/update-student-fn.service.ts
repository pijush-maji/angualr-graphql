import { Injectable } from '@angular/core';
import { gql, Mutation, TypedDocumentNode } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { DocumentNode } from 'graphql';

@Injectable({
  providedIn: 'root'
})
export class UpdateStudentFnService extends Mutation {


  document = gql`
  mutation UpdateFirstname($id:ID,$firstName:String) {
    updateFirstname(id: $id, firstName: $firstName) {
        firstName
        lastName
        email
    }
  }
  `;
  
}
