'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';

const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const defaultDeleteFunction = (
  id: string | string[],
  currentPage?: number,
  countPerPage?: number
) => {};
const emptyHandleChangePage = async (paginationParams?: any) => {
  return Promise.resolve();
};

export default function CustomTable({
  data = [],
  handleDeleteById = defaultDeleteFunction,
  handleChangePage = emptyHandleChangePage,
  total,
  loading,
  getColumns,
  pageSize,
  setPageSize,
}: {
  data: any[];
  handleDeleteById?: (
    id: string | string[],
    currentPage?: any,
    countPerPage?: number,
    sortConfig?: Record<string, string>,
    searchTerm?: string
  ) => any;
  handleChangePage?: (paginationParams: any) => Promise<any>;
  total?: number;
  loading?: boolean;
  getColumns?: any;
  pageSize?: any;
  setPageSize?: any;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  //Sorting handler
  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  // Table button delete Handler
  const onDeleteItem = useCallback(
    (
      id: string | string[],
      currentPage?: any,
      countPerPage?: number,
      Islastitem?: boolean,
      sortConfig?: Record<string, string>,
      searchTerm?: string
    ) => {
      handleDelete(
        id,
        currentPage,
        countPerPage,
        Islastitem,
        sortConfig,
        searchTerm
      );
    },
    []
  );

  const {
    isLoading,
    isFiltered,
    tableData,
    handlePaginate,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handlecustomeSelectAll,
    handleDelete,
    handleReset,
  } = useTable(
    data,
    pageSize,
    handleDeleteById,
    handleChangePage,
    pageSize,
    currentPage,
    setCurrentPage
  );

  const columns = useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
        handlecustomeSelectAll,
        currentPage,
        pageSize,
        searchTerm,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
      currentPage,
      pageSize,
      searchTerm,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);
  //   console.log(visibleColumns, 'visibleColumns');
  return (
    <>
      <ControlledTable
        variant="modern"
        isLoading={loading}
        showLoadingText={loading}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: total,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          hideIndex: 1,
          columns,
          checkedColumns,
          setCheckedColumns,
          enableDrawerFilter: true,
        }}
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(
                ids,
                currentPage,
                pageSize,
                data?.length <= 1 ? true : false,
                sortConfig,
                searchTerm
              );
            }}
          ></TableFooter>
        }
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </>
  );
}
