/* GOOGLE TRANSLATE INIT */

function googleTranslateElementInit() {

new google.translate.TranslateElement({
pageLanguage: 'en',
includedLanguages: 'en,ta,te,kn,ml,mr,gu,pa,bn,or,ur,sa'
}, 'google_translate_element');

}


/* LANGUAGE SWITCHER */

document.addEventListener("DOMContentLoaded", function(){

const languageSelect = document.getElementById("languageSelect");

if(languageSelect){

languageSelect.addEventListener("change", function(){

let lang = this.value;

let check = setInterval(function(){

let combo = document.querySelector(".goog-te-combo");

if(combo){

combo.value = lang;
combo.dispatchEvent(new Event("change"));

clearInterval(check);

}

},500);

});

}

});
function autoDetectLanguage(){

let userLang = navigator.language || navigator.userLanguage;

if(!userLang) return;

userLang = userLang.substring(0,2); // example: en-US -> en

let supportedLanguages = ['ta','te','kn','ml','mr','gu','pa','bn','or','ur','sa'];

if(supportedLanguages.includes(userLang)){

let checkTranslate = setInterval(function(){

let combo = document.querySelector(".goog-te-combo");

if(combo){

combo.value = userLang;
combo.dispatchEvent(new Event("change"));

clearInterval(checkTranslate);

}

},1000);

}

}

window.addEventListener("load", autoDetectLanguage);


