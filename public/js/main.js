window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  
  // Aqui debemos agregar nuestro fetch
  fetch('/api/movies')
  .then(response => response.json())
  .then(peliculas => {
    let data = peliculas.data;

    if (!localStorage.getItem("favoritas")) {
      const favoritas = []
      localStorage.setItem("favoritas", JSON.stringify(favoritas))
    }

    console.log(JSON.parse(localStorage.getItem('favoritas')))

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const btn = document.createElement("button")
      btn.innerHTML = `<i class="fa-regular fa-heart"></i>`
      btn.setAttribute("class", "fav")

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(btn)
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

      
      if (JSON.parse(localStorage.getItem("favoritas")).find(favorita => favorita.id === movie.id)) {
        btn.innerHTML = `<i class="fa-solid fa-heart"></i>`
        btn.firstElementChild.style.color = 'rgb(255, 104, 129)'
      }

      btn.addEventListener("click", (e) => {
        e.preventDefault()
       let favoritas = JSON.parse(localStorage.getItem("favoritas"))
        
      if (!favoritas.find(favorita => favorita.id == movie.id)) {
        favoritas.push(movie)
        btn.innerHTML = `<i class="fa-solid fa-heart"></i>`
        btn.firstElementChild.style.color = 'rgb(255, 104, 129)'
 
      } else {
        let eliminar = favoritas.indexOf(favorita => favorita.id == movie.id)
        favoritas.splice(eliminar, 1)
        btn.innerHTML = `<i class="fa-regular fa-heart"></i>`
        btn.firstElementChild.style.color = `rgb(2, 2, 118)`
      }
 
     
      localStorage.setItem("favoritas", JSON.stringify(favoritas))
        
      console.log(favoritas)
      })

    }); 
  })



   /* Codigo que debemos usar para mostrar los datos en el frontend */
    /* let data = peliculas.data;

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
    }); */
};
