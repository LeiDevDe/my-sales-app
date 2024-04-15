import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierService } from '../supplier.service';
import { lastValueFrom, Observable, of } from 'rxjs';
import { Supplier } from '../supplier.dto';
import { MaterialModule } from '../../material.module';
import { AsyncPipe } from '@angular/common';
import { SuppliersFormComponent } from '../suppliers-form/suppliers-form.component';

@Component({
  selector: 'app-suppliers-new',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, SuppliersFormComponent],
  templateUrl: './suppliers-new.component.html',
  styles: ``
})
export class SuppliersNewComponent {
  router = inject(Router);
  supplierService = inject(SupplierService);
  supplierObservable!: Observable<Supplier>;
  supplier: Supplier;

  async ngOnInit() {
    this.supplierObservable = await of(this.supplierService.create());
    this.supplier = await lastValueFrom(this.supplierObservable);
  }
  async onSave(supplier: Supplier) {
    this.supplierObservable = this.supplierService.save(supplier)

  }
  onBack() {
    this.router.navigate(['/suppliers']);
  }

}
