// ==================== LIGHTBOX ====================
// click image to open bigger view
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

// track which image is open
let galleryImages = [];
let currentImageIndex = 0;

// gather all clickable images
document.addEventListener('DOMContentLoaded', function() {
    galleryImages = Array.from(document.querySelectorAll('.product img, .hero img'));

    // open lightbox on image click
    galleryImages.forEach((img, idx) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            currentImageIndex = idx;
            openLightbox(this.src, this.alt);
        });
    });

    // add next/prev buttons inside lightbox
    if (lightbox) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'lightbox-prev';
        prevBtn.innerHTML = '&#10094;';
        prevBtn.setAttribute('aria-label', 'Previous image');

        const nextBtn = document.createElement('button');
        nextBtn.className = 'lightbox-next';
        nextBtn.innerHTML = '&#10095;';
        nextBtn.setAttribute('aria-label', 'Next image');

        lightbox.appendChild(prevBtn);
        lightbox.appendChild(nextBtn);

        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showImageAt(currentImageIndex - 1);
        });

        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showImageAt(currentImageIndex + 1);
        });
    }
});

// open lightbox
function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// close lightbox
function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// close button
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

// click outside image closes
if (lightbox) {
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
}

// esc closes, arrows flip images
document.addEventListener('keydown', function(e) {
    if (!lightbox || !lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showImageAt(currentImageIndex + 1);
    if (e.key === 'ArrowLeft') showImageAt(currentImageIndex - 1);
});

// show specific image in gallery
function showImageAt(index) {
    if (galleryImages.length === 0) return;
    if (index < 0) index = galleryImages.length - 1;
    if (index >= galleryImages.length) index = 0;
    currentImageIndex = index;
    const img = galleryImages[index];
    if (lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
    }
}

// ==================== ACCORDION ====================
// click header to open/close
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const item = this.parentElement;
        const isOpen = item.classList.contains('open');

        // close all first
        document.querySelectorAll('.accordion-item').forEach(other => {
            other.classList.remove('open');
            const h = other.querySelector('.accordion-header');
            if (h) h.setAttribute('aria-expanded', 'false');
        });

        // open this one if closed
        if (!isOpen) {
            item.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
        }
    });

    // keyboard support - enter or space
    header.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// ==================== SEARCH / FILTER ====================
// filter products as user types
const searchInput = document.getElementById('product-search');

if (searchInput) {
    searchInput.addEventListener('input', function() {
        const term = this.value.toLowerCase().trim();
        const products = document.querySelectorAll('.products-grid .product');
        let visible = 0;

        products.forEach(product => {
            const text = product.textContent.toLowerCase();
            if (text.includes(term)) {
                product.style.display = '';
                visible++;
            } else {
                product.style.display = 'none';
            }
        });

        // show no results message
        const noResults = document.getElementById('no-results');
        if (noResults) {
            noResults.style.display = visible === 0 ? 'block' : 'none';
        }
    });
}

// ==================== QUICK VIEW MODAL ====================
// click product card to see details in modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('quick-modal');
    if (!modal) return;

    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-desc');
    const modalClose = modal.querySelector('.modal-close');

    document.querySelectorAll('.products-grid .product').forEach(product => {
        product.style.cursor = 'pointer';

        product.addEventListener('click', function(e) {
            // skip if clicked image (lightbox handles that)
            if (e.target.tagName === 'IMG') return;

            const img = product.querySelector('img');
            const title = product.querySelector('h3');
            const paras = product.querySelectorAll('p');

            if (img) {
                modalImg.src = img.src;
                modalImg.alt = img.alt;
            }
            if (title) modalTitle.textContent = title.textContent;
            if (paras[0]) modalPrice.textContent = paras[0].textContent;
            if (paras[1]) modalDesc.textContent = paras[1].textContent;

            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    // close button
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    // click outside closes
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});

// ==================== AJAX HELPER ====================
// simulate sending form data to server
function fakeAjaxSubmit(formType, data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('AJAX sent:', formType, data);
            resolve({ success: true, message: 'Data received' });
        }, 800);
    });
}

