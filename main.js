// Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');

        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Header scroll effect
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Scroll to top functionality
        const scrollTopBtn = document.getElementById('scrollTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
            });
        });

        // Form submission
        const contactForm = document.querySelector('.contact-form');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you within 24 hours.');
            contactForm.reset();
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });

        // Initialize page
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        // Gallery functionality
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        let currentIndex = 0;
        const items = Array.from(document.querySelectorAll('.gallery-item'));

        // Open lightbox
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const isVideo = item.getAttribute('data-type') === 'video';
                
                if (isVideo) {
                    const video = item.querySelector('video');
                    openVideoLightbox(video.src);
                } else {
                    const img = item.querySelector('img');
                    openImageLightbox(img.src, index);
                }
            });
        });

        function openImageLightbox(src, index) {
            lightbox.classList.add('active');
            lightbox.classList.remove('video-active');
            lightboxImg.src = src;
            currentIndex = index;
            updateNavigationButtons();
        }

        function openVideoLightbox(src) {
            lightbox.classList.add('active', 'video-active');
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            
            const videoContainer = document.createElement('div');
            videoContainer.className = 'lightbox-video';
            videoContainer.appendChild(video);
            
            // Remove existing video if any
            const existingVideo = lightbox.querySelector('.lightbox-video');
            if (existingVideo) {
                existingVideo.remove();
            }
            
            lightbox.appendChild(videoContainer);
            
            // Hide navigation for videos
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }

        // Close lightbox
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        function closeLightbox() {
            lightbox.classList.remove('active', 'video-active');
            const videoContainer = lightbox.querySelector('.lightbox-video');
            if (videoContainer) {
                videoContainer.remove();
            }
        }

        // Navigation
        function updateNavigationButtons() {
            const imageItems = items.filter(item => item.getAttribute('data-type') !== 'video');
            prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
            nextBtn.style.display = currentIndex < imageItems.length - 1 ? 'block' : 'none';
        }

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateGallery(-1);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateGallery(1);
        });

        function navigateGallery(direction) {
            const imageItems = items.filter(item => item.getAttribute('data-type') !== 'video');
            currentIndex += direction;
            
            if (currentIndex >= 0 && currentIndex < imageItems.length) {
                const img = imageItems[currentIndex].querySelector('img');
                lightboxImg.src = img.src;
                updateNavigationButtons();
            }
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'ArrowLeft') {
                navigateGallery(-1);
            }
            if (e.key === 'ArrowRight') {
                navigateGallery(1);
            }
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
