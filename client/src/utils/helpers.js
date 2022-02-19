export const sortTodos = (todos, by) => {
    switch (by) {
    case "completed":
        const completed = todos.filter((x) => x.isCompleted)
        const notCompleted = todos.filter((x) => !completed.includes(x))
        const arranged = notCompleted.sort((a, b) => b.priority - a.priority)
        return [...arranged, ...completed]
    case "priority":
        return [...todos].sort((a, b) => a.priority - b.priority)
    default:
        return todos
    }
}