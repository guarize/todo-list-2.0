import React, { useContext, useEffect, useState } from 'react';
import TodoContext from '../contexts/TodoContext';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import '../styles/TodoList.css';

export default function TodoList() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [filterButtons, setFilterButtons] = useState([
    { name: 'All', value: 'all', selected: true },
    { name: 'Active', value: 'active', selected: false },
    { name: 'Completed', value: 'completed', selected: false },
  ]);

  const { todoList, setTodoList, darkMode } = useContext(TodoContext);
  const [displayedList, setDisplayed] = useState([]);

  useEffect(() => {
    setDisplayedTasks('all');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoList]);

  const handleFilterOptions = (value) => {
    const updatedFilterButtons = filterButtons.map((option) => {
      if (option.selected || option.value === value) {
        return { ...option, selected: !option.selected };
      } else {
        return option;
      }
    });
    setFilterButtons(updatedFilterButtons);
    setDisplayedTasks(value);
  };

  const setDisplayedTasks = (value) => {
    switch (value) {
      case 'active':
        return setDisplayed(getActiveTasks());
      case 'all':
        return setDisplayed(todoList);
      case 'completed':
        return setDisplayed(completedTasks);
      default:
        return displayedList;
    }
  };

  const handleTaskClick = ({ target: { value } }) => {
    if (completedTasks.includes(value)) {
      const newCompletedTasks = completedTasks.filter(() => !value);
      setCompletedTasks(newCompletedTasks);
    } else {
      setCompletedTasks([...completedTasks, value]);
    }
  };

  const getActiveTasks = () => {
    const completedTasksSet = new Set(completedTasks);
    const activeTasks = todoList.filter((task) => !completedTasksSet.has(task));
    return activeTasks;
  };

  const handleClearCompleted = () => {
    setTodoList(getActiveTasks());
    setCompletedTasks([]);
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || destination.index === source.index) return;

    const task = todoList.find((todo) => todo === draggableId);
    const reorderedTodoList = [...todoList];
    reorderedTodoList.splice(source.index, 1);
    reorderedTodoList.splice(destination.index, 0, task);
    setTodoList(reorderedTodoList);
  };

  return (
    <div
      className={
        darkMode ? 'list-wrapper list-dark' : 'list-wrapper list-light'
      }
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo-list">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {(displayedList.length === 0 ? todoList : displayedList).map(
                (todo, i) => (
                  <Draggable key={todo} draggableId={todo} index={i}>
                    {(provided) => (
                      <div
                        className={
                          darkMode
                            ? 'todo-container todo-container-dark'
                            : 'todo-container todo-container-light'
                        }
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <button
                          type="button"
                          className={
                            completedTasks.includes(todo)
                              ? 'todo-button completed-task'
                              : 'todo-button'
                          }
                          value={todo}
                          onClick={handleTaskClick}
                        />
                        <li>{todo}</li>
                      </div>
                    )}
                  </Draggable>
                ),
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div
        className={
          darkMode
            ? 'list-options list-options-dark'
            : 'list-options list-options-light'
        }
      >
        <span>{`${todoList.length - completedTasks.length} items left`}</span>
        <div className="sort-options">
          {filterButtons.map(({ name, value, selected }) => (
            <p
              value={value}
              key={value}
              className={selected ? 'selected-filter' : ''}
              onClick={() => handleFilterOptions(value)}
            >
              {name}
            </p>
          ))}
        </div>
        <p onClick={handleClearCompleted} className="clear-completed">
          Clear Completed
        </p>
      </div>
    </div>
  );
}
