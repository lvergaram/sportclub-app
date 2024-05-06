console.log("desde frontend...")

const $newSportForm = document.getElementById("newSportForm")
const $sportTable = document.getElementById("sportTable")
const $stBody = document.getElementById("sportTableBody")
const $searchSportBtn = document.getElementById("searchSportBtn")
const $sportInputId = document.getElementById("sportInputId")
const $sportInputNombre = document.getElementById("sportInputNombre")
const $sportInputPrecio = document.getElementById("sportInputPrecio")

const getSportById = async (e) => {

    console.log($sportInputId.value)

    const id = $sportInputId.value
    const data = await fetch(`/sports/${id}`)
    const sport = await data.json()
    console.log(sport)

    $sportInputNombre.value = sport.nombre
    $sportInputPrecio.value = sport.precio

}

$searchSportBtn.addEventListener("click", getSportById)


const getSport = async () => {

    console.log("en async")

    $stBody.textContent = ''

    const data = await fetch('/sports')
    const sports = await data.json()
    console.log(sports)
    console.log( Array.isArray(sports))
    
    sports.forEach(sport => {
        const $row = document.createElement("tr")
        const $tdId = document.createElement("th")
        const $tdNombre= document.createElement("td")
        const $tdPrecio = document.createElement("td")
        
        $tdId.textContent = sport.id
        $tdNombre.textContent=  sport.nombre
        $tdPrecio.textContent = sport.precio

        $row.appendChild($tdId)
        $row.appendChild($tdNombre)
        $row.appendChild($tdPrecio)

        $stBody.appendChild($row)

    })

    return sports
}



getSport()
