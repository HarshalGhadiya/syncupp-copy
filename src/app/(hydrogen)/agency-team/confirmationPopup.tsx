'use client';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { CalendarEvent } from '@/types';
import { PiMapPin, PiTrashFill, PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Text, Title } from 'rizzui';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import cn from '@/utils/class-names';
import {
  RemoveUsersub,
  getAllSeats,
} from '@/redux/slices/user/manage-subscription.tsx/SubscriptionSlice';
import { useDispatch } from 'react-redux';
import {
  deleteTeamMember,
  getAllTeamMember,
} from '@/redux/slices/user/team-member/teamSlice';

function DeleteModel({
  forsfully,
  id,
  page,
  items_per_page,
  sort_field,
  sort_order,
  search,
  pagination,
}: any) {
  const { openModal, closeModal } = useModal();
  const disptach = useDispatch();

  const handleDelete = async () => {
    const res = await disptach(
      deleteTeamMember({ teamMemberIds: id, force_fully_remove: forsfully })
    );
    if (res.payload.success === true) {
      closeModal();
      const reponse = await disptach(
        getAllTeamMember({
          page: page,
          items_per_page: items_per_page,
          sort_field: sort_field,
          sort_order: sort_order,
          search: search,
          pagination: true,
        })
      );
    }
  };

  function handelCAncle() {
    closeModal();
  }

  return (
    <div className="m-auto p-4 md:px-7 md:pb-10 md:pt-6">
      <div className="mb-6 flex flex-col items-center justify-between">
        <Title
          as="h6"
          className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
        >
          <PiTrashFill className="me-1 h-[17px] w-[17px]" />
          This User have been assigned with Task(s) which are still pending.
        </Title>
        <Text className="mb-2 leading-relaxed text-gray-500">
          Are you sure you want to delete?
        </Text>
        {/* <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon> */}
      </div>
      <div className={cn('grid grid-cols-2 gap-4 pt-5 ')}>
        <Button
          className="hover:bg-gray-700 dark:bg-gray-200 dark:text-white dark:hover:bg-gray-300 dark:active:bg-gray-100"
          onClick={handleDelete}
        >
          Yes
        </Button>
        <Button
          variant="outline"
          onClick={() => handelCAncle()}
          className="dark:hover:border-gray-400"
        >
          No
        </Button>
      </div>
    </div>
  );
}

export default DeleteModel;
