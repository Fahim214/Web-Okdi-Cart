import React, { useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { listProduct, deleteProduct } from "../redux/actions/productActions"
import { LinkContainer} from "react-router-bootstrap"
import Paginate from "../components/Paginate"

const ProductListScreen = () => {
  const navigate = useNavigate();
  let params = useParams();
  const pageNumber = params.pageNumber;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  useEffect(() => {
    dispatch(listProduct("", pageNumber));
  }, [dispatch, successDelete, pageNumber]);

  const deleteProductHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Container className="mt-4" >
        <Button className="btn btn-primary" onClick={handleBack}>
          GO BACK
        </Button>
        <Row className="align-items-center mt-4" mt-3>
          <Col>
            <h3>Product List</h3>
          </Col>
          <Col className="text-end">
            <LinkContainer to="/admin/products/create">
              <Button variant="primary">
                <i className="fas fa-plus"></i>
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col>
              {loadingDelete ? (
                <Loading />
              ) : (
                <Table striped rounded="true" hover className="table-sm">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Name</td>
                      <td>Category</td>
                      <td>Brand</td>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                          <LinkContainer
                            className="ml-1"
                            to={`/admin/product/edit/${product._id}`}
                          >
                            <Button className="btn btn-sm" variant="primary">
                                <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            className="btn btn-sm"
                            variant="danger"
                            onClick={() => deleteProductHandler(product._id)}
                          >
                              <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        )}
        <Paginate page={page} pages={pages} isAdmin={true} />
      </Container>
    </div>
  );
};

export default ProductListScreen;
