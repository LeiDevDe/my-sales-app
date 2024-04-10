import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, MatInputModule],
  templateUrl: './form.component.html',
  styles: ''
})
export class CategoryFormComponent {

  @Output() back = new EventEmitter();

  onBack() {
    this.back.emit();
  }
  @Output() save = new EventEmitter();

  onSubmit() {
    console.log('Button save clicked in the CategoryFormComponent')
    this.save.emit(this.categoryForm.value);
  }
  // constructor(private fb: FormBuilder) { }
  private fb = inject(FormBuilder)
  categoryForm = this.fb.group({
    id: [null],
    name: ["", Validators.required, Validators.minLength(3)],
    description: ["", Validators.required]
  })
}
