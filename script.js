async function getUser(place) {
    const api_url = `https://timezone.abstractapi.com/v1/current_time/?api_key=YOUR_API_KEY&location=${place}`;
    
    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);  // Log the entire response to check its structure

        // Make sure to access the correct properties
        const time = data.datetime;  // Verify that 'datetime' is the correct property
        const timezone = data.timezone_abbreviation;  // Verify that 'timezone_abbreviation' is the correct property

        document.getElementById("time").innerText = `${place}'s time = ${time} ${timezone}`;
    } catch (error) {
        console.error('Error fetching the time:', error);
        document.getElementById("time").innerText = `Error fetching time for ${place}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".allPaths").forEach(e => {
        e.setAttribute('class', `allPaths ${e.id}`);
        e.addEventListener("mouseover", async function () {
            window.onmousemove = function (j) {
                const x = j.clientX;
                const y = j.clientY;
                document.getElementById('name').style.top = (y - 60) + 'px';
                document.getElementById('name').style.left = (x + 10) + 'px';
            };
            const classes = e.className.baseVal.replace(/ /g, '.');
            document.querySelectorAll(`.${classes}`).forEach(country => {
                country.style.fill = "pink";
            });
            document.getElementById("name").style.opacity = 1;
            
            document.getElementById("namep").innerText = e.id;

            await getUser(e.id); // Call getUser to fetch and display the time
        });

        e.addEventListener("mouseleave", function () {
            const classes = e.className.baseVal.replace(/ /g, '.');
            document.querySelectorAll(`.${classes}`).forEach(country => {
                country.style.fill = "#ececec";
            });
            document.getElementById("name").style.opacity = 0;
        });

        e.addEventListener("click", function() {
            getUser(e.id);
        });
    });
});
