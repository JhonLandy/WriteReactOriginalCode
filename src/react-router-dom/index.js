import React, { Component, useContext } from 'react';
import {createBrowserHistory} from 'history';
import { match } from 'assert';
import { matchPath } from 'react-router-dom';
import { render } from '@testing-library/react';
const RouterContext = useContext()

export class Link extends Component {
    contextType = RouterContext
    onHistoryChange(e) {
        const {history} = this.context;
        history.push(his.props.to)
        //更新路由
        e.preventDefault()
    }

    render() {
            return <a {...this.props} onClick={this.onHistoryChange}>{this.props.children}</a> 
        }
      
    }
}
export class Route extends Component {
    
    static contextType = RouterContext

    render() {
        const {compuredMatch} = this.context

        const {children, render, component, path} = this.props;
        const location = this.props.location || this.context.location;
        match = compuredMatch 
            ?  compuredMatch 
            : path 
                ? matchPath(location.pathname, this.props)  
                : this.context.match
        const props = {
            ...this.context,
            match
        }
        return  (<RouterContext.Provider value={props}>
                    {match
                        ? children 
                            ? typeof children === 'function' ? children(props) : null
                            : component 
                                ? React.createElement(component, props)
                                : render ? render(props) : null
                        : children 
                            ? typeof children === 'function' 
                                ? children(props) 
                                : null 
                            : null
                    }
                </RouterContext.Provider>)
        
    }
}

export class BrowserRouter extends Component {
    
    static computeRootMatch(pathname) {    
        return {path: "/", url: "/", params: {}, isExact: pathname === "/"};  
    } 
    componentWillUnmount() {
        this.unlisten()
    }

    render() {
        const history = createBrowserHistory()
        
        this.state = {
            location: history.location
        }

        this.unlisten = history.listen(location => {
            this.setState({
                location
            })
        })

        return (
            <RouterContext.Provider value={
                {
                    history: this.props.history,          
                    location: this.state.location,         
                    match: BrowserRouter.computeRootMatch(this.state.location.pathname)
                } 
            }>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}

export const WithRouter = cmp => props => {
    return (
        <RouterContext.Customer>
            {
                context => <cmp {...context} {...props}/>
            }
        </RouterContext.Customer>
    )

}
   

export class Switch extends Component {
    
    render() {
        let match, element;
        return (
            <RouterContext.Customer>
                {
                    context => {
                        const {location} = context;

                        React.Children.forEach(children, child => {
                            if (child.path === location.pathname) {
                                element = child
                                match = matchPath(location.pathname)
                            }
                        })

                        return match ? React.cloneElement(element, {compuredMatch: match}) : null
                    }
                }
            </RouterContext.Customer>
        )
    }
}

export function useHistorty() {
    return useContext(RouterContext).history
}

export function useLocation() {
    return useContext(RouterContext).location
}

export function useParam() {
    const match = useContext(RouterContext).match
    return match ? match.params : {}
}


export  function prompt({message, when}) {
    when = when || true
    if (when) return null;

    return (
        <RouterContext.Customer>
            {
                context => {
                    let method = context.history.block
                    return(
                        <LifeCyle 
                            onMount = {
                                self => {
                                    self.release = method(message);
                                }
                            }
                            onUnmount = {
                                self => {
                                    self.release()
                                }
                            }
                        >


                        </LifeCyle>
                    )
                }
            }
        </RouterContext.Customer>
    )
}

exprot class LifeCyle extends Component {
    
    componentDidMount() {
        if(this.props.onMount)
            this.props.onMount.call(this, this)
    }

    componentWillUnmount() {
        f(this.props.onUnmount)
            this.props.onUnmount.call(this, this)
    }
    
    render() {
        return null
    }
}


