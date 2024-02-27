'use client';

import { PiPlusBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Button, type ButtonProps } from '@/components/ui/button';
import cn from '@/utils/class-names';

interface ModalButtonProps extends ButtonProps {
  label?: string;
  className?: string;
  customSize?: string;
  icon?: React.ReactNode;
  view: React.ReactNode;
}

export default function ModalButton({
  label = 'Add New',
  className,
  customSize = '600px',
  view,
  icon ,
  ...rest
}: ModalButtonProps) {
  const { openModal } = useModal();
  return (
    <Button 
      className={cn(
        'mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0',
        className
      )}
      onClick={() =>
        openModal({
          view,
          customSize,
        })
      }
      {...rest}
    >
      {icon}
      {label}
    </Button>
  );
}
