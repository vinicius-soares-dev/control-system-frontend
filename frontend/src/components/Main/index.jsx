import '../../assets/styles/main.css'

function Main() {
    return (
        <main className="main-content">
            <section className="intro-content">
                <h1 className="tittle-content">JI</h1>
                <p className="description-content">Ar condicionado</p>
            </section>

            <section className="login-content">
                <label className="username-label">Digite seu nome de usuário:</label>
                <input className="username-input" placeholder="nome de usuário:"></input>

                <label className="password-label">Digite sua senha:</label>
                <input className="password-input" placeholder="Digite sua senha:"></input>

                <button className='button-login' type='submit'>
                    Entrar
                </button>
            </section>
        </main>
    )
}

export default Main;