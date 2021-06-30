(function() {

    document.querySelectorAll('.a-button').forEach(item => {
        item.addEventListener('mouseover', event => {
            item.classList.add('shadow')
            item.setAttribute("style", "transform:scale(1.03);")
        })
    })
    
    document.querySelectorAll('.a-button').forEach(item => {
        item.addEventListener('mouseout', event => {
            item.classList.remove('shadow')
            item.removeAttribute("style", "transform:scale(1);")
        })
    })

	let hamburger = {
		nav: document.querySelector('#nav'),
		navToggle: document.querySelector('.nav-toggle'),

		initialize() {
			this.navToggle.addEventListener('click',
        () => { this.toggle(); });
		},

		toggle() {
			this.navToggle.classList.toggle('expanded');
			this.nav.classList.toggle('expanded');
		},
	};

	hamburger.initialize();

}());
