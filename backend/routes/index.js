var express = require('express');
const app = require('../app');
var router = express.Router();
const Razorpay=require('razorpay');
const cors=require('cors');
const dotenv = require('dotenv');
dotenv.config();
router.use(cors());
const razorpay =new Razorpay({
  key_id: process.env.API_ID,
  key_secret: process.env.API_SECRET
})
/* GET home page. */




router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/razorpay',async (req,res)=>{

  const payment_capture=1;
  const amount=5000;
  const currency='INR';
  const options={
    amount,
    currency,
    receipt: 'payment',
    payment_capture
  }

  const response=await razorpay.orders.create(options);
  // console.log(response);

  res.json({
    id: response.id,
    currency: 'INR',
    amount: response.amount
  });

})



module.exports = router;
