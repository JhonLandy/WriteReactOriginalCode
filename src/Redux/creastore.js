function createStore(reducer) {
    let currentState = {};
    let currentListener = [];
    
    function getState() {
        return currentState
    };
    
    function dispatch(action) {
        
        currentState = reducer(currentState, action)
       
        cuurentListener.forEach(listener => {
            listener();
        })

        return action
    };

    function subscribe(listener) {
        currentListener.push(listener); 

        return function unSubscribe() {
            const index = currentListener.indexOf(listener)
            currentListener.splice(index, 1)
        }
    };

    const store = {
        getState,
        dispatch,
        subscribe
    }
    return store
}