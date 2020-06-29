import  React from 'react';
import Page from '../views/page/index';
const routeList = [
    {
        name: "首页",
        path: "*",
        exact: true,
        render(props){
            return <Page {...props}/>;
        }
    }
];

export {routeList};