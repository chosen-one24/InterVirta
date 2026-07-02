import { useContext } from "react"
import {AuthContext} from "../auth.context.js";
import { login,logout,register} from "../services/auth.api.js";



export const useAuth=()=>{
    const context=useContext(AuthContext);

    if(!context){
        return {
            user:null,
            loading:false,
            handleLogin: async () => {},
            handleRegister: async () => {},
            handleLogout: async () => {}
        };
    }

    const {user,setUser,loading,setLoading}=context;
    
    
    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true);

            const data = await login(email, password);

            setUser(data.user);

        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        try {
            setLoading(true);
            const data = await register(username, email, password);

            setUser(data.user);

        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout();
            setUser(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };



    return { user, loading, handleLogin, handleRegister, handleLogout }
}