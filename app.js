
const dotenv = require('dotenv');
dotenv.config();
var express = require('express'),
    app=   express();
 const PORT = process.env.PORT || 3000;
var rp = require('request-promise');
app.set('view engine','ejs');
var key=process.env.SECRET;

var repos = {
    uri: 'https://api.github.com/users/reactos/repos',
    qs: {
        access_token: key, // -> uri + '?access_token=xxxxx%20xxxxx'
        // per_page:5,
        sort:"name",
       
        
        
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};


// var commits = {
//     uri: 'https://api.github.com/repos/ayushsnha/Authentication_node_passportJS/commits',
//     qs: {
//         access_token: key, // -> uri + '?access_token=xxxxx%20xxxxx'
        
//     },
//     headers: {
//         'User-Agent': 'Request-Promise'
//     },
//     json: true // Automatically parses the JSON string in the response
// };


app.get('/',(req,res)=>{
   
    rp(repos)
    .then(function (body) {
        // console.log(body);
        data=body;        
        res.render('results',{data:data});
        
    })
    .catch(function (err) {
        console.log(err);
    });
        
});



// app.get('/ak',(req,res)=>{
//     // console.log(req);
   
//     rp(commits)
//     .then(function (body) {
//         // console.log(body);
//         res.send(body);
//         // res.render('results',{data:data});
//     })
//     .catch(function (err) {
//         console.log(err);
//     });
        
        
     
    
// });


app.listen(PORT,()=>{
    console.log('server has started');
})