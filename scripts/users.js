import infoContainer from "./infoContainer.js";

function getEmployeeIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

function formatDate(date) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const day = date.day;
    const month = months[date.month - 1];
    const year = date.year;

    return `${day} ${month} ${year}`;
}

export default function loadEmployeeProfile() {
    const profileView = document.querySelector("main");
    const employeeId = getEmployeeIdFromURL();

    profileView.innerHTML = '<p class="loader">Loading...</p>';

    const fetchData = () => fetch("../data.json").then((response) => response.json());

    function loadProfile (data, id) {
        const employee = data.find((person) => String(person._id) === String(id));

        console.log("employee: ", employee);

        profileView.innerHTML = `
            <aside>
                <div class="back">
                    <img src="../assets/less.png" alt="Back arrow" width="15px" height="15px"/>
                </div>
                <img src="../assets/${employee.first_name}.png" alt="${employee.first_name} ${employee.last_name}" width="120px" height="120px"/>
                <p>${employee.first_name} ${employee.last_name}</p>
                <p>${employee.first_name} ${employee.middle_native_name} ${employee.last_name}</p>
                <div class="copy">
                    <img src="../assets/copy.png" alt="Copy icon" width="30px" height="30px"/>
                    <p>Copy link</p>
                </div>
                <div class="edit">
                    <img src="../assets/pen.png" alt="Edit icon" width="25px" height="25px"/>
                    <p>Edit</p>
                </div>
            </aside>
            <section>
                <div>
                    <h3>GENERAL INFO</h3>
                    <div class="line"></div>
                    <div class="info-container">
                        <div class="info-left">
                            <div class="info-list"><img src="../assets/suitcase.png" alt="Suitcase icon" width="20px" height="20px"/><p>Department</p></div>
                            <div class="info-list"><img src="../assets/building.png" alt="Building icon" width="20px" height="20px"/><p>Building</p></div>
                            <div class="info-list"><img src="../assets/door.png" alt="Door icon" width="20px" height="20px"/><p>Room</p></div>
                            <div class="info-list"><img src="../assets/number.png" alt="Desk icon" width="20px" height="20px"/><p>Desk number</p></div>
                            <div class="info-list"><img src="../assets/date.png" alt="Date icon" width="20px" height="20px"/><p>Date of birth</p></div>
                            <div class="info-list"><img src="../assets/man-name.png" alt="Manager icon" width="20px" height="20px"/><p>Manager</p></div>
                        </div>
                        <div class="info-right">
                            <p>${employee.department}</p>
                            <p>${employee.building}</p>
                            <p>${employee.room}</p>
                            <p>${employee.desk_number}</p>
                            <p>${formatDate(employee.date_birth)}</p>
                            <p>${employee.manager.first_name} ${employee.manager.last_name}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>CONTACTS</h3>
                    <div class="line"></div>
                    <div class="info-container">
                        <div class="info-left">
                            <div class="info-list"><img src="../assets/mobile.png" alt="Mobile icon" width="20px" height="20px"/><p>Mobile phone</p></div>
                            <div class="info-list"><img src="../assets/email.png" alt="Email icon" width="20px" height="20px"/><p>Email</p></div>
                            <div class="info-list"><img src="../assets/skype.png" alt="Skype icon" width="20px" height="20px"/><p>Skype</p></div>
                            <div class="info-list"><img src="../assets/c-number.png" alt="C-Number icon" width="20px" height="20px"/><p>C-Number</p></div>
                        </div>
                        <div class="info-right">
                            <p><a href="tel:${employee.phone}">${employee.phone}</a></p>
                            <p><a href="mailto:${employee.email}">${employee.email}</a></p>
                            <p>${employee.skype}</p>
                            <p>${employee.cnumber}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>TRAVEL INFO</h3>
                    <div class="line"></div>
                    <div class="info-container">${infoContainer(employee)}</div>
                </div>
            </section>
        `;

        document.querySelector(".back").addEventListener("click", () => {
            window.history.back();
        });

        document.querySelector(".copy").addEventListener("click", () => {
            const url = window.location.href;
            navigator.clipboard.writeText(url)
                .then(() => {
                    alert("Link copied to clipboard!");
                })
                .catch((error) => {
                    console.error("Error copying the link:", error);
                });
        });
    };

    fetchData()
    .then((data) => {
        console.log("Fetched data:", data);
        loadProfile(data, employeeId);
    })
        .catch((error) => {
            window.location.href = "../pages/404.html";
            return;
        });
}

