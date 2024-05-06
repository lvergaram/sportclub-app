console.log("desde frontend...")

const $newSportForm = document.getElementById("newSportForm")
const $sportTable = document.getElementById("sportTable")
const $stBody = document.getElementById("sportTableBody")

const $editSportForm = document.getElementById("editSportForm")
const $searchSportBtn = document.getElementById("searchSportBtn")
const $sportInputId = document.getElementById("sportInputId")
const $sportInputNombre = document.getElementById("sportInputNombre")
const $sportInputPrecio = document.getElementById("sportInputPrecio")
const $deleteSportForm = document.getElementById("deleteSportForm")



const getSportById = async (e) => {

    console.log($sportInputId.value)

    const id = $sportInputId.value
    const data = await fetch(`/sports/${id}`)
    const sport = await data.json()
    console.log(sport)

    $sportInputNombre.value = sport.nombre || ''
    $sportInputPrecio.value = sport.precio || ''

}


const getSport = async () => {

    console.log("en async")

    $stBody.textContent = ''

    const data = await fetch('/sports')
    const sportArray = await data.json()
    const sports = sportArray.reverse()
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

const createSport= async(e) => {
    e.preventDefault()
    const {nombre,precio}=$newSportForm.elements
    const data = {nombre:nombre.value, precio:precio.value}
    const options = {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    }
    const post = await fetch('/sports',options )
    getSport()    

}

const editSport = async(e) => {
    console.log("editSport handler")
    e.preventDefault()
    const {id,nombre,precio}=$editSportForm.elements
    const data = {nombre:nombre.value, precio:precio.value}
    const options = {
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    }
    const uptade = await fetch(`/sports/${id.value}`,options )
    getSport()
    console.log(uptade)
    
}

const deleteSport = async(e)=>{

    console.log("delete handler")
    e.preventDefault()
    const {id}=$deleteSportForm.elements
    const options = {
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
          },
    }
    const remove = await fetch(`/sports/${id.value}`,options )
    getSport()
    console.log(remove)

}

//EVENT LISTENERS
$newSportForm?.addEventListener("submit",createSport)
$searchSportBtn?.addEventListener("click", getSportById)
$editSportForm?.addEventListener("submit",editSport)
$deleteSportForm?.addEventListener("submit",deleteSport)
getSport()
