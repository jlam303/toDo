import { useReducer, useState } from 'react';
function App() {
  const [name, setName] = useState('');
  const [cat, setCat] = useState('General');
  const [cato, setCato] = useState('');
  const [desc, setDesc] = useState('');
  const [upId, setId] = useState('');

  const [update, setUpdate] = useState(false);
  const [update2, setUpdate2] = useState(false);

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
      case 'edito':
        return state.map((task) => {
          if (task.id === action.id) {
            return action.task;
          } else {
            return task;
          }
        });
      default:
        return state;
    }
  };
  const reducerCat = (state, action) => {
    switch (action.type) {
      case 'addo':
        return [...state, action.cat];
      case 'deleto':
        return state.map((task) => {
          if (task === action.name) {
            return false;
          } else {
            return task;
          }
        });
      case 'edito':
        return state.map((task) => {
          if (task.id === action.id) {
            return action.cat;
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
      category: 'Food',
    },
  ]);
  const [categories, dispatcho] = useReducer(reducerCat, ['General', 'Food']);
  const addTask = () => {
    if (update) {
      setUpdate(false);
      dispatch({
        type: 'edito',
        id: upId,
        task: {
          id: upId,
          name: name,
          desc: desc,
          category: cat,
        },
      });
      setDesc('');
      setName('');
      setCat('General');
      return;
    }
    dispatch({
      type: 'addo',
      task: {
        id: tasks[tasks.length - 1] ? tasks[tasks.length - 1].id + 1 : 0,
        name: name,
        desc: desc,
        category: cat,
      },
    });
    setDesc('');
    setName('');
    setCat('General');
  };
  const addCat = () => {
    if (update2) {
      setUpdate2(false);
      dispatcho({
        type: 'edito',
        id: upId,
        cat: cato,
      });
      setCato('');
      return;
    }
    dispatcho({
      type: 'addo',
      cat: cato,
    });
    setCato('');
  };
  const deleteTask = (id) => {
    dispatch({ type: 'deleto', id: id });
  };
  const editTask = (e) => {
    setDesc(e.desc);
    setName(e.name);
    setId(e.id);
    setCat(e.cat);
    setUpdate(true);
  };
  const deleteCat = (name) => {
    dispatcho({ type: 'deleto', name: name });
  };
  const editCat = (e) => {
    setCato(e.cato);
    setUpdate(true);
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
        <label htmlFor='cats'>Category:</label>
        <select
          onChange={(e) => {
            setCat(e.target.value);
          }}
          value={cat}
          name='cats'
          id='cats'>
          {categories.map((e, i) => {
            if (e) {
              return (
                <option key={i} value={e}>
                  {e}
                </option>
              );
            } else return null;
          })}
        </select>
        <button type='reset' onClick={() => addTask()}>
          {update ? 'Update' : 'Add Task'}
        </button>
      </form>
      {tasks.map((e, i) => {
        if (e) {
          return (
            <div key={i}>
              <h3>{e.category}</h3>
              <h4>{e.name}</h4>
              <p>{e.desc}</p>
              <button onClick={() => deleteTask(e.id)}>Delete Task</button>
              <button onClick={() => editTask({ ...e })}>Edit Task</button>
            </div>
          );
        } else return null;
      })}
      <form action=''>
        <label htmlFor='cat'>Category:</label>
        <input
          type='text'
          name='cat'
          id='cat'
          onChange={(e) => setCato(e.target.value)}
        />
        <button type='reset' onClick={() => addCat()}>
          {update2 ? 'Update' : 'Add Categoy'}
        </button>
      </form>
      {categories.map((e, i) => {
        if (e) {
          return (
            <div className='flexy' key={i}>
              <h3>{e}</h3>
              <button onClick={() => deleteCat(e)}>Delete Category</button>
              <button onClick={() => editCat(e)}>Edit Category</button>
            </div>
          );
        } else return null;
      })}
    </div>
  );
}

export default App;
