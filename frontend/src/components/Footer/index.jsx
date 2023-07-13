import { Link } from 'react-router-dom';

import '../../assets/styles/footer.css';

function Footer() {
    return (
        <footer className="footer">
            <Link to={"https://www.linkedin.com/in/vinicius-soaresdev"} className='link-footer' target='_blank'>
                <p className='description-footer'>Desenvolvido por Vinicius Soares</p>
            </Link>
        </footer>
    )
}

export default Footer;