import Head from "next/head";
import {useRouter} from 'next/router';

const loadRazorPay = (src) => {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})

 
};



export default function Home() {
  
const router=useRouter();
  async function displayRazorpay () {

    const res=await loadRazorPay("https://checkout.razorpay.com/v1/checkout.js");
    if(!res)
    {
      alert('Razorpay sdk failed to load. Are you online?');
      return;
    }

    const data = await fetch('https://limitless-harbor-72439.herokuapp.com/razorpay', { method: 'POST'}).then((t) =>
    t.json()
  )
  
  console.log(data)

    var options = {
      key: process.env.API_ID, // Enter the Key ID generated from the Dashboard
      amount: "5000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Payment Integration",
      description: "Test Transaction",
      image: "https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/articleimages/2020/10/12/download-2020-10-12t105530746-900747-1602498240.png?itok=OLKccK9G",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
     
        window.location='/success';
      },
      prefill: {
        name: "",
        email: "test@test.com",
        contact: "9999999999",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
 

     const paymentObject= new window.Razorpay(options);
     paymentObject.open();


  };


  return (
    <div className="">
      <Head>
    
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className='text-center text-2xl underline bg-blue-300'>Payment Integration with Razorpay</h1>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={displayRazorpay}>Pay Now</button>
      </div>
    </div>
  );
}
