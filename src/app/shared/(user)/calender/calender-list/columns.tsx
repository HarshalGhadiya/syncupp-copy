'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from '@/components/ui/tooltip';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import CustomModalButton from '@/app/shared/custom-modal-button';
import { Badge, Button } from 'rizzui';
import moment from 'moment';
import { useSelector } from 'react-redux';
import ViewTaskForm from '@/app/shared/(user)/task/create-edit/view-task-form';
import AddActivityFormPage from '../../calender/create-edit-event/create-edit-activity-form';
import { PiXBold } from 'react-icons/pi';
import { MdOutlineDone } from 'react-icons/md';
import ConfirmationPopover from '@/app/shared/confirmation-popover';
import { usePathname } from 'next/navigation';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string | string[], currentPage?: any, countPerPage?: number, Islastitem?: boolean, sortConfig?: Record<string, string>, searchTerm?: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  currentPage?: number;
  pageSize?: number;
  searchTerm?: string;
};

function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">Pending</Text>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Completed</Text>
        </div>
      );
    case 'overdue':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">Overdue</Text>
        </div>
      );
    case 'in_progress':
      return (
        <div className="flex items-center">
          <Badge className="bg-gray-400" renderAsDot />
          <Text className="ms-2 font-medium text-gray-600">In Progress</Text>
        </div>
      );
    case 'cancel':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">Cancel</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

function getActivityName(value: string) {
  switch (value?.toLowerCase()) {
    case 'task':
      return (
        <div className="flex items-center">
          <Text className="font-medium text-gray-700">Task</Text>
        </div>
      );
    case 'call_meeting':
      return (
        <div className="flex items-center">
          <Text className="font-medium text-gray-700">Call meeting</Text>
        </div>
      );
    case 'others':
      return (
        <div className="flex items-center">
          <Text className="font-medium text-gray-700">Others</Text>
        </div>
      );
  }
}

