import axios from 'axios';

export const get = async () => await axios.get("/api/menu");