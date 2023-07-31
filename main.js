const form = document.querySelector("#myForm");

form.addEventListener("submit", (event) => {
    // preveent page refresh
    event.preventDefault();

    // Initialize user form data
    const formData = new FormData();
    const data = object.fromEntries(formData);
    document.querySelector(".modal-wrapper").setAttribute("hidden", true);
    console.log(data);
})