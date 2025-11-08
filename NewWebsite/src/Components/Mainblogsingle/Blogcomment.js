import React, { useState, useEffect } from 'react'

const Blogcomment = () => {
  const [comments, setComments] = useState([]);

  // Load comments from localStorage on component mount
  useEffect(() => {
    const savedComments = localStorage.getItem('blogComments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  // Function to get initials from name
  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  // Function to get time ago
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const seconds = Math.floor((now - commentDate) / 1000);
    
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  };

  return (
    <div>
      <section
        className="row_am comment_section pb-0 aos-init aos-animate"
        data-aos="fade-up"
        data-aos-duration={1500}
      >
        <div className="container container-sm">
          <div className="section_title">
            <h3>{comments.length} Comment{comments.length !== 1 ? 's' : ''}</h3>
          </div>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>
                  <div className="authore_info">
                    <div className="avtar" style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: '700',
                      color: 'white'
                    }}>
                      {getInitials(comment.name)}
                    </div>
                    <div className="text">
                      <span>{getTimeAgo(comment.timestamp)}</span>
                      <h6>{comment.name}</h6>
                    </div>
                  </div>
                  <div className="comment">
                    <p>{comment.comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--body-text)' }}>
              <p>No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Blogcomment
