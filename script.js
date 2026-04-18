// Navigation mobile toggle
const navToggle = document.getElementById('navToggle')
const navMenu = document.getElementById('navMenu')

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active')
})
// Fermer le menu mobile quand on clique sur un lien
const navLinks = document.querySelectorAll('.nav-link')

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active')
    })
})
// Options de l'observateur
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
}

// Creer l'observateur
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
        }
    })
}, observerOptions)

// Appliquer l'animation aux cartes
document.querySelectorAll('.skill-card, .project-card').forEach((el) => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    observer.observe(el)
})
const contactForm = document.getElementById('contactForm')
const submitBtn = document.getElementById('submitBtn')
const formMessage = document.getElementById('formMessage')
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    // Desactiver le bouton pendant l'envoi
    submitBtn.disabled = true
    submitBtn.textContent = 'Envoi en cours...'

    // Reinitialiser le message precedent
    formMessage.textContent = ''
    formMessage.className = 'form-message'

    // Recuperer les donnees du formulaire
    const formData = new FormData(contactForm)
    try {
        // Envoyer les donnees a l'API Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        })
        const data = await response.json()

        if (data.success) {
            // Succes : message vert
            formMessage.textContent = 'Message envoye avec succes !'
            formMessage.className = 'form-message success'
            contactForm.reset()
        } else {
            // Reponse recue mais erreur API
            formMessage.textContent = 'Erreur lors de l envoi. Veuillez reessayer.'
            formMessage.className = 'form-message error'
        }

    } catch (error) {
        // Erreur reseau (pas de connexion internet)
        formMessage.textContent = 'Erreur de connexion. Verifiez votre connexion.'
        formMessage.className = 'form-message error'

    } finally {
        // Toujours reactiver le bouton, succes ou non
        submitBtn.disabled = false
        submitBtn.textContent = 'Envoyer le message'
    }
})
// Smooth scroll avec offset pour la navigation fixe
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const target = document.querySelector(this.getAttribute('href'))

        if (target) {
            const offsetTop = target.offsetTop - 80
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            })
        }
    })
})
// Active link dans la navigation au scroll
window.addEventListener('scroll', () => {
    let current = ''

    const sections = document.querySelectorAll('section[id]')

    sections.forEach((section) => {
        const sectionTop = section.offsetTop

        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id')
        }
    })

    navLinks.forEach((link) => {
        link.classList.remove('active')
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active')
        }
    })
})
