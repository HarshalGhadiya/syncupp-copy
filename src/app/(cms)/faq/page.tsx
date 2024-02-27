import { metaObject } from '@/config/site.config';
import Faq from './Faq';

export const metadata = {
  ...metaObject('Contact'),
};

export default function BlankPage() {
  return (
    <>
      <Faq></Faq>
    </>
  );
}
