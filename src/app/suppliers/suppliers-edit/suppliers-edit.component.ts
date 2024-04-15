import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Supplier } from '../supplier.dto';
import { SupplierService } from '../supplier.service';
import { last, lastValueFrom, Observable } from 'rxjs';
import { AsyncPipe, NumberSymbol } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { LoadingBarComponent } from '../../loading-bar.component';
import { SuppliersFormComponent } from '../suppliers-form/suppliers-form.component';

@Component({
  selector: 'app-suppliers-edit',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, LoadingBarComponent,
    SuppliersFormComponent,
  ],
  templateUrl: './suppliers-edit.component.html',
  styles: ``
})
export class SuppliersEditComponent {

  route = inject(ActivatedRoute);
  supplierService = inject(SupplierService)
  supplier: Supplier
  supplierObservable: Observable<Supplier>
  router = inject(Router);
  onBack() {
    this.router.navigate(['/suppliers'])
  }
  async onSave(supplier: Supplier) {
    this.supplierObservable = this.supplierService.save(supplier);
    this.supplier = await lastValueFrom(this.supplierObservable);
    this.router.navigate(['/suppliers/show/', this.supplier?.id]);
  }

  async ngOnInit() {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0)
    this.supplierObservable = this.supplierService.getById(id);
    this.supplier = await lastValueFrom(this.supplierObservable)
    console.log(this.supplier)
  }
}
