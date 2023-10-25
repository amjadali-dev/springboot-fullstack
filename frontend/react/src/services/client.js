import axios from 'axios'

export const getCustomers = async () => {
    try {
        const url = import.meta.env.VITE_API_BASE_URL + "/api/v1/customers"
        console.log(url)
        return await axios.get(url)
    } catch (error) {
        throw error
    }

}