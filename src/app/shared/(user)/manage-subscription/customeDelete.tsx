'use client';

import { Title, Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import TrashIcon from '@/components/icons/trash';
import { PiTrashFill } from 'react-icons/pi';
import { useSelector } from 'react-redux';

type DeletePopoverProps = {
  title: string;
  description: string;
  onDelete: () => void;
  text: any;
};

export default function CustomeDeletePopover({
  title,
  description,
  onDelete,
  text,
}: DeletePopoverProps) {
  const clientSliceData = useSelector((state: any) => state?.root?.client);

  return (
    <Popover
      placement="left"
      className="z-50"
      content={({ setOpen }) => {
        const handleButtonClick = () => {
          onDelete();
          setOpen(false);
        };

        return (
          <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
            <Title
              as="h6"
              className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
            >
              <PiTrashFill className="me-1 h-[17px] w-[17px]" /> {title}
            </Title>
            <Text className="mb-2 leading-relaxed text-gray-500">
              {description}
            </Text>
            <div className="flex items-center justify-end">
              <Button
                size="sm"
                className="me-1.5 h-7"
                onClick={handleButtonClick}
              >
                Yes
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7"
                onClick={() => setOpen(false)}
              >
                No
              </Button>
            </div>
          </div>
        );
      }}
    >
      <Button
        size="sm"
        variant="outline"
        aria-label={'Delete Item'}
        className="hover:gray-700 ms-3 bg-black text-white @xl:w-auto"
      >
        {text}
      </Button>
    </Popover>
  );
}
