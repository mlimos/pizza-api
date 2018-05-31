module.exports = function(app, db) {
  app.post('/pizza', (req, res) => {
    // You'll create your note here.
    res.send('Hello')
  });
  app.get('/restaurant/:id', (req, res) => {
    const details = {'id': req.params.id};
    let responseObj = {};
    db.collection('restaurant_data').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        responseObj.restaurant = item;
        res.send(responseObj);
      }
    });
  });
  app.get('/restaurant/:restaurantId/menu', (req, res) => {
    const details = {'restaurantId': req.params.restaurantId};
    let responseObj = {};
    db.collection('menu_data').find(details).toArray(function(err, item) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        responseObj.menuItems = item;
        res.send(responseObj);
      }
    });
  });
  app.get('/restaurants', (req, res) => {
    console.log(req.query);
    const details = {'province': req.query.state};
    let responseObj = {};
    db.collection('restaurant_data').find(details).toArray(function(err, item) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        responseObj.restaurants = item;
        res.send(responseObj);
      }
    });
  });
  app.post('/restaurant', (req, res) => {
    const requestObj = req.body;
    let responseObj = {};
    db.collection('restaurant_data').insert(requestObj, function(err, docsInserted) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        responseObj.restaurantId = docsInserted.ops[0]._id;
        console.log(`Docs inserted ${JSON.stringify(docsInserted)}`);
        res.send(responseObj);
      }
    });
  });
};
