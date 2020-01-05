import React from 'react'

const Empty = ({ message }) => (
  <div className="empty text-gray">
    <div className="empty-icon">
      <i className="icon icon-3x icon-search" />
    </div>
    <p className="empty-title h5">
      {message ? message : 'Your search has no matches'}
    </p>
  </div>
)

export default React.memo(Empty)
