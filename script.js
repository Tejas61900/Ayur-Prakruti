document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('result');
    const certificateSection = document.querySelector('.certificate-section');
    const downloadBtn = document.getElementById('downloadBtn');
    let maxDosha = ''; // To hold the dominant dosha

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Count dosha responses
        let doshaCount = { Vata: 0, Pitta: 0, Kapha: 0 };

        // Loop through all questions and count the selected doshas
        for (let i = 1; i <= 16; i++) {
            const selectedOption = document.querySelector(`input[name="question${i}"]:checked`);
            if (selectedOption) {
                doshaCount[selectedOption.value]++;
            }
        }

        // Determine the dominant dosha
        maxDosha = Object.keys(doshaCount).reduce((a, b) => doshaCount[a] > doshaCount[b] ? a : b);
        resultDiv.innerHTML = `Your dominant dosha is: <strong>${maxDosha}</strong>`;

        // Show a confirmation dialog for certificate download
        const userConfirmation = confirm("Would you like to download your certificate?");
        if (userConfirmation) {
            certificateSection.style.display = 'block'; // Show the certificate section
            openCertificateWindow();
        }
    });

    function openCertificateWindow() {
        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value.trim();
        const sex = document.getElementById('sex').value;
        const address = document.getElementById('address').value.trim();

        // Check if all fields are filled
        if (!name || !age || !sex || !address) {
            alert("Please fill in all details before generating the certificate.");
            return; // Exit if validation fails
        }

        // Create certificate content
        const certificateContent = `
            <div class="certificate">
                <h2>Prakruti Assessment Certificate</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Age:</strong> ${age}</p>
                <p><strong>Sex:</strong> ${sex}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Prakriti Result:</strong> ${maxDosha}</p>
                <p>Thank you for completing the Prakruti Assessment!</p>
            </div>
        `;

        // Open certificate in new window
        const certificateWindow = window.open('', '_blank');
        certificateWindow.document.write(`
            <html>
            <head>
                <title>Certificate</title>
                <link rel="stylesheet" href="style.css">
                <style>
                    .certificate { padding: 30px; border: 5px solid #333; max-width: 600px; margin: auto; text-align: center; font-family: Arial, sans-serif; }
                    .certificate h2 { color: #4CAF50; }
                    .certificate p { font-size: 18px; }
                </style>
            </head>
            <body>${certificateContent}</body>
            </html>
        `);
        certificateWindow.document.close();
        certificateWindow.onload = function() {
            certificateWindow.print(); // Prompt the user to print the certificate
        };
    }
});