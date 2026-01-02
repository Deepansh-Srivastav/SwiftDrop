import { APIConfig } from "../Networking/Configuration/ApiConfig";
import { postApiRequestWrapper } from "../Networking/Services/ApiCalls";

function initiateRazorPayFrontEnd(id, key,amount,currency) {
    const options = {
        key,
        amount,
        currency,
        name: 'Acme Corp',
        description: 'Test Transaction',
        order_id: id,
        handler: async function (paymentResponse) {

            try {
                const url = APIConfig.orderPath.verifyPayment;
                const verifyRes = await postApiRequestWrapper(url, paymentResponse);

                if (!verifyRes?.success) throw new Error();

                navigate("/order-success");
            } catch {
                alert("Payment verification failed");
            }
        },
        theme: {
            color: '#979df7'
        },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

};
export default initiateRazorPayFrontEnd;