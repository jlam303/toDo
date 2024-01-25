import { useReducer } from 'react';
function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'addo':
        return state.map((task) => {
          if (task.id === action.id) {
            return { ...task, status: true };
          } else {
            return task;
          }
        });
      case 'deleto':
        return state.map((task) => {
          if (task.id === action.id) {
            return false;
          } else {
            return task;
          }
        });
      default:
        return state;
    }
  };
  const [tasks, dispatch] = useReducer(reducer, [
    {
      id: 0,
      name: 'Eat',
      desc: 'eat the food',
      category: 'food',
      status: true,
    },
  ]);
  const addTask = (id) => {
    dispatch({ type: 'addo', id: id });
  };
  const deleteTask = (id) => {
    dispatch({ type: 'deleto', id: id });
  };
  return (
    <div className='App'>
      {tasks.map((e, i) => {
        if (e) {
          return (
            <div key={i}>
              <h2>{e.category}</h2>
              <h2>{e.name}</h2>
              <h2>{e.desc}</h2>
              <button onClick={() => deleteTask(e.id)}>Delete Task</button>;
            </div>
          );
        } else return null;
      })}
      <button onClick={() => addTask()}>Add Task</button>
    </div>
  );
}

export default App;
