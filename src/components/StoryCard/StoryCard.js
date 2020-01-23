import React from 'react';

// CSS 
import styles from './StoryCard.module.css';

class StoryCard extends React.Component {  
  render () {

    return (
      <div className={styles.storyCard}>
        <div className="story-image">
          <div className="heart">

          </div>
          <div className="play-button">

          </div>
        </div>
        <div className={styles.storyContent}>
          <div className={styles.profileImageDiv}>
            <img className={styles.profileImage} alt="profileImage" />
          </div>
          <div className={styles.storyTitle}>
            <h4 className={styles.storyTitle}>{this.props.story.title}</h4>
          </div>
        </div>
        <div className={styles.storyDescription}>
          <p className={styles.descriptionText}> {this.props.story.description} </p>
        </div>
      </div>
    ) 
  }
};

export default StoryCard;