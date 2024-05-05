function toggleCustomize() {
    var customOptions = document.getElementById('custom-options');
    customOptions.style.display = customOptions.style.display === 'block' ? 'none' : 'block';
}



// GET RECOMMENDAATION submit call

document.getElementById('mainForm').addEventListener('submit', async (event) => {
    event.preventDefault();

     // Disable the submit button and hide the customize link
    const submitButton = document.getElementById('mainCTA');
    const customizeLink = document.getElementById('customizeLink');
    submitButton.disabled = true;
    customizeLink.style.display = 'none'; // Hide the customize link


    const kidsAge = document.getElementById('kidsAge').value;
    const timeAvailable = document.getElementById('timeAvailable').value;
    const interests = document.getElementById('interests').value;
    const playWith = document.getElementById('playWith').value;
    
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = '<p class="feedback" style="font-size:1em;"><img src=""/>Scavenger hunting for fun...</p>';
    
    const response = await fetch('/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ kidsAge, timeAvailable,interests,playWith })
    });
    
    const data = await response.text();

    // Re-enable the button and show the customize link again
    submitButton.disabled = false;
    customizeLink.style.display = ''; // Show the customize link


    
    responseDiv.innerHTML = data;
  });



// add to home screen code

document.getElementById('saveAppBtn').addEventListener('click', function() {      
      var popover = document.getElementById('instructionPopover');
      popover.style.display = 'block';      
      setTimeout(function() {
        popover.style.display = 'none';      
      }, 4000); // This will hide the popover after 4 seconds
    });

