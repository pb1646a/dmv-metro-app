require('backend/server');
const app = require('backend/app');
const express = require('express');
const path = require('path');
app.use(express.static(__dirname + '/dist/metro-bus-app'));

app.get('/', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/metro-bus-app/index.html'));
});
app.get('/metro', (req,res)=>{
  res.redirect('/#metro');
})
app.get('/metro/metrobus',(req,res)=>{
  res.redirect('/#metro/#metrobus')
})
