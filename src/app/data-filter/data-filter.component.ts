
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { OnChanges, SimpleChanges } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.css']
})
export class DataFilterComponent implements OnInit {
  
  colorOptions: any[] = [];
  activeColorFilters: string[] = [];

  @Output() messageEvent = new EventEmitter<string[]>();
  @Input() productColors: any;//string[] = [];
  @Input() gotColors: any;

  constructor (private productService: ProductService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {

    // Detect changes for productColors
    if (changes['gotColors']) {
      this.updateProductColorOptions();
    }
  }

  updateColorFilter(color: string, event: Event) {

    let colorOption: any = this.colorOptions.find(x => x.color === color);
    let isChecked: boolean = colorOption.checked;
    
    // If checkbox checked & value is not already in list, add
    if (isChecked && !this.activeColorFilters.includes(color)) {
      this.activeColorFilters.push(color)
    }
    // IF checkbox unchecked & vlaue is in list, remove
    else if (!isChecked && this.activeColorFilters.includes(color)) {
      this.activeColorFilters.forEach((value, index) => {
        if(value == color) {
          this.activeColorFilters.splice(index, 1);
        }
      });
    }

    this.messageEvent.emit(this.activeColorFilters);
  }

  updateProductColorOptions(): void {
    for (let productColor of this.productColors) {
      this.colorOptions.push(
        {
          color: productColor,
          checked: false,
        }
      )
    }
  }
}