// ==================== ENQUIRY FORM ====================
const enquiryForm = document.getElementById('enquiry-form');

if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // clear old errors
        document.querySelectorAll('#enquiry-form .error').forEach(el => el.classList.remove('show'));
        document.querySelectorAll('#enquiry-form .invalid').forEach(el => el.classList.remove('invalid'));

        const interest = document.getElementById('interest');
        const shoppingMethod = document.querySelector('input[name="shopping_method"]:checked');
        const quantity = document.getElementById('quantity');
        const consultationDate = document.getElementById('consultation-date');
        const message = document.getElementById('message');

        // interest required
        if (!interest.value) {
            showError('interest', 'Please choose what you are looking for');
            isValid = false;
        }

        // must pick method
        if (!shoppingMethod) {
            showError('shopping_method', 'Please pick a shopping method');
            isValid = false;
        }

        // quantity 1-20
        const qty = parseInt(quantity.value);
        if (!quantity.value || qty < 1 || qty > 20) {
            showError('quantity', 'Quantity must be between 1 and 20');
            isValid = false;
        }

        // date must be today or later
        if (!consultationDate.value) {
            showError('consultation-date', 'Please pick a date');
            isValid = false;
        } else {
            const selected = new Date(consultationDate.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selected < today) {
                showError('consultation-date', 'Date must be today or later');
                isValid = false;
            }
        }

        // message at least 10 chars
        if (message.value.trim().length < 10) {
            showError('message', 'Please write at least 10 characters');
            isValid = false;
        }

        // all good - send via ajax
        if (isValid) {
            const estimate = calculateEstimate(interest.value, qty);
            const successBox = document.getElementById('enquiry-success');

            // loading message
            if (successBox) {
                successBox.innerHTML = 'Sending your enquiry...';
                successBox.classList.add('show');
            }

            fakeAjaxSubmit('enquiry', {
                interest: interest.value,
                method: shoppingMethod.value,
                quantity: qty,
                date: consultationDate.value,
                message: message.value
            }).then(() => {
                if (successBox) {
                    successBox.innerHTML = `
                        <strong>Thank you for your enquiry!</strong><br><br>
                        Based on your interest in <strong>${interest.options[interest.selectedIndex].text}</strong>
                        and <strong>${qty} product(s)</strong>, we estimate your order at
                        approximately <strong>R${estimate}</strong>.<br><br>
                        A beauty consultant will contact you within 24 hours.
                    `;
                    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                enquiryForm.reset();
            });
        }
    });
}

// rough price estimate per category
function calculateEstimate(category, qty) {
    const prices = {
        makeup: 200,
        skincare: 280,
        fragrance: 350,
        accessories: 150
    };
    return (prices[category] || 200) * qty;
}

// ==================== CONTACT FORM ====================
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

        // name min 2 chars
        if (name.value.trim().length < 2) {
            showError('contact-name', 'Please enter your full name');
            isValid = false;
        }

        // email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            showError('contact-email', 'Please enter a valid email address');
            isValid = false;
        }

        // phone 10 digits
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

        // subject min 3 chars
        if (subject.value.trim().length < 3) {
            showError('contact-subject', 'Please enter a subject');
            isValid = false;
        }

        // message min 10 chars
        if (message.value.trim().length < 10) {
            showError('contact-message', 'Message must be at least 10 characters');
            isValid = false;
        }

        // all good - build mailto and send
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

            const successBox = document.getElementById('contact-success');

            if (successBox) {
                successBox.innerHTML = 'Sending your message...';
                successBox.classList.add('show');
            }

            fakeAjaxSubmit('contact', {
                name: name.value,
                email: email.value,
                phone: phone.value,
                type: messageType.value,
                subject: subject.value,
                message: message.value
            }).then(() => {
                if (successBox) {
                    successBox.innerHTML = `
                        <strong>Message ready to send!</strong><br><br>
                        Your email app will open with the message pre-filled.
                        If it doesn't open, click <a href="${mailtoLink}">here</a>.
                    `;
                    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                window.location.href = mailtoLink;
            });
        }
    });
}

