module.exports = {

    // getUser: (req, res) => {
    //     console.log('getuser in controller')
    //     if(req.session.user) {
    //         res.status(200).send(req.session.user);
    //     } else {
    //         res.status(401).send('Go log in!')
    //     }
    // },

    login: (req, res) => {
        const dbInstance = req.app.get('db')
        let { username, password } = req.body

        dbInstance.get_password([username])
        .then(hash => {
            let myHash = hash[0].password
            console.log(myHash)
            bcrypt.compare(password, myHash, function(err, response) {
                if(response) {
                    dbInstance.login_user([username, myHash])
                        .then(loginResults => {
                        if(loginResults[0]) {
                            console.log('login controller!', loginResults[0])
                            req.session.user = loginResults[0]
                            res.status(200).send(loginResults[0]);
            
                        } else {
                            res.status(403).send("user not found")
                            console.log(err)
                        }
                    }).catch( err => res.sendStatus(500))
                }
            })
        })

    },

    register: (req, res) => {
        const dbInstance = req.app.get('db')
        let {username, password} = req.body;

        bcrypt.hash(password, null, null, function(err, hash) {
            dbInstance.register_user( [username, hash] )
            .then( user => {
                    req.session.username = username
                    req.session.password = password
                    req.session.user = user[0]
                    res.status(200).send(user)
                    console.log('register in controller', username)
                }).catch( err => res.sendStatus(500))
            })
        },

    logout: (req, res) => {
        req.session.destroy(() => {
            res.sendStatus(200)
        })
    }
}