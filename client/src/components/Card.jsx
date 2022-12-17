import React from 'react'

const Card = ({ urlData }) => {
  return (
    <div className="card-container">
      {
        urlData.map((url) => (
          <div className="card" key={url._id}>
            <div className="card-header">
              <p className="card-text">Short url</p>
              <a href={url.short} className="link link-primary">{url.short}</a>
            </div>
            <div className="card-footer">
              <p className="card-text">Your long url</p>
              <a href={url.full} className="link">{url.full}</a>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Card