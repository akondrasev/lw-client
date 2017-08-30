import template from './status-bar.template.html';
import './status-bar.style.scss';

const statusBarComponent = {
    template,
    bindings: {
        logout: "&"
    }
};

export default statusBarComponent;