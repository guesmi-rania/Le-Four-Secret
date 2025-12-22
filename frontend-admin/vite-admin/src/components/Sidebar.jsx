export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">PickBazar</h2>
      <nav>
        <a className="active">Dashboard</a>
        <a>Commandes</a>
        <a>Produits</a>
        <a>Clients</a>
        <a>Déconnexion</a>
      </nav>
    </aside>
  );
}
