// clientpaymentService.ts
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { routes } from '@/config/routes';
import { Paymentloader } from '@/redux/slices/payment/paymentSlice';

interface RazorpayResponse {
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_subscription_id?: string;
  razorpay_signature?: string;
}

interface CustomWindow extends Window {
  Razorpay?: any;
}

declare var window: CustomWindow;

const clientpaymentService = {
  loadRazorpayScript: async (
    src: string,
    setloadingflag: any
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setloadingflag(true);
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
        setloadingflag(false);
      };
      script.onerror = () => {
        resolve(false);
        setloadingflag(false);
      };
      document.body.appendChild(script);
    });
  },

  ClientcreateSubscription: async (
    token: string,
    reference_id: string,
    router: any,
    setloadingflag: any
  ): Promise<Object> => {
    // console.log(token, 'token in client create subscription')
    try {
      setloadingflag(true);
      const result: any = await axios.post<{ data: { user_id: string } }>(
        `${process.env.NEXT_PUBLIC_API}/api/v1/payment/order`,
        { user_id: reference_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Add any other headers if needed
          },
        }
      );

      if (result?.data?.success) {
        setloadingflag(false);
      }

      // console.log(result?.data?.success, 'result')

      return result?.data?.data || {};
    } catch (error: any) {
      setloadingflag(false);
      console.error('Error creating subscription:', error.message);
      // router.push(routes.signIn)
      throw new Error('Error creating subscription');
    }
  },

  verifyPaymentSignature: async (
    data: RazorpayResponse,
    setloadingflag: any,
    closeModal?: any,
  ): Promise<string> => {
    try {
      setloadingflag(true);
      const result: any = await axios.post<string>(
        `${process.env.NEXT_PUBLIC_API}/api/v1/payment/verify-signature`,
        data
      );
      // console.log(result, "82");

      if (result?.data?.success) {
        setloadingflag(false);
        closeModal();
      }

      return result.data;
    } catch (error: any) {
      setloadingflag(false);
      console.error('Error verifying payment signature:', error.message);
      throw new Error('Error verifying payment signature');
    }
  },

  displayPaymentToast: (
    message: string,
    type: 'success' | 'error' | 'default'
  ): void => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast(message);
    }
  },

  // New function to initiate Razorpay
  initiateRazorpay: async (
    router: any,
    route: any,
    signupdata: any,
    reference_id: any,
    ClintlistAPIcall: any,
    setloadingflag: any,
    closeModal?: any,
  ): Promise<void> => {

      // console.log(router, 'router')
      // console.log(route, 'route')
      // console.log(signupdata, 'signupdata')
      // console.log(reference_id, 'reference_id')
      // console.log(ClintlistAPIcall, 'ClintlistAPIcall')


    try {
      const subscriptiondata: any =
        await clientpaymentService.ClientcreateSubscription(
          signupdata,
          reference_id,
          router,
          setloadingflag
        );
      // console.log(subscriptiondata, 'subscriptiondata')

      const res = await clientpaymentService.loadRazorpayScript(
        'https://checkout.razorpay.com/v1/checkout.js',
        setloadingflag
      );
      // console.log(res, "24");

      if (!res) {
        clientpaymentService.displayPaymentToast(
          'Razorpay SDK failed to load. Are you online?',
          'error'
        );
        setloadingflag(false);
        return;
      }

      const options = {
        key: 'rzp_test_lGt50R6T1BIUBR',
        amount: subscriptiondata?.amount.toString(),
        currency: subscriptiondata?.currency,
        name: 'SyncUpp',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
        order_id: subscriptiondata?.payment_id,
        handler: async (response: RazorpayResponse) => {
          // console.log(response, 'response');
          const data = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            order_id: response.razorpay_subscription_id,
            amount: subscriptiondata?.amount.toString(),
            currency: subscriptiondata?.currency,
            user_id: subscriptiondata?.user_id,
            agency_id: subscriptiondata?.agency_id,
          };

          const verificationResult: any =
            await clientpaymentService.verifyPaymentSignature(
              data,
              setloadingflag,
              closeModal
            );
          // console.log(verificationResult, 'verificationResult')

          if (verificationResult?.data?.success) {
            clientpaymentService.displayPaymentToast(
              verificationResult?.message,
              'success'
            );
            ClintlistAPIcall();
            router.push(route);
          } else {
            clientpaymentService.displayPaymentToast(
              verificationResult?.message,
              'error'
            );
          }
        },
        prefill: {
          email: subscriptiondata?.email, // Pre-filled email
          contact: subscriptiondata?.contact_number, // Pre-filled phone number
        },
        theme: {
          color: '#111111',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      // paymentObject.on('payment.failed', function () {
      //     clientpaymentService.displayPaymentToast("Payment failed. Please try again.", 'error');
      //     setloadingflag(false); // Set payment processing state to false
      // });

      // paymentObject.on('payment.cancel', function () {
      //     clientpaymentService.displayPaymentToast("Payment cancelled.", 'error');
      //     setloadingflag(false); // Set payment processing state to false
      // });
    } catch (error: any) {
      console.error('Error during payment:', error.message);
      clientpaymentService.displayPaymentToast(
        'Error during payment. Please try again.',
        'error'
      );
    }
  },
};

// Export the initiateRazorpay function
export const initiateRazorpay = clientpaymentService.initiateRazorpay;
