import { TestBed } from '@angular/core/testing';

import { StudentByNameService } from './student-by-name.service';

describe('StudentByNameService', () => {
  let service: StudentByNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentByNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
