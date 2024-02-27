import { metaObject } from '@/config/site.config';
import Shippinganddeliveryform from './shipping-and-deliveryform';

export const metadata = {
  ...metaObject('Shipping and Delivery'),
};

export default function Page() {
  return (
    <>
      <Shippinganddeliveryform />
    </>
  );
}
