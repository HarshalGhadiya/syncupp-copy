import { metaObject } from '@/config/site.config';
import Privacy from './Privacy';

export const metadata = {
  ...metaObject('Privacy Policy'),
};

export default function BlankPage() {
  return (
    <>
      <Privacy></Privacy>
    </>
  );
}
