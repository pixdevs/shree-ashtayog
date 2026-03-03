document.addEventListener('DOMContentLoaded', () => {

    /* ===============================================
       1. Sticky Header & Scroll To Top Visibility
       =============================================== */
    const header = document.getElementById('header');
    const scrollBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ===============================================
       2. Mobile Hamburger Menu Toggle
       =============================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    /* ===============================================
       3. Intersection Observer (Fade-In Animations)
       =============================================== */
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* ===============================================
       4. Lightbox Gallery (Pure JS)
       =============================================== */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        // Clear src after fade out
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    }

    closeLightboxBtn.addEventListener('click', closeLightbox);
    
    // Close on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Esc key support
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    /* ===============================================
       5. Auto-sliding Testimonials
       =============================================== */
    const slides = document.querySelectorAll('.testimonial-slider .slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if(slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    /* ===============================================
       6. Contact Form Validation (Basic)
       =============================================== */
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic fields grab
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !phone || !email || !message) {
                alert('Please fill in all the fields.');
                return;
            }
            
            // Phone length check purely as an example
            if (phone.length < 10) {
                alert('Please enter a valid phone number.');
                return;
            }

            // Success action
            alert(`Thank you, ${name}! Your message has been sent successfully. We will contact you soon.`);
            contactForm.reset();
        });
    }

});
