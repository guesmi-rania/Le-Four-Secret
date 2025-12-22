import StatCard from "../components/StatCard";

export default function AdminDashboard() {
  return (
    <div className="dashboard">
      <div className="stats">
        <StatCard title="Commandes" value="128" />
        <StatCard title="Revenus" value="4,200 DT" />
        <StatCard title="Produits" value="36" />
        <StatCard title="Clients" value="89" />
      </div>

      <div className="table-box">
        <h3>Dernières commandes</h3>
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Total</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ahmed</td>
              <td>120 DT</td>
              <td className="success">Payée</td>
            </tr>
            <tr>
              <td>Sana</td>
              <td>75 DT</td>
              <td className="pending">En attente</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
