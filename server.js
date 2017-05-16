var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var bodyParser = require('body-parser');
var app = express();
var Datadb = require('./data');
var PORT = 9999;

mongoose.connect('mongodb://adrianmelo12:amb123093@ds137271.mlab.com:37271/stock-adrian');

app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

    app.post('/stocks',function(req,res){
   const dataObj=new Datadb({
       name:req.body.name,
       symbol:req.body.symbol,
       price:req.body.price,
       date:req.body.date
   });
   dataObj.save((err)=>{
       if(err){
           res.send(err);
       }
       res.json(dataObj);
   });
});

    app.get('/stocks',function(req,res){
      Datadb.find((err,data)=>{
       if(err){
           res.send(err);
       }
       res.send(data);
   });
});

    app.get('/stocks/:id', function(req,res){
      Datadb.findById(req.params.id,(err,data)=>{
       if(err){
           res.send(err);
       }
       res.json(data);
   })
});

app.put('/stocks/:id',function(req,res){
   Datadb.findById(req.params.id,(err,data)=>{
       if(err){
           res.send();
       }
       if(req.body.name){
           data.name=req.body.name;
       }
       if(req.body.symbol){
           data.symbol=req.body.symbol;
       }
       if(req.body.price){
           data.price=req.body.price;
       }
       if(req.body.date){
           data.date=req.body.date;
       }
       data.save((err)=>{
           if(err){
               res.send(err)
           }
           res.json({message:"update Data"});
       });
   });
});
app.delete('/stocks/:id',function(req,res){
 Datadb.remove({_id:req.params.id},(err,data)=>{
     if(err){
         res.send(err);
     }
     res.json({message:"delete Data"});
 })
});


app.listen(PORT);
