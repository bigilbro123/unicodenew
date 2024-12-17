import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';

const ViewData = () => {
  const [products, setProducts] = useState([]); // Complete product list
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const rowsPerPage = 20; // Number of rows per page

  useEffect(() => {
    fetch('http://localhost:5000/api/fetch-data')
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []); // Set fetched data
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  const handleCopy = (codes) => {
    navigator.clipboard.writeText(codes.join('\n'));
    alert('Copied codes to clipboard!');
  };

  // Pagination Logic
  const totalPages = Math.ceil(products.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const paginatedProducts = products.slice(startIdx, startIdx + rowsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) return <h2 style={{ textAlign: 'center' }}>Loading...</h2>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#E6FAF3', minHeight: '100vh' }}>
      <Nav /> <br />
      {/* Header Buttons */}
      <div style={{ marginTop: '20px' }}>
        <button
          style={{
            backgroundColor: '#004D40',
            color: '#fff',
            border: '1px solid green',
            padding: '10px 20px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
          onClick={() => window.location.href = '/'}
        >
          Back to add Item
        </button>
        <button
          style={{
            backgroundColor: '#004D40',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer'
          }}
          onClick={() => window.location.href = '/'}
        >
          Add Branches & Items
        </button>
      </div> <br />

      {products.length === 0 ? (
        <h3 style={{ textAlign: 'center', color: '#555' }}>No data available</h3>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
            <thead style={{ backgroundColor: '#005D4C', color: '#fff' }}>
              <tr>
                <th style={{ padding: '10px', verticalAlign: 'top' }}>Sl No</th>
                <th style={{ padding: '10px', verticalAlign: 'top' }}>Branch Name</th>
                <th style={{ padding: '10px', verticalAlign: 'top' }}>Category</th>
                <th style={{ padding: '10px', verticalAlign: 'top' }}>Sub-Category</th>
                <th style={{ padding: '10px', verticalAlign: 'top' }}>Half</th>
                <th style={{ padding: '10px', verticalAlign: 'top' }}>Year</th>
                <th style={{ padding: '10px', verticalAlign: 'top' }}>Item Code</th>
                <th style={{ padding: '10px', verticalAlign: 'top' }}>Size</th>
                <th style={{ padding: '10px', verticalAlign: 'top' }}>Codes</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((prod, idx) => (
                <tr key={startIdx + idx} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px', verticalAlign: 'top' }}>{startIdx + idx + 1}</td> {/* Row Number */}
                  <td style={{ padding: '10px', verticalAlign: 'top' }}>{prod.branchName}</td>
                  <td style={{ padding: '10px', verticalAlign: 'top' }}>{prod.category}</td>
                  <td style={{ padding: '10px', verticalAlign: 'top' }}>{prod.subCategory}</td>
                  <td style={{ padding: '10px', verticalAlign: 'top' }}>{prod.half}</td>
                  <td style={{ padding: '10px', verticalAlign: 'top' }}>{prod.year}</td>
                  <td style={{ padding: '10px', verticalAlign: 'top' }}>{prod.itemCode}</td>
                  <td style={{ padding: '10px', verticalAlign: 'top' }}>{prod.size}</td>
                  <td style={{ padding: '10px', verticalAlign: 'top' }}>
                    {prod.codes?.length > 0 ? (
                      <div>
                        {/* Move the Copy All button to the top */}
                        <button
                          onClick={() => handleCopy(prod.codes)}
                          style={{
                            marginBottom: '5px', // Space between button and codes
                            backgroundColor: '#004D40',
                            color: '#fff',
                            border: 'none',
                            padding: '5px 10px',
                            cursor: 'pointer',
                          }}
                        >
                          Copy All
                        </button>
                        {/* List of codes */}
                        {prod.codes.map((code, i) => (
                          <div key={i}>{code}</div>
                        ))}
                      </div>
                    ) : (
                      <span>No codes available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{
                padding: '10px 20px',
                marginRight: '10px',
                backgroundColor: '#004D40',
                color: '#fff',
                border: 'none',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              Previous
            </button>
            <span style={{ alignSelf: 'center' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{
                padding: '10px 20px',
                marginLeft: '10px',
                backgroundColor: '#004D40',
                color: '#fff',
                border: 'none',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewData;