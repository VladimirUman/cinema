export default function setAuthHeader() {
    const token = localStorage.getItem('token');
  
    if (token) {
        return { Authorization: token };
    } else {
        return {};
    }
}
