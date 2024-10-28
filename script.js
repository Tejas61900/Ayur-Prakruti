document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('result');
    const certificateSection = document.querySelector('.certificate-section');
    const downloadBtn = document.getElementById('downloadBtn');

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
    });

    downloadBtn.addEventListener('click', function () {
        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value.trim();
        const sex = document.getElementById('sex').value;
        const address = document.getElementById('address').value.trim();

        // Check if all fields are filled
        if (!name || !age || !sex || !address) {
            alert("Please fill in all details.");
            return; // Exit the function if validation fails
        }

        // Create a certificate as a canvas
        const certificate = document.createElement('canvas');
        const ctx = certificate.getContext('2d');
        certificate.width = 800;
        certificate.height = 600;

        // Draw the certificate background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, certificate.width, certificate.height);
        ctx.fillStyle = "#000000";
        ctx.font = "30px Arial";
        ctx.fillText("Certificate of Prakruti Assessment", 50, 100);
        ctx.font = "20px Arial";
        ctx.fillText(`Name: ${name}`, 50, 200);
        ctx.fillText(`Age: ${age}`, 50, 240);
        ctx.fillText(`Sex: ${sex}`, 50, 280);
        ctx.fillText(`Address: ${address}`, 50, 320);
        ctx.fillText(`Your dominant dosha is: ${maxDosha}`, 50, 360);

        // Convert to image and download
        const link = document.createElement('a');
        link.href = certificate.toDataURL();
        link.download = `${name}-certificate.png`;
        link.click();
    });
});