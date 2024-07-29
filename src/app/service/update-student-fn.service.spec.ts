import { TestBed } from '@angular/core/testing';

import { UpdateStudentFnService } from './update-student-fn.service';

describe('UpdateStudentFnService', () => {
  let service: UpdateStudentFnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateStudentFnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
