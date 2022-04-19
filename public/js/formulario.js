window.onload = () => {

    const qs = (element) => {
        return document.querySelector(element)    
    }

    const $title = qs("#title")
    const $rating = qs("#rating")
    const $awards = qs("#awards")
    const $length = qs("#length")
    const $release_date = qs("#release_date")
    const $editar = qs(".editar")
    const $crear = qs(".crear")
    const $eliminar = qs(".eliminar")

    fetch(`/api/movies`)
    .then(result => result.json())
    .then(peliculas => {
    
    let pelicula
    let find
    $title.addEventListener("input", (e) => {
        pelicula = e.target.value;
        find = peliculas.data.find(peli => peli.title.toLowerCase() === pelicula.toLowerCase())
        if ( find !== undefined) {

            $rating.setAttribute("value", find.rating)
            $awards.setAttribute("value", find.awards)
            $length.setAttribute("value", find.length)
            const date = find.release_date.split("T")[0];
            $release_date.setAttribute("value", date)
        }
    
    })

    $editar.addEventListener("click", (e) => {
        e.preventDefault()
        if (find !== undefined) {
            const body = {
                title: $title.value,
                rating: $rating.value,
                awards: $awards.value,
                release_date: $release_date.value,
                length: $length.value,
                genre_id: find.genre.id
        }
        
        fetch(`http://localhost:3031/api/movies/update/${find.id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(response => {
            let body = qs("body")
         const editar = document.createElement("h2")
         editar.innerText = "Se edito la pelicula correctamente."
         body.appendChild(editar)
        })
        }

      })
     
    $crear.addEventListener("click", (e) => {
          e.preventDefault()

          const body = {
            title: $title.value,
            rating: $rating.value,
            awards: $awards.value,
            release_date: $release_date.value,
            length: $length.value,
            genre_id: 1
           }

           fetch(`http://localhost:3031/api/movies/create`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
        })
    })
   
    $eliminar.addEventListener("click", (e) => {
        e.prventDefault()
        fetch(`http://localhost:3031/api/movies/delete/${find.id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
        })


    })
  })
}