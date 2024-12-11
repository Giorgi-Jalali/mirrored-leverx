import infoContainer from "./infoContainer";

const storedEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
const storedUserRole = localStorage.getItem("currentUserRole") || sessionStorage.getItem("currentUserRole");
const storedUserId = localStorage.getItem("currentUserId") || sessionStorage.getItem("currentUserId");
// let currentUser: any;

// if (storedEmail) {
//     try {
//         const users = await loadAll();
//         currentUser = users.find((user: any) => user.email === storedEmail);

//     } catch (error) {
//         console.error("Error fetching user data:", error);
//     }
// } else {
//     console.error("No email found in storage.");
// }

async function loadAll(): Promise<any[]> {
    const response = await fetch("../db.json");
    if (!response.ok) {
        throw new Error("Failed to load users data.");
    }
    return await response.json();
}

// Define types for employee and manager
interface Manager {
    id: string;
    first_name: string;
    last_name: string;
}

interface Employee {
    _id: string;
    password: string;
    passwordHash: string;
    role: string;
    first_name: string;
    last_name: string;
    first_native_name: string;
    last_native_name: string;
    middle_native_name: string;
    department: string;
    building: string;
    room: string;
    desk_number: string;
    date_birth: { day: number; month: number; year: number };
    manager: Manager;
    phone: string;
    email: string;
    skype: string;
    cnumber: string;
    citizenship: string;
}

// Get employee ID from URL
function getEmployeeIdFromURL(): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

// Format date into readable string
function formatDate(date: {
    day: number;
    month: number;
    year: number;
}): string {
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
    return `${date.day} ${months[date.month - 1]} ${date.year}`;
}

