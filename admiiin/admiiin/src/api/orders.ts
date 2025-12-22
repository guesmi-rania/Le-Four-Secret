import axios from "axios";

const API_URL = "https://recettes-de-cuisine.onrender.com/api/orders";

export const getOrders = () => {
  return axios.get(API_URL);
};

export const deleteOrder = (id: string) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const updateOrderStatus = (id: string, status: string) => {
  return axios.put(`${API_URL}/${id}`, { status });
};
