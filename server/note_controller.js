module.exports = {
    
create: (req, res) => {
    const dbInstance = req.app.get('db')
    const { note_id } = req.params; 
    const { title, location, content } = req.body;

    dbInstance.add_note([ note_id, title, location, content ])
    .then((note) => res.status(200).send(note) )
    .catch( err => {
        res.status(401).send({errorMessage: "Oops, couldn't add a product!"})
        console.log(err)
    })
},

read: (req, res) => {
    const dbInstance = req.app.get('db')
    let {user_id} = req.session.user

        dbInstance.view_all([user_id])
        .then(notes => {
            res.status(200).send(notes)
            
        }).catch( err => {
            res.sendStatus(500)
            console.log(err)
        })
    
},
update: (req, res) => {
    const dbInstance = req.app.get('db');
    const { note_id } = req.params;
    const { title, location, content } = req.body;

    dbInstance.edit_note([ title, location, content, note_id ])
    .then( (note) => res.status(200).send(note) ) 
    .catch( err => {
        res.status(400).send({errorMessage: "Oops, you can't edit this!"})
        console.log(err)
    }) 
},

delete: (req, res) => {
    const dbInstance = req.app.get('db');
    const { note_id } = req.params;
    const { user_id } = req.session.user;

    dbInstance.delete( [note_id, user_id] )
    .then( (notes) => {
        res.status(200).send(notes) 
    })
    .catch( err => {
        res.status(500).send({errorMessage: "Oops, you can't delete this!"})
        console.log(err)
    } )
}

}