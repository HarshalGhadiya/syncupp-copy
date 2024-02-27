'use client';

import { PiPlusBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Button, type ButtonProps } from '@/components/ui/button';
import cn from '@/utils/class-names';
import { Tooltip } from 'rizzui';

interface ModalButtonProps extends ButtonProps {
  className?: string;
  customSize?: string;
  icon?: React.ReactNode;
  view?: React.ReactNode;
}

export default function CustomModalButton({
  title,
  className,
  customSize = '600px',
  view,
  icon = <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />,
  ...rest
}: ModalButtonProps) {
  const { openModal } = useModal();
  return (
    <Tooltip
          size="sm"
          content={() => title}
          placement="top"
          color="invert"
        >
    <Button 
      className={cn(
        'bg-white text-black',
        className
      )}
      size='sm'
      variant='outline'
      onClick={() =>
        openModal({
          view,
          customSize,
        })
      }
      {...rest}
    >
      {icon}
    </Button>
    </Tooltip>
  );
}
