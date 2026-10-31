const express = require('express');
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: 'Rahul', age: 20, department: 'CSE' },
    { id: 2, name: 'Priya', age: 21, department: 'CSE' }
];

// READ
app.get('/students', (req, res) => res.json(students));

app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
});

// CREATE
app.post('/students', (req, res) => {
    const student = { id: students.length + 1, ...req.body };
    students.push(student);
    res.status(201).json(student);
});

// UPDATE
app.put('/students/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1)
        return res.status(404).json({message:'Not found'});

    students[index] = { id, ...req.body };
    res.json(students[index]);
});

// DELETE
app.delete('/students/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1)
        return res.status(404).json({message:'Not found'});

    students.splice(index, 1);
    res.json({message:'Deleted successfully'});
});

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

module.exports = app;