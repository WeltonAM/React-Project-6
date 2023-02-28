import './Footer.css'

const Footer = () => {
    return (
        <footer id="footer">
            <p>&copy;ReactGram - {new Date().getFullYear()}</p>

            <a href="https://github.com/WeltonAM" target="_blank">By WeltonMatosDev</a>

            <a href="https://horadecodar.com.br/" target="_blank">At HoraDeCodar</a>
        </footer>
    )
}

export default Footer