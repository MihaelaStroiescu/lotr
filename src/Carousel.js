import React, { useState } from 'react';

const Carousel = () => {
    const [images, setImages] = useState([
        'https://cache.desktopnexus.com/thumbseg/2304/2304267-bigthumbnail.jpg',
        'https://www.tvovermind.com/wp-content/uploads/2019/02/lord-of-the-rings-1-the-fellowship-of-the-ring-movie-poster-2001-1020195991-750x422.jpg',
        'https://pmcvariety.files.wordpress.com/2016/12/lotr.jpg?w=681&h=383&crop=1',
        'https://www.barnesandnoble.com/blog/sci-fi-fantasy/wp-content/uploads/sites/4/2017/05/lotr.jpg',
        'https://static.pressfrom.info/upload/images/real/2019/07/24/lord-of-the-rings-tv-series-finds-its-first-star__641742_.jpg?c',

    ]);

    const [currentImageIdx, setCurrentImagIdx] = useState(0);

    const prevSlide = () => {
        // find out whether currentImageIdx eqals 0 and thus user reached beginning of carousel
        const resetToVeryBack = currentImageIdx === 0;

        const index = resetToVeryBack ? images.length - 1 : currentImageIdx - 1;

        // assign the logical index to current image index that will be used in render method
        setCurrentImagIdx(index);
    };

    const nextSlide = () => {
        // check if we need to start over from the first index
        const resetIndex = currentImageIdx === images.length - 1;

        const index = resetIndex ? 0 : currentImageIdx + 1;

        // assign the logical index to current image index that will be used in render method
        setCurrentImagIdx(index);
    }

    // create a new array with 5 elements from the source images
    const activeImageSourcesFromState = images.slice(currentImageIdx, currentImageIdx + 5);

    // check the length of the new array (it’s less than 5 when index is at the end of the imagge sources array)
    const imageSourcesToDisplay = activeImageSourcesFromState.length < 5
        // if the imageSourcesToDisplay's length is lower than 5 images than append missing images from the beginning of the original array
        ? [...activeImageSourcesFromState, ...images.slice(0, 5 - activeImageSourcesFromState.length)]
        : activeImageSourcesFromState;

    return (
        <div className="carousel_wrapper">
            <button className="btn_prev" onClick={prevSlide}>Prev</button>
            {/* render images */}
            <div className="image_container">
            {imageSourcesToDisplay.map((image, index) =>
                <img key={index} src={image} alt="" />
            )}
            </div>
            <button className="btn_next" onClick={nextSlide}>Next</button>
        </div>
    );
};

export default Carousel;
