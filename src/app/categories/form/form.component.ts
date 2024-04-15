import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Category } from '../category.dto';
import { FormBuilder, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [MaterialModule],
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
