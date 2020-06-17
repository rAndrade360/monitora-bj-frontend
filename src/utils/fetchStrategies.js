import api from '../services/api';
export default async function loadStrategies(history) {
  let response;
  try {
    response = await api.get('/strategies');
  } catch (error) {
    if (error.response.status === 401) {
      alert('Você não tem autorização para realizar esse tipo de ação!');
      history.push('/dashboard');
    }
    return;
  }
  return response;
}
