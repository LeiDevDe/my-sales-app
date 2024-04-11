import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../category.dto';

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
  @Output() save = new EventEmitter<Category>();

  onSubmit() {
    console.log('Button save clicked in the CategoryFormComponent')
    this.save.emit(this.categoryForm.value as Category);
  }
  // constructor(private fb: FormBuilder) { }
  private fb = inject(FormBuilder)
  //variable categoryForm
  categoryForm = this.fb.group({
    id: [null],
    name: ["", [Validators.required, Validators.minLength(3)]],
    description: ["", Validators.required]
  })

  //The combination of @Input() and set category will execute the method whenever there are
  //changes to the category property of the Form component
  @Input()
  set category(category: Category) {
    this.categoryForm.setValue(category);
  }
}