export const GetActivityColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  currentPage,
  pageSize,
  searchTerm
}: Columns) => {

  const signIn = useSelector((state: any) => state?.root?.signIn)
  const pathname = usePathname();
  // console.log("pathname is....", pathname.startsWith('/client/details'))

  return [
    {
      title: (
        <div className="ps-3.5">
          <HeaderCell
            title="Title"
            sortable
            ascending={
              sortConfig?.direction === 'asc' && sortConfig?.key === 'title'
            }
          />
        </div>
      ),
      onHeaderCell: () => onHeaderCellClick('title'),
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (value: string) => (
        <Text className="ps-3.5 font-medium w-28 text-gray-700 truncate normal-case">{value}</Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Type"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'activity_type.name'
          }
        />),
      onHeaderCell: () => onHeaderCellClick('activity_type.name'),
      dataIndex: 'activity_type',
      key: 'activity_type',
      width: 200,
      render: (value: Record<string, string>) => getActivityName(value?.name),
    },
    {
      title: (
        <HeaderCell
          title="Date"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'due_date'
          }
        />),
      onHeaderCell: () => onHeaderCellClick('due_date'),
      dataIndex: 'due_date',
      key: 'due_date',
      width: 200,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{moment(value).format("DD MMM, YYYY")}</Text>
      ),
    },
    // {
    //   title: (
    //     <HeaderCell
    //       title="Customer"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'client_id.name'
    //       }
    //     />),
    //   onHeaderCell: () => onHeaderCellClick('client_id.name'),
    //   dataIndex: 'client_id',
    //   key: 'client_id',
    //   width: 200,
    //   render: (value: any) => (
    //     <Text className="font-medium text-gray-700 capitalize">{value?.name}</Text>
    //   ),
    // },
    {
      title: (
        <HeaderCell
          title="Assigned To"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'assign_to.name'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('assign_to.name'),
      dataIndex: 'assign_to',
      key: 'assign_to',
      width: 200,
      render: (value: Record<string, string>) => {
        return <Text className="font-medium text-gray-700 capitalize">{value?.name}</Text>
      },
    },
    {
      title: (
        <HeaderCell
          title="Status"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'activity_status.name'
          }
        />),
      onHeaderCell: () => onHeaderCellClick('activity_status.name'),
      dataIndex: 'activity_status',
      key: 'activity_status',
      width: 200,
      render: (value: any) => getStatusBadge(value?.name),
    },
    {
      // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
      title: <HeaderCell title="Actions" className="opacity-0" />,
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: string, row: any) => {
        return (
          <div>
            {row?.activity_type?.name === "task" ? (
              <div className="flex items-center justify-end gap-3 pe-4">
                {(signIn?.role !== 'client' && signIn?.role !== 'team_client' && row?.activity_status?.name !== 'completed') &&
                  <CustomModalButton
                    icon={<PencilIcon className="h-4 w-4" />}
                    view={<AddActivityFormPage title="Edit Activity" row={row} isTaskModule={false} isClientEdit={pathname.startsWith('/client/details') || pathname.startsWith('/client-team/details')} isClientTeam={pathname.startsWith('/client-team/details')} isTeamEdit={pathname.startsWith('/agency-team/details')} />}
                    customSize="1050px"
                    title='Edit Activity'
                  />
                }
                <CustomModalButton
                  icon={<EyeIcon className="h-4 w-4" />}
                  view={<ViewTaskForm data={row} />}
                  customSize="625px"
                  title='View Activity'
                />
                {(signIn?.role !== 'client' && signIn?.role !== 'team_client') &&
                  <DeletePopover
                    title={`Delete the Task`}
                    description={`Are you sure you want to delete?`}
                    onDelete={() => onDeleteItem(row._id, currentPage, pageSize, data?.length <= 1 ? true : false, sortConfig, searchTerm)}
                  />
                }
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-end gap-3 pe-4">
                  {(signIn?.role !== 'client' && signIn?.role !== 'team_client' && row?.activity_status?.name !== 'completed' && row?.activity_status?.name !== 'cancel') &&
                    <CustomModalButton
                      icon={<PencilIcon className="h-4 w-4" />}
                      view={<AddActivityFormPage title="Edit Activity" row={row} isTaskModule={false} isClientEdit={pathname.startsWith('/client/details') || pathname.startsWith('/client-team/details')} isClientTeam={pathname.startsWith('/client-team/details')} isTeamEdit={pathname.startsWith('/agency-team/details')} />}
                      customSize="1050px"
                      title='Edit Activity'
                    />
                  }
                  <CustomModalButton
                    icon={<EyeIcon className="h-4 w-4" />}
                    view={<ViewTaskForm data={row} />}
                    customSize="625px"
                    title='View Activity'
                  />
                  {(signIn?.role !== 'client' && signIn?.role !== 'team_client' && row?.activity_status?.name !== 'completed' && row?.activity_status?.name !== 'cancel') &&
                    <ConfirmationPopover
                      title={`Complete the meeting`}
                      description={`Are you sure you want to complete the meeting?`}
                      action='Complete'
                      icon={<MdOutlineDone className="h-4 w-4" />}
                      data={row?._id}
                      isCalendarModule={pathname.startsWith('/calendar')}
                      isClientModule={pathname.startsWith('/client/details')}
                      isAgencyTeamModule={pathname.startsWith('/agency-team/details')}
                      isClientTeamModule={pathname.startsWith('/client-team/details')}
                    />
                  }
                  {(signIn?.role !== 'client' && signIn?.role !== 'team_client' && row?.activity_status?.name !== 'completed' && row?.activity_status?.name !== 'cancel') &&
                    <ConfirmationPopover
                      title={`Cancel the meeting`}
                      description={`Are you sure you want to cancel the meeting?`}
                      action='Cancel'
                      icon={<PiXBold className="h-4 w-4" />}
                      data={row?._id}
                      isCalendarModule={pathname.startsWith('/calendar')}
                      isClientModule={pathname.startsWith('/client/details')}
                      isAgencyTeamModule={pathname.startsWith('/agency-team/details')}
                      isClientTeamModule={pathname.startsWith('/client-team/details')}
                    />
                  }
                </div>
              </div>
            )}
          </div>
        );
      },
    },
  ];
}
