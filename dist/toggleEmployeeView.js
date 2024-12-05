export default function toggleEmployeeView() {
    const gridRadio = document.getElementById("grid");
    const listRadio = document.getElementById("list");
    const gridView = document.querySelector(".section-body");
    const listView = document.querySelector(".section-body-list");
    const basicLabel = document.getElementById("basic-label");
    const advancedLabel = document.getElementById("advanced-label");
    const basicContent = document.querySelector(".basic-content");
    const advancedContent = document.querySelector(".advanced-content");
    const showBasicContent = () => {
        basicContent.style.display = "block";
        advancedContent.style.display = "none";
    };
    const showAdvancedContent = () => {
        basicContent.style.display = "none";
        advancedContent.style.display = "block";
    };
    basicLabel.addEventListener("click", showBasicContent);
    advancedLabel.addEventListener("click", showAdvancedContent);
    const loadGridView = (filteredData = null) => {
        fetch("../data.json")
            .then((response) => response.json())
            .then((data) => {
            gridView.innerHTML = "";
            const employees = filteredData || data;
            if (employees.length === 0) {
                gridView.style.display = "flex";
                gridView.innerHTML = `
                        <div class="not-found">
                            <img src="../assets/404.png" alt="not found" width="400px" height="225px"/>
                        </div>
                    `;
                return;
            }
            employees.forEach((person) => {
                const employeeDiv = document.createElement("li");
                employeeDiv.classList.add("employee");
                gridView.style.display = "grid";
                employeeDiv.innerHTML = `
                    <a href="../pages/users.html?id=${person._id}" class="employee-link">
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
                    </a>
                    `;
                gridView.appendChild(employeeDiv);
            });
        })
            .catch((error) => console.error("Error loading data for grid view:", error));
    };
    const loadListView = (filteredData = null) => {
        fetch("../data.json")
            .then((response) => response.json())
            .then((data) => {
            listView.innerHTML = "";
            const employees = filteredData || data;
            if (employees.length === 0) {
                listView.innerHTML = `
                        <div class="not-found">
                            <img src="../assets/404.png" alt="not found" width="400px" height="225px"/>
                        </div>
                    `;
                return;
            }
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
            employees.forEach((person) => {
                const employeeItem = document.createElement("li");
                employeeItem.classList.add("employee-list");
                employeeItem.innerHTML = `
                    <a href="../pages/users.html?id=${person._id}" class="list-employee-view">
                    <div class="person-image-name">
                    <img src="${person.user_avatar}" alt="${person.first_name} ${person.last_name}" width="60px" height="60px" />
                    <p class="employee-name">${person.first_name} ${person.last_name}</p>
                    </div>
                    <div class="dep-room">
                    <p class="department">${person.department}</p>
                    <p>${person.room}</p>
                    </div>
                    </a>
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
        }
        else if (listRadio.checked) {
            gridView.style.display = "none";
            listView.style.display = "flex";
            loadListView();
        }
    };
    const searchInput = document.querySelector(".search-input");
    const searchForm = document.querySelector(".basic-content form");
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchQuery = searchInput.value.toLowerCase();
        fetch("../data.json")
            .then((response) => response.json())
            .then((data) => {
            const filteredData = data.filter((person) => {
                const fullName = `${person.first_name} ${person.last_name}`.toLowerCase();
                return (person._id.toString() === searchQuery ||
                    person.first_name.toLowerCase().includes(searchQuery) ||
                    person.last_name.toLowerCase().includes(searchQuery) ||
                    fullName.includes(searchQuery));
            });
            if (gridRadio.checked) {
                loadGridView(filteredData);
            }
            else if (listRadio.checked) {
                loadListView(filteredData);
            }
        })
            .catch((error) => console.error("Error performing search:", error));
    });
    gridRadio.addEventListener("change", toggle);
    listRadio.addEventListener("change", toggle);
    toggle();
}
