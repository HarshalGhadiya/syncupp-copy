'use client';

import { Title, Text } from '@/components/ui/text';
import cn from '@/utils/class-names';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getUserProfile } from '@/redux/slices/user/auth/signinSlice';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-scroll';
import { getViewProfiles } from '@/redux/slices/admin/auth/viewprofile/viewProfileSlice';
import { getAgencyDetails } from '@/redux/slices/admin/agency/agencySlice';
import Spinner from '@/components/ui/spinner';
import { Button } from 'rizzui';
import { FaArrowLeft } from 'react-icons/fa';
import { routes } from '@/config/routes';

export const FormParts = {
  ShippingInfo: 'ShippingInfo',
  SenderInfo: 'SenderInfo',
  RecipientsInfo: 'RecipientsInfo',
};

export const menuItems = [
  {
    label: 'Activity',
    value: FormParts.ShippingInfo,
  },
  {
    label: 'Agreement',
    value: FormParts.SenderInfo,
  },
  {
    label: 'Invoice',
    value: FormParts.RecipientsInfo,
  },
];
export const menuButtons = [
  {
    label: 'To Do',
    value: FormParts.ShippingInfo,
  },
  {
    label: 'Overdue',
    value: FormParts.SenderInfo,
  },
  {
    label: 'Done',
    value: FormParts.RecipientsInfo,
  },
  {
    label: 'Today',
    value: FormParts.RecipientsInfo,
  },
  {
    label: 'Tomorrow',
    value: FormParts.RecipientsInfo,
  },
  {
    label: 'This Week',
    value: FormParts.RecipientsInfo,
  },
  {
    label: 'Select Period',
    value: FormParts.RecipientsInfo,
  },
];

