import { Component, inject, OnInit } from '@angular/core';
import { Supplier } from '../supplier.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupplierService } from '../supplier.service';
import { MaterialModule } from '../../material.module';
import { AsyncPipe } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';

@Component({
  selector: 'app-suppliers-show',
  standalone: true,
  imports: [MaterialModule,
    AsyncPipe,
    RouterLink,
    LoadingBarComponent
  ],
  templateUrl: './suppliers-show.component.html',
  styles: ``
})
export class SuppliersShowComponent implements OnInit {

  // constructor(private supplier: Supplier){
  // }
  route = inject(ActivatedRoute)
  supplierService = inject(SupplierService)
  supplier: Supplier;
  supplierObservable: Observable<Supplier>;
  async ngOnInit(): Promise<void> {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0)
    this.supplierObservable = this.supplierService.getById(id)
    this.supplier = await lastValueFrom(this.supplierObservable);
    console.log(this.supplier)
  }
  // this.supplier = await lastValueFrom(this.)
}
