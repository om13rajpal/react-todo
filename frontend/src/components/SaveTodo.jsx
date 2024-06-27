export function SaveTodo(){
    return <div>
        <input type="text" placeholder="title" style={{
            padding: 10,
            margin: 10
        }}/><br />
        <input type="text" placeholder="description" style={{
            margin: 10,
            padding: 10
        }}/><br />
        <button>save todo</button>
    </div>
}