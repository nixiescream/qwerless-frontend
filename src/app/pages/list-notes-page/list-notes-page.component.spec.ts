import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotesPageComponent } from './list-notes-page.component';

describe('ListNotesPageComponent', () => {
  let component: ListNotesPageComponent;
  let fixture: ComponentFixture<ListNotesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNotesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
