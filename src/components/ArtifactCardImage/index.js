import React from 'react';

const ArtifactCardImage = (props) => {
    return <div><img style={{ width: '200px' }} src={props.large_image.default}></img></div>;
}

export default ArtifactCardImage;