function WidgetCard({
  title,
  className,
  children,
  childrenWrapperClass,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  childrenWrapperClass?: string;
}) {
  return (
    <div className={className}>
      <Title
        as="h3"
        className="mb-3.5 text-base font-semibold @5xl:mb-5 4xl:text-lg"
      >
        {title}
      </Title>
      <div
        className={cn(
          'rounded-lg border border-gray-200  @sm:px-4 @5xl:rounded-xl',
          childrenWrapperClass
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default function AgencyViewProfileForm() {
  const dispatch = useDispatch();
  // const signIn = useSelector((state: any) => state?.root?.signIn);
  // const clientSliceData = useSelector((state: any) => state?.root?.client);
  const agencylistDetails = useSelector((state: any) => state?.root?.adminAgency);

  const router = useRouter();

  // useEffect(() => {
  //   dispatch(getAgencyDetails());
  // }, [dispatch]);

  const {data} = agencylistDetails?.agencylistDetails;
// console.log(data,'data')
  const initialValues = {
    email: data?.email ?? '',
    first_name: data?.first_name ?? '',
    last_name: data?.last_name ?? '',
    contact_number: data?.contact_number ?? '',
    address: data?.reference_id?.address ?? '',
    city: data?.reference_id?.city?.name ?? '',
    company_name: data?.reference_id?.company_name ?? '',
    company_website: data?.reference_id?.company_website ?? '',
    country: data?.reference_id?.country?.name ?? '',
    industry: data?.reference_id?.industry ?? '',
    no_of_people: data?.reference_id?.no_of_people ?? '',
    pincode: data?.reference_id?.pincode ?? '',
    state: data?.reference_id?.state?.name ?? '',
    role: data?.role ?? '',
  };

  // const { items, total, totalItems } = useCart();
  // const { price: subtotal } = usePrice(
  //   items && {
  //     amount: total,
  //   }
  // );
  // const { price: totalPrice } = usePrice({
  //   amount: total,
  // });
  // const orderNote = useAtomValue(orderNoteAtom);
  // const billingAddress = useAtomValue(billingAddressAtom);
  // const shippingAddress = useAtomValue(shippingAddressAtom);
  if (Object.keys(agencylistDetails?.agencylistDetails?? {}).length === 0) {
    return (
      <div className="flex items-center justify-center p-10">
        <Spinner size="xl" tag="div" className="ms-3" />
      </div>
    );
  } else {
  return (
    <div className="@container">
      <div className="flex justify-between border-b border-t border-gray-300 px-6 py-4 font-medium text-gray-700 @5xl:justify-start">
        <div>
          <Title>Agency Details</Title>
        </div>
        <div className='ms-auto'>
          <a href={routes.admin.agencylist}>
            <Button className="bg-none text-xs @lg:w-auto sm:text-sm">
              <FaArrowLeft className="me-1.5 h-[17px] w-[17px]" />
              Back
            </Button>
          </a>
        </div>
      </div>
      <div className="items-start px-6 pt-10 @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        {/* Left side */}
        <div className="pt-8 @container @5xl:col-span-4 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-3">
          <WidgetCard
            title="Personal Information"
            className=""
            childrenWrapperClass="text-lg py-1 px-1 @5xl:py-8 flex"
          >
            <div className="ps-1 @5xl:ps-6">
              <span className="mb-2 flex items-baseline gap-2">
                <span className="font-semibold text-gray-900">Name :</span>
                <Text as="p" className="text-base @7xl:text-lg">
                  {data?.first_name} {data?.last_name}
                </Text>
              </span>
              <span className="mb-2 flex items-baseline gap-2">
                <span className="font-semibold text-gray-900">Email :</span>
                <Text as="p" className="text-base @7xl:text-lg">
                  {data?.email}
                </Text>
              </span>
              <span className="mb-2 flex items-baseline gap-2">
                <span className="font-semibold text-gray-900">
                  Contact no :
                </span>
                <Text as="p" className="text-base @7xl:text-lg">
                  {data?.contact_number}
                </Text>
              </span>
            </div>
          </WidgetCard>
          <WidgetCard
            title="Company Information"
            className="py-6"
            childrenWrapperClass="text-lg py-1 px-1 @5xl:py-8 flex"
          >
            <div className="ps-1 @5xl:ps-6">
              <span className="mb-2 flex items-baseline gap-2">
                <span className="font-semibold text-gray-900">Name :</span>
                <Text as="p" className="text-base @7xl:text-lg">
                  {data?.reference_id?.company_name}
                </Text>
              </span>
              <span className="mb-2 flex items-baseline gap-2">
                <span className="text-wrap font-semibold text-gray-900">
                  URL&nbsp;:
                </span>
                <a
                  href={data?.reference_id?.company_website}
                  target="_blank"
                  rel=""
                  className="break-all text-base text-blue-600 hover:underline @7xl:text-lg"
                >
                  {data?.reference_id?.company_website}
                </a>
              </span>
              <span className="mb-2 flex items-baseline gap-2">
                <span className="font-semibold text-gray-900">Industry :</span>
                <Text as="p" className="text-base @7xl:text-lg">
                  {data?.reference_id?.industry}
                </Text>
              </span>
              <span className="mb-2 flex items-baseline gap-2">
                <span className="font-semibold text-gray-900">Employee :</span>
                <Text as="p" className="text-base @7xl:text-lg">
                  {data?.reference_id?.no_of_people}
                </Text>
              </span>
            </div>
          </WidgetCard>
          <WidgetCard
            title="General Information"
            className=""
            childrenWrapperClass="text-lg py-1 px-1 @5xl:py-8 flex"
          >
            <div className="ps-1 @5xl:ps-6">
              <span className="mb-2 flex items-baseline gap-2">
                <span className="font-semibold text-gray-900">Address :</span>
                <Text as="p" className="text-base @7xl:text-lg">
                  {data?.reference_id?.address ?? ''}
                </Text>
              </span>
              <span className="mb-2 flex items-baseline gap-2">
                <span className="font-semibold text-gray-900">City :</span>
                <Text as="p" className="text-base @7xl:text-lg">
                  {data?.reference_id?.city?.name ?? ''}
                </Text>
              </span>
              <span className="mb-2 flex items-baseline gap-2">
                <span className="font-semibold text-gray-900">State :</span>
                <Text as="p" className="text-base @7xl:text-lg">
                  {data?.reference_id?.state?.name ?? ''}
                </Text>
              </span>
              <span className="mb-2 flex items-baseline gap-2">
                <span className="font-semibold text-gray-900">Country :</span>
                <Text as="p" className="text-base @7xl:text-lg">
                  {data?.reference_id?.country?.name ?? ''}
                </Text>
              </span>
              <span className="mb-2 flex items-baseline gap-2">
                <span className="font-semibold text-gray-900">Pincode :</span>
                <Text as="p" className="text-base @7xl:text-lg">
                  {data?.reference_id?.pincode ?? ''}
                </Text>
              </span>
            </div>
          </WidgetCard>
        </div>

        {/*  Right side  */}
        <div className="space-y-7 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7">
          <div
            className={cn(
              'sticky top-[68px] z-20 border-b border-gray-300 bg-white py-0 font-medium text-gray-500 @2xl:top-[72px] dark:bg-gray-50 2xl:top-20'
              // className
            )}
          >
            <SimpleBar>
              <div className="inline-grid grid-flow-col gap-5 md:gap-7 lg:gap-10">
                {menuItems.map((tab, idx) => (
                  <Link
                    key={tab.value}
                    to={tab.value}
                    spy={true}
                    hashSpy={true}
                    smooth={true}
                    offset={idx === 0 ? -260 : -150}
                    duration={500}
                    // className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000"
                    // activeClass="active before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:w-full before:bg-gray-1000 font-semibold text-gray-1000"
                  >
                    {tab.label}
                  </Link>
                ))}
              </div>
            </SimpleBar>
          </div>
          <SimpleBar>
            <div className="inline-grid grid-flow-col gap-5 md:gap-7 lg:gap-10">
              {menuButtons.map((tab, idx) => (
                <Link
                  key={tab.value}
                  to={tab.value}
                  spy={true}
                  hashSpy={true}
                  smooth={true}
                  offset={idx === 0 ? -260 : -150}
                  duration={500}
                  // className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000"
                  // activeClass="active before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:w-full before:bg-gray-1000 font-semibold text-gray-1000"
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </SimpleBar>
        </div>
      </div>
    </div>
  );
}
}
