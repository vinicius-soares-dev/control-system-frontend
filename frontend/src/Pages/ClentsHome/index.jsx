import {useEffect, useState} from "react";
import QRCode from "qrcode.react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import CountdownTimer from "../../components/Countdown";


import "../../assets/styles/home.css";

function ClientsPage() {

            const [data, setData] = useState([]);
            const [selectedUser, setSelectedUser] = useState(null);
            const classInitial = 'clients-descript';
            const classComponent = 'clients-form';
            const classClients = 'new-client';
            const [visibleData, setVisibleData] = useState(3);

            const findData = async () => {
                const tokenStorage = localStorage.getItem('Token JWT:');
                if(!tokenStorage) {
                    return console.error("Token JWT não encontrado");
                }

                const headers = {
                    'x-access-token': `${tokenStorage}`
                };

                const responseApi = await axios.get('https://control-system-api-sooty.vercel.app/home', { headers });
                console.log("sucesso", responseApi.data);

                return setData(responseApi.data);  

            }


            useEffect( () => {
                //fetching the initial list of clients when page loads
                findData();

                const intervalId = setInterval(findData, 10000);

                return () => {
                    clearInterval(intervalId);
                };


            },[]);

            
            const isAuthenticated = () => {
                // Check if the user token exists
                let authTokenExists = localStorage.getItem('Token JWT:');
            
                if(authTokenExists.length > 0) {
                    console.log("Usuário autenticado")
                    return true;
                }

                return false;
            };


            const handleUserClick = async (userId) => {

               const responseApi =
                await axios.get(`https://control-system-api-sooty.vercel.app/home/${userId}`)

                return setSelectedUser(responseApi.data);
            };

            const [openModal, setOpenModal] = useState(false);
            const [client, setClient] = useState("");
            const [address, setAdress] = useState("");
            const [tel, setTel] = useState("");
            const [description, setDescription] = useState("");
            const [tittle, setTittle] = useState("");
            const [nextVisit, setNextvisit] = useState("");
            const [email, setEmail] = useState("");

            const handleClientChange = (event) => {
                setClient(event.target.value);
            };

            const handleAddressChange = (event) => {
                setAdress(event.target.value);
            };

            const handleTelChange = (event) => {
                setTel(event.target.value);
            };

            const handleDescriptionChange = (event) => {
                setDescription(event.target.value);
            };

            const handleTittleChange = (event) => {
                setTittle(event.target.value);
            };

            const handleNextVisitChange = (event) => {
                setNextvisit(event.target.value);

            };

            const handleEmailChange = (event) => {
                setEmail(event.target.value);
            };

            
            const handleSubmit = (event) => {
                event.preventDefault();

                
                if(client && address && tel && description && tittle && nextVisit && email) {
                    login(email, tel, address, client, description, tittle, nextVisit);
                    return console.log("ativei a função")
                }

                return console.log("dados não preenchidos");
            };


            const login = async(email, tel, address, client, description, tittle, nextVisit) => {
               
                const response = await axios.post('https://control-system-api-sooty.vercel.app/home', {
                    email: email,
                    tel: tel,
                    address: address,
                    username: client,
                    description: description,
                    tittle: tittle,
                    nextVisit: nextVisit
                });
                console.log("cheguei até aqui.");
                console.log(response.data);

                
                    return;
            };

            const deletedUser = async (id, nome) => {
                const userDeleted = await axios.delete(`https://control-system-api-sooty.vercel.app/home/${id}`);

                if(userDeleted) {
                    
                  return   alert(`O usuário ${nome} foi excluído.`);
                }

                return console.error("Erro ao deletar usuário.");
            };

            const handleShowMoreData = () => {
                setVisibleData((prevVisibleData) => prevVisibleData + 3)
            };

            


            
           
      if(!isAuthenticated()) {
          console.log("Usuário sem permissão");
          return window.location.href="/";
        } else {
            return (
                
                <>
                    <section className="main">
                        
                        <Header />
                        
                        <div className="data-section">
                            <h4 className="tittle-data">Controle de Clientes</h4>
                            <CountdownTimer />
                        

                            <div className="section-clients">

                                <div className="clients-data" >
                                    <h5 className="number-clients">Numero de clientes: {
                                        data.length
                                    }</h5>
                                    <ul className="list-clients">
                                        {
                                            data.slice(0, visibleData).map((item) => (
                                                <li key={ item._id } className="full-list" onClick={() => handleUserClick(item._id)}>{item.username}</li>
                                    
                                            ))
                                    
                                        }
                                    </ul>
                                   
                                    <button onClick={() => handleShowMoreData()} className="seeMoreButton">Ver mais</button>
                                    <button onClick={()=> setOpenModal(true)} className="addMoreButton">Adicionar</button>
                                    
                                </div>


                                

                                
                                <div className={selectedUser  ? classComponent  : classInitial}>
                                    {
                                        selectedUser?.map((item) => (

                                            <div key={item._id} className="description-client">
                                                <h5>{item.tittle} </h5>
                                                <p>Data do serviço: {item.description} </p>
                                                <p>Nome: {item.username}</p>
                                                <p>Telefone: {item.tel}</p>
                                                <p>Endereço: {item.address}</p>
                                                <p>Próxima manutenção: {item.nextVisit}</p>

                                                <QRCode className="qrcodeView" value={`Serviço de ${item.tittle} realizado pela JI Ar condicionado, para o cliente ${item.username}, no dia ${item.description} com o combinado de retorno para a data ${item.nextVisit}. Para mais informações acesse nosso site: jiarcondicionadorp.com`}/>
                                               

                                                <button className="delete-button" onClick={() => deletedUser(item._id, item.username)}>Deletar</button>
                                            
                                            
                                                    
                                                
                                            </div>
                                            

                                            
                                            
                                            
                                        ))
                                    }

                                </div>

                                <form onSubmit={handleSubmit} className={openModal ? classClients  : classInitial}>
                                    <p className="tittle-form">Cadastrar novo Cliente</p>

                                    <label>Nome do Cliente:</label>

                                    <input 
                                        type="text" 
                                        value={client}
                                        onChange={handleClientChange}
                                        required>
                                    </input>

                                    <label>Serviço prestado:</label>

                                    <input 
                                        type="text" 
                                        value={tittle}
                                        onChange={handleTittleChange} 
                                        required>    
                                    </input>

                                    <label>Descrição do Serviço:</label>

                                    <input 
                                        type="text" 
                                        value={description} 
                                        onChange={handleDescriptionChange}
                                        required>
                                    </input>

                                    <label>Endereço:</label>

                                    <input 
                                        type="text" 
                                        value={address} 
                                        onChange={handleAddressChange}
                                        required>
                                    </input>

                                    <label>Telefone:</label>

                                    <input 
                                        type="text" 
                                        value={tel} 
                                        onChange={handleTelChange}
                                        required>
                                    </input>

                                    <label>E-mail:</label>

                                    <input 
                                        type="text" 
                                        value={email}
                                        onChange={handleEmailChange}>
                                    </input>

                                    <label>Próxima manutenção:</label>

                                    <input 
                                        type="text" 
                                        value={nextVisit} 
                                        onChange={handleNextVisitChange}
                                        required>
                                    </input>
                                    <button type="submit" className="create-button" onClick={() => setOpenModal(false)}>Criar</button>
                                </form>
                                
                                
                            </div>
                           <div>
                           </div>
                            
                                

                        </div>
                        
                        <Footer />

                    </section>

                </>

            )
    
      }

}

export default ClientsPage;