document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('result');
    let maxDosha = ''; // To hold the dominant dosha

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission behavior

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

        // Ask user if they want to download the certificate
        const userConfirmation = confirm("Would you like to download your certificate?");
        if (userConfirmation) {
            openDetailsWindow(); // Open the details window for certificate info
        }
    });

    function openDetailsWindow() {
        const detailsWindow = window.open('', '_blank', 'width=600,height=400');
        detailsWindow.document.write(`
            <html>
            <head>
                <title>Certificate Details</title>
                <link rel="stylesheet" href="style.css">
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h2 { color: #4CAF50; }
                    input { width: 100%; padding: 10px; margin: 5px 0; }
                    button { background-color: #007BFF; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer; }
                    button:hover { background-color: #0056b3; }
                </style>
            </head>
            <body>
                <h2>Fill Your Details</h2>
                <label>Name: <input type="text" id="name"></label>
                <label>Age: <input type="number" id="age"></label>
                <label>Sex: 
                    <select id="sex">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <label>Address: <input type="text" id="address"></label>
                <button id="generateCertificate">Generate Certificate</button>

                <script>
                    document.getElementById('generateCertificate').addEventListener('click', function () {
                        const name = document.getElementById('name').value.trim();
                        const age = document.getElementById('age').value.trim();
                        const sex = document.getElementById('sex').value;
                        const address = document.getElementById('address').value.trim();

                        // Check if all fields are filled
                        if (!name || !age || !sex || !address) {
                            alert("Please fill in all details.");
                            return; // Exit the function if validation fails
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

                        // Open certificate in a new window
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

                        // Close details window
                        detailsWindow.close(); // Close the details window
                    });
                </script>
            </body>
            </html>
        `);
        detailsWindow.document.close();
    }
});