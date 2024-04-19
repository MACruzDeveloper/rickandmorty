
const Pagination = ({ currentPage, totalPages, totalItems, paginate }) => {
  // convert number of total pages to array
  let pageNums = []
  for (let i = 1; i <= totalPages; i++) {
    pageNums.push(i)
  }

  return <div className="pagination text-center">
    <ul className="pagination_list flex justify-center">
      {
        pageNums.map(num => (
          <li key={`pag-${num}`}>
            <button 
              className={`pagination_btn text-2xl ${currentPage === num && 'active'}`} 
              onClick={() => paginate(num)}>
                {num}
            </button>
          </li>
        ))
      }
    </ul>

    <p className="pagination_results text-2xl mt-4">
      <strong>{totalItems}</strong> Results
    </p>
  </div>
}

export default Pagination