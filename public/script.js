function toggleCustomize() {
    var customOptions = document.getElementById('custom-options');
    // var linkText = document.getElementById('customizeLink');
    customOptions.style.display = customOptions.style.display === 'inline' ? 'none' : 'inline';
    linkText.textContent= linkText.textContent === 'more options' ? 'hide options' : 'more options';
}


// add to home screen code

// document.getElementById('saveAppBtn').addEventListener('click', function() {      
//     console.log("hello....saveAppBtn")
//       var popover = document.getElementById('instructionPopover');
//       popover.style.display = 'block';      
//       setTimeout(function() {
//         popover.style.display = 'none';      
//       }, 4000); // This will hide the popover after 4 seconds
//     });



// GET RECOMMENDAATION submit call

document.getElementById('mainForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    incrementAttempts(); // Increment the attempt count each time the form is submitted
    const attempts = getAttempts(); // Get the updated attempt count

     // Disable the submit button and hide the customize link
    const submitButton = document.getElementById('mainCTA');
    // const customizeLink = document.getElementById('customizeLink');
    const mainFormDiv = document.getElementById('mainFormDiv');
    const headlineText = document.getElementById('headlineText');
    const prevActivityTitle = document.getElementById('activityTitle') && document.getElementById('activityTitle').innerHTML || null;
    
    submitButton.disabled = true;
    // customizeLink.style.display = 'none'; // Hide the customize link
    mainFormDiv.style.display = 'none'; // Hide the main form div
    headlineText.style.display = 'none';
    document.getElementById('container').style.minHeight = 'auto';



    const kidsAge = document.getElementById('kidsAge').value;
    const timeAvailable = document.getElementById('timeAvailable').value;
    const interests = document.getElementById('interests').value;
    const playWith = document.getElementById('playWith').value;



   //tracking - only track prod events
    if (window.location.hostname !== 'localhost') {
      const eventProperties = {
              kidsAge: kidsAge,
              timeAvailable: timeAvailable,
              interests: interests,
              playWith: playWith
          };
          window.amplitude.track('Search recommendations', eventProperties);
    }

    
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = '<p class="feedback" style="font-size:1.4em; padding:80px 0px 160px 0px;"><img src="fidgetspinner.gif"/><br>Scavenger hunting for fun...</p>';


    const response = await fetch('/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ kidsAge, timeAvailable,interests,playWith,attempts, prevActivityTitle })
    });
    
    const data = await response.text();

    // Re-enable the button and show the customize link again
    submitButton.disabled = false;
    // customizeLink.style.display = ''; // Show the customize link
    mainFormDiv.style.display = ''; // Show the main form div


    
    responseDiv.innerHTML = data;
  });


// adjustable width of select

function adjustSelectWidth() {
  var customSelects = document.querySelectorAll('.custom-select');
  customSelects.forEach(function(select) {
    var selectedOption = select.options[select.selectedIndex];
    var tempSpan = document.createElement("span");
    tempSpan.textContent = selectedOption.textContent;
    tempSpan.style.visibility = "hidden";
    document.body.appendChild(tempSpan);
    select.style.width = tempSpan.offsetWidth + 52 + "px";
    document.body.removeChild(tempSpan);
  });
}

// Call adjustSelectWidth() initially for all elements with the custom-select class
adjustSelectWidth();

// Add event listener to each custom select for change event
document.querySelectorAll('.custom-select').forEach(function(select) {
  select.addEventListener('change', adjustSelectWidth);
});



// Function to get the current number of attempts from local storage
function getAttempts() {
    const attempts = localStorage.getItem('searchAttempts');
    return attempts ? parseInt(attempts, 10) : 0; // Parse the string to an integer, defaulting to 0 if not found
}

// Function to increment the attempt count in local storage
function incrementAttempts() {
    const currentAttempts = getAttempts();
    localStorage.setItem('searchAttempts', currentAttempts + 1);
}

// Function to reset attempts (if needed, e.g., per session/day)
function resetAttempts() {
    localStorage.setItem('searchAttempts', 0);
}
