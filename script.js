// Wait for the DOM (Document Object Model) to fully load before running the code
document.addEventListener("DOMContentLoaded", function () {
  // Get references to important elements in the HTML document
  const calculateButton = document.getElementById("calculateButton");
  const errorMessages = document.getElementById("errorMessages");
  const receipt = document.getElementById("receipt");

  // Add a click event listener to the "Calculate" button
  calculateButton.addEventListener("click", function () {
    // Clear any previous error messages
    errorMessages.innerHTML = "";

    // Helper function for displaying error messages
    function showError(message) {
      errorMessages.innerHTML += `<p>${message}</p>`;
    }

    // Get user input values from form fields and trim is used for space deduction in the value input
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const creditCard = document.getElementById("creditCard").value.trim();
    const itemQuantity = parseInt(
      document.getElementById("itemQuantity").value
    );

    // Validate user input for name and email
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name || !nameRegex.test(name)) {
      showError("Enter valid name");
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || !emailRegex.test(email)) {
      showError("Email is required.");
    }

    // Validate the format of the credit card number using a regular expression
    if (!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(creditCard)) {
      showError("Invalid credit card format. Use xxxx-xxxx-xxxx-xxxx.");
    }

    // Validate the item quantity
    if (isNaN(itemQuantity) || itemQuantity <= 0) {
      showError("Invalid item quantity. Please enter a valid number.");
    }

    const expMonth = document.getElementById("expmonth").value;
    const expYear = document.getElementById("expyear").value;

    // Regular expressions for credit card expiry month (MMM) and year (YYYY)
    const expMonthRegex = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/;
    const expYearRegex = /^\d{4}$/;

    // Validate expiry month using regex
    if (!expMonth || !expMonthRegex.test(expMonth)) {
      showError(" Entr valid expmonth");
    } else {
    }

    // Validate expiry year using regex
    if (!expYear || !expYearRegex.test(expYear)) {
      showError("Enter valid expyear");
    } else {
    }

    // If there are no validation errors
    if (errorMessages.innerHTML === "") {
      // Generate a receipt HTML the slice funtion is putting pin last 4 digit
      const last4Digits = creditCard.slice(-4);
      const receiptHTML = `
              
                 <p>Name: ${name}</p>
                  <p>Email: ${email}</p>
                  <p>Credit Card (Last 4 digits): ${last4Digits}</p>
                  <p>Items Purchased: ${selectedItems()}</p>
                  <p>Total Cost: $${itemQuantity * totalItemCost()}</p>
                  <p>Donat <h2>Receipt</h2>
                  ion Amount: $${calculateDonation(
                    itemQuantity * totalItemCost()
                  )}</p>
              `;
      // Display the receipt on the webpage
      receipt.innerHTML = receiptHTML;
    }
  });

  // Define helper functions (same as in the previous response)
  // ...

  // Helper function to calculate the total cost of selected items
  function totalItemCost() {
    const itemPrices = {
      MACBOOK: 100,
      SSD: 150,
      GOPRO: 200,
      DSLR: 25,
      HDMI: 30,
    };

    let totalCost = 0;
    //iT IS PLOTING THE SELECTD ITEMS
    const selectedItems = document.querySelectorAll(".item:checked");
    /// It is calculating tost cost using for each from the checkbox we clicked
    selectedItems.forEach((item) => {
      //+= is incrmenting total cost by item price
      totalCost += itemPrices[item.value];
    });

    return totalCost;
  }

  // Helper function to calculate the minimum donation amount
  function calculateDonation(totalCost) {
    const donationFlat = 10; // Minimum $10 donation
    const donationPercentage = 0.1; // 10% of the total cost
    // IT IS GETTING THE MAXIMUM VALUE BETWEEN DONATION FLAT AND DONATION PERCENTAGE
    const minimumDonation = Math.max(
      donationFlat,
      donationPercentage * totalCost
    );

    return minimumDonation;
  }

  // Helper function to get a comma-separated list of selected items
  function selectedItems() {
    //Checked item is preloaded to receipt table in our form
    const selectedItems = document.querySelectorAll(".item:checked");
    // its constructing an array of itemname from seleected item
    const itemNames = Array.from(selectedItems).map((item) => item.value);
    //its converting array into comma seperated string
    return itemNames.join(", ");
  }
});
