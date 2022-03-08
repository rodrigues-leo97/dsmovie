import {ReactComponent as GitHubIcon} from 'assets/img/github.svg' //depois do as o nome pode ser a nosso criterio ex: GitHubIcon
import './styles.css'

function NavBar() {

return (
        <header>
            <nav className="container"> {/* Class é palavra reservada do JS e não pode entrar em conflito, por isso className*/}
                <div className='dsmovie-nav-content'>
                    <h1>DSMovie</h1>
                    <a className='github-name' href="https://github.com/rodrigues-leo97/dsmovie">
                        <div className='dsmovie-contact-container'>
                            <GitHubIcon />
                            <p className='dsmovie-contact-link'>/rodrigues-leo97</p>
                        </div>
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default NavBar; //para dizer que está exportando