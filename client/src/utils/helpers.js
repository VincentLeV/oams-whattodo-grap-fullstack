export const sortTodos = (todos) => {
    const completed = todos.filter((x) => x.isCompleted)
    const notCompleted = todos.filter((x) => !completed.includes(x))
    const arranged = notCompleted.sort((a, b) => b.priority - a.priority)
    return [...arranged, ...completed]
    // switch (by) {
    // case "completed":
    //     const completed = todos.filter((x) => x.isCompleted)
    //     const notCompleted = todos.filter((x) => !completed.includes(x))
    //     const arranged = notCompleted.sort((a, b) => b.priority - a.priority)
    //     return [...arranged, ...completed]
    // case "priority":
    //     return [...todos].sort((a, b) => b.priority - a.priority)
    // default:
    //     return todos
    // }
}