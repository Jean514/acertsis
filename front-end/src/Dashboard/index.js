import React, { useEffect } from "react";
import api from "../api";
import "./index.css";
export default function Dashboard({ history }) {
  if (!sessionStorage.getItem("id")) history.push("/login");
  const [name, setName] = React.useState(sessionStorage.getItem("name"));
  const [data, setData] = React.useState(null);
  function logout() {
    sessionStorage.clear();
    history.push("/");
  }
  useEffect(() => {
    async function get() {
      //Recupera a sessão do usuário
      const id = sessionStorage.getItem("id");
      await api
        .get("/store/", {
          headers: {
            id
          }
        })
        .then(function(response) {
          setData(response.data);
        })
        .catch(function(err) {});
    }
    get();
  }, []);
  return (
    <div className="dashboard">
      <h3>Olá {name}</h3>
      <h3>Temos ótimas ofertas para você</h3>
      {data && (
        <div>
          <h3>
            {data.produto} {data.marca}
          </h3>
          <h3>Por apenas R$ {data.preco}</h3>
          <p>*Com base no seu histórico de compras</p>
        </div>
      )}
      <button onClick={logout} className="logout">
        Sair
      </button>
    </div>
  );
}
