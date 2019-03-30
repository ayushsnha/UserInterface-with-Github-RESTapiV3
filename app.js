const dotenv = require('dotenv');
dotenv.config();
var express = require('express')
var mysql      = require('mysql'),
    app=   express();
const PORT = process.env.PORT || 3000;
var rp = require('request-promise');
app.set('view engine','ejs');
var key=process.env.SECRET;

//MYSQL connection
var db = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
  });
  db.connect((err)=>{
        if(err) throw err;
        console.log('MySql connected...')
  });
 
  

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

var api = {
    uri: 'http://localhost:3000/api/commits',
    
    json: true // Automatically parses the JSON string in the response
};



const commit=[]
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

app.get('/api/commits',(req,res)=>{
    let q1='SELECT DISTINCT revision FROM winetest_runs;';
    db.query(q1,(err,result)=>{
      if(err) throw err;
        res.send(result);
     });
    
});
var arr;
app.get('/linking',(req,res)=>{
    rp(api)
    .then((body)=>{
        let data=body;
         data.forEach(element => {
            let query='SELECT revision,id FROM winetest_runs WHERE revision="'+element["revision"]+'";';
             db.query(query,(err,result)=>{
                 if(err) throw err;
                console.log(result);
                 arr=result;
             });
         });
         res.send(arr);
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