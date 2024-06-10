import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineChartComponent } from './inline-chart.component';

describe('InlineChartComponent', () => {
  let component: InlineChartComponent;
  let fixture: ComponentFixture<InlineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InlineChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InlineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
