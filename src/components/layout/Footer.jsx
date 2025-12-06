import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Footer = () => {
    return (
        <footer className="layout-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>Sobre Natura</h3>
                        <ul>
                            <li><a href="#">Nuestra Historia</a></li>
                            <li><a href="#">Sustentabilidad</a></li>
                            <li><a href="#">Trabaja con nosotros</a></li>
                            <li><a href="#">Relación con Inversionistas</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Ayuda</h3>
                        <ul>
                            <li><a href="#">Preguntas Frecuentes</a></li>
                            <li><a href="#">Términos y Condiciones</a></li>
                            <li><a href="#">Política de Privacidad</a></li>
                            <li><a href="#">Libro de Reclamaciones</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Nuestras Marcas</h3>
                        <ul>
                            <li><a href="#">Chronos</a></li>
                            <li><a href="#">Ekos</a></li>
                            <li><a href="#">Kaiak</a></li>
                            <li><a href="#">Mamá y Bebé</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Consultoría</h3>
                        <ul>
                            <li><Link to="/consultora">Quiero ser Consultora</Link></li>
                            <li><Link to="/professional-login">Entrar a mi espacio</Link></li>
                            <li><a href="#">Revista Digital</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Natura Cosméticos S.A. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
