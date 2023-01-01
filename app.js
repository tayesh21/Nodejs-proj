
var express = require('express');
var path = require('path')
var fs = require('fs');
var app = express();
const session = require('express-session')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }))
app.use(express.static(path.join(__dirname, 'public')));


let addToplaces = function (place, req, res) {

  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if (err) throw err;
    var db = client.db('myDB');

    db.collection('myCollection').findOne({ username: req.session.username }).then(data => {
      if (data) {
        if (!data.wantToGoList.includes(place)) {
          db.collection('myCollection').updateOne({ username: req.session.username }, { $push: { wantToGoList: place } });
          res.render(place, { errorMessage: "Added to the list :)" });
        }
        else {
          res.render(place, { errorMessage: "already exists" });
        }
      }
    })

  })
  return "done"
}
app.get('/', function (req, res) {
  res.render('login', { message: " ya Welcome ya Welcome :)" })
});
app.get('/login', function (req, res) {
  res.render('login', { message: " ya Welcome ya Welcome :)" })
});
app.get('/home', function (req, res) {
  if (req.session.username) {
    res.render('home')
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }

});

app.get('/annapurna', function (req, res) {
  if (req.session.username) {
    res.render('annapurna', { errorMessage: '' })
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }

}
);
app.post('/annapurna', function (req, res) {
  if (req.session.username) {
    addToplaces('annapurna', req, res)
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }
}
);

app.post('/bali', function (req, res) {
  if (req.session.username) {
    addToplaces('bali', req, res)
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }
});
app.get('/bali', function (req, res) {
  if (req.session.username) {
    res.render('bali', { errorMessage: '' })
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }

});

app.get('/cities', function (req, res) {
  if (req.session.username) {
    res.render('cities')
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }

}

);

app.get('/hiking', function (req, res) {
  if (req.session.username) {
    res.render('hiking')
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }

});

app.get('/inca', function (req, res) {
  if (req.session.username) {
    res.render('inca', { errorMessage: '' })
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }

}
);
app.post('/inca', function (req, res) {
  if (req.session.username) {
    addToplaces('inca', req, res)
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }

}
);

app.get('/islands', function (req, res) {
  if (req.session.username) {
    res.render('islands')
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }

}
);

app.get('/paris', function (req, res) {
  if (req.session.username) {
    res.render('paris', { errorMessage: '' })
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }

});
app.post('/paris', function (req, res) {
  if (req.session.username) {
    addToplaces('paris', req, res)
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }

});

app.get('/rome', function (req, res) {
  if (req.session.username) {
    res.render('rome', { errorMessage: '' })
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }

});
app.post('/rome', function (req, res) {
  if (req.session.username) {
    addToplaces('rome', req, res)
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }

});

app.get('/santorini', function (req, res) {
  if (req.session.username) {
    res.render('santorini', { errorMessage: '' })
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }
});
app.post('/santorini', function (req, res) {
  if (req.session.username) {
    addToplaces('santorini', req, res)
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }

});
app.get('/registration', function (req, res) {
  res.render('registration', { message: 'ya ahlan beek yakhoya' })

});
app.get('/searchresults', function (req, res) {
  if (req.session.username) {
    res.render('searchresults', { results:[] })
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }
});

app.get('/wanttogo', function (req, res) {
  if (req.session.username) {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
      if (err) throw err;
      var db = client.db('myDB');

      db.collection('myCollection').findOne({ username: req.session.username }).then(data => {
        if (data) {
          res.render('wanttogo', { places: data.wantToGoList })
        }
      })

    })
  }
  else {
    res.write("<p>login pleaseeeeeeee</p><a href='/'>login</a>");
    res.end();
  }
});


app.post('/register', function (req, res) {
  var user = req.body.username;
  var pass = req.body.password;
  var wantToGoList = []
  if (user === "" || pass === "") {
    res.render('registration', { message: 'fe haga na2sa rakz wenaby' });
    return;
  }

  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if (err) throw err;
    var db = client.db('myDB');

    var User = { username: user, password: pass, wantToGoList: wantToGoList };
    db.collection('myCollection').findOne({ username: user }).then(isUsernameTaken => {
      if (isUsernameTaken) {
        //db.close();
        console.log('username taken');
        console.log(user);
        res.render('registration', { message: 'username taken' });
      }
      else {
        db.collection('myCollection').insertOne(User);
        //db.close();
        console.log('user added');
        res.redirect('/login')
      }
    })
  })


  //catch(console.error);

});

app.post('/', function (req, res) {

  var user = req.body.username;
  var pass = req.body.password;
  if (user === "admin" && pass === "admin") {
    req.session.username = "admin";   
    res.redirect('/home');
  } 
  else{
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if (err) throw err;
    var db = client.db('myDB');

    var User = { username: user, password: pass };

    db.collection('myCollection').findOne({ username: user }).then(data => {
      if (data) {
        if (pass == data.password) {
          //user has access
          //session details
          req.session.username = req.body.username
          req.session.password = req.body.password
          res.redirect('/home');
        }
        else {
          res.render('login', { message: 'Wrong Pass!' });
        }
      }
      else {
        res.render('login', { message: 'User does not exist' });
      }

    })
  })
}
})

var Cities=['annapurna','bali','inca','paris','rome','santorini'];

app.post('/search', function(req, res){
  var srch = req.body.Search;
  results=[];
  for(i = 0; i<Cities.length; i++){
    if(Cities[i].toLowerCase().includes(srch)){
      results.push(Cities[i]);
    }
  } 
    res.render('searchresults',{results})
})





if (process.env.PORT) {
  app.listen(process.env.PORT, function () { console.log('Server started') });
}
else {
  app.listen(3000, function () { console.log('Server started on port 3000') });
}