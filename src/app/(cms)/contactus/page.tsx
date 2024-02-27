import { metaObject } from '@/config/site.config';
import Contact from './Contact';

export const metadata = {
  ...metaObject('Contact'),
};

export default function BlankPage() {
  return (
    <>
      <Contact></Contact>
    </>
  );
}