// Main function to load employee profile
export default function loadEmployeeProfile(): void {
    const profileView = document.querySelector("main") as HTMLElement;
    const employeeId = getEmployeeIdFromURL();

    profileView.innerHTML = '<p class="loader">Loading...</p>';

    const fetchData = (): Promise<Employee[]> =>
        fetch("../db.json").then((response) => response.json());

    function loadProfile(data: Employee[], id: string | null): void {
        if (!id) {
            window.location.href = "../pages/404.html";
            return;
        }

        const employee = data.find(
            (person) => String(person._id) === String(id)
        );
        if (!employee) {
            window.location.href = "../pages/404.html";
            return;
        }

        profileView.innerHTML = `
            <aside>
                <div class="back">
                    <img src="../assets/less.png" alt="Back arrow" width="15px" height="15px"/>
                </div>
                <img src="../assets/${employee.first_name}.png" alt="${
            employee.first_name
        } ${employee.last_name}" width="120px" height="120px"/>
                
                
                <div class="user-name-input">
                    <p><input type="text" value="${
                        employee.first_name
                    }" id="first_name" disabled /></p>
                    <p><input type="text" value="${
                        employee.last_name
                    }" id="last_name" disabled /></p>
                </div>
                <div class="user-name-input">
                    <p><input type="text" value="${
                        employee.first_native_name
                    }" id="first_native_name" disabled /></p>
                    <p><input type="text" value="${
                        employee.middle_native_name
                    }" id="middle_native_name" disabled /></p>
                    <p><input type="text" value="${
                        employee.last_native_name
                    }" id="last_native_name" disabled /></p>
                </div>


                <div class="copy">
                    <img src="../assets/copy.png" alt="Copy icon" width="30px" height="30px"/>
                    <p>Copy link</p>
                </div>

                ${storedUserRole === "admin" || storedUserRole === "hr" && employee?.manager?.id == storedUserId ? 
                    `<div class="edit">
                        <img src="../assets/pen.png" alt="Edit icon" width="25px" height="25px"/>
                        <p>Edit</p>
                    </div>`
                    : ""}

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
                            <select id="department" disabled>
                                <option selected>${employee.department}</option>
                                <option value="web">Web & Mobile</option>
                                <option value="cybersecurity">Cybersecurity & Compliance</option>
                                <option value="ui">UI/UX Design</option>
                                <option value="backend">Backend & Integration</option>
                                <option value="ai">AI & Data Science</option>
                                <option value="cloud">Cloud & DevOps</option>
                            </select>
                            <select id="building" disabled>
                                <option selected>${employee.building}</option>
                                <option value="building-65">Pilsudskiego 65 (Poland)</option>
                                <option value="building-66">Pilsudskiego 66 (Poland)</option>
                                <option value="building-67">Pilsudskiego 67 (Poland)</option>
                                <option value="building-68">Pilsudskiego 68 (Poland)</option>
                                <option value="building-69">Pilsudskiego 69 (Poland)</option>
                                <option value="building-70">Pilsudskiego 70 (Poland)</option>
                            </select>
                            <input type="text" value="${
                                employee.room
                            }" id="room" disabled/>
                            <input type="text" value="${
                                employee.desk_number
                            }" id="desk_number" disabled/>
                            <p>${formatDate(employee.date_birth)}</p>
                            <input type="date" value="${
                                employee.date_birth.year
                            }-${employee.date_birth.month}-${
            employee.date_birth.day
        }" id="date_birth" disabled />
                            <p>${
                                employee.manager.first_name
                                    ? employee.manager.first_name +
                                      employee.manager.last_name
                                    : "No Manager"
                            }</p>
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
                            <input type="tel" value="${employee.phone}" id="phone" disabled />
                            <input type="email" value="${employee.email}" id="email" disabled />
                            <input type="text" value="${employee.skype}" id="skype" disabled />
                            <input type="text" value="${employee.cnumber}" id="c-number" disabled />

                        </div>



                    </div>
                </div>
                <div>
                    <h3>TRAVEL INFO</h3>
                    <div class="line"></div>
                    <div class="info-container">${infoContainer(employee)}</div>
                </div>
                ${storedUserRole === "admin" || storedUserRole === "hr" && employee?.manager?.id == storedUserId ? '<button id="save-button">Save</button>' : ""}
            </section>
        `;
        
        if (storedUserRole === "admin" || storedUserRole === "hr" && employee?.manager?.id == storedUserId) {
            
            const editButton = document.querySelector(".edit") as HTMLElement;
            editButton.addEventListener("click", () => {
                const inputs = document.querySelectorAll("input, select") as NodeListOf<HTMLElement>;
                inputs.forEach((input) => input.removeAttribute("disabled"));
            });
        }


        document.querySelector("#save-button")?.addEventListener("click", () => {
            const updatedEmployee: Employee = {
                ...employee,
                first_name: (document.querySelector("#first_name") as HTMLInputElement).value,
                last_name: (document.querySelector("#last_name") as HTMLInputElement).value,
                first_native_name: (document.querySelector("#first_native_name") as HTMLInputElement).value,
                middle_native_name: (document.querySelector("#middle_native_name") as HTMLInputElement).value,
                last_native_name: (document.querySelector("#last_native_name") as HTMLInputElement).value,
                department: (document.querySelector("#department") as HTMLSelectElement).value,
                building: (document.querySelector("#building") as HTMLSelectElement).value,
                room: (document.querySelector("#room") as HTMLInputElement).value,
                desk_number: (document.querySelector("#desk_number") as HTMLInputElement).value,
                date_birth: {
                    day: new Date((document.querySelector("#date_birth") as HTMLInputElement).value).getDate(),
                    month: new Date((document.querySelector("#date_birth") as HTMLInputElement).value).getMonth() + 1,
                    year: new Date((document.querySelector("#date_birth") as HTMLInputElement).value).getFullYear(),
                },
                phone: (document.querySelector("#phone") as HTMLInputElement).value,
                email: (document.querySelector("#email") as HTMLInputElement).value,
                skype: (document.querySelector("#skype") as HTMLInputElement).value,
                cnumber: (document.querySelector("#c-number") as HTMLInputElement).value,
            };

            const employeeIndex = Number(employeeId) - 1;

            fetch(`http://localhost:3000/${employeeIndex}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEmployee),
            })
                .then((response) => response.json())
                .then(() => {
                    alert("Employee information updated successfully!");
                })
                .catch((error) => {
                    console.error("Error updating employee:", error);
                    alert("There was an error updating the information.");
                });
        });

        
        document.querySelector(".back")?.addEventListener("click", () => {
            window.history.back();
        });

        document.querySelector(".copy")?.addEventListener("click", () => {
            const url = window.location.href;
            navigator.clipboard
                .writeText(url)
                .then(() => {
                    alert("Link copied to clipboard!");
                })
                .catch((error) => {
                    console.error("Error copying the link:", error);
                });
        });
    }

    fetchData()
        .then((data) => {
            loadProfile(data, employeeId);
        })
        .catch((error) => {
            window.location.href = "../pages/404.html";
        });
}
