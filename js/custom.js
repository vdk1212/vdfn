/* VARIABLES */
const page = document.querySelector( 'html' );

let popupScrollTop = 0;

/* FUNCTIONS */
// Fade in animations
const animations = () => {

	let animationItems = document.querySelectorAll( '.animation' ),
		animationsObserver = new IntersectionObserver( ( entries, observer ) => {
										entries.forEach( entry => {
											if ( entry.isIntersecting ) {
												entry.target.classList.add( 'animated' );
												animationsObserver.unobserve( entry.target );
											}
										} )
									}, {
										rootMargin: "0px",
										'threshold': 0.1
									} );

	animationItems.forEach(i => {
		animationsObserver.observe(i)
	});
}
// Disable scroll on page
const removeScroll = () => {
	popupScrollTop = window.scrollY;
	page.style.position = 'fixed';
	page.style.top = '-' + popupScrollTop + 'px';
	page.style.width = '100%';
}
// Enable scroll on page
const addScroll = () => {
	page.style.cssText = '';
	window.scroll(0, popupScrollTop);
}

// ON PAGE LOAD
animations();

/* BUTTONS, CLICKS, HOVER, FOCUS */
// Popups
let popup = document.querySelectorAll( '.popup-content' ),
	popupBtn = document.querySelectorAll( '.open-popup' ),
	popupBgClose = document.querySelectorAll( '.popup-bg' ),
	popupBtnClose = document.querySelectorAll( '.popup-btn-close' );

function closePopup() {
	popup.forEach( ( thisPopup ) => {
		thisPopup.classList.remove( 'active' );
	} );
}

function openPopup( popup ) {
	closePopup();
	removeScroll( popupScrollTop );

	document.querySelector( popup ).classList.add( 'active' );
}

popupBtn.forEach( ( clickedBtn ) => {
	closePopup();

	clickedBtn.addEventListener( 'click', ( e ) => {
		e.preventDefault();
		openPopup( '#' + clickedBtn.getAttribute( 'data-id' ) );
	} );
} );

popupBgClose.forEach( ( clickedBtn ) => {
	clickedBtn.addEventListener( 'click', () => {
		clickedBtn.parentElement.classList.remove( 'active' );
		addScroll();
	} );
} );

popupBtnClose.forEach( ( clickedBtn ) => {
	clickedBtn.addEventListener( 'click', () => {
		clickedBtn.parentElement.parentElement.classList.remove( 'active' );
		addScroll();
	} );
} );