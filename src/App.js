import { useReducer } from 'react';
function App() {
  const [tasks, dispatch] = useReducer(reducer, {
    taskN: 'Eat',
    desc: 'eat the food',
    category: 'food',
    status: true,
  });
  const reducer = (state, action) => {
    switch (action.type) {
      case 'doney':
        return state.map((task) => {
          if (task.id === action.id) {
            return { ...task, status: true };
          } else {
            return task;
          }
        });
      default:
        return state;
    }
  };
  return <div className='App'></div>;
}

export default App;
