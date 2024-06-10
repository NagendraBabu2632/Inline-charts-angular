import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyGraphComponent } from './monthly-graph.component';

describe('MonthlyGraphComponent', () => {
  let component: MonthlyGraphComponent;
  let fixture: ComponentFixture<MonthlyGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
