import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  GridOptions,
  IDatasource,
  IServerSideDatasource,
} from 'ag-grid-community';
import { CarsApiService } from './cars-api.service';
import { CarsState } from './state/cars.reducer';
import 'ag-grid-enterprise';
import { loadCars } from './state/cars.actions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(AgGridAngular, { static: true }) agGrid: AgGridAngular;

  public columnDefs: ColDef[] = [{ field: 'name' }, { field: 'type' }];
  public rowData: any[] | null = [];
  public gridOptions: GridOptions;
  rowSelection: any = 'multiple';
  rowModelType: any = 'serverSide';
  getRowNodeId: any;
  private infiniteScrollDataSource: IDatasource;

  constructor(
    private store: Store<CarsState>,
    private apiService: CarsApiService,
    private http: HttpClient
  ) {
    this.store.dispatch(loadCars({ limit: 30, offset: 0 }));
    this.getRowNodeId = function (item) {
      return item.id;
    };
    this.columnDefs = [
      {
        headerName: 'ID',
        maxWidth: 100,
        valueGetter: 'node.id',
        sortable: false,
        suppressMenu: true,
      },
      {
        field: 'athlete',
        suppressMenu: true,
      },
      {
        field: 'age',
        filter: 'agNumberColumnFilter',
        filterParams: {
          filterOptions: ['equals', 'lessThan', 'greaterThan'],
          suppressAndOrCondition: true,
        },
      },
      {
        field: 'country',
        filter: 'agSetColumnFilter',
      },
      {
        field: 'year',
        filter: 'agSetColumnFilter',
        filterParams: {
          values: ['2000', '2004', '2008', '2012'],
        },
      },
      { field: 'date' },
      {
        field: 'sport',
        suppressMenu: true,
      },
      {
        field: 'gold',
        suppressMenu: true,
      },
      {
        field: 'silver',
        suppressMenu: true,
      },
      {
        field: 'bronze',
        suppressMenu: true,
      },
      {
        field: 'total',
        suppressMenu: true,
      },
    ];
  }

  ngOnInit() {
    this.gridOptions = {
      ...this.gridOptions,
      rowModelType: 'serverSide',
      cacheBlockSize: 30,
      infiniteInitialRowCount: 30,
    };

    // this.infiniteScrollDataSource = {
    //   getRows: (params: IGetRowsParams) => {
    //     this.apiService.loadCars(params.startRow).subscribe((data) => {
    //       console.log(params.startRow);
    //       const totalCount = 90;
    //       const lastRow = params.endRow >= totalCount ? totalCount : -1;
    //       params.successCallback(data, lastRow);
    //     });
    //   },
    // };
  }

  onGridReady($event) {
    const dataSource = this.createServerSideDatasource();
    this.agGrid?.api?.setServerSideDatasource(dataSource);
  }

  private createServerSideDatasource(): IServerSideDatasource {
    return {
      getRows: (params) => {
        console.log(
          '[Datasource] - rows requested by grid: startRow = ' +
            params.request.startRow +
            ', endRow = ' +
            params.request.endRow
        );
        // get data for request from our fake server
        var response = this.http
          .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
          .subscribe((data: any) => {
            data.forEach(function (data, index) {
              data.id = 'R' + (index + 1);
            });
            params.success({
              rowData: data,
              rowCount: data.length, // total count
            });
          });
      },
    };
  }
}
