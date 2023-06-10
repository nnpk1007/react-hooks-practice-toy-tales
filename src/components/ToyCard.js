import React from "react";

function ToyCard({ toy, name, image, like, onDeleteToy, onUpdateLike }) {
  function handleDeleteClick() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteToy(toy));
  }

  function handleLikeClick() {
    console.log("Liked")
    const updatedLike = like + 1
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(
        {likes: updatedLike}
      )
    })
    .then(r => r.json())
    .then(() => onUpdateLike(toy.id))
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{like} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDeleteClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
