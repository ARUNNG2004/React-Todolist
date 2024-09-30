import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Assuming you've installed framer-motion. If not, run:
// npm install framer-motion

const AnimatedTodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Animated Todo List</h1>
      <form onSubmit={addTodo} style={styles.form}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo"
          style={styles.input}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={styles.addButton}
        >
          Add
        </motion.button>
      </form>
      <AnimatePresence>
        {todos.map(todo => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            style={styles.todoItem}
          >
            <motion.span
              style={{
                ...styles.todoText,
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
              whileHover={{ scale: 1.02 }}
            >
              {todo.text}
            </motion.span>
            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleTodo(todo.id)}
                style={styles.toggleButton}
              >
                {todo.completed ? '↩️' : '✅'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteTodo(todo.id)}
                style={styles.deleteButton}
              >
                🗑️
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px 0 0 4px',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
  },
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  todoText: {
    flex: 1,
    marginRight: '10px',
  },
  toggleButton: {
    marginRight: '5px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
  },
};

export default AnimatedTodoList;