// show error message under a field
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');

    if (field) field.classList.add('invalid');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }
}

// clear radio error when user picks
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input[name="shopping_method"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const errorEl = document.getElementById('shopping_method-error');
            if (errorEl) errorEl.classList.remove('show');
        });
    });
});

// ==================== LIVE VALIDATION ====================
// check fields as user types
document.addEventListener('DOMContentLoaded', function() {

    // enquiry quantity
    const qtyInput = document.getElementById('quantity');
    if (qtyInput) {
        qtyInput.addEventListener('input', function() {
            const val = parseInt(this.value);
            const errorEl = document.getElementById('quantity-error');
            if (this.value && (val < 1 || val > 20)) {
                this.classList.add('invalid');
                if (errorEl) {
                    errorEl.textContent = 'Quantity must be between 1 and 20';
                    errorEl.classList.add('show');
                }
            } else {
                this.classList.remove('invalid');
                if (errorEl) errorEl.classList.remove('show');
            }
        });
    }

    // enquiry message
    const msgInput = document.getElementById('message');
    if (msgInput) {
        msgInput.addEventListener('input', function() {
            const errorEl = document.getElementById('message-error');
            if (this.value.trim().length > 0 && this.value.trim().length < 10) {
                this.classList.add('invalid');
                if (errorEl) {
                    errorEl.textContent = 'Please write at least 10 characters';
                    errorEl.classList.add('show');
                }
            } else {
                this.classList.remove('invalid');
                if (errorEl) errorEl.classList.remove('show');
            }
        });
    }

    // contact email
    const emailInput = document.getElementById('contact-email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const errorEl = document.getElementById('contact-email-error');
            if (this.value && !emailPattern.test(this.value)) {
                this.classList.add('invalid');
                if (errorEl) {
                    errorEl.textContent = 'Please enter a valid email address';
                    errorEl.classList.add('show');
                }
            } else {
                this.classList.remove('invalid');
                if (errorEl) errorEl.classList.remove('show');
            }
        });
    }

    // contact phone
    const phoneInput = document.getElementById('contact-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            const digits = this.value.replace(/\D/g, '');
            const errorEl = document.getElementById('contact-phone-error');
            if (this.value && digits.length < 10) {
                this.classList.add('invalid');
                if (errorEl) {
                    errorEl.textContent = 'Phone number must be 10 digits';
                    errorEl.classList.add('show');
                }
            } else {
                this.classList.remove('invalid');
                if (errorEl) errorEl.classList.remove('show');
            }
        });
    }
});

// ==================== SCROLL REVEAL ====================
// fade sections in as user scrolls
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.welcome, .why-choose, .how-to-order, .testimonial, .branch, .opening-hours, .location-map, .comparison, .faq-section, .contact-form-section');

    if (sections.length === 0) return;

    sections.forEach(s => s.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(s => observer.observe(s));
});

// ==================== LEAFLET MAP ====================
// only runs on contact page
if (document.getElementById('map')) {
    window.addEventListener('load', function() {
        if (typeof L === 'undefined') {
            console.warn('Leaflet not loaded - check CDN');
            return;
        }

        // center between JHB and PTA
        const map = L.map('map').setView([-26.0, 28.1], 8);

        // free map tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        // JHB marker
        L.marker([-26.1076, 28.0567])
            .addTo(map)
            .bindPopup('<strong>Luxe Beauty - Johannesburg</strong><br>45 Sandton Drive, Sandton<br>+27 11 555 6789');

        // PTA marker
        L.marker([-25.7461, 28.1881])
            .addTo(map)
            .bindPopup('<strong>Luxe Beauty - Pretoria</strong><br>102 Church Street, Arcadia<br>+27 12 555 9876');
    });
}
