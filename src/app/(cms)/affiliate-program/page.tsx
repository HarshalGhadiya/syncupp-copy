import { metaObject } from '@/config/site.config';
import Affiliate from './Affiliate';

export const metadata = {
  ...metaObject('Affiliate Program'),
};

export default function BlankPage() {
  return (
    <>
      <Affiliate></Affiliate>
    </>
  );
}
