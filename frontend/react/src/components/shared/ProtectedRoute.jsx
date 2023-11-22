import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {

    const { isCustomerAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isCustomerAuthenticated()) {
            navigate("/")
        }
    })

    return isCustomerAuthenticated() ? children : ""

}

export default ProtectedRoute