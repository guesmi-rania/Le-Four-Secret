import { useEffect, useState } from "react";
import { getOrders, deleteOrder, updateOrderStatus } from "../api/orders";

interface Order {
  _id: string;
  clientName: string;
  clientEmail: string;
  totalPrice: number;
  status: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await getOrders();
    setOrders(res.data);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Supprimer cette commande ?")) {
      await deleteOrder(id);
      loadOrders();
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    await updateOrderStatus(id, status);
    loadOrders();
  };

  return (
    <div>
      <h1>📦 Commandes Clients</h1>

      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Email</th>
            <th>Total</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.clientName}</td>
              <td>{order.clientEmail}</td>
              <td>{order.totalPrice} TND</td>
              <td>
                <select
                  value={order.status}
                  onChange={e =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option>En cours</option>
                  <option>Confirmée</option>
                  <option>Livrée</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(order._id)}>
                  ❌ Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
