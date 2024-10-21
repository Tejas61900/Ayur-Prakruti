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
});