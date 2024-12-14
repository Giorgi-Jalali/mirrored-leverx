import dbUrl from "./config";

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
    const settingsEmployees = document.getElementById(
        "settings-Employees"
    ) as HTMLElement;
    const storedUserId =
        localStorage.getItem("currentUserId") ||
        sessionStorage.getItem("currentUserId");

    const settingsTab = document.getElementById("settings-tab") as HTMLElement;

    function fetchRoles(): void {
        fetch(`${dbUrl}`)
            .then((response) => response.json())
            .then((data) => {
                const employees: Employee[] = data;

                const currentUser = employees.find(
                    (person) => person.id === storedUserId
                );

                if (currentUser?.role !== "admin") {
                    if (settingsTab) {
                        settingsTab.style.display = "none";
                    }
                }

                employees.forEach((person) => {
                    const employeeList = document.createElement("li");
                    employeeList.classList.add("roles-header");

                    const isEmployee =
                        person.role === "employee" ? "checked" : "";
                    const isHR = person.role === "hr" ? "checked" : "";
                    const isAdmin = person.role === "admin" ? "checked" : "";


                    document
                        .querySelectorAll(
                            `input[name="address-book-role-${person.id}"]`
                        )
                        .forEach((input) => {
                            const inputElement = input as HTMLInputElement;
                            inputElement.addEventListener("change", (event) => {
                                if (
                                    storedUserId !== person.id &&
                                    inputElement.checked
                                ) {
                                    const updatedRole =
                                        inputElement.id.split("-")[0];
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
        fetch(`${dbUrl}${updatedEmployee.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...updatedEmployee,
                role: updatedEmployee.role,
            }),
        })
            .then((response) => response.json())
            .then((updated) => {
                console.log("Role updated successfully", updated);
            })
            .catch((error) => {
                console.error("Error updating role:", error);
            });
    }

    fetchRoles();
}
