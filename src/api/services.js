import axiosInstance from './axiosInstance';


export const getProducts = async (params = {}) => {
  const response = await axiosInstance.get('/products', { params });
  return response.data;
};


export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};


export const getCategories = async () => {
  const response = await axiosInstance.get('/categories');
  return response.data;
};

export const getBestsellingProducts = async () => {
  const response = await axiosInstance.get('/products/bestsellers');
  return response.data;
};


export const getNewArrivals = async () => {
  const response = await axiosInstance.get('/products/new-arrivals');
  return response.data;
};

export const getHomeReviews = async () => {
  const response = await axiosInstance.get('/reviews/home-reviews');
  console.log(response.data)
  return response.data;
};


export const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};


export const getProductReviews = async (productId) => {
  const response = await axiosInstance.get(`/reviews/get-reviews/${productId}`);
  return response.data;
};