document.addEventListener("DOMContentLoaded", function () {

    let testimonials = document.querySelectorAll(".testimonial");
    let index = 0;

    if (testimonials.length > 0) {
        function showNextTestimonial() {
            testimonials[index].classList.remove("active");
            index = (index + 1) % testimonials.length;
            testimonials[index].classList.add("active");
        }

        setInterval(showNextTestimonial, 4000);
    }

    let form = document.getElementById("feedbackForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you for your feedback! We will review it soon.");
            this.reset();
        });
    }

});

        
        // WhatsApp Chatbot Toggle - FIXED
        document.addEventListener('DOMContentLoaded', function() {
            const chatbotToggle = document.getElementById('chatbotToggle');
            const chatbotPopup = document.getElementById('chatbotPopup');
            
            if (chatbotToggle && chatbotPopup) {
                chatbotToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    chatbotPopup.classList.toggle('show');
                });
                
                // Close when clicking outside
                document.addEventListener('click', function(e) {
                    if (!chatbotPopup.contains(e.target) && !chatbotToggle.contains(e.target)) {
                        chatbotPopup.classList.remove('show');
                    }
                });
                
                // Close chatbot when clicking on options (they will open WhatsApp)
                const chatbotOptions = chatbotPopup.querySelectorAll('.chatbot-option');
                chatbotOptions.forEach(option => {
                    option.addEventListener('click', function() {
                        chatbotPopup.classList.remove('show');
                    });
                });
            }
        });
        
        // WhatsApp Number Configuration
        const YOUR_WHATSAPP_NUMBER = "+9177085898177";
        
        // Form functionality
        document.getElementById('mobile').addEventListener('input', function() {
            const mobileNumber = this.value.trim();
            const personalInfoSection = document.getElementById('personalInfoSection');
            const submitBtn = document.getElementById('submitBtn');
            
            if (mobileNumber.length === 10 && /^[0-9]{10}$/.test(mobileNumber)) {
                personalInfoSection.classList.add('active');
                submitBtn.disabled = false;
                
                // Auto-fill name if mobile matches sample number
                if (mobileNumber === '8877990088') {
                    document.getElementById('fullName').value = 'Giritharan J';
                }
            } else {
                personalInfoSection.classList.remove('active');
                submitBtn.disabled = true;
            }
        });
        
        // Toggle family members section
        function toggleFamilyFields(show) {
            const familySection = document.getElementById('familyMembersSection');
            if (show) {
                familySection.style.display = 'block';
                addFamilyMember(); // Add first family member field
            } else {
                familySection.style.display = 'none';
                document.getElementById('familyMembersContainer').innerHTML = '';
            }
        }
        
        // Add family member fields
        let familyMemberCount = 0;
        function addFamilyMember() {
            familyMemberCount++;
            const container = document.getElementById('familyMembersContainer');
            const memberDiv = document.createElement('div');
            memberDiv.className = 'family-member-row';
            memberDiv.innerHTML = `
                <div style="flex: 1;">
                    <label>Relationship</label>
                    <select name="relationship[]" class="form-control" required>
                        <option value="">Select</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Child">Child</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                    </select>
                </div>
                <div style="flex: 1;">
                    <label>Date of Birth</label>
                    <input type="date" name="familyDob[]" class="form-control" required>
                </div>
                ${familyMemberCount > 1 ? '<button type="button" class="remove-family-btn" onclick="removeFamilyMember(this)"><i class="fas fa-times"></i></button>' : ''}
            `;
            container.appendChild(memberDiv);
        }
        
        function removeFamilyMember(button) {
            button.parentElement.remove();
            familyMemberCount--;
        }
        
        // Form submission
        document.getElementById('insuranceForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                mobile: document.getElementById('countryCode').value + ' ' + document.getElementById('mobile').value,
                email: document.getElementById('email').value,
                dob: document.getElementById('dob').value,
                gender: document.querySelector('input[name="gender"]:checked')?.value,
                pincode: document.getElementById('pincode').value,
                insuranceFor: document.querySelector('input[name="insuranceFor"]:checked')?.value,
                existingInsurance: document.querySelector('input[name="existingInsurance"]:checked')?.value,
                medicalHistory: document.querySelector('input[name="medicalHistory"]:checked')?.value,
                familyMembers: []
            };
            
            // Collect family members if any
            const relationships = document.getElementsByName('relationship[]');
            const familyDobs = document.getElementsByName('familyDob[]');
            
            for (let i = 0; i < relationships.length; i++) {
                if (relationships[i].value && familyDobs[i].value) {
                    formData.familyMembers.push({
                        relationship: relationships[i].value,
                        dob: familyDobs[i].value
                    });
                }
            }
            
            // Generate WhatsApp message
            const whatsappMessage = generateWhatsAppMessage(formData);
            
            // Send to WhatsApp
            sendToWhatsApp(whatsappMessage);
            
            // Show success message
            document.getElementById('successMessage').classList.add('show');
            document.getElementById('insuranceForm').reset();
            document.getElementById('personalInfoSection').classList.remove('active');
            document.getElementById('submitBtn').disabled = true;
            document.getElementById('familyMembersSection').style.display = 'none';
            document.getElementById('familyMembersContainer').innerHTML = '';
            familyMemberCount = 0;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                document.getElementById('successMessage').classList.remove('show');
            }, 5000);
        });
        
        function generateWhatsAppMessage(data) {
            let message = `*🛡️ Insurance Consultation Request*%0A%0A`;
            message += `👤 *Name:* ${data.fullName}%0A`;
            message += `📞 *Mobile:* ${data.mobile}%0A`;
            message += `📧 *Email:* ${data.email}%0A`;
            message += `🎂 *DOB:* ${data.dob}%0A`;
            message += `🚻 *Gender:* ${data.gender}%0A`;
            message += `📍 *Pincode:* ${data.pincode}%0A`;
            message += `🏠 *Insurance For:* ${data.insuranceFor}%0A`;
            
            if (data.familyMembers.length > 0) {
                message += `%0A👨‍👩‍👧 *Family Members:*%0A`;
                data.familyMembers.forEach((member, index) => {
                    message += `${index + 1}. ${member.relationship} – DOB: ${member.dob}%0A`;
                });
            }
            
            message += `%0A📄 *Existing Insurance:* ${data.existingInsurance}%0A`;
            message += `🩺 *Medical History:* ${data.medicalHistory}%0A`;
            message += `%0A🕒 *Submitted:* ${new Date().toLocaleString()}`;
            
            return message;
        }
        
        function sendToWhatsApp(message) {
            const whatsappURL = `https://wa.me/${+917708589817}?text=${message}`;
            window.open(whatsappURL, '_blank');
        }
        
        // Button navigation to form section - FIXED
        document.getElementById('consultationBtn').addEventListener('click', function() {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
        
        document.getElementById('heroConsultationBtn').addEventListener('click', function() {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
        
        // Header WhatsApp click
        document.getElementById('whatsappHeader').addEventListener('click', function() {
            window.open('https://wa.me/917708589817?text=Hi!%20I%20visited%20your%20website%20and%20want%20to%20know%20more%20about%20insurance%20services.', '_blank');
        });
        
        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    
                    // Update active nav
                    document.querySelectorAll('.main-nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
        
        // Active navigation based on scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.main-nav a');
        
        function updateActiveNav() {
            let current = '';
            const scrollPosition = window.pageYOffset + 150;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav();


        // Mobile Header Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.querySelector('.main-nav');

mobileMenuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('show');
});

document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        answer.style.display = 
            answer.style.display === "block" ? "none" : "block";
    });
});
   
