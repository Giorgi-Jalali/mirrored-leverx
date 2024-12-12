import backUrl from "./config";

interface Employee {
    id: string;
    role: string;
    user_avatar: any;
    first_name: string;
    last_name: string;
    first_native_name: string;
    last_native_name: string;
    middle_native_name: string;
}

export default function settings() {
    const settingsEmployees = document.getElementById("settings-Employees") as HTMLElement;
    const storedUserId = localStorage.getItem("currentUserId") || sessionStorage.getItem("currentUserId");

    function fetchRoles(): void {
        fetch(`${backUrl}`)
            .then(response => response.json())
            .then(data => {
                const employees: Employee[] = data;

                employees.forEach(person => {
                    const employeeList = document.createElement("li");
                    employeeList.classList.add("roles-header");

                    const isEmployee = person.role === "employee" ? "checked" : "";
                    const isHR = person.role === "hr" ? "checked" : "";
                    const isAdmin = person.role === "admin" ? "checked" : "";

                    employeeList.innerHTML = `
                        <div class="left-header">
                            <div class="basic-content-list">
                                <img
                                    src=${"." + person.user_avatar}
                                    alt="person icon"
                                    width="50px"
                                    height="50px"
                                />
                                <div class="name">
                                    <p>${person.first_name} ${person.last_name}/</p>
                                    <p>${person.first_native_name} ${person.middle_native_name} ${person.last_native_name}</p>
                                </div>
                            </div>
                            <div class="role-container">
                                <input
                                    type="radio"
                                    name="address-book-role-${person.id}"
                                    id="employee-${person.id}"
                                    class="role-button"
                                    ${isEmployee}
                                    ${person.id == storedUserId ? "disabled" : ""}
                                />
                                <label for="employee-${person.id}">employee</label>
                                <input
                                    type="radio"
                                    name="address-book-role-${person.id}"
                                    id="hr-${person.id}"
                                    class="role-button"
                                    ${isHR}
                                    ${person.id == storedUserId ? "disabled" : ""}
                                />
                                <label for="hr-${person.id}">hr</label>
                            </div>
                        </div>
                        <div class="right-header">
                            <div class="role-container">
                                <input
                                    type="radio"
                                    name="vacation-role-${person.id}"
                                    id="employee-vacation-${person.id}"
                                    class="role-button"
                                    disabled
                                />
                                <label for="employee-vacation-${person.id}">employee</label>
                                <input
                                    type="radio"
                                    name="vacation-role-${person.id}"
                                    id="po-${person.id}"
                                    class="role-button"
                                    disabled
                                />
                                <label for="po-${person.id}">po</label>
                                <input
                                    type="radio"
                                    name="vacation-role-${person.id}"
                                    id="dd-${person.id}"
                                    class="role-button"
                                    disabled
                                />
                                <label for="dd-${person.id}">dd</label>
                            </div>
                            <div class="role-container">
                                <input
                                    type="radio"
                                    name="address-book-role-${person.id}"
                                    id="admin-${person.id}"
                                    class="role-button"
                                    ${person.id == storedUserId ? "disabled" : ""}
                                    ${isAdmin}
                                />
                                <label for="admin-${person.id}">admin</label>
                            </div>
                        </div>
                    `;
                    settingsEmployees.appendChild(employeeList);

                    document.querySelectorAll(`input[name="address-book-role-${person.id}"]`).forEach((input) => {

                        const inputElement = input as HTMLInputElement;
                        inputElement.addEventListener("change", (event) => {
                            if (storedUserId !== person.id && inputElement.checked) {
                                const updatedRole = inputElement.id.split('-')[0];
                                const updatedEmployee = {
                                    ...person,
                                    role: updatedRole,
                                };

                                updateRole(updatedEmployee);
                            }
                        });
                    });
                });
            });
    }

    function updateRole(updatedEmployee: Employee): void {

        fetch(`${backUrl}${updatedEmployee.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...updatedEmployee, role: updatedEmployee.role }),
        })
        .then(response => response.json())
        .then(updated => {
            console.log("Role updated successfully", updated);
        })
        .catch(error => {
            console.error("Error updating role:", error);
        });
    }

    fetchRoles();
}
