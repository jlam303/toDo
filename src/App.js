import { useReducer, useState } from 'react';
function App() {
  const [name, setName] = useState('');
  const [cat, setCat] = useState('');
  const [desc, setDesc] = useState('');
  const reducerTask = (state, action) => {
    switch (action.type) {
      case 'addo':
        return [...state, action.task];
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
  const [tasks, dispatch] = useReducer(reducerTask, [
    {
      id: 0,
      name: 'Eat',
      desc: 'eat the food',
      category: 'food',
    },
  ]);
  const addTask = () => {
    console.log(tasks[tasks.length - 1].id);
    dispatch({
      type: 'addo',
      task: {
        id: tasks[tasks.length - 1] ? tasks[tasks.length - 1].id + 1 : 0,
        name: name,
        desc: desc,
      },
    });
    setDesc('');
    setName('');
  };
  const deleteTask = (id) => {
    dispatch({ type: 'deleto', id: id });
  };
  return (
    <div className='App'>
      <form action=''>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='desc'>Description:</label>
        <input
          type='text'
          name='desc'
          id='desc'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type='reset' onClick={() => addTask()}>
          Add Task
        </button>
      </form>
      {tasks.map((e, i) => {
        if (e) {
          return (
            <div key={i}>
              <h2>{e.id}</h2>
              <h2>{e.category}</h2>
              <h2>{e.name}</h2>
              <h2>{e.desc}</h2>
              <button onClick={() => deleteTask(e.id)}>Delete Task</button>;
            </div>
          );
        } else return null;
      })}
    </div>
  );
}

export default App;
