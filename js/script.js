// LIGHTBOX 
// click image to see bigger version
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

// add click to all product images + hero image
document.querySelectorAll('.product img, .hero img').forEach(img => {
    img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

// close button
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

// click outside image also closes
if (lightbox) {
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
}

// esc key closes
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// ACCORDION
// click header to open/close content
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const item = this.parentElement;
        const isOpen = item.classList.contains('open');

        // close all others first
        document.querySelectorAll('.accordion-item').forEach(other => {
            other.classList.remove('open');
        });

        // open this one if it was closed
        if (!isOpen) {
            item.classList.add('open');
        }
    });
});

//  SEARCH / FILTER 
// filter products as user types
const searchInput = document.getElementById('product-search');

if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const products = document.querySelectorAll('.products-grid .product');
        let visibleCount = 0;

        products.forEach(product => {
            const text = product.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                product.style.display = '';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        // show no results message
        const noResults = document.getElementById('no-results');
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    });
}

//  ENQUIRY FORM VALIDATION 
const enquiryForm = document.getElementById('enquiry-form');

if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // clear old errors
        document.querySelectorAll('#enquiry-form .error').forEach(el => el.classList.remove('show'));
        document.querySelectorAll('#enquiry-form .invalid').forEach(el => el.classList.remove('invalid'));

        // check each field
        const interest = document.getElementById('interest');
        const shoppingMethod = document.querySelector('input[name="shopping_method"]:checked');
        const quantity = document.getElementById('quantity');
        const consultationDate = document.getElementById('consultation-date');
        const message = document.getElementById('message');

        // interest must be chosen
        if (!interest.value) {
            showError('interest', 'Please choose what you are looking for');
            isValid = false;
        }

        // must pick online or in-store
        if (!shoppingMethod) {
            showError('shopping_method', 'Please pick a shopping method');
            isValid = false;
        }

        // quantity must be 1-20
        const qty = parseInt(quantity.value);
        if (!quantity.value || qty < 1 || qty > 20) {
            showError('quantity', 'Quantity must be between 1 and 20');
            isValid = false;
        }

        // date must be in the future
        if (!consultationDate.value) {
            showError('consultation-date', 'Please pick a date');
            isValid = false;
        } else {
            const selectedDate = new Date(consultationDate.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                showError('consultation-date', 'Date must be today or later');
                isValid = false;
            }
        }

        // message must be at least 10 chars
        if (message.value.trim().length < 10) {
            showError('message', 'Please write at least 10 characters');
            isValid = false;
        }

        // if all good, show estimate
        if (isValid) {
            const estimate = calculateEstimate(interest.value, qty);

            const successBox = document.getElementById('enquiry-success');
            if (successBox) {
                successBox.innerHTML = `
                    <strong>Thank you for your enquiry!</strong><br><br>
                    Based on your interest in <strong>${interest.options[interest.selectedIndex].text}</strong>
                    and <strong>${qty} product(s)</strong>, we estimate your order at
                    approximately <strong>R${estimate}</strong>.<br><br>
                    A beauty consultant will contact you within 24 hours to confirm
                    availability and final pricing.
                `;
                successBox.classList.add('show');
                successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            enquiryForm.reset();
        }
    });
}

// rough price estimate based on category
function calculateEstimate(category, qty) {
    const prices = {
        makeup: 200,
        skincare: 280,
        fragrance: 350,
        accessories: 150
    };
    return (prices[category] || 200) * qty;
}

//  CONTACT FORM VALIDATION
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        document.querySelectorAll('#contact-form .error').forEach(el => el.classList.remove('show'));
        document.querySelectorAll('#contact-form .invalid').forEach(el => el.classList.remove('invalid'));

        const name = document.getElementById('contact-name');
        const email = document.getElementById('contact-email');
        const phone = document.getElementById('contact-phone');
        const messageType = document.getElementById('message-type');
        const subject = document.getElementById('contact-subject');
        const message = document.getElementById('contact-message');

        // name - at least 2 chars
        if (name.value.trim().length < 2) {
            showError('contact-name', 'Please enter your full name');
            isValid = false;
        }

        // email - basic format check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            showError('contact-email', 'Please enter a valid email address');
            isValid = false;
        }

        // phone - SA format, 10 digits
        const phoneDigits = phone.value.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            showError('contact-phone', 'Please enter a valid phone number (10 digits)');
            isValid = false;
        }

        // message type required
        if (!messageType.value) {
            showError('message-type', 'Please select a message type');
            isValid = false;
        }

        // subject - at least 3 chars
        if (subject.value.trim().length < 3) {
            showError('contact-subject', 'Please enter a subject');
            isValid = false;
        }

        // message - at least 10 chars
        if (message.value.trim().length < 10) {
            showError('contact-message', 'Message must be at least 10 characters');
            isValid = false;
        }

        // if all good, build mailto
        if (isValid) {
            const emailBody = `
Name: ${name.value}
Email: ${email.value}
Phone: ${phone.value}
Message Type: ${messageType.value}
Subject: ${subject.value}

Message:
${message.value}
            `.trim();

            const mailtoLink = `mailto:info@luxebeauty.co.za?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(emailBody)}`;

            // show success message
            const successBox = document.getElementById('contact-success');
            if (successBox) {
                successBox.innerHTML = `
                    <strong>Message ready to send!</strong><br><br>
                    Your email app will open with the message pre-filled.
                    If it doesn't open, click <a href="${mailtoLink}">here</a>.
                `;
                successBox.classList.add('show');
                successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // open email client
            window.location.href = mailtoLink;
        }
    });
}

// helper - show error under a field
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');

    if (field) field.classList.add('invalid');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }
}

// for radio buttons - error on the fieldset
document.addEventListener('DOMContentLoaded', function() {
    const radioGroup = document.querySelector('input[name="shopping_method"]');
    if (radioGroup) {
        document.querySelectorAll('input[name="shopping_method"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const errorEl = document.getElementById('shopping_method-error');
                if (errorEl) errorEl.classList.remove('show');
            });
        });
    }
});

//  LEAFLET MAP
// only runs on contact page
if (document.getElementById('map')) {
    // wait for leaflet to load
    window.addEventListener('load', function() {
        if (typeof L === 'undefined') {
            console.warn('Leaflet not loaded - check CDN');
            return;
        }

        // center between JHB and PTA
        const map = L.map('map').setView([-26.0, 28.1], 8);

        // openstreetmap tiles - free, no API key
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        // Johannesburg branch marker
        L.marker([-26.1076, 28.0567])
            .addTo(map)
            .bindPopup('<strong>Luxe Beauty - Johannesburg</strong><br>45 Sandton Drive, Sandton<br>+27 11 555 6789');

        // Pretoria branch marker
        L.marker([-25.7461, 28.1881])
            .addTo(map)
            .bindPopup('<strong>Luxe Beauty - Pretoria</strong><br>102 Church Street, Arcadia<br>+27 12 555 9876');
    });
}