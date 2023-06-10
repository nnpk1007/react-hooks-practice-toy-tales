import React, { useEffect, useState } from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ newToy }) {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  useEffect(() => {
    if (newToy) {
      setToys((prevToys) => [...prevToys, newToy]);
    }
  }, [newToy]);

  function handleDeleteToy(deletedToy) {
    const updatedToy = toys.filter((toy) => toy.id !== deletedToy.id)
    setToys(updatedToy)
  }

  function handleUpdateLike(toyId) {
    const updatedToy = toys.map((toy) => {
      if (toy.id === toyId) {
        return {...toy, likes: toy.likes + 1}
      }
      return toy
    })
    setToys(updatedToy)
  }

  const displayToys = toys.map((toy) => (
    <ToyCard
      key={toy.id}
      toy={toy}
      name={toy.name}
      image={toy.image}
      like={toy.likes}
      onDeleteToy={handleDeleteToy}
      onUpdateLike={handleUpdateLike}
    />
  ));

  return <div id="toy-collection">{displayToys}</div>;
}

export default ToyContainer;
