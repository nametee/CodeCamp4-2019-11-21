function createStore(reducer,initialState) { 
    let state = initialState 
    let subscribers = {}
  
    return {
      getState: () => state ,
      dispatch: (action) => {
        state = reducer(state,action)  
        Object.values(subscribers).forEach(value => {
            value()
        }) 
      },
      subscribe: (callback) =>{
        let index =  Object.keys(subscribers).length
        index = index > 0 ? +Object.keys(subscribers)[index-1] + 1 : 0 
        subscribers[index] = callback  
        return index
      },
      unsubscribe: (id) => {  
        delete subscribers[id] 
      }
    }
  }

  function counterReducer(state,action) {
      switch (action.type) {
        case 'ADD':
            state.count = state.count + 1  
            return state
        case 'REMOVE':
            state.count = state.count - 1  
            return state
        default : 
            return state
      }
  }

  function mathReducer(state,action) { 
    switch (action.type) {
        case '^': 
            state.num = state.num ** action.pow 
            return state
        case '*':
            state.num = state.num * action.num 
            return state
        case '/':
            state.num = state.num / action.num 
            return state
        case '+':
            state.num = state.num + action.num 
            return state
        case '-':
            state.num = state.num - action.num
            return state
        default : 
            return state
      }  
  }

  let aa = {
      num: 0,
      count: 0
  }

  let a = createStore(counterReducer,aa)
  //console.log(a.getState()) 
  a.dispatch({type: 'ADD'})
  a.dispatch({type: 'ADD'}) 
  //console.log(a.getState()) 
  a.dispatch({type: 'REMOVE'})
  //console.log(a.getState()) 
  let b = createStore(mathReducer,aa)
  b.subscribe(() => console.log('test1') )
  console.log(b.getState()) 
  b.dispatch({type: '+' , num: 3})
  b.dispatch({type: '+' , num: 3})  
  b.subscribe(() => console.log('test2') )
  console.log(b.getState()) 
  b.dispatch({type: '-' , num: 2}) 
  b.subscribe(() => console.log('test3') )
  b.unsubscribe(1)
  console.log(b.getState()) 
  b.dispatch({type: '^' , pow: 2})
  console.log(b.getState()) 
  b.subscribe(() => console.log('test4') )
  b.dispatch({type: '*' , num: 10})
  console.log(b.getState()) 

