import { createContext, useEffect, useState } from "react";
import { performLogin } from "../../services/client";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("access_token")

        if (token) {
            const decodedToken = jwtDecode(token)
            console.log(decodedToken)
            setCustomer(
                {
                    "username": decodedToken.sub,
                    "roles": decodedToken.scopes
                }
            )
        }
    }, [])

    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {

            performLogin(usernameAndPassword).then((response) => {

                const token = response.headers.get("Authorization")
                localStorage.setItem("access_token", token)

                const decodedToken = jwtDecode(token)
                setCustomer(
                    {
                        "username": decodedToken.sub,
                        "roles": decodedToken.scopes
                    }
                )

                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })

    }

    const logout = () => {
        localStorage.removeItem("access_token")
        setCustomer(null)
    }

    const isCustomerAuthenticated = () => {

        const token = localStorage.getItem("access_token")
        console.log("token :" + token)
        if (!token) {
            return false
        }

        const decodedToken = jwtDecode(token)
        if (Date.now() > decodedToken.exp * 1000) {
            logout()
            return false
        }

        return true

    }

    return (
        <AuthContext.Provider value={{
            customer,
            login,
            logout,
            isCustomerAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

