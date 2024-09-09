class User{
    users= [ ]
        // id : 'user-277875423456',
        // name : 'Kiran Choudhary',
        // contact : '9079609087',
        // password : 'Kiran#123'
   

    add = (req, res) => {
        const user = this.users.find(user => user.contact === req.body.contact)
        if(user){
            res.status(409).send({
                bSuccess : false,
                message : 'User already exist!!'
            })
        }
        else{
            this.users.push({
                id : `User - ` + (new Date()).getTime(),
                ...req.body
            })
            res.status(201).send({
                bSuccess : true,
                message : 'User is successfully registered!!'
            })
        }
    }

    read = (req, res )=> {
        res.send(this.users)
    }

    login = (req, res) => {
        console.log(req.body)
        const user = this.users.find(user => user.contact === req.body.contact && user.password === req.body.password)
        if(user){
            res.status(200).send({
                id : user.id,
                name : user.name,
                contact : user.contact

            })
        }
        else{   
            res.status(401).send({
                bSuccess : false,
                message : 'User not found or wrong credentials!!'
            })
         }
    }
}

export default User