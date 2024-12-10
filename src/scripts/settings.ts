export default function settings() {



    function fetchRoles(): void {

        fetch("../db.json").then(response => response.json()).then(data => {
            const employees = data;

            // employees.forEach;

    
        });
    }
}
