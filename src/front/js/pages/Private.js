import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token"); 
        console.log("Token en localStorage:", token); 

        if (!token || token === "undefined" || token === "null") {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div>
            <h1>Private Page</h1>
            <p>Bienvenido a una sección protegida de la aplicación.</p>
        </div>
    );
};
