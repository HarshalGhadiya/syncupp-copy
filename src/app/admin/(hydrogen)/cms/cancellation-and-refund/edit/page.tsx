import { metaObject } from '@/config/site.config';
import Cancellationandrefundform from './cancellation-and-refundform';

export const metadata = {
  ...metaObject('Cancellation and Refund'),
};

export default function Page() {
  return (
    <>
      <Cancellationandrefundform />
    </>
  );
}
