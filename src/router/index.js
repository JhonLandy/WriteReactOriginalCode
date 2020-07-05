import  React from 'react';
import Table from '../views/table/index';
const routeList = [
    {
        name: "表格",
        path: "/table",
        exact: true,
        render(props){
            return <Table {...props}/>;
        }
    }
];

export default routeList;