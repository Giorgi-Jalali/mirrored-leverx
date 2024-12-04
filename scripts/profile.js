import infoContainer from "./infoContainer.js";

export default function loadEmployeeProfile(employeeId) {
    const profileView = document.querySelector("main");

    const fetchData = () =>
        fetch("../data.json").then((response) => response.json());

    const loadProfile = (data, id) => {
        function formatDate(date) {
            const months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];

            const day = date.day;
            const month = months[date.month - 1];
            const year = date.year;

            return `${day} ${month} ${year}`;
        }

        const employee = data.find((person) => person.id === id);

        if (!employee) {
            profileView.innerHTML = "<p>Employee not found.</p>";
            return;
        }

        profileView.innerHTML = `
                <aside>
                    <div class="back">
                        <img
                            src="../assets/less.png"
                            alt="less than arrow"
                            width="15px"
                            height="15px"
                        />
                    </div>
                <img
                    src="../assets/${employee.first_name}.png"
                    alt="${employee.first_name} ${employee.last_name}"
                    width="120px"
                    height="120px"
                />
                <p>${employee.first_name} ${employee.last_name}</p>
                <p>${employee.first_name} ${employee.middle_native_name} ${
            employee.last_name
        }</p>
                <div class="copy">
                    <img
                        src="../assets/copy.png"
                        alt="copy icon"
                        width="30px"
                        height="30px"
                    />
                    <p>Copy link</p>
                </div>
                <div class="edit">
                    <img
                        src="../assets/pen.png"
                        alt="copy icon"
                        width="25px"
                        height="25px"
                    />
                    <p>Edit</p>
                </div>
            </aside>
            <section>
                <div>
                    <h3>GENERAL INFO</h3>
                    <div class="line"></div>
                    <div class="info-container">
                        <div class="info-left">
                            <div class="info-list">
                                <img
                                    src="../assets/suitcase.png"
                                    alt="suitcase icon"
                                    width="20px"
                                    height="20px"
                                />
                                <p>Department</p>
                            </div>
                            <div class="info-list">
                                <img
                                    src="../assets/building.png"
                                    alt="building icon"
                                    width="20px"
                                    height="20px"
                                />
                                <p>Building</p>
                            </div>
                            <div class="info-list">
                                <img
                                    src="../assets/door.png"
                                    alt="door icon"
                                    width="20px"
                                    height="20px"
                                />
                                <p>room</p>
                            </div>
                            <div class="info-list">
                                <img
                                    src="../assets/number.png"
                                    alt="number icon"
                                    width="20px"
                                    height="20px"
                                />
                                <p>Desk number</p>
                            </div>
                            <div class="info-list">
                                <img
                                    src="../assets/date.png"
                                    alt="date icon"
                                    width="20px"
                                    height="20px"
                                />
                                <p>Date of birth</p>
                            </div>
                            <div class="info-list">
                                <img
                                    src="../assets/man-name.png"
                                    alt="person icon"
                                    width="20px"
                                    height="20px"
                                />
                                <p>Manager</p>
                            </div>
                        </div>
                        <div class="info-right">
                            <p class="info-list">${employee.department}</p>
                            <p>${employee.building}</p>
                            <p>${employee.room}</p>
                            <p>${employee.desk_number}</p>
                            <p>${formatDate(employee.date_birth)}</p>
                            <p>${employee.manager.first_name} ${
            employee.manager.last_name
        }</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>CONTACTS</h3>
                    <div class="line"></div>
                    <div class="info-container">
                        <div class="info-left">
                            <div class="info-list">
                                <img
                                    src="../assets/mobile.png"
                                    alt="mobile icon"
                                    width="20px"
                                    height="20px"
                                />
                                <p>Mobile phone</p>
                            </div>
                            <div class="info-list">
                                <img
                                    src="../assets/email.png"
                                    alt="building icon"
                                    width="20px"
                                    height="20px"
                                />
                                <p>Email</p>
                            </div>
                            <div class="info-list">
                                <img
                                    src="../assets/skype.png"
                                    alt="door icon"
                                    width="20px"
                                    height="20px"
                                />
                                <p>Skype</p>
                            </div>
                            <div class="info-list">
                                <img
                                    src="../assets/c-number.png"
                                    alt="number icon"
                                    width="20px"
                                    height="20px"
                                />
                                <p>C-Number</p>
                            </div>
                        </div>
                        <div class="info-right">
                            <p><a href="tel:+995574812225">${
                                employee.phone
                            }</a></p>
                            <p>
                                <a href="mailto:${employee.email}"
                                    >${employee.email}</a
                                >
                            </p>
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

        const backButton = document.querySelector(".back");
        backButton.addEventListener("click", () => {
            window.history.back();
        });
    };

    fetchData()
        .then((data) => loadProfile(data, employeeId))
        .catch((error) => {
            console.error("Error loading profile data:", error);
            profileView.innerHTML = "<p>Error loading profile.</p>";
        });
}
