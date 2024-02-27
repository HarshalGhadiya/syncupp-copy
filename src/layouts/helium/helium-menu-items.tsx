import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import Link from 'next/link';
import { Fragment } from 'react';
import { PiFolderNotchDuotone, PiUser, PiUsersThree } from 'react-icons/pi';
import { FaTasks, FaFileInvoiceDollar, FaRegCalendarAlt } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Title } from '@/components/ui/text';
import { usePathname } from 'next/navigation';
import { AiOutlineDollar } from 'react-icons/ai';

export const MenuItems = () => {
  const signIn = useSelector((state: any) => state?.root?.signIn);
  const socialSignup = useSelector((state: any) => state?.root?.socialSignup);

  const pathname = usePathname();
  let menuItems: Record<string, any>[] = [];
  switch (
  signIn?.user?.data?.user?.role?.name ||
  socialSignup?.user?.data?.user?.role?.name ||
  signIn?.role
  ) {
    case 'agency':
      menuItems = [
        {
          name: 'Dashboard',
          href: routes.dashboard,
          icon: <PiFolderNotchDuotone />,
        },
        {
          name: 'Client',
          href: routes.client,
          icon: <PiUser />,
        },
        {
          name: 'Agency Team',
          href: routes.agency_team,
          icon: <PiUsersThree />,
        },
        {
          name: 'Client Team',
          href: routes.client_team,
          icon: <PiUsersThree />,
        },
        {
          name: 'Tasks',
          href: routes.task,
          icon: <FaTasks />,
        },
        {
          name: 'Calendar',
          href: routes.userCalendar,
          icon: <FaRegCalendarAlt />,
        },
        {
          name: 'Invoice',
          href: routes.invoice,
          icon: <FaFileInvoiceDollar />,
        },
        {
          name: 'Agreement',
          href: routes.agreement,
          icon: <FaFilePen />,
        },
        {
          name: 'Manage Subsription',
          href: routes.manageSubcription,
          icon: <AiOutlineDollar />,
        },
        {
          name: 'Refferal',
          href: routes.referal,
          icon: <PiUsersThree />,
        },
      ];
      break;

    case 'client':
      menuItems = [
        {
          name: 'Dashboard',
          href: routes.dashboard,
          icon: <PiFolderNotchDuotone />,
        },
        {
          name: 'Team',
          href: routes.team,
          icon: <PiUsersThree />,
        },
        {
          name: 'Tasks',
          href: routes.task,
          icon: <FaTasks />,
        },
        {
          name: 'Calendar',
          href: routes.userCalendar,
          icon: <FaRegCalendarAlt />,
        },
        {
          name: 'Invoice',
          href: routes.clients.invoice,
          icon: <FaFileInvoiceDollar />,
        },
        {
          name: 'Agreement',
          href: routes.clients.agreement,
          icon: <FaFilePen />,
        },
      ];
      break;

    case 'team_client':
      menuItems = [
        {
          name: 'Dashboard',
          href: routes.dashboard,
          icon: <PiFolderNotchDuotone />,
        },
        {
          name: 'Team',
          href: routes.team,
          icon: <PiUsersThree />,
        },
        {
          name: 'Tasks',
          href: routes.task,
          icon: <FaTasks />,
        },
        {
          name: 'Calendar',
          href: routes.userCalendar,
          icon: <FaRegCalendarAlt />,
        },
        {
          name: 'Agreement',
          href: routes.clients.agreement,
          icon: <FaFilePen />,
        },
      ];
      break;

    case 'team_agency':
      if (signIn?.teamMemberRole === 'team_member') {
        menuItems = [
          {
            name: 'Dashboard',
            href: routes.dashboard,
            icon: <PiFolderNotchDuotone />,
          },
          {
            name: 'Tasks',
            href: routes.task,
            icon: <FaTasks />,
          },
          {
            name: 'Calendar',
            href: routes.userCalendar,
            icon: <FaRegCalendarAlt />,
          },
        ];
      } else if (signIn?.teamMemberRole === 'admin') {
        menuItems = [
          {
            name: 'Dashboard',
            href: routes.dashboard,
            icon: <PiFolderNotchDuotone />,
          },
          {
            name: 'Client',
            href: routes.client,
            icon: <PiUser />,
          },
          {
            name: 'Agency Team',
            href: routes.agency_team,
            icon: <PiUsersThree />,
          },
          {
            name: 'Client Team',
            href: routes.client_team,
            icon: <PiUsersThree />,
          },
          {
            name: 'Tasks',
            href: routes.task,
            icon: <FaTasks />,
          },
          {
            name: 'Calendar',
            href: routes.userCalendar,
            icon: <FaRegCalendarAlt />,
          },
          {
            name: 'Invoice',
            href: routes.invoice,
            icon: <FaFileInvoiceDollar />,
          },
          {
            name: 'Agreement',
            href: routes.agreement,
            icon: <FaFilePen />,
          },
        ];
      }
      break;

    default:
      menuItems = [];
  }

  return menuItems?.map((item, index) => {
    const isActive = pathname === (item?.href as string);

    return (
      <Fragment key={item.name + '-' + index}>
        {item?.href ? (
          <>
            <Link
              href={item?.href}
              className={cn(
                'group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-2 py-2 font-medium capitalize lg:my-1 2xl:mx-4 2xl:my-2',
                isActive
                  ? 'before:top-2/5 text-white before:absolute before:start-0 before:block before:h-full before:w-full z-10  before:rounded-md before:bg-[#2F0844] dark:text-gray-900 2xl:before:-start-0'
                  : 'text-white transition-colors duration-200 hover:bg-[#2F0844] hover:text-white dark:text-gray-500 dark:hover:text-gray-700'
              )}
            >
              <div className="flex items-center truncate z-30">
                {item?.icon && (
                  <span
                    className={cn(
                      'me-4 inline-flex h-5 w-5 items-center justify-center rounded-md transition-colors duration-200 [&>svg]:h-[20px] [&>svg]:w-[20px]',
                      isActive
                        ? 'text-white dark:text-slate-50'
                        : 'text-slate-50 group-hover:text-slate-50 dark:text-gray-500 '
                    )}
                  >
                    {item?.icon}
                  </span>
                )}
                <span className="truncate">{item.name}</span>
              </div>
            </Link>
          </>
        ) : (
          <Title
            as="h6"
            className={cn(
              'mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 dark:text-gray-500 2xl:px-8',
              index !== 0 && 'mt-6 3xl:mt-7'
            )}
          >
            {item.name}
          </Title>
        )}
      </Fragment>
    );
  });
};
