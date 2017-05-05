import throttle from 'lodash.throttle';

export default {
    init() {
        this.getTriggerOffset();
        this.throttled = throttle(() => {
            this.check.call(this);
        }, this.settings.throttle);
        
        document.addEventListener('scroll', this.throttled);
        document.addEventListener('resize', this.throttled);
        document.addEventListener('resize', this.getTriggerOffset.bind(this));
        this.check();

        return this;
    },
    getTriggerOffset(){
        let cachedDisplayStyle = this.DOMElement.style.position;

        this.DOMElement.style.position = 'static';
        this.triggerOffset = this.DOMElement.getBoundingClientRect().top + (document.body.scrollTop || ~~document.body.scrollTop) + this.settings.offset;
        this.DOMElement.style.position = cachedDisplayStyle;
    },
    check(){
        if (!this.shouldStick()) {
            this.DOMElement.classList.contains(this.settings.className) && this.DOMElement.classList.remove(this.settings.className);
            return;
        }
        this.DOMElement.classList.add(this.settings.className);
        this.settings.callback && this.settings.callback.call(this);
        
        if(this.settings.unload) {
            document.removeEventListener('scroll', this.throttled, true);
            document.removeEventListener('resize', this.throttled, true);
        }
    },
    shouldStick(){
        return window.pageYOffset >= this.triggerOffset;
    }
};