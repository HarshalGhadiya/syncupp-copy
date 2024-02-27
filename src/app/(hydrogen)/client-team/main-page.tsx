'use client';

import PageHeader from '@/app/shared/page-header';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CustomTable from '@/components/common-tables/table';
import { GetclientteamColumns } from '@/app/shared/(user)/agency/client-team/team-list/columns';
import {
  deleteTeamMember,
  getAllTeamMember,
  setPagginationParams,
} from '@/redux/slices/user/team-member/teamSlice';
import ClientSelectionForm from '@/app/shared/(user)/forms/client-selection-form';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import DeleteModel from './confirmationpopupclient';

const pageHeader = {
  title: 'Client Team',
};

export default function TeamDataTablePage() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const { closeModal, openModal } = useModal();
  const teamMemberData = useSelector((state: any) => state?.root?.teamMember);
  const clientSliceData = useSelector((state: any) => state?.root?.client);
  const loading = useSelector((state: any) => state?.root?.client);

  // console.log("client data.....", clientSliceData?.data)

  const handleChangePage = async (paginationParams: any) => {
    let { page, items_per_page, sort_field, sort_order, search } =
      paginationParams;

      dispatch(setPagginationParams(paginationParams))
    const response =
      clientSliceData?.clientList.length > 0 &&
      (await dispatch(
        getAllTeamMember({
          page,
          items_per_page,
          sort_field,
          sort_order,
          search,
          client_id: clientSliceData?.clientId,
          pagination: true,
          client_team: true,
        })
      ));
    const { data } = response?.payload;

    const maxPage: number = data?.page_count;

    if (page > maxPage) {
      page = maxPage > 0 ? maxPage : 1;
      clientSliceData?.clientList.length > 0 &&
        (await dispatch(
          getAllTeamMember({
            page,
            items_per_page,
            sort_field,
            sort_order,
            search,
            client_id: clientSliceData?.clientId,
            pagination: true,
            client_team: true,
          })
        ));
      return data?.teamMemberList;
    }
    if (data && data?.teamMemberList && data?.teamMemberList.length !== 0) {
      return data?.teamMemberList;
    }
  };

  const handleDeleteById = async (
    id: string | string[],
    currentPage?: any,
    countPerPage?: number,
    sortConfig?: Record<string, string>,
    searchTerm?: string
  ) => {
    try {
      const res = await dispatch(
        deleteTeamMember({
          teamMemberIds: id,
          client_id: clientSliceData?.clientId,
          force_fully_remove: false,
          client_team: true,
        })
      );
      if (res?.payload?.data?.force_fully_remove === true) {
        openModal({
          view: (
            <DeleteModel
              forsfully={res?.payload?.data?.force_fully_remove}
              id={id}
              page={currentPage}
              items_per_page={countPerPage}
              sort_field={sortConfig?.key}
              sort_order={sortConfig?.direction}
              search={searchTerm}
              pagination={true}
              client_id={clientSliceData?.clientId}
            />
          ),
          customSize: '500px',
        });
      }
      if (res.payload.success === true) {
        const reponse = await dispatch(
          getAllTeamMember({
            page: currentPage,
            items_per_page: countPerPage,
            sort_field: sortConfig?.key,
            sort_order: sortConfig?.direction,
            search: searchTerm,
            client_id: clientSliceData?.clientId,
            pagination: true,
            client_team: true,
          })
        );
      }
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title} className="z-40">
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ClientSelectionForm />
        </div>
      </PageHeader>
      {clientSliceData?.loading && teamMemberData?.loading ? (
        <div className="flex items-center justify-center p-10">
          <Spinner size="xl" tag="div" className="ms-3" />
        </div>
      ) : (
        <div className="mt-5">
          <CustomTable
            data={teamMemberData && teamMemberData?.data?.teamMemberList}
            total={teamMemberData && teamMemberData?.data?.page_count}
            loading={teamMemberData && teamMemberData?.loading}
            pageSize={pageSize}
            setPageSize={setPageSize}
            handleDeleteById={handleDeleteById}
            handleChangePage={handleChangePage}
            getColumns={GetclientteamColumns}
          />
        </div>
      )}
    </>
  );
}
