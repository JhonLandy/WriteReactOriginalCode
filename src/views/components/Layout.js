
import { Layout, Menu } from 'antd';
import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import routes from '../../router/index';
const { Header, Content, Footer } = Layout;

export default class LayoutFrame extends Component {
    
    componentDidMount() {
        const element = document.querySelector(".layout")
        element.style.height = window.innerHeight + 'px';
    }
    render() {
        return (
            <Layout className="layout" ref={this.element}>
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        {   routes.map(({name, path}, index) => (
                                <Menu.Item key="index">
                                    <Link to={path}>{name}</Link>
                                </Menu.Item>
                               )
                            )
                        }
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Switch>
                        {
                            routes.map(({name, path, exact, render}, index) => (
                                <Route 
                                    name={name} 
                                    path={path}
                                    exact={exact} 
                                    render={render}
                                    key={index}
                                ></Route>)
                            )
                        }
                        
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

