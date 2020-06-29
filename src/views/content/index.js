import React, { Component, useReducer } from 'react';
import {withRouter} from 'react-router-dom';
import { List, Avatar } from 'antd/lib/form/Form';

class Content extends Component {
    
    componentDidMount() {
        console.log('挂在了')
    }

    componentDidUpdate() {
        console.log('更新了')
    }

    render () {
        const data = [
            {
              title: 'Ant Design Title 1',
            },
            {
              title: 'Ant Design Title 2',
            },
            {
              title: 'Ant Design Title 3',
            },
            {
              title: 'Ant Design Title 4',
            },
        ];
        return (
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
                )}
            />
        );
    }
}
export default withRouter(Content);
let {dispatch, getState} = store

store.dispatch = function(action) {
  action(dispatch, getState)
}
retern 

let a = next => action => action(next, getState)
let b = a => action => a(action)
let c = b => action => b(action)
store.dispatch = c;
reducer( (a, b) => {
  return b(a)
})
