// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initFormValidation();
    initSmoothScrolling();
    initViewMoreButtons();
    initReservationConstraints();
    initDayPicker();
});

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const header = document.getElementById('header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function initScrollAnimations() {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

function initFormValidation() {
    const form = document.getElementById('reservation-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const dayPicker = document.getElementById('day-picker');
    const reservationSection = document.querySelector('.reservation');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;

        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('field-error');
        });

        let errors = [];

        if (!name) {
            errors.push('Vă rugăm introduceți un nume.');
            document.getElementById('name').parentElement.classList.add('field-error');
        }

        if (!email) {
            errors.push('Vă rugăm introduceți o adresă de email.');
            document.getElementById('email').parentElement.classList.add('field-error');
        } else {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                errors.push('Vă rugăm introduceți o adresă de email validă (ex: exemple@gmail.com).');
                document.getElementById('email').parentElement.classList.add('field-error');
            }
        }

        if (!phone) {
            errors.push('Vă rugăm introduceți un telefon.');
            document.getElementById('phone').parentElement.classList.add('field-error');
        } else if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
            errors.push('Vă rugăm introduceți un număr de telefon valid (10 cifre, ex: 0721234567).');
            document.getElementById('phone').parentElement.classList.add('field-error');
        }

        if (!date) {
            errors.push('Vă rugăm selectați o zi.');
            if (dayPicker) {
                dayPicker.style.borderColor = '#ff6b6b';
                dayPicker.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
            }
        } else {
            if (dayPicker) {
                dayPicker.style.borderColor = '';
                dayPicker.style.boxShadow = '';
            }
        }

        if (!time) {
            errors.push('Vă rugăm selectați o oră.');
            document.getElementById('time').parentElement.classList.add('field-error');
        }

        if (!guests) {
            errors.push('Vă rugăm selectați numărul de persoane.');
            document.getElementById('guests').parentElement.classList.add('field-error');
        }

        if (errors.length > 0) {
            // Display error message
            let errorHtml = '<div class="form-error-message"><strong>Erori în formular:</strong><ul>';
            errors.forEach(error => {
                errorHtml += '<li>' + error + '</li>';
            });
            errorHtml += '</ul></div>';

            // Remove previous error message if exists
            const previousError = form.querySelector('.form-error-message');
            if (previousError) previousError.remove();

            // Insert error message at top of form
            form.insertAdjacentHTML('afterbegin', errorHtml);
            return;
        }

        form.classList.add('hidden');
        confirmationMessage.classList.remove('hidden');
        
        setTimeout(function() {
            confirmationMessage.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);

        setTimeout(function() {
            confirmationMessage.classList.add('hidden');
            form.classList.remove('hidden');
            form.reset();
            
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('field-error');
            });
            const errorMsg = form.querySelector('.form-error-message');
            if (errorMsg) errorMsg.remove();
            
            document.querySelectorAll('.day-box').forEach(box => {
                box.classList.remove('selected');
            });
            const selectedDateDisplay = document.getElementById('selected-date-display');
            if (selectedDateDisplay) selectedDateDisplay.textContent = '';
            
            document.getElementById('date').value = '';
        }, 8000);
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 70; // Account for fixed header
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initViewMoreButtons() {
    document.querySelectorAll('.view-more-btn').forEach(button => {
        button.setAttribute('data-expanded', 'false');
        button.addEventListener('click', function() {
            const menuCategory = this.parentElement;
            const hiddenItems = menuCategory.querySelectorAll('.menu-item.hidden');
            const expanded = this.getAttribute('data-expanded') === 'true';

            hiddenItems.forEach(item => {
                item.style.display = expanded ? 'none' : 'flex';
                item.classList.toggle('fade-in', !expanded);
            });

            this.textContent = expanded ? 'Vezi mai multe' : 'Vezi mai puține';
            this.setAttribute('data-expanded', expanded ? 'false' : 'true');
        });
    });
}

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('img').style.transform = 'scale(1.1)';
    });

    item.addEventListener('mouseleave', function() {
        this.querySelector('img').style.transform = 'scale(1)';
    });
});

function initReservationConstraints() {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    
    if (dateInput) {
        // Set minimum date to today
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const minDate = `${year}-${month}-${day}`;
        
        dateInput.setAttribute('min', minDate);
    }
    
    if (timeInput) {
        timeInput.addEventListener('change', function() {
            if (!this.value) {
                this.classList.add('input-error');
            } else {
                this.classList.remove('input-error');
            }
        });
    }
}

// Day Picker Initialization
function initDayPicker() {
    const dayPickerContainer = document.getElementById('day-picker');
    const dateInput = document.getElementById('date');
    const viewMoreBtn = document.getElementById('view-more-dates-btn');
    
    if (!dayPickerContainer) return;
    
    const today = new Date();
    const days = [];
    
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        days.push(date);
    }
    
    days.forEach((date, index) => {
        const dayBox = document.createElement('div');
        dayBox.className = 'day-box';
        
        if (index >= 7) {
            dayBox.classList.add('hidden-day');
        }
        
        const dayName = date.toLocaleDateString('ro-RO', { weekday: 'short' }).toUpperCase();
        const dayNumber = date.getDate();
        
        dayBox.innerHTML = `
            <div class="day-box-day">${dayName}</div>
            <div class="day-box-date">${dayNumber}</div>
        `;
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(dayNumber).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        
        dayBox.addEventListener('click', function() {
            document.querySelectorAll('.day-box').forEach(box => {
                box.classList.remove('selected');
            });
            
            this.classList.add('selected');
            
            dateInput.value = dateString;
            
            const selectedDateDisplay = document.getElementById('selected-date-display');
            if (selectedDateDisplay) {
                const displayDate = date.toLocaleDateString('ro-RO', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                selectedDateDisplay.textContent = '✓ Selectată: ' + displayDate;
            }
        });
        
        dayPickerContainer.appendChild(dayBox);
    });
    
    if (viewMoreBtn) {
        let isExpanded = false;
        
        viewMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            isExpanded = !isExpanded;
            
            const hiddenDays = document.querySelectorAll('.day-box.hidden-day');
            
            if (isExpanded) {
                hiddenDays.forEach(day => {
                    day.classList.remove('hidden-day');
                });
                viewMoreBtn.textContent = 'Vezi mai puține date';
            } else {
                hiddenDays.forEach((day, index) => {
                    if (index < hiddenDays.length) {
                        day.classList.add('hidden-day');
                    }
                });
                viewMoreBtn.textContent = 'Vezi mai multe date';
            }
        });
    }
}
