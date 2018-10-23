const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


module.exports = {

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
            host: 'mail.gmx.com',
            port: 587,
            // secure: false,
            auth: {
              user: 'larapotjewyd@gmx.com',
              pass: process.env.REACT_APP_PASSWORD
            },
            // tls: {
            //   rejectUnauthorized: false
            // }
          });
          
          let HelperOptions = {
            from: '"Lara" <larapotjewyd@gmx.com',
            to: `${username}`,
            subject: 'Registered with Time to Travel',
            text: `You\'ve registered with Time to Travel! Your login information is: EMAIL - ${username} and PASSWORD - ${password}`,
            html:
            `<h1 style={{fontFamily='Futura', color: '#003B6F', fontWeight: 'bold'}}> Thank you for registering with Time to Travel! </h1>
            <p style="font-family=FFutura; color: #003B6F"> Your login information is: <br />EMAIL - ${username} <br /> PASSWORD - ${password} </p>
            <img style="height: 100px; width: auto; text-align: center" src="../src/components/best-tardis-full.svg" alt="TARDIS" />`
        };
                    
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