import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // this only needs to be imported once in your app


interface ILightboxComp {
  state: {
    isOpen: boolean,
    photoIndex: number
  },
  setState: any,
  images: string[]
}

const LightboxComp = (props: ILightboxComp) => {

  const { state, setState, images } = props


  const { photoIndex, isOpen } = state;

  return (
    <>
      {
        isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setState((prev: any) => ({ ...prev, isOpen: false }))}
            onMovePrevRequest={() =>
              setState((prev: any) => ({
                ...prev,
                photoIndex: (photoIndex + images.length - 1) % images.length,
              }))
            }
            onMoveNextRequest={() =>
              setState((prev: any) => ({
                ...prev,
                photoIndex: (photoIndex + 1) % images.length,
              }))
            }
          />
        )
      }
    </>
  );
}

export default LightboxComp;