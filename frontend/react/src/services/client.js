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

export const saveCustomer = async (customer) => {
    const url = import.meta.env.VITE_API_BASE_URL + "/api/v1/customers"
    return await axios.post(url, customer)
}

export const deleteCustomer = async (customerId) => {
    try {
        const url = import.meta.env.VITE_API_BASE_URL + "/api/v1/customers/" + customerId
        return axios.delete(url)
    } catch (error) {
        throw (error)
    }

}
export const updateCustomer = async (customer,id) => {
    try {
        const url = import.meta.env.VITE_API_BASE_URL + "/api/v1/customers/" + id
        return axios.put(url,customer)
    } catch (error) {
        throw (error)
    }
}