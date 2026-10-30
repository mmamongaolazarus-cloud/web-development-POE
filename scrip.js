document.addEventListener('DOMContentLoaded', function () {
    var date = new Date();
    var dateText = document.getElementById('today');
    if (dateText) {
        dateText.textContent = date.toLocaleDateString();
    }

    var enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function (event) {
            var name = document.getElementById('fullname').value.trim();
            var email = document.getElementById('email').value.trim();

            if (name === '') {
                event.preventDefault();
                alert('Please enter your full name.');
                return;
            }

            if (email === '') {
                event.preventDefault();
                alert('Please enter your email address.');
                return;
            }

            alert('Thank you. Your enquiry is ready to be sent.');
        });
    }
});
