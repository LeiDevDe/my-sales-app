import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { SupplierService } from '../supplier.service';
import { Supplier } from '../supplier.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { LoadingBarComponent } from "../../loading-bar.component";
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SupplierCardComponent } from './supplier-card/supplier-card.component';

@Component({
  selector: 'app-suppliers-list',
  standalone: true,
  templateUrl: './suppliers-list.component.html',
  styles: ``,
  imports: [MaterialModule, LoadingBarComponent, AsyncPipe, RouterLink,
    SupplierCardComponent
  ]
})
export class SuppliersListComponent implements OnInit {
  suppliers!: Supplier[]
  supplierObservalbe!: Observable<Supplier[]>;
  constructor(private supplierService: SupplierService) { }

  async ngOnInit() {
    this.supplierObservalbe = this.supplierService.getAll()
    this.suppliers = await lastValueFrom(this.supplierObservalbe)

  }

}
