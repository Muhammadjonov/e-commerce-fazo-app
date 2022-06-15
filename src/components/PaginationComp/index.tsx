import { Pagination } from 'antd';
import "./_style.scss";

interface IPaginationComp {
  totalCount: number,
  pageCount: number,
  currentPage: number,
  perPage: number,
  page: number,
  setPage: (page: number) => void

}

function PaginationComp(props: IPaginationComp) {
  const { totalCount, perPage = 20, page, setPage } = props;



  const onChange = (pageNumber: number) => {
    setPage(pageNumber);
  }

  return (
    <div className="pagination__area">
      <Pagination
        className="product_view_pagination"
        current={page}
        total={totalCount}
        onChange={onChange}
        hideOnSinglePage={true}
        showSizeChanger={false}
        pageSize={perPage}
      />
    </div>
  )
}

export default PaginationComp