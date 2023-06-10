import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [likes, setLikes] = useState(0)

  function handleSubmit(e) {
    e.preventDefault()
    
    const toyData = {
      name: name,
      image: image,
      likes: likes
    }

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(toyData)
    })
    .then(r => r.json())
    .then(newToy => onAddToy(newToy))

    // reset the form
    setName("")
    setImage("")
  }

  return (
    <div className="container" onSubmit={handleSubmit}>
      <form className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
