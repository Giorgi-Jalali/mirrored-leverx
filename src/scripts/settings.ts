interface Employee {
    _id: string;
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


    function fetchRoles(): void {

        fetch("../db.json").then(response => response.json()).then(data => {
            const employees: Employee[] = data;

            console.log("hello data: ", employees);

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
                                name="address-book-role-${person._id}"
                                id="employee-${person._id}"
                                class="role-button"
                                ${isEmployee}
                            />
                            <label for="employee-${person._id}">employee</label>
                            <input
                                type="radio"
                                name="address-book-role-${person._id}"
                                id="hr-${person._id}"
                                class="role-button"
                                ${isHR}
                            />
                            <label for="hr-${person._id}">hr</label>
                        </div>
                    </div>
                    <div class="right-header">
                        <div class="role-container">
                            <input
                                type="radio"
                                name="vacation-role-${person._id}"
                                id="employee-vacation-${person._id}"
                                class="role-button"
                                disabled
                            />
                            <label for="employee-vacation-${person._id}">employee</label>
                            <input
                                type="radio"
                                name="vacation-role-${person._id}"
                                id="po-${person._id}"
                                class="role-button"
                                disabled
                            />
                            <label for="po-${person._id}">po</label>
                            <input
                                type="radio"
                                name="vacation-role-${person._id}"
                                id="dd-${person._id}"
                                class="role-button"
                                disabled
                            />
                            <label for="dd-${person._id}">dd</label>
                        </div>
                        <div class="role-container">
                            <input
                                type="radio"
                                name="address-book-role-${person._id}"
                                id="admin-${person._id}"
                                class="role-button"
                                ${isAdmin}
                            />
                            <label for="admin-${person._id}">admin</label>
                        </div>
                    </div>
                `;
                settingsEmployees.appendChild(employeeList);
            })

    
        });
    }

    fetchRoles();
}
