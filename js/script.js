// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const scrollIndicator = document.querySelector('.scroll-down');

// Mobile Navigation Toggle
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');

        if (navLinks.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Close mobile menu when clicking a nav link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.classList.remove('active');
        }
    });
});

// Active Navigation Link on Scroll
function updateActiveNavLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

// Hide scroll indicator when scrolling down
function handleScrollIndicator() {
    if (!scrollIndicator) return;
    if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.visibility = 'hidden';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.visibility = 'visible';
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Navbar on Scroll
function handleStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}

// Typing Effect
function initTypingEffect() {
    const titleElement = document.querySelector('.home-title');
    if (!titleElement) return;

    const name = "Roba <span class='highlight'>Shelema</span>";
    const roles = ["Web Designer", "Frontend Developer", "UI/UX Designer"];

    if (window.location.hash === '' || window.location.hash === '#home') {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isTypingRole = false;

        function typeRole() {
            const currentRole = roles[roleIndex];

            if (!isTypingRole) {
                titleElement.innerHTML = name;
                isTypingRole = true;
                setTimeout(typeRole, 1000);
                return;
            }

            if (!isDeleting && charIndex <= currentRole.length) {
                titleElement.innerHTML = name + '<br><span class="home-role">' + currentRole.substring(0, charIndex) + '</span>';
                charIndex++;
                setTimeout(typeRole, 100);
            } else if (isDeleting && charIndex >= 0) {
                titleElement.innerHTML = name + '<br><span class="home-role">' + currentRole.substring(0, charIndex) + '</span>';
                charIndex--;
                setTimeout(typeRole, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    roleIndex = (roleIndex + 1) % roles.length;
                }
                setTimeout(typeRole, 1000);
            }
        }

        typeRole();
    }
}

// About Section Tabs
function initAboutTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    if (tabButtons.length === 0) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');

            const tabId = button.getAttribute('data-tab');
            const tabContent = document.getElementById(`${tabId}-tab`);
            if (tabContent) tabContent.classList.add('active');
        });
    });
}

// About Section Animation
function initAboutAnimation() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const aboutImage = aboutSection.querySelector('.image-container');
                const aboutText = aboutSection.querySelector('.about-text');
                const detailItems = aboutSection.querySelectorAll('.detail-item');

                if (aboutImage) {
                    aboutImage.style.opacity = '0';
                    aboutImage.style.transform = 'translateX(-50px)';
                    aboutImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    setTimeout(() => {
                        aboutImage.style.opacity = '1';
                        aboutImage.style.transform = 'translateX(0)';
                    }, 300);
                }

                if (aboutText) {
                    aboutText.style.opacity = '0';
                    aboutText.style.transform = 'translateX(50px)';
                    aboutText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    setTimeout(() => {
                        aboutText.style.opacity = '1';
                        aboutText.style.transform = 'translateX(0)';
                    }, 500);
                }

                detailItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 700 + (index * 100));
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(aboutSection);
}

// Skills Section Animations
function initSkillsAnimations() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                animateCounters();

                const categories = skillsSection.querySelectorAll('.skills-category');
                categories.forEach((category, index) => {
                    category.style.opacity = '0';
                    category.style.transform = 'translateY(30px)';
                    category.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
                    setTimeout(() => {
                        category.style.opacity = '1';
                        category.style.transform = 'translateY(0)';
                    }, 300 + (index * 200));
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = level + '%';
        }, 300);
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / speed;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 1);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Skill Tooltips
function initSkillTooltips() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-name').textContent;
        const percentage = item.querySelector('.skill-percentage').textContent;

        item.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'var(--dark-color)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '0.8rem';
            tooltip.style.zIndex = '1000';
            tooltip.style.top = '-40px';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
            tooltip.style.position = 'relative';
            tooltip.innerHTML = `
                ${skillName}: ${percentage} proficiency
                <div style="position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid var(--dark-color);"></div>
            `;
            item.style.position = 'relative';
            item.appendChild(tooltip);
        });

        item.addEventListener('mouseleave', () => {
            const tooltip = item.querySelector('.skill-tooltip');
            if (tooltip) tooltip.remove();
        });
    });
}

// Projects Section
function initProjectsSection() {
    initProjectFilter();
    initProjectModal();
    initProjectAnimations();
}

function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    }, 100);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const projectButtons = document.querySelectorAll('.project-btn, .project-link[title="View Details"]');

    if (!modal) return;

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const projectItem = button.closest('.project-item');
            if (projectItem) openProjectModal(projectItem);
        });
    });
}

