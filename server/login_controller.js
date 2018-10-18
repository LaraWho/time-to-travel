module.exports = {

    login: (req, res) => {
        const dbInstance = req.app.get('db')
        let { username, password } = req.body

        dbInstance.login_user([username, password])
            .then(loginResults => {
            if(loginResults[0]) {
                console.log('login controller!',loginResults[0])
                req.session.user = loginResults[0]
                res.status(200).send(loginResults[0]);

            } else {
                return res.status(403).send("user not found")
            }
        }).catch( err => res.sendStatus(500))
    },

    register: (req, res) => {
        if (username.length && password.length >= 5) {

        const dbInstance = req.app.get('db')
        let {username, password} = req.body;

        dbInstance.register_user( [username, password] )
        .then( user => {
                req.session.username = username
                req.session.password = password
                req.session.user = user[0]
                res.status(200).send(user)
                console.log('register in controller', username)
            }).catch( err => res.sendStatus(500))
        } else {
            console.log('my else statement')
            return res.sendStatus(406)
        }
        },

    logout: (req, res) => {
        req.session.destroy(() => {
            res.sendStatus(200)
        })
    }
}