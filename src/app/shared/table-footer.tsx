'use client';

import { Button } from '@/components/ui/button';
import { Title, Text } from '@/components/ui/text';
import { Popover } from '@/components/ui/popover';
import { PiTrashFill } from 'react-icons/pi';

interface TableFooterProps {
  checkedItems: string[];
  handleDelete: (ids: string[]) => void;
}

export default function TableFooter({
  checkedItems,
  handleDelete,
  children,
}: React.PropsWithChildren<TableFooterProps>) {
  if (checkedItems.length === 0) {
    return null;
  }

  return (
    <div className="sticky bottom-0 left-0 z-10 mt-2.5 flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-0 px-5 py-3.5 text-gray-900 shadow-sm dark:border-gray-300 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
      <div>
        <Text as="strong">{checkedItems.length}</Text> selected{' '}
        <Popover
          placement="right"
          className="z-50"
          content={({ setOpen }) => {

            const handleButtonClick = () => {
              handleDelete(checkedItems);
              setOpen(false)
            }

            return (
              <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
                <div
                  className="mb-0.5 flex items-start text-gray-700 gap-2 sm:items-center"
                >
                  <PiTrashFill className="me-1 h-[26px] w-[26px]" />
                  <Text className="font-medium text-sm text-gray-700">
                    Are you sure you want to delete?
                  </Text>
                </div>
                <div className="flex items-center justify-end">
                  <Button size="sm" className="me-1.5 h-7" onClick={handleButtonClick}>
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
            )
          }}
        >
          <Button
            size="sm"
            variant="text"
            className="underline"
            color="danger"
          >
            Delete Them
          </Button>
        </Popover>
      </div>
      {children}
    </div>
  );
}
