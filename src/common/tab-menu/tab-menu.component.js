import template from './tab-menu.template.html';
import controller from './tab-menu.controller';
import './tab-menu.style.scss';

const tabMenuComponent = {
    bindings: {
        openedTabs: "<"
    },
    template,
    controller
};

export default tabMenuComponent;