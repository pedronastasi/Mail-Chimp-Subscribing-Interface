const { Router } = require('express')
const mailchimp = require('@mailchimp/mailchimp_marketing');



const signUpRouter = Router()

signUpRouter.post('/', async (req, res) => {
    console.log(req.body)
    console.log(process.env.CLAVE)
    console.log(process.env.LIST_ID)

    mailchimp.setConfig({
        apiKey: process.env.CLAVE,
        server: "us20",
    });

    try {
        const response = await mailchimp.lists.batchListMembers(process.env.LIST_ID, {
            members: [{
                email_address: req.body.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: req.body.fName,
                    LNAME: req.body.lName
                }
            }],
        });
        // console.log(response)

        if (response.errors.length > 0) {
            // const error = response.errors[0].error
            // const erroCode = response.errors[0].error_code
            // res.status(404).json({ error, erroCode })
            res.redirect('/failure')
        } else if (response.new_members.length > 0){
            // res.status(200).json({ msj: 'everything went ok and the new member was susbscribed' })

            res.redirect('/success')

        }else{
            // res.status(404).json({ msjError: 'something unexpected happened', response })
            res.redirect('/failure')
        }
        

    } catch (error) {
        console.log(error)
        res.status(404).json({ error })
    }





})
module.exports = signUpRouter