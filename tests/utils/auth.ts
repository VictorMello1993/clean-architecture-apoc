import axios from "axios";
import usuarios from "../data/usuarios";

const baseUrl = process.env.API_URL;

export async function getAuthorizationHeaders() {
  const response = await axios.post(`${baseUrl}/usuarios/login`, usuarios.completo);

  return {
    headers: {
      Authorization: `Bearer ${response.data.token}`
    }
  };
}
