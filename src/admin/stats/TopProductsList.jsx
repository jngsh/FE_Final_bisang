import React, { useState, useEffect } from 'react';
import './TopProductsList.css';

const TopProductsList = ({ selectedDate }) => {
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    const [sortOption, setSortOption] = useState('productSalesPrice');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const response = await fetch('http://localhost:8090/bisang/admin/stats/sales/products-info');
            const data = await response.json();
            const details = data.reduce((acc, product) => {
                acc[product.productId] = { name: product.productName, image: product.productImage };
                return acc;
            }, {});
            setProductDetails(details);
        };

        const fetchProducts = async () => {
            setLoading(true);
            const url = sortOption === 'productSalesPrice'
                ? `http://localhost:8090/bisang/admin/stats/sales/sort-price`
                : `http://localhost:8090/bisang/admin/stats/sales/sort-amount`;
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        };

        fetchProductDetails();
        fetchProducts();
    }, [sortOption, selectedDate]);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    return (
        <div className="top-products-list">
            <div>
                <label htmlFor="sortOption">정렬 기준:</label>
                <select id="sortOption" value={sortOption} onChange={handleSortChange}>
                    <option value="productSalesPrice">매출액</option>
                    <option value="productSalesAmount">판매량</option>
                </select>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>제품 사진</th>
                            <th>제품명</th>
                            <th>{sortOption === 'productSalesPrice' ? '매출액' : '판매량'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.slice(0, 5).map((product, index) => (
                            <tr key={product.productId}>
                                <td>{index + 1}</td>
                                <td>
                                    <img 
                                        src={productDetails[product.productId]?.image || 'default-image.jpg'} 
                                        alt={productDetails[product.productId]?.name || 'Product Image'}
                                        className="product-image"
                                    />
                                </td>
                                <td>{productDetails[product.productId]?.name || product.productId}</td>
                                <td>{sortOption === 'productSalesPrice' ? product.productSalesPrice : product.productSalesAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TopProductsList;
