export default function infoContainer(employee) {
    const infoContainer = document.querySelector(".info-container");

    const leftContent = renderVisaList(employee);
    const rightContent = renderVisaInfo(employee);

    let html = `
        <div class="info-left-citizenship">${leftContent}</div>
        <div class="info-right">${rightContent}</div>
    `;

    return html;
}

function renderVisaInfo(employee) {

    const visaArray = employee.visa || [];
    let html = `<p>${employee.citizenship}</p>`;

    visaArray.forEach((visa) => {
        const formattedDateRange = formatDateRange(visa.start_date, visa.end_date);

        html += `
            <p>${visa.type} (${visa.issuing_country})</p>
            <p>${formattedDateRange}</p>
        `;
    });

    return html;
}

function renderVisaList(employee) {
    const visaArray = employee.visa || [];

    let html = `
        <div class="info-list">
            <img src="../assets/earth.png" alt="citizenship icon" width="20px" height="20px" />
            <p>Citizenship</p>
        </div>
    `;

    visaArray.forEach((visa, index) => {
        const visaNumber = `Visa ${index + 1}`;
        const validityText = formatDateRange(visa.start_date, visa.end_date);

        html += `
            <div class="info-list">
                <img src="../assets/v.png" alt="visa icon" width="20px" height="20px" />
                <p>${visaNumber}</p>
            </div>
            <div class="info-list">
                <img src="../assets/validity.png" alt="validity icon" width="20px" height="20px" />
                <p>${visaNumber} validity period</p>
            </div>
        `;
    });

    return html;
}

function formatDateRange(startTimestamp, endTimestamp) {
    const startDate = new Date(startTimestamp);
    const endDate = new Date(endTimestamp);

    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    const startFormatted = startDate.toLocaleDateString("en-GB", options);
    const endFormatted = endDate.toLocaleDateString("en-GB", options);

    return `${startFormatted} - ${endFormatted}`;
}
