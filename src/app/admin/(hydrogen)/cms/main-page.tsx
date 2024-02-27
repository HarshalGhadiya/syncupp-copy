'use client';

import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { PiEyeFill, PiNotePencilDuotone } from 'react-icons/pi';
import { Text } from 'rizzui';

const pageHeader = {
  title: 'CMS Management',
};

export default function TermsAndCondition() {
  return (
    <>
      <div>
        <PageHeader title={pageHeader.title} />
      </div>
      <div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 text-lg">Pages</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                <div>
                  <div className="w-full border-b-2 py-2">
                    <td className="flex w-full justify-between px-6 py-4">
                      <div className="flex">
                        <Text> Home </Text>{' '}
                      </div>
                      <div className="flex">
                        <PiEyeFill className="mr-3 h-[30px] w-[30px] cursor-pointer" />
                        {/* <Link href={routes.admin.cmsTC}> */}
                        <PiNotePencilDuotone className="h-[30px] w-[30px] cursor-pointer" />{' '}
                        {/* </Link> */}
                      </div>
                    </td>
                  </div>
                  <div className="w-full border-b-2 py-2">
                    <td className="flex w-full justify-between px-6 py-4">
                      <div className="flex">
                        <Text> Features </Text>{' '}
                      </div>
                      <div className="flex">
                        <PiEyeFill className="mr-3 h-[30px] w-[30px] cursor-pointer" />
                        {/* <Link href={routes.admin.cmsTC}> */}
                        <PiNotePencilDuotone className="h-[30px] w-[30px] cursor-pointer" />{' '}
                        {/* </Link> */}
                      </div>
                    </td>
                  </div>
                  <div className="w-full border-b-2 py-2">
                    <td className="flex w-full justify-between px-6 py-4">
                      <div className="flex">
                        <Text> Price </Text>{' '}
                      </div>
                      <div className="flex">
                        <Link href={routes.admin.cmsPricingView}>
                          <PiEyeFill className="mr-3 h-[30px] w-[30px] cursor-pointer" />
                        </Link>
                        <Link href={routes.admin.cmsPricing}>
                          <PiNotePencilDuotone className="h-[30px] w-[30px] cursor-pointer" />{' '}
                        </Link>
                      </div>
                    </td>
                  </div>
                  <div className="w-full border-b-2 py-2">
                    <td className="flex w-full justify-between px-6 py-4">
                      <div className="flex">
                        <Text> Contact us </Text>{' '}
                      </div>
                      <div className="flex">
                        <Link href={routes.admin.cmsContactView}>
                          <PiEyeFill className="mr-3 h-[30px] w-[30px] cursor-pointer" />
                        </Link>
                        <Link href={routes.admin.cmsContact}>
                          <PiNotePencilDuotone className="h-[30px] w-[30px] cursor-pointer" />{' '}
                        </Link>
                      </div>
                    </td>
                  </div>
                  <div className="w-full border-b-2 py-2">
                    <td className="flex w-full justify-between px-6 py-4">
                      <div className="flex">
                        <Text> Terms & Conditions </Text>{' '}
                      </div>
                      <div className="flex">
                        <PiEyeFill className="mr-3 h-[30px] w-[30px] cursor-pointer" />
                        <Link href={routes.admin.cmsTC}>
                          <PiNotePencilDuotone className="h-[30px] w-[30px] cursor-pointer" />{' '}
                        </Link>
                      </div>
                    </td>
                  </div>
                  <div className="w-full border-b-2 py-2">
                    <td className="flex w-full justify-between px-6 py-4">
                      <div className="flex">
                        <Text> Privacy policy </Text>{' '}
                      </div>
                      <div className="flex">
                        <Link href={routes.admin.cmsPrivacyView}>
                          <PiEyeFill className="mr-3 h-[30px] w-[30px] cursor-pointer" />
                        </Link>
                        <Link href={routes.admin.cmsPrivacy}>
                          <PiNotePencilDuotone className="h-[30px] w-[30px] cursor-pointer" />{' '}
                        </Link>
                      </div>
                    </td>
                  </div>
                  <div className="w-full border-b-2 py-2">
                    <td className="flex w-full justify-between px-6 py-4">
                      <div className="flex">
                        <Text>Pricing Compare</Text>{' '}
                      </div>
                      <div className="flex">
                        <Link href={routes.admin.cmsPriceCampareView}>
                          <PiEyeFill className="mr-3 h-[30px] w-[30px] cursor-pointer" />
                        </Link>
                        <Link href={routes.admin.cmsPriceCampare}>
                          <PiNotePencilDuotone className="h-[30px] w-[30px] cursor-pointer" />{' '}
                        </Link>
                      </div>
                    </td>
                  </div>
                  <div className="w-full border-b-2 py-2">
                    <td className="flex w-full justify-between px-6 py-4">
                      <div className="flex">
                        <Text>Shipping And Delivery</Text>{' '}
                      </div>
                      <div className="flex">
                        <Link href={routes.admin.cmsPriceCampareView}>
                          <PiEyeFill className="mr-3 h-[30px] w-[30px] cursor-pointer" />
                        </Link>
                        <Link href={routes.admin.cmsshippinganddelivery}>
                          <PiNotePencilDuotone className="h-[30px] w-[30px] cursor-pointer" />{' '}
                        </Link>
                      </div>
                    </td>
                  </div>
                  <div className="w-full border-b-2 py-2">
                    <td className="flex w-full justify-between px-6 py-4">
                      <div className="flex">
                        <Text>Cancellation And Refund</Text>{' '}
                      </div>
                      <div className="flex">
                        <Link href={routes.admin.cmsPriceCampareView}>
                          <PiEyeFill className="mr-3 h-[30px] w-[30px] cursor-pointer" />
                        </Link>
                        <Link href={routes.admin.cmscancellationandrefund}>
                          <PiNotePencilDuotone className="h-[30px] w-[30px] cursor-pointer" />{' '}
                        </Link>
                      </div>
                    </td>
                  </div>
                  <div className="w-full border-b-2 py-2">
                    <td className="flex w-full justify-between px-6 py-4">
                      <div className="flex">
                        <Text>About US</Text>{' '}
                      </div>
                      <div className="flex">
                        <Link href={routes.admin.cmsAboutView}>
                          <PiEyeFill className="mr-3 h-[30px] w-[30px] cursor-pointer" />
                        </Link>
                        <Link href={routes.admin.cmsAbout}>
                          <PiNotePencilDuotone className="h-[30px] w-[30px] cursor-pointer" />{' '}
                        </Link>
                      </div>
                    </td>
                  </div>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
