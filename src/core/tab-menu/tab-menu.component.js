import template from './tab-menu.template.html';
import controller from './tab-menu.controller';
import './tab-menu.style.scss';

const tabMenuComponent = {
    bindings: {
        openedTabs: "<",
        onCloseClick: "&",
        onTabClick: "&"
    },
    template,
    controller
};

export default tabMenuComponent;