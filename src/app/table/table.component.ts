import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  jsonData: any;
  filteredData: any;
  searchTerm: any;
  showData: any;
  sortedData: any;
  minPrice: any;
  array = [];
  selectedConfigurations: any;
  propertyfilter: any;
  uniqueArray: any[] | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    let configurations: any[] = [];
    this.http.get('assets/data.json').subscribe((res) => {
      console.log(res);
      this.jsonData = res;
      this.showData = this.jsonData.data;
      this.showData.map((doc: any) => {
        configurations.push(doc.configuration.name);
      });
      this.uniqueArray = configurations.filter(function (item, pos) {
        return configurations.indexOf(item) == pos;
      });

      console.log(this.uniqueArray);
    });
  }
  onSearch(searh: any) {
    console.log(searh.key);
    this.filteredData = this.jsonData.data.filter(
      (i: {
        configuration: any;
        property_type: any;
        building_towers: any;
        building: any;
        name: string;
      }) =>
        i.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        i.building.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        i.building_towers.tower_name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        i.property_type.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        i.configuration.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
    );
    console.log(this.filteredData);
    this.showData = this.filteredData;
  }
  onSelectionChange(e: any) {
    console.log(e, 'e');
    let finalArray: any[] = [];
    let selectedArray = e;

    selectedArray.map((d: any) => {
      this.showData.map((f: any) => {
        if (d === f.configuration.name) {
          console.log('.........');
          finalArray.push(f);
        }
      });
    });
    this.showData = finalArray;
    console.log(finalArray);
    if (e == '') {
      this.getData();
    }
  }
  sortOrder = '';

  reverse = false;

  sort(val: any) {
    const property = val;
    this.showData.sort((a: any, b: any) => {
      if (a[property] < b[property]) {
        return this.reverse ? 1 : -1;
      } else if (a[property] > b[property]) {
        return this.reverse ? -1 : 1;
      } else {
        return 0;
      }
    });
    this.reverse = !this.reverse;
  }

  filterProperties(e: any) {
    console.log(e.key);

    this.propertyfilter = this.showData.filter(
      (p: any) => p.min_price > this.minPrice
    );
    console.log(this.propertyfilter);

    this.showData = this.propertyfilter;
    if (e.key === 'Backspace') {
      this.getData();
    }
  }
}
