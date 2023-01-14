import React, { Component } from 'react'

const User = (props) => {
    const {userData, onAddTicket, onDelete, onLiked} = props;
    const {avatar, name, nrBilete, iamDat, nrLikes} = userData;
    // const {, } = likeObj
    // debugger;

    const computeLikeClass = () => {
        if(iamDat) return "fa-solid fa-heart";
        if(!iamDat) return "fa-regular fa-heart";
    }

    const addLike = () => {
        console.log("add like")
        onLiked(userData)
    }
    return (
        <div className="card" style={{width: 200}}>
        <img className="card-img-top" src={avatar} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
            nr bilete: {nrBilete}
          </p>
          <div>
          {nrLikes}<i style={{cursor: "pointer"}} class={computeLikeClass()} onClick={() => addLike()}></i>
          </div>
          <button onClick={() => onAddTicket(userData)} className="btn btn-primary">Adauga Bilet</button>
          <button onClick={() => onDelete(userData)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    )
}

export default User;
