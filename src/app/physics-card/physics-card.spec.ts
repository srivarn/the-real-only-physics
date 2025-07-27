import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicsCard } from './physics-card';

describe('PhysicsCard', () => {
  let component: PhysicsCard;
  let fixture: ComponentFixture<PhysicsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
