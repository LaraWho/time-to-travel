module.exports = {


updateNote: (req, res) => {
    const dbInstance = req.app.get('db');
    const { user_id } = req.session.user;
    const { title, location, content  } = req.body;

    dbInstance.update_note([ title, location, content, user_id ])
    .then(response => {
        req.session.user = response[0]
        res.status(200).send(response) 
    }).catch( err => {
        console.log(err)
    }) 
}

}