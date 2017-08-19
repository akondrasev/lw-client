import template from './navbar.template.html';
import controller from  './navbar.controller';
import './navbar.style.scss';

const navbarComponent = {
    template,
    bindings: {
        items: "<",
        onModuleChosen: "&"
    },
    controller
};

export default navbarComponent;