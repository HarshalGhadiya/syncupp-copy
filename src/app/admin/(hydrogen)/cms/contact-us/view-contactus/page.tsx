import { metaObject } from '@/config/site.config';
import ViewConatcus from './viewConatcus';

export const metadata = {
  ...metaObject('conatct us'),
};

export default function Page() {
  return (
    <>
      <ViewConatcus />
    </>
  );
}
