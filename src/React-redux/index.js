import React, {useContext, useReducer} from 'react';

const Connect = React.createContext()

export function Provider({children, store}) {

    return (
        <Connect.Provider value={store}>
            {children}
        </Connect.Provider>
    )
}

export function bindActionCreator(creater, dispatch) {
    return function(...args) {
        return dispatch(creater(...args))
    }
}

export function bindActionCreators(creater, dispatch) {
    let obj = {}
    for (const key in creater) {
        obj[key] = bindActionCreator(creater[key], dispatch)
    } 
    return obj
}


export const connect = (mapStateToProps, mapDispatchToProps) => {
    const {store} = useContext(Connect)
    const {getState, dispatch} = store 
    const newState = mapStateToProps(getState())

    const newDispatch = mapDispatchToProps()
    let dispatchProps
    if (typeof mapDispatchToProps === 'function') {
        dispatchProps = mapStateToProps(dispatch)
    } else {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
    }

    return cmp => props => <cmp {...newState} {...dispatchProps} {...props}/> 
}

export function useSelector(selecter) {
    const store = useStore()

    const {getState, subscribe} = store
    let [_, forroceUpdate] = useReducer(x => x + 1, 0)
    
    useLayoutEffect(() => {
        
        let unsubscribe = subscribe(() => {
            forroceUpdate()
        })
       
        return () => {
            unsubscribe()
        }
    }, [store])


    return selecter(getState())
}

export function useDispatch() {
    const store = useStore();
    return store.dispatch();
}

export function useStore() {
    const {store} = useContext(Connect);

    return store;
}