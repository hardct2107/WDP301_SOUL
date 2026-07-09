/* ==========================================================================
   SOUL Landing Page Interactivity Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU TOGGLE
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            // Change icon between burger and close
            const icon = mobileMenuToggle.querySelector('i');
            if (mainNav.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when navigation links are clicked (on mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav && mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. ACTIVE NAVIGATION LINK ON SCROLL
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset header
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-list a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-list a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    });

    // 3. FAQ ACCORDION COLLAPSIBLE
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            
            // Check if active
            const isActive = faqItem.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
            }
        });
    });

    // 4. MICRO-INTERACTION: INTRO VIDEO MODAL PLACEHOLDER
    const videoTrigger = document.querySelector('.video-trigger');
    if (videoTrigger) {
        videoTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Video giới thiệu SOUL đang được phát triển. Hãy đón chờ phiên bản đầy đủ nhé!');
        });
    }

    // 5. DOWNLOAD APP TRIGGERS
    const downloadBtns = document.querySelectorAll('.download-btn, .btn-header, .hero-actions .btn-primary');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Only alert if they are placeholders/empty href
            const href = btn.getAttribute('href');
            if (href === '#' || href === '#tai-app') {
                if (href === '#') {
                    e.preventDefault();
                    alert('Ứng dụng SOUL Beta đang được tải lên Store. Bạn vui lòng đăng ký thông tin trải nghiệm sớm nhé!');
                }
            }
        });
    });
});
