/**
 * HAMA ENTERPRISE - MAIN INTERACTIVE SCRIPT
 * Features:
 * - Slider / Carousel System
 * - Scroll-Triggered Reveal Animations for Cards
 * - Gallery Filter System
 * - Form Validation & API Integration Placeholders
 * - Mobile Menu & Navigation Enhancements
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. HERO SLIDER / BANNER CAROUSEL
       ========================================================================== */
    const initHeroSlider = () => {
        const slides = document.querySelectorAll('.banner-slider .slide');
        if (!slides.length) return;

        let currentSlide = 0;
        const totalSlides = slides.length;

        // Function to show a specific slide
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
                slide.classList.toggle('slide-active', i === index);
                
                // Add fade-in animation
                if (i === index) {
                    slide.style.animation = 'fadeIn 0.6s ease-in-forward';
                }
            });
        };

        // Automatic Slide Transition
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        };

        // Initialize first slide and set 5-second interval
        showSlide(currentSlide);
        let slideInterval = setInterval(nextSlide, 5000);

        // Pause slideshow when hovering over slides
        const sliderContainer = document.querySelector('.banner-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            sliderContainer.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
        }
    };


    /* ==========================================================================
       2. SCROLL REVEAL ANIMATIONS (Cards, Sections, Statistics)
       ========================================================================== */
    const initScrollAnimations = () => {
        // Target elements that need reveal animations
        const animatableElements = document.querySelectorAll(
            '.service-card, .project-card, .gallery-card, .stat-box, .testimonial-card, .team-member-card, .contact-info-card, .contact-form-card'
        );

        if (!animatableElements.length) return;

        // Apply base transition styles dynamically
        animatableElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, border-color 0.25s ease';
        });

        // IntersectionObserver callbacks when elements enter viewport
        const observerOptions = {
            root: null,
            threshold: 0.15 // Trigger when 15% visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation timing for grid items
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);

                    // Unobserve once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatableElements.forEach(el => observer.observe(el));
    };


    /* ==========================================================================
       3. GALLERY FILTERING (Photos vs. Videos)
       ========================================================================== */
    const initGalleryFilter = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryCards = document.querySelectorAll('.gallery-card');

        if (!filterBtns.length || !galleryCards.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active status from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.id.replace('filter-', ''); // 'all', 'images', 'videos'

                galleryCards.forEach(card => {
                    const isImage = card.classList.contains('media-image');
                    const isVideo = card.classList.contains('media-video');

                    if (filterValue === 'all') {
                        card.style.display = 'flex';
                    } else if (filterValue === 'images' && isImage) {
                        card.style.display = 'flex';
                    } else if (filterValue === 'videos' && isVideo) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    };


    /* ==========================================================================
       4. API INTEGRATION PLACEHOLDERS
       ========================================================================== */
    
    // --- [API LOCATION 1]: Contact Form Submission ---
    const initContactFormAPI = () => {
        const contactForm = document.getElementById('main-contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Extract form inputs
            const formData = {
                fullName: document.getElementById('full-name').value,
                email: document.getElementById('email-address').value,
                phone: document.getElementById('phone-number').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            const submitBtn = document.getElementById('btn-submit-contact');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                /* 
                 * ===================================================================
                 * 📍 API PLACEHOLDER: SUBMIT CONTACT FORM
                 * REPLACE THE URL BELOW WITH YOUR BACKEND ENDPOINT
                 * ===================================================================
                 */
                const API_ENDPOINT = 'https://api.hamaenterprise.com/v1/contact'; // Example URL

                // Uncomment this block when your live backend API is ready:
                /*
                const response = await fetch(API_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) throw new Error('Failed to send message');
                const data = await response.json();
                */

                // Simulated API delay (remove when live API is hooked up)
                await new Promise(resolve => setTimeout(resolve, 1500));

                alert('Thank you! Your message has been successfully sent to Hama Enterprise.');
                contactForm.reset();

            } catch (error) {
                console.error('Contact Form Error:', error);
                alert('Something went wrong. Please try again later.');
            } finally {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }
        });
    };


    // --- [API LOCATION 2]: Dynamic Projects Fetcher ---
    const fetchProjectsFromAPI = async () => {
        const projectsContainer = document.getElementById('projects-container');
        if (!projectsContainer) return;

        /* 
         * ===================================================================
         * 📍 API PLACEHOLDER: FETCH PROJECTS FROM BACKEND / DATABASE
         * ===================================================================
         */
        const PROJECTS_API_URL = 'https://api.hamaenterprise.com/v1/projects';

        /*
        try {
            const response = await fetch(PROJECTS_API_URL);
            const projects = await response.json();

            // Clear static cards and insert live backend items
            projectsContainer.innerHTML = '';
            projects.forEach(project => {
                const projectCard = document.createElement('article');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <img src="${project.imageUrl}" alt="${project.title}" class="project-image">
                    <div class="project-card-body">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                    </div>
                `;
                projectsContainer.appendChild(projectCard);
            });
        } catch (err) {
            console.log('Using static project cards as fallback.');
        }
        */
    };


    // --- [API LOCATION 3]: Rate Us / Testimonials Submission ---
    const initRatingAPI = () => {
        const rateBtn = document.getElementById('btn-rate-now');
        if (!rateBtn) return;

        rateBtn.addEventListener('click', () => {
            const rating = prompt('How would you rate our services from 1 to 5 stars?');
            if (rating) {
                /* 
                 * ===================================================================
                 * 📍 API PLACEHOLDER: SUBMIT USER RATING
                 * ===================================================================
                 */
                // fetch('https://api.hamaenterprise.com/v1/reviews', {
                //     method: 'POST',
                //     body: JSON.stringify({ score: rating })
                // });
                alert(`Thank you for rating us ${rating} stars!`);
            }
        });
    };


    /* ==========================================================================
       5. INITIALIZE ALL FUNCTIONS
       ========================================================================== */
    initHeroSlider();
    initScrollAnimations();
    initGalleryFilter();
    initContactFormAPI();
    fetchProjectsFromAPI();
    initRatingAPI();
});

