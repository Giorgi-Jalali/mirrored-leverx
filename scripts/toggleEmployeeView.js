export default function toggleEmployeeView() {
    const gridRadio = document.getElementById("grid");
    const listRadio = document.getElementById("list");
    const gridView = document.querySelector(".section-body");
    const listView = document.querySelector(".section-body-list");

    const loadGridView = () => {
        fetch("../data.json")
            .then((response) => response.json())
            .then((data) => {
                gridView.innerHTML = "";
                data.forEach((person) => {
                    const employeeDiv = document.createElement("li");
                    employeeDiv.classList.add("employee");

                    employeeDiv.innerHTML = `
                        <div class="image-center">
                            <img src="${person.user_avatar}" alt="${person.first_name} ${person.last_name}" width="120px" height="120px"/>
                            <p class="employee-name">${person.first_name} ${person.last_name}</p>
                        </div>
                        <div class="line"></div>
                        <div class="employee-job">
                            <div class="person-job">
                                <img src=".//assets/suitcase.png" alt="Job icon" width="20px" height="20px"/>
                                <p>${person.department}</p>
                            </div>
                            <div class="person-job">
                                <img src=".//assets/door.png" alt="ID icon" width="20px" height="20px"/>
                                <p>${person.room}</p>
                            </div>
                        </div>
                    `;

                    gridView.appendChild(employeeDiv);
                });
            })
            .catch((error) => console.error("Error loading data for grid view:", error));
    };

    const loadListView = () => {
        fetch("../data.json")
            .then((response) => response.json())
            .then((data) => {
                listView.innerHTML = "";

                const listHeaderHTML = `
                    <div class="list-header">
                        <div class="photo-name">
                            <div class="photo">
                                <img src=".//assets/camera.png" alt="photo" width="15px" height="15px" />
                                <p>Photo</p>
                            </div>
                            <div class="photo">
                                <img src=".//assets/man-name.png" alt="photo" width="15px" height="15px" />
                                <p>Name</p>
                            </div>
                        </div>
                        <div class="dep-room">
                            <div class="photo">
                                <img src=".//assets/suitcase.png" alt="photo" width="15px" height="15px" />
                                <p>Department</p>
                            </div>
                            <div class="photo">
                                <img src=".//assets/door.png" alt="photo" width="15px" height="15px" />
                                <p>Room</p>
                            </div>
                        </div>
                    </div>
                `;

                listView.innerHTML = listHeaderHTML;

                data.forEach((person) => {
                    const employeeItem = document.createElement("li");
                    employeeItem.classList.add("employee-list");

                    employeeItem.innerHTML = `
                        <div class="person-image-name">
                            <img src="${person.user_avatar}" alt="${person.first_name} ${person.last_name}" width="60px" height="60px" />
                            <p class="employee-name">${person.first_name} ${person.last_name}</p>
                        </div>
                        <div class="dep-room">
                            <p class="department">${person.department}</p>
                            <p>${person.room}</p>
                        </div>
                    `;

                    listView.appendChild(employeeItem);
                });
            })
            .catch((error) => console.error("Error loading data for list view:", error));
    };

    const toggle = () => {
        if (gridRadio.checked) {
            gridView.style.display = "grid";
            listView.style.display = "none";
            loadGridView();
        } else if (listRadio.checked) {
            gridView.style.display = "none";
            listView.style.display = "flex";
            loadListView();
        }
    };

    gridRadio.addEventListener("change", toggle);
    listRadio.addEventListener("change", toggle);

    toggle();
}
