import { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../../assets/styles/main.css';


import axios from 'axios';



function Main() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const fetchProtectedData = async() => {
        try{
            const tokenStorage = localStorage.getItem('Token JWT:');
            if(!tokenStorage) {
                return console.error("Token JWT não encontrado");
            }

            const headers = {
                'x-access-token': `${tokenStorage}`
            };

            const responseApi = await axios.get('https://control-system-api-sooty.vercel.app/home', { headers });

            return console.log("Dados protegidos:", responseApi.data);
        } catch (error) {
            console.log(`Erro ao buscar dados protegidos`, error);
        }
    }

    const login = async(username, password) => {
        try{
            const response = await axios.post('https://control-system-api-sooty.vercel.app/', {
                email: username,
                password: password,
            });
            const token = response.data.token;

            if(token) {
                localStorage.setItem("Token JWT:", token);
                fetchProtectedData();
                return navigate('/home');
            }
            return alert('login inválido');
            
        } catch(error) {
            console.log(`Error ${error}`);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(username && password) {
            return login(username, password);
        }


        return alert("Necessário preencher os campos de email e senha");
    };
   
    return (
        <main className="main-content">
            <section className="intro-content">
                <h1 className="tittle-content">JI</h1>
                <p className="description-content">Ar condicionado</p>
            </section>

            <form className="login-content" onSubmit={handleSubmit}>
                    <label className="username-label">Digite seu nome de usuário:</label>
                    <input
                        className="username-input"
                        placeholder="nome de usuário:"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                    ></input>
                    <label className="password-label">Digite sua senha:</label>
                    <input
                        className="password-input" placeholder="Digite sua senha:"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    ></input>
                    <button
                        className='button-login'
                        type='submit'
                    >
                        Entrar
                    </button>
            </form>
            
        </main>
    )
}

export default Main;