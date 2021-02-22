import jwtDecode from 'jwt-decode';

const curriedJwtDecode = (token: string) => jwtDecode(token);

export default curriedJwtDecode;
