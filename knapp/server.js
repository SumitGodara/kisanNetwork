const express    = require('express');
const path       = require('path');
const http       = require('http');
const bodyParser = require('body-parser');
var client       = require('twilio')('AC0e66a50e9a1de9b0fabc45b15bb6e6af', '626595e27e9ca2706f989178d0c56276');
var MongoClient  = require('mongodb').MongoClient;
var dateFormat   = require('dateformat');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '8080';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));

//apis
app.post('/sendOtp', (req, res) => {

  let contact = req.body.param.contact
  let msg     = req.body.param.msg
  let to      = contact.number
  let from    = '+18563452860'
  
  let verifiedMsg = ""
  let len   = msg.length
  let str   = "Hi. Your OTP is:"
  let len2  = str.length
  let error = ""

  if (len != len2 + 6) error = "OTP Message is Incorrect"
  else {
    for (let i = 0; i < len; i++) {  
      if (i < len2) {
        if (str[i] != msg[i]) {
          error = "OTP Text is Incorrect"
          i = len
        }
      } else {
        if (!(msg[i] >= 0 && msg[i] <= 9)) error = "Incorrect OTP"
        else verifiedMsg += msg[i] 
      }
    }
  }

  if (error.length != 0) {
    return Promise.resolve({error: error}).then((data) => {
      return res.send(data)
    })
  } else {

    let obj = {
        fName  : contact.fName,
        lName  : contact.lName,
        number : to,
        details: contact.details,
        time   : new Date(),
        OTP    : verifiedMsg,
    }

    let promise1 = client.sendMessage({
        to  : to,
        from: from,
        body: msg
    })
    let promise2 =  MongoClient.connect('mongodb://localhost:27017/contactApp')

    return promise1.then((resp) => {
      return promise2.then((db) => {
        return db.collection('sentSMS').insert(obj)
      }).then((result) => {
        return res.send({data: result})
      })
    }).catch((err) => {
      return res.send({mongoError: err.message})
    })
  }
});

app.post('/getSMS', (req, res) => {
  
  return MongoClient.connect('mongodb://localhost:27017/contactApp', function (err, db) {
    
    if (err) return res.send({mongoError: err})
    
    db.collection('sentSMS').find({}, {fName: 1, lName: 1, number: 1, time: 1, OTP: 1}, {"sort": [['time', 'descending']]}).toArray().then(function (results, err) {
        let arr = []
        let obj = {}
        if (err) return res.send({mongoError: err})

        results.forEach((result) => {
          obj = {}
          for (var prop  in result) {
            if (result.hasOwnProperty(prop)) {
              if (prop === 'time') {
                let date = Date.parse(result[prop])
                // date = date + 330*60*1000
                obj[prop] = dateFormat(date, 'hh:MM:ss TT dd/mm/yy')
              } else {
                obj[prop] = result[prop]
              }
            }
          }
          arr.push(obj)
        })
        return res.send({data: arr})
    })
  })
});
