document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('result');
    const certificateSection = document.querySelector('.certificate-section');
    
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

        // Display the results
        const maxDosha = Object.keys(doshaCount).reduce((a, b) => doshaCount[a] > doshaCount[b] ? a : b);
        resultDiv.innerHTML = `Your dominant dosha is: <strong>${maxDosha}</strong>`;
        certificateSection.style.display = 'block'; // Show the certificate section

        // Prompt for user details
        const name = prompt("Please enter your name:");
        const age = prompt("Please enter your age:");
        const sex = prompt("Please enter your sex (M/F/Other):");
        const address = prompt("Please enter your address:");

        // Check if all fields are filled
        if (!name || !age || !sex || !address) {
            alert("All details must be filled to generate the certificate.");
            return; // Exit the function if validation fails
        }

        // Ask if they want to download the certificate
        const downloadConfirm = confirm("Do you want to download your certificate?");
        if (downloadConfirm) {
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
                        .certificate {
                            padding: 40px;
                            border: 10px solid #4CAF50; /* Green border */
                            max-width: 700px;
                            margin: auto;
                            text-align: center;
                            font-family: 'Arial', sans-serif;
                            background-color: #f9f9f9; /* Light background */
                            border-radius: 10px; /* Rounded corners */
                            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow */
                        }
                        .certificate h2 {
                            color: #4CAF50; /* Green color for the title */
                            font-size: 36px; /* Larger font for the title */
                            margin-bottom: 20px;
                        }
                        .certificate p {
                            font-size: 20px; /* Slightly larger font for content */
                            margin: 10px 0; /* Spacing between paragraphs */
                        }
                    </style>
                </head>
                <body>${certificateContent}</body>
                </html>
            `);
            certificateWindow.document.close();
            certificateWindow.focus(); // Focus the new window
            certificateWindow.print(); // Prompt the user to print the certificate
        } else {
            alert("You chose not to download the certificate.");
        }
    });
});