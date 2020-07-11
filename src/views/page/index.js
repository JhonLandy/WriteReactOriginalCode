import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import {Switch, Route, Link} from 'react-router-dom';
import ContentPage from '../content/index';
const {Header, Sider, Content } = Layout
class Page extends Component {


    render() {
        return (
            <Layout>
                <Header>
                    Conde实战
                </Header>
                <Layout>
                    <Sider>
                        <Menu>
                            <Menu.Item key="1"> 
                                <Link to={"/page/one"}>
                                    one
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to={"/page/two"}>
                                    two
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content 
                        style={{"background": "#ffffff"}}
                    >
                        <Switch>
                            <Route path="/page/one" render={(props => {
                                return <ContentPage {...props}  data={'one'}/>
                            })}></Route>
                            <Route path="/page/two" render={(props => {
                                return <ContentPage {...props} data={'two'}/>
                            })}></Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
export default Page;