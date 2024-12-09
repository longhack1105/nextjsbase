'use client';

import React from 'react';
import { ImageFillProps } from './interfaces';
import Image from 'next/image';

const ImageFillElement: React.FC<ImageFillProps> = ({
  src,
  alt,
  width,
  height,
  classname,
  onClick,
}) => {
  return (
    <Image
      src={src}
      alt={alt || 'image'}
      width={width}
      height={height}
      className={classname}
      onClick={onClick}
    />
  );
};

export default ImageFillElement;
