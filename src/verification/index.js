// const nodemailer = require('nodemailer')



// module.exports = transporter























// const sendEmail = async(email, uniqueString) => {
//     // try {
//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.PASSWORD,
//             }
//         });
    
//         let mailOptions
//         let sender = 'aroyewontope@gmail.com'
//         mailOptions = {
//             from: sender,
//             to: email,
//             subject: 'Email Confirmation',
//             html: `Press <a href=http://localhost:3000/verify/${uniqueString}> here </a> to verify your email. Thanks.`
//         };

//         transporter.sendEmail(mailOptions, function(error, res) {
//             if (error) {
//                 // return next(error)
//                 console.log(error)
//             } else {
//                 console.log('message sent')
//             }
//         })
//     // } catch (error) {
//     //     console.log(error)
//     // }

// }

// module.exports = sendEmail