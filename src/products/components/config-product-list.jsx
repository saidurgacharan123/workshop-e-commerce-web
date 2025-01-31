import React, { useEffect, useState } from "react";
import { getAllProducts, createProduct, updateProductById, deleteProductById } from "../actions/product-actions"; // Import actions
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

const ConfigProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: ""
  });
  const navigate = useNavigate();

  const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Meat & Seafood",
    "Grains & Pasta",
    "Beverages",
    "Snacks & Sweets",
    "Household Essentials",
    "Frozen Foods",
    "Personal Care",
    "Cleaning Products",
  ]; // Supermarket grocery categories
  // Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required").positive("Price must be a positive number"),
    category: Yup.string().required("Category is required"),
  });

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  const handleAddProduct = () => {
    setEditMode(false);
    setProductData({ name: "", description: "", price: "", image: "", category: "" });
    setOpenDialog(true);
  };

  const handleEditProduct = (product) => {
    setEditMode(true);
    setProductData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category
    });
    setOpenDialog(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProductById(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleFormSubmit = async (values) => {
    if (editMode) {
      try {
        await updateProductById(values);
        setProducts(products.map((product) => (product.id === values.id ? values : product)));
        setOpenDialog(false);
      } catch (err) {
        setError("Failed to update product.");
      }
    } else {
      try {
        await createProduct(values);
        setProducts([...products, values]);
        setOpenDialog(false);
      } catch (err) {
        setError("Failed to add product.");
      }
    }
  };

  return (
    <div className="products-page">
      <h2>Featured Products</h2>

      {/* Add Product Button */}
      <Button variant="contained" color="primary" onClick={handleAddProduct}>
        Add Product
      </Button>

      {/* Material UI Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit Product */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{editMode ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={productData}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <TextField
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  required
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  required
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  label="Price"
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  required
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  label="Image URL"
                  name="image"
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  error={touched.image && Boolean(errors.image)}
                  helperText={touched.image && errors.image}
                  style={{ marginBottom: "10px" }}
                />
                <FormControl fullWidth required style={{ marginBottom: "10px" }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.category && Boolean(errors.category)}
                  >
                    {categories.map((category, index) => (
                      <MenuItem key={index} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <DialogActions>
                  <Button onClick={handleDialogClose} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    {editMode ? "Update" : "Add"}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfigProductList;
