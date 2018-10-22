const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


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
            bcrypt.compare(password, myHash, function(err, response) {
                if(response) {
                    dbInstance.login_user([username, myHash])
                        .then(loginResults => {
                        if(loginResults[0]) {
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

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            // secure: false,
            // port: 25,
            auth: {
              user: 'lara.who88@gmail.com',
              pass: process.env.REACT_APP_PASSWORD
            },
            // tls: {
            //   rejectUnauthorized: false
            // }
          });
          
          let HelperOptions = {
            from: '"Lara" <lara.who88@gmail.com',
            to: `username`,
            subject: 'Registered with Time to Travel',
            text: `Thank you for registering with Time to Travel! Your login information is ${username} and ${password}.`
          };

        //   console.log(auth.pass)
                    
          bcrypt.hash(password, 8, function(err, hash) {
              dbInstance.register_user( [username, hash] )
              .then( user => {
                  req.session.username = username
                  req.session.password = password
                  req.session.user = user[0]
                  transporter.sendMail(HelperOptions, (error, info) => {
                      if (error) {
                          return console.log(error);
                        }
                        console.log("The message was sent!");
                        console.log(info);
                    });
                    res.status(200).send(user)
                }).catch( err => res.sendStatus(500))
            })
        },

    logout: (req, res) => {
        req.session.destroy(() => {
            res.sendStatus(200)
        })
    }
}