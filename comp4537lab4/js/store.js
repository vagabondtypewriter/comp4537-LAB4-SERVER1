function submitDefinition() {
    const word = document.getElementById('word-input').value.trim();
    const definition = document.getElementById('definition').value.trim();
    const xhr = new XMLHttpRequest();

    // Perform input validation
    if (!word || !definition || !isNaN(word) || !isNaN(definition)) {
        document.getElementById('feedback').innerText = 'Please enter non-empty and non-number values for both word and definition.';
        return;
    }

    // Configure the request to connect to localhost:3000
    xhr.open('POST', 'http://localhost:3000/store-definition', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Success
            const response = JSON.parse(xhr.responseText);
            document.getElementById('definition').innerText = response.definition;
            document.getElementById('feedback').innerText = `Definition submitted successfully! Total requests: ${response.totalRequests}, total entries: ${response.totalEntries}`;
        } else if (xhr.status === 404) {
            // Not Found
            document.getElementById('feedback').innerText = xhr.responseText;
        } else if (xhr.status === 400) {
            // Bad Request (Word already exists in the dictionary)
            document.getElementById('feedback').innerText = 'Word already exists in the dictionary.';
        } else {
            // Other failure
            document.getElementById('feedback').innerText = 'Failed to submit definition. Please try again.';
        }
    };
    
    // Handle network errors
    xhr.onerror = function () {
        document.getElementById('feedback').innerText = 'Network error occurred. Please try again later.';
    };

    // Send the request
    xhr.send(JSON.stringify({ word: word, definition: definition }));
}
