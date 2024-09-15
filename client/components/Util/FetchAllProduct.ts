import axios from "axios"
export const FetchAll = async() => {
        // for pagination http://localhost:3002/api/products?p=3&limit=4
        const response = await axios.get('http://localhost:3002/api/products');
        return response.data
}
