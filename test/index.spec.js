import should from 'should';
import Sticky from '../dist/storm-sticky.standalone';
import 'jsdom-global/register';


const html = `<nav class="js-sticky is--stuck">
            <a href="#section1">Section 1</a>
            <a href="#section2">Section 2</a>
            <a href="#section3">Section 3</a>
        </nav>
        <div class="js-sticky-2"></div>`;

document.body.innerHTML = html;

let StickyItem = Sticky.init('.js-sticky', {
        callback(){}
    }),
	StickyItem2 = Sticky.init('.js-sticky-2', {
		offset: 10
	});

describe('Initialisation', () => {

	it('should return a scroll spy object', () => {
		should(StickyItem)
		.Array()
		.and.have.lengthOf(1);
	});

	
	it('should throw an error if no sticky elements are found', () => {
		Sticky.init.bind(Sticky, '.js-err').should.throw();
	});
	
	it('each array item should be an object with the correct properties', () => {
        StickyItem[0].should.have.property('settings').Object();
		StickyItem[0].should.have.property('init').Function();
		StickyItem[0].should.have.property('getTriggerOffset').Function();
		StickyItem[0].should.have.property('check').Function();
		StickyItem[0].should.have.property('shouldStick').Function();
		StickyItem[0].should.have.property('throttled').Function();
    
	});

	it('should initialisation with different settings if different options are passed', () => {
        should(StickyItem[0].settings.offset).not.equal(StickyItem2[0].settings.offset);
	});


});