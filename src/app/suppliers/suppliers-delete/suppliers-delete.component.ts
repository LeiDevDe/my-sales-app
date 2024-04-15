import { Component, OnInit } from '@angular/core';
import { Supplier } from '../supplier.dto';
import { last, lastValueFrom, Observable } from 'rxjs';
import { SupplierService } from '../supplier.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-suppliers-delete',
  standalone: true,
  imports: [AsyncPipe, MaterialModule, RouterLink],
  templateUrl: './suppliers-delete.component.html',
  styles: ``
})
export class SuppliersDeleteComponent implements OnInit {
  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  supplier: Supplier;
  supplierObervable!: Observable<Supplier>;


  async ngOnInit(): Promise<void> {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0)
    this.supplierObervable = this.supplierService.getById(id)
    this.supplier = await lastValueFrom(this.supplierObervable)
  }

  async confirmDelete() {
    this.supplierObervable = this.supplierService.delete(this.supplier.id);
    await lastValueFrom(this.supplierObervable)
    this.router.navigate(['/suppliers'])
  }
}
