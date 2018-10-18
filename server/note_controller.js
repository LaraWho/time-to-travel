module.exports = {


// updateNote: (req, res) => {
//     const dbInstance = req.app.get('db');
//     const { user_id } = req.session.user;
//     const { title, location, content  } = req.body;

//     dbInstance.update_note([ title, location, content, user_id ])
//     .then(response => {
//         req.session.user = response[0]
//         res.status(200).send(response) 
//     }).catch( err => {
//         console.log(err)
//     }) 
// },

read: (req, res) => {
    const dbInstance = req.app.get('db')
    let {user_id} = req.session.user

        dbInstance.view_all([user_id])
        .then(notes => {
            console.log(notes)
            res.status(200).send(notes)
            
        }).catch( err => {
            res.sendStatus(500)
            console.log(err)
        })
    
}

}