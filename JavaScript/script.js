// ==========================================================
// FINAL JAVASCRIPT: With Animations & Robust Logic
// ==========================================================

// Ensure everything runs only after the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. PAGE FADE-IN ANIMATION ---
    // Page load hone par body ko smoothly dikhane ke liye
    // NOTE: HTML body tag mein style="opacity:0;" ya CSS mein body { opacity: 0; } add karna hoga
    
    // Pehle transition set karein
    document.body.style.transition = "opacity 1s ease-out"; 
    
    // 500ms delay ke baad opacity 1 karein
    setTimeout(function () {
        document.body.style.opacity = "1";
    }, 500); 

    // Agar CSS mein opacity: 0 set nahi hai, toh yahan set karna zaroori hai
    // document.body.style.opacity = "0"; 

    // --- 2. Navbar Scroll Effect ---
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return; // Agar navbar element na mile toh ruk jao

        if (window.scrollY > 50) {
            // 'scrolled' class add karein (for CSS styling like box-shadow)
            navbar.classList.add('scrolled'); 
            // Inline style se padding kam karein (if required by design)
            navbar.style.padding = '10px 0'; 
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.padding = '15px 0'; // Initial padding
        }
    });

    // --- 3. Chatbot Logic (Refined for robustness) ---
    const chatBtn = document.getElementById('chatBtn');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    
    if (chatBtn && chatBox && closeChat) {
        
        // Listener to open/toggle the chatbox
        chatBtn.addEventListener('click', () => {
            chatBox.classList.toggle('active'); 
            chatBtn.classList.toggle('active'); 
        });

        // Listener to close the chatbox
        closeChat.addEventListener('click', () => {
            chatBox.classList.remove('active');
            chatBtn.classList.remove('active');
        });
    } else {
        // console.warn("Chatbot elements not found in the DOM."); // Production mein yeh line hata sakte hain
    }


    // --- 4. Bootstrap Validation (Aam taur par yeh form pages par use hota hai) ---
    (function () {
        'use strict'
        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
    })()

    // --- 5. Gallery Logic (Robust check for elements) ---
    const images = document.querySelectorAll(".gallery-img");
    const modalImg = document.getElementById("modal-img");
    const galleryModalElement = document.getElementById("galleryModal");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (galleryModalElement && images.length > 0 && modalImg && prevBtn && nextBtn) {
        const galleryModal = new bootstrap.Modal(galleryModalElement);
        let galleryIndex = 0;

        // Function to update the modal image
        const updateModalImage = () => {
            modalImg.src = images[galleryIndex].src;
        };

        // Open modal on image click
        images.forEach(img => {
            img.addEventListener("click", () => {
                const dataIndex = img.getAttribute("data-index");
                if (dataIndex !== null) {
                    galleryIndex = parseInt(dataIndex);
                    updateModalImage();
                    galleryModal.show();
                }
            });
        });

        // Previous image
        prevBtn.addEventListener("click", () => {
            galleryIndex = (galleryIndex - 1 + images.length) % images.length;
            updateModalImage();
        });

        // Next image
        nextBtn.addEventListener("click", () => {
            galleryIndex = (galleryIndex + 1) % images.length;
            updateModalImage();
        });
    }

}); // End of DOMContentLoaded


// --- Global function for Chatbot options (Must be global to be accessed by HTML 'onclick') ---
function sendOption(option) {
    const chatContent = document.getElementById('chatContent');
    if (!chatContent) return;

    // 1. User Message
    const userMsg = document.createElement('div');
    userMsg.classList.add('user-msg');
    userMsg.textContent = option;
    chatContent.appendChild(userMsg);

    // 2. Remove old options
    const optionsDiv = chatContent.querySelector('.chat-options');
    if (optionsDiv) optionsDiv.remove();

    // 3. Show Loading / Typing Indicator
    const loadingMsg = document.createElement('div');
    loadingMsg.classList.add('bot-msg', 'loading');
    loadingMsg.innerHTML = `<span class="typing">Typing<span>.</span><span>.</span><span>.</span></span>`;
    chatContent.appendChild(loadingMsg);
    chatContent.scrollTop = chatContent.scrollHeight;

    // 4. Simulate Bot Response Delay
    setTimeout(() => {

        // Remove loading
        loadingMsg.remove();

        const botMsg = document.createElement('div');
        botMsg.classList.add('bot-msg');

        switch(option) {
            case 'Fee Structure':
                botMsg.innerText = "Our fee structure varies by program. FSc is approximately 5,000 PKR per month. Please visit the Admissions page for full details.";
                break;
            case 'Timings':
                botMsg.innerText = "Morning Shift: 8:00 AM – 1:00 PM. Evening Shift: 3:00 PM – 8:00 PM.";
                break;
            case 'Admission Process':
                botMsg.innerText = "You can apply online through the Online Admission page or visit our campus with required documents.";
                break;
            case 'Contact Number':
                botMsg.innerText = "You can contact us at 0300-1234567 or 0242-123456.";
                break;
            default:
                botMsg.innerText = "How else can I assist you today?";
        }

        chatContent.appendChild(botMsg);
        chatContent.scrollTop = chatContent.scrollHeight;

        // 5. Re-add options
        setTimeout(() => {
            const newOptionsDiv = document.createElement('div');
            newOptionsDiv.classList.add('chat-options', 'mt-3');
            newOptionsDiv.innerHTML = `
                <button onclick="sendOption('Fee Structure')">Fee Structure</button>
                <button onclick="sendOption('Admission Process')">Admission Process</button>
                <button onclick="sendOption('Timings')">Class Timings</button>
                <button onclick="sendOption('Contact Number')">Contact Number</button>
            `;
            chatContent.appendChild(newOptionsDiv);
            chatContent.scrollTop = chatContent.scrollHeight;
        }, 400);

    }, 1200); // ⏳ Loading delay (1.2s)
}