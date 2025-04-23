const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            auth: false
        },
        actions: {
          
            storeToken: (token) => {
                if (token) {
                    localStorage.setItem("token", token);
                    sessionStorage.setItem("token", token);
                    console.log("Token guardado correctamente:", token);
                } else {
                    console.error("Error: Token inválido");
                }
            },

            signup: (email, password) => {
                console.log('SIGNUP desde FLUX');
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                };
                
                fetch(process.env.BACKEND_URL + '/api/signup', requestOptions)
                    .then(response => {
                        console.log("Signup status:", response.status);
                        if (response.status === 200) {
                            setStore({ auth: true });
                        }
                        return response.json();
                    })
                    .then(data => {
                        getActions().storeToken(data.access_token);
                    })
                    .catch(error => console.error("Error en signup:", error));
            },
            
            login: (email, password) => {
                console.log('LOGIN desde FLUX');
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                };
                
                fetch(process.env.BACKEND_URL + '/api/login', requestOptions)
                    .then(response => {
                        console.log("Login status:", response.status);
                        if (response.status === 200) {
                            setStore({ auth: true });
                        }
                        return response.json();
                    })
                    .then(data => {
                        getActions().storeToken(data.access_token);
                    })
                    .catch(error => console.error("Error en login:", error));
            },

            logout: () => {
                console.log('LOGOUT desde FLUX');
                localStorage.removeItem("token");
                sessionStorage.removeItem("token");
                setStore({ auth: false });
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.error("Error loading message from backend:", error);
                }
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo });
            }
        }
    };
};

export default getState;
