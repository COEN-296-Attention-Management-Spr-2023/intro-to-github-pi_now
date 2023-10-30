

const addResponse = () => {
    const response = document.getElementById("response");
    const newSearchResponse = document.createElement("div");
    newSearchResponse.textContent = "yo";
    newSearchResponse.className = "searchResponse";
    response.appendChild(newSearchResponse);
}

document.getElementById("search-button").addEventListener("click", () =>{
    addResponse();
});