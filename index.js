const { log } = require('console');
const express = require('express');
const app = express();

//Step 2: cau hinh static
app.use(express.static(__dirname + '/public'));

//Step 3: cau hinh view engine va set view engine, o day su dung handlebars
const expressHbs = require('express-handlebars'); //u have to install it by npm first
const hbs = expressHbs.create({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'

});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//step 4: after tao 1 cay thu muc views 25:53, minh define routes

    //root route
app.get('/', (req, res) =>{   //vi da setting handlebar roi, nen head, foot auto + body la cho render
  res.render('index1');        //Failed to lookup view "index" in views directory "C:\Users\Administrator\Desktop\22\aroma_web\views"
});

//step 5: change banner, define routes for all files and change link in header.hbs 41:38
app.get('/:page', (req, res) =>{
  const banners = {
    blog: 'taoBlog',
    category: 'taoCategory',
    cart: 'taoCart'
  }

  const page = req.params.page;
  res.render(page, {bannerName : banners[page]});
})


//step 6: deploy on heroku 53:03, and and "start": "node index", into pakage.json and .gitignore



//Step 1. set server port and start server
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () =>{
  console.log(`Sever is running at port ${app.get('port')}`);
});