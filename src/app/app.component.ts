import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilterPipe } from './app.filterPipe.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FilterPipe]
})
export class AppComponent {
  title = 'Rabobank-Client';

  issueFilter: string;
  inputFile: any;

  filterWord: string;

  tableTitle: string[];

  rawData: string[][];

  data: any;

  constructor(private _router: Router, filterPipe: FilterPipe) {

  }


  fileUpload(files: any) {
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: any = reader.result;
        const re = /(?:\.([^.]+))?$/;
        if (re.exec(file.name)[1] === "csv") {
          this.data = this.formatCsv(csv);
          this.tableTitle = this.data[0];
          this.data = this.data.slice(1);
          console.log("this.data--", this.data);
          this.rawData = this.data;
        } 
      }
    }
  }

  formatCsv(csv: string) {
    let result = csv.replace(/['"]+/g, '').split(/\r?\n/);
    return result.map(e => e.split(','));
  }

  filterColumn() {
    this.rawData = this.rawData.filter(e => e.join(" ").includes(this.issueFilter));
  }

  resetPage() {
    this.rawData = null;
    this.inputFile = null;
    this.issueFilter = null;
  }


}


