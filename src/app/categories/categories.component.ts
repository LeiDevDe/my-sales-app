import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CategoriesItem } from './categories-datasource';
import { MatCardModule } from '@angular/material/card';
import { Category } from './category.dto';
import { CategoryService } from './category.service';
import { lastValueFrom } from 'rxjs';
import { CategoryFormComponent } from './form/form.component';
import { MatIconModule } from '@angular/material/icon';
import { LoadingBarComponent } from '../loading-bar.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }
    
  `,
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule,
    MatCardModule,
    MatIconModule,
    CategoryFormComponent,
    LoadingBarComponent]
})
export class CategoriesComponent implements AfterViewInit {
  async onDeleteCategoryClick(category: Category) {
    if (confirm(`Delete "${category.name}" with id ${category.id}`)) {
      await lastValueFrom(this.categoryService.delete(category.id))
      this.loadCategories();
    }
  }


  category!: Category;

  async onSave(category: Category) {
    const saved = lastValueFrom(this.categoryService.save(category));
    console.log("Save Category in the CategoriesComponent", category)
    this.hideCategoryForm();
  }

  hideCategoryForm() {
    this.showForm = false;
    this.loadCategories();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;
  dataSource = new MatTableDataSource<Category>();

  showForm: Boolean = false;

  constructor(private categoryService: CategoryService) { }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'actions'];

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
    this.loadCategories();
  }
  async loadCategories(): Promise<void> {
    const categories = await lastValueFrom(this.categoryService.getAll());
    this.dataSource = new MatTableDataSource(categories);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onNewCategoryClick() {
    console.log("button is clicked")
    this.category = {
      id: 0,
      name: "",
      description: ""
    }
    this.showForm = true;

  };
  onEditCategoryClick(category: Category) {
    console.log("edit category", category)
    this.category = category;
    this.showForm = true;
  }

}
