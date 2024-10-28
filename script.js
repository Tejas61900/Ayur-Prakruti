document.getElementById("quiz-form").addEventListener("submit", function(event){
    event.preventDefault();
    
    // Gather user inputs
    const elements = document.getElementById("quiz-form").elements;
    let vataCount = 0, pittaCount = 0, kaphaCount = 0;
    
    // Loop through each question's answers
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            if (elements[i].value === "Vata") vataCount++;
            if (elements[i].value === "Pitta") pittaCount++;
            if (elements[i].value === "Kapha") kaphaCount++;
        }
    }

    // Determine dominant Prakriti
    let result = "";
    if (vataCount > pittaCount && vataCount > kaphaCount) {
        result = "Your dominant Prakriti is Vata.";
    } else if (pittaCount > vataCount && pittaCount > kaphaCount) {
        result = "Your dominant Prakriti is Pitta.";
    } else if (kaphaCount > vataCount && kaphaCount > pittaCount) {
        result = "Your dominant Prakriti is Kapha.";
    } else {
        result = "You have a balanced Prakriti.";
    }

    // Display result
    document.getElementById("result").innerHTML = result;

    // Generate Certificate
    generateCertificate();
});

function generateCertificate() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const address = document.getElementById("address").value;

    if (!name || !age || !sex || !address) {
        alert("Please fill in all details.");
        return;
    }

    // Certificate content
    const certificateContent = `
        <div class="certificate">
            <h2>Prakruti Assessment Certificate</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Sex:</strong> ${sex}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Prakriti Result:</strong> ${document.getElementById("result").innerText}</p>
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
        <body>${certificateContent}</body></html>
    `);
    certificateWindow.document.close();
    certificateWindow.print();
}