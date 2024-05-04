function toggleCustomize() {
    var customOptions = document.getElementById('custom-options');
    customOptions.style.display = customOptions.style.display === 'block' ? 'none' : 'block';
}



// GET RECOMMENDAATION submit call

document.getElementById('mainForm').addEventListener('submit', async (event) => {

    event.preventDefault();

    const submitButton = document.getElementById('mainCTA');
    const customizeLink = document.getElementById('customizeLink');
    submitButton.disabled = true;
    customizeLink.style.display = 'none';

    const kidsAge = document.getElementById('kidsAge').value;
    const timeAvailable = document.getElementById('timeAvailable').value;
    const interests = document.getElementById('interests').value;
    const playWith = document.getElementById('playWith').value;
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = '<p class="feedback" style="font-size:1em;">Scavenger hunting for fun...</p>';

    const response = await fetch('/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kidsAge, timeAvailable, interests, playWith })
    });

    const data = await response.text();    

    responseDiv.innerHTML = data;
    submitButton.disabled = false;
    customizeLink.style.display = '';
});
