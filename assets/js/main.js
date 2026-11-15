/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input, .software__card',{interval: 200}); 

/*===== WORK LIGHTBOX MODAL =====*/
const workImgs = document.querySelectorAll('.work__img')
const modal = document.getElementById('work-modal')
const modalImg = document.getElementById('work-modal-img')
const modalClose = document.getElementById('work-modal-close')

if (modal && modalImg) {
    workImgs.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault()
            const img = item.querySelector('img')
            if (img) {
                modalImg.src = img.src
                modalImg.alt = img.alt || 'Work preview'
                modal.classList.add('active')
                document.body.style.overflow = 'hidden'
            }
        })
    })

    const closeModal = () => {
        modal.classList.remove('active')
        document.body.style.overflow = ''
    }

    if (modalClose) modalClose.addEventListener('click', closeModal)
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === modalClose) {
            closeModal()
        }
    })
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal()
        }
    })
} 

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Obtain current theme and icon
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton && themeButton.classList.contains(iconTheme) ? 'bx-sun' : 'bx-moon'

// Validate if user previously chose a topic
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    if (themeButton) {
        themeButton.classList[selectedIcon === 'bx-sun' ? 'add' : 'remove'](iconTheme)
    }
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Default to dark mode if system prefers dark
    document.body.classList.add(darkTheme)
    if (themeButton) {
        themeButton.classList.add(iconTheme)
    }
}

// Activate / deactivate the theme manually with the button
if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })
} 
