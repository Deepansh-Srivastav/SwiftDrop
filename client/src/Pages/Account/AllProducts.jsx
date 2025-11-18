import { useState, useEffect } from "react"
import { getApiRequestWrapper } from "../../Networking/Services/ApiCalls"
import { APIConfig } from "../../Networking/Configuration/ApiConfig";
import { showErrorToast } from "../../Components/CostomAlert.jsx";
import PageBanner from "../../Common/PageBanner.jsx";
import { SearchIcon }
  from "../../Assets/Icons.js"
const AllProducts = () => {

  const [productsData, setProductsData] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);

  const [search, setSearch] = useState("");

  async function fetchProductsList() {

    const GET_PRODUCT_URL = APIConfig?.productPath?.getProducts;

    const url = `${GET_PRODUCT_URL}?page=${pageNumber}&limit=5&search=${search}`;

    const response = await getApiRequestWrapper(url);

    if (response?.error === false && response?.success === true) {
      setProductsData(response);
      return;
    };
    showErrorToast(response?.message);
  };

  function handleSearch(e) {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetchProductsList();
  }, [pageNumber, search])

  function handlePageNUmber(action) {
    if (action === "add" && pageNumber < productsData?.totalPages) {
      return setPageNumber(prev => prev + 1);
    };
    if (action === "sub" && pageNumber > 1) {
      return setPageNumber(prev => prev - 1);
    };
  };

  return (
    <section className="category-page">
      <PageBanner heading={"All Products"} />

      <aside className="add-category-button">
        <SearchIcon />
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
      </aside>



      <div className="display-category-container">

        <div className="product-card">
          {productsData?.data?.map((item) => (
            <div key={item._id} className="card">
              <img src={item?.image?.[0]} alt="" className="card-img" />

              <h3>{item?.name}</h3>
              <h4>{item?.unit}</h4>
              <p>₹ {item?.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-buttons">
        <button className="prev-button" onClick={() => { handlePageNUmber("sub") }}>Previous</button>
        <span>{pageNumber}/{productsData?.totalPages}</span>
        <button className="next-button" onClick={() => { handlePageNUmber("add") }}>Next</button>
      </div>

    </section>
  )
}

export default AllProducts;