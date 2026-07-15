function TodoForm () {
    return (
        <form>
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle" />
            <button type="submite" disabled>Add Todo</button>
        </form>
    );
}

export default TodoForm