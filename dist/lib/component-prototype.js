import throttle from 'raf-throttle';

const getNodePosition = (node, offset) => {
    let location = 0;
    if (node.offsetParent) {
        do {
            location += node.offsetTop;
            node = node.offsetParent;
        } while (node);
    } else {
        location = node.offsetTop;
    }
    return location - offset > 0 ? location - offset : 0;
};

export default {
    init() {
        this.getTriggerOffset();
        this.throttledCheck = throttle(this.check.bind(this));
        this.boundGetTriggerOffset = this.getTriggerOffset.bind(this);
        
        document.addEventListener('scroll', this.throttledCheck);
        window.addEventListener('resize', this.throttledCheck);
        window.addEventListener('resize', this.boundGetTriggerOffset);
        this.check();

        return this;
    },
    getTriggerOffset(){
        let cachedDisplayStyle = this.DOMElement.style.position;

        this.DOMElement.style.position = 'static';
        // this.triggerOffset = this.DOMElement.getBoundingClientRect().top + (document.body.scrollTop || ~~document.body.scrollTop) + this.settings.offset;
        this.triggerOffset = getNodePosition(this.DOMElement, this.settings.offset)
        this.DOMElement.style.position = cachedDisplayStyle;
    },
    check(){
        if (!this.shouldStick()) {
            this.DOMElement.classList.contains(this.settings.className) && this.DOMElement.classList.remove(this.settings.className);
            return;
        }
        this.DOMElement.classList.add(this.settings.className);
        this.settings.callback && this.settings.callback.call(this);

    },
    shouldStick(){
        let scrollY = window.pageYOffset;
        return scrollY >= this.triggerOffset && (this.settings.extent ? scrollY <= this.triggerOffset + this.extentNode.offsetHeight : true);
    }
};