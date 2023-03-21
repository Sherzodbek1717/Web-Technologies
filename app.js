// third party libs 
const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false }))


// node libs 
const fs = require('fs')
const PORT = 8080

app.set('view engine', 'pug')
app.set('views', './views')
app.use('/static', express.static('public')) // assets
app.use(express.urlencoded({ extended: false}))

// localhost:8080
app.get('/', (req, res) => {
    fs.readFile('./data/todos.json', (err, data) =>{
        if (err) throw err
        const todos = JSON.parse(data)

        res.render('home', {todos: todos})
    })
})

app.post('/Add', (req, res) => {
    const formData = req.body

    if (formData.todo.trim() == '') {
        fs.readFile('./data/todos.json', (err, data) =>{
            if (err) throw err 
            const todos = JSON.parse(data)
            res.render('home', {error: true, todos: todos})

        })
    }
    else {
        fs.readFile('./data/todos.json', (err, data) => {
            if (err) throw err
            
            const todos = JSON.parse(data)

            const todo = {
                id: id(), 
                description: formData.todo,
                done: false 
            }

            todos.push(todo)

            fs.writeFile('./data/todos.json', JSON.stringify(todos), (err) => {
                if (err) throw err 

                res.redirect('/')
            })
        })
    }
})

app.listen(PORT, (err) => {
    if (err) throw err
    console.log('This app is running on port ' + PORT)
})

app.get('/:id/delete', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err
        const todos = JSON.parse(data)

        const filteredTodos = todos.filter(todo => todo.id !=id)

        fs.writeFile('./data/todos.json', JSON.stringify(filteredTodos), (err) => {
            if (err) throw err
            res.render('home', { todos: filteredTodos, delete: true })
        })
    })
})

app.get('/:id/update', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err

        const todos = JSON.parse(data)
        const todo = todos.filter(todo => todo.id == req.params.id)[0]

        const todoIdx = todos.indexOf(todo)
        const splicedTodo = todos.splice(todoIdx, 1)[0]

        splicedTodo.done = true
        
        todos.push(splicedTodo)

        fs.writeFile('./data/todos.json', JSON.stringify(todos), (err) => {
            if (err) throw err

            res.render('home', { todos: todos })
        })
    })
    })

    

function id () {
    return '_' + Math.random().toString(36).substr(2.9);
}


