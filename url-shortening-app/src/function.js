  

console.log('load')
window.onload = function() {
    const toggleMenu = document.getElementById('toggle-menu'),
    mobileMenu = document.getElementById('mobile-nav');
    if(toggleMenu) {
        console.log('toggle btn exist')
        if (!toggleMenu.classList.contains('hidden')) {
            toggleMenu.addEventListener('click', () => {
                console.log('toggle')
                if (mobileMenu.classList.contains('mobile-nav-hide')) {
                    mobileMenu.classList.remove('mobile-nav-hide');
                    mobileMenu.classList.add('mobile-nav-show');
                } else {
                    mobileMenu.classList.remove('mobile-nav-show');
                    mobileMenu.classList.add('mobile-nav-hide');
                }
            });
            }
    }
}


