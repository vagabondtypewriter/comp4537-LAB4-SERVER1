function searchDefinition() {
    const searchTerm = document.getElementById('word-input').value.trim();

    // Perform input validation
    if (!searchTerm) {
        document.getElementById('feedback').innerText = 'Please enter a non-empty search term.';
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/search?term=' + encodeURIComponent(searchTerm), true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                if (response.word === searchTerm) {
                    // Update the 'definition' div with the retrieved definition
                    document.getElementById('definition').innerText = response.definition;
                    // Update the 'feedback' div with a success message and total requests/entries
                    document.getElementById('feedback').innerHTML = `Successfully found a definition! Total definitions: ${response.totalEntries}, Total requests: ${response.totalRequests}`;
                } else {
                    // If the word is not found, update the 'feedback' div with an appropriate message
                    document.getElementById('feedback').innerText = `Word '${searchTerm}' not found!`;
                    // Clear the 'definition' div
                    document.getElementById('definition').innerText = '';
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                document.getElementById('feedback').innerText = 'Error parsing JSON response.';
            }
        } else {
            // Handle other HTTP status codes
            document.getElementById('feedback').innerText = 'Failed to perform search. Please try again.';
            // Clear the 'definition' div
            document.getElementById('definition').innerText = '';
        }
    };
    
    // Handle network errors
    xhr.onerror = function () {
        document.getElementById('feedback').innerText = 'Network error occurred. Please try again later.';
        // Clear the 'definition' div
        document.getElementById('definition').innerText = '';
    };
    xhr.send();
}
