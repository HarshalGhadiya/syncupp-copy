'use client';

import { RemoveclientReviewData } from '@/redux/slices/admin/clientReview/clientReviewSlice';
import { RemoveFaqData } from '@/redux/slices/admin/faq/faqSlice';
import { RemoveActivityData } from '@/redux/slices/user/activity/activitySlice';
import { RemoveClientData, RemoveRegionalData } from '@/redux/slices/user/client/clientSlice';
import { RemoveTaskData } from '@/redux/slices/user/task/taskSlice';
import { RemoveTeamMemberData } from '@/redux/slices/user/team-member/teamSlice';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useDispatch } from 'react-redux';

type ModalTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  customSize?: string;
};

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: null,
  customSize: '320px',
});

export function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);
  const dispatch = useDispatch();

  const openModal = ({
    view,
    customSize,
  }: {
    view: React.ReactNode;
    customSize?: string;
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      customSize,
    });
  };

  const closeModal = () => {
    dispatch(RemoveRegionalData())
    dispatch(RemoveClientData())
    dispatch(RemoveFaqData())
    dispatch(RemoveTeamMemberData())
    dispatch(RemoveTaskData())
    dispatch(RemoveActivityData())
    dispatch(RemoveclientReviewData())
    setState({
      ...state,
      isOpen: false,
    });
  };

  return {
    ...state,
    openModal,
    closeModal,
  };
}