function openProjectModal(projectItem) {
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');

    const title = projectItem.querySelector('.project-title').textContent;
    const description = projectItem.querySelector('.project-description').textContent;
    const imageSrc = projectItem.querySelector('.project-img').getAttribute('src');
    const categories = Array.from(projectItem.querySelectorAll('.category-tag')).map(tag => tag.textContent);
    const techTags = Array.from(projectItem.querySelectorAll('.tech-tag')).map(tag => tag.textContent);

    modalBody.innerHTML = `
        <div class="modal-project-image">
            <img src="${imageSrc}" alt="${title}">
        </div>

        <div class="modal-project-header">
            <h2 class="modal-project-title">${title}</h2>
            <div class="modal-project-meta">
                <div class="meta-item">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Completed: 2023</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-tag"></i>
                    <span>${categories.join(', ')}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-user"></i>
                    <span>Client: Confidential</span>
                </div>
            </div>
        </div>

        <div class="modal-project-description">
            <h3>Project Overview</h3>
            <p>${description}</p>
            <p>This project was developed with a focus on user experience and performance optimization.</p>
            <p>Key achievements included improving load times, increasing engagement, and receiving positive feedback.</p>
        </div>

        <div class="modal-project-tech">
            <h3>Technologies Used</h3>
            <div class="modal-tech-list">
                ${techTags.map(tag => `<span class="modal-tech-tag">${tag}</span>`).join('')}
            </div>
        </div>

        <div class="modal-project-links">
            <a href="#" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
            <a href="#" class="btn btn-secondary">
                <i class="fab fa-github"></i> View Code
            </a>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function initProjectAnimations() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectItems = entry.target.querySelectorAll('.project-item');
                projectItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 300 + (index * 100));
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(projectsSection);
}

function initViewMore() {
    const viewMoreBtn = document.querySelector('.view-more .btn');
    if (!viewMoreBtn) return;

    viewMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();

        viewMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading More Projects...';
        viewMoreBtn.disabled = true;

        setTimeout(() => {
            alert('In a real application, this would load more projects.');
            viewMoreBtn.innerHTML = '<i class="fas fa-briefcase"></i> View All Projects';
            viewMoreBtn.disabled = false;
        }, 1500);
    });
}

// Contact Section
function initContactSection() {
    initContactForm();
    initBackToTop();
    initContactAnimations();
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const sendAnotherBtn = document.getElementById('sendAnother');

    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');

    function validateName() {
        const name = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameInput.style.borderColor = '#e74c3c';
            return false;
        }
        nameError.textContent = '';
        nameInput.style.borderColor = '#ddd';
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = '#e74c3c';
            return false;
        }
        emailError.textContent = '';
        emailInput.style.borderColor = '#ddd';
        return true;
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        const messageError = document.getElementById('messageError');

        if (message.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageInput.style.borderColor = '#e74c3c';
            return false;
        }
        messageError.textContent = '';
        messageInput.style.borderColor = '#ddd';
        return true;
    }

    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (!(isNameValid && isEmailValid && isMessageValid)) return;

        submitBtn.classList.add('sending');
        submitBtn.disabled = true;

        try {
            await emailjs.sendForm(
                "service_o22x08b",
                "template_y2l63cs",
                contactForm
            );

            successMessage.classList.add('active');
            contactForm.reset();
        } catch (error) {
            alert("There was an error sending your message. Please try again.");
            console.error("EmailJS error:", error);
        } finally {
            submitBtn.classList.remove('sending');
            submitBtn.disabled = false;
        }
    });

    sendAnotherBtn.addEventListener('click', (e) => {
        e.preventDefault();
        successMessage.classList.remove('active');
    });
}

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop);
}

function initContactAnimations() {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const contactItems = entry.target.querySelectorAll('.contact-item');
                const socialLinks = entry.target.querySelectorAll('.social-link');
                const formGroups = entry.target.querySelectorAll('.form-group');

                contactItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-30px)';
                    item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 300 + (index * 200));
                });

                socialLinks.forEach((link, index) => {
                    link.style.opacity = '0';
                    link.style.transform = 'scale(0)';
                    link.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'scale(1)';
                    }, 500 + (index * 100));
                });

                formGroups.forEach((group, index) => {
                    group.style.opacity = '0';
                    group.style.transform = 'translateY(20px)';
                    group.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
                    setTimeout(() => {
                        group.style.opacity = '1';
                        group.style.transform = 'translateY(0)';
                    }, 700 + (index * 100));
                });

                const mapPlaceholder = entry.target.querySelector('.map-placeholder');
                if (mapPlaceholder) {
                    mapPlaceholder.style.opacity = '0';
                    mapPlaceholder.style.transform = 'translateY(30px)';
                    mapPlaceholder.style.transition = 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s';
                    setTimeout(() => {
                        mapPlaceholder.style.opacity = '1';
                        mapPlaceholder.style.transform = 'translateY(0)';
                    }, 1000);
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(contactSection);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    updateActiveNavLink();
    handleScrollIndicator();
    handleStickyNavbar();

    initAboutTabs();
    initAboutAnimation();

    initSkillsAnimations();
    initSkillTooltips();

    initProjectsSection();
    initViewMore();

    initContactSection();

    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        handleScrollIndicator();
        handleStickyNavbar();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.classList.remove('active');
            }
        }
    });
});

window.addEventListener('load', () => {
    const homeContent = document.querySelector('.home-content');
    if (homeContent) {
        homeContent.style.opacity = '0';
        homeContent.style.transform = 'translateY(20px)';
        homeContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(() => {
            homeContent.style.opacity = '1';
            homeContent.style.transform = 'translateY(0)';
        }, 300);
    }
});
