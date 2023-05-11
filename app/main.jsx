import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { ColumnMenu, ColumnMenuCheckboxFilter } from './columnMenu';
import products from './products.json';
const createDataState = dataState => {
  return {
    result: process(products.slice(0), dataState),
    dataState: dataState
  }; 
};
const App = () => {
  let initialState = createDataState({
    take: 8,
    skip: 0
  });
  const [result, setResult] = React.useState(initialState.result);
  const [dataState, setDataState] = React.useState(initialState.dataState);
  const dataStateChange = event => {
    let updatedState = createDataState(event.dataState);
    setResult(updatedState.result);
    setDataState(updatedState.dataState);
  };
  return <Grid data={result} {...dataState} onDataStateChange={dataStateChange} sortable={true} pageable={true} pageSize={8}>
        <Column field="ProductID" title="Product Id" filter={'numeric'} columnMenu={ColumnMenu} />
        <Column field="ProductName" columnMenu={ColumnMenuCheckboxFilter} />
        <Column field="UnitPrice" filter={'numeric'} columnMenu={ColumnMenu} />
        <Column field="Discontinued" filter={'boolean'} columnMenu={ColumnMenuCheckboxFilter} />
      </Grid>;
};
ReactDOM.render(<App />, document.querySelector('my-app'));