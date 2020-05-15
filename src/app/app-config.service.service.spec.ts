import { TestBed } from '@angular/core/testing';

import { AppConfig.ServiceService } from './app-config.service.service';

describe('AppConfig.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppConfig.ServiceService = TestBed.get(AppConfig.ServiceService);
    expect(service).toBeTruthy();
  });
});
