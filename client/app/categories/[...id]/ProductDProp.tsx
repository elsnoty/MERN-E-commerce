import { ProductsProp } from '@/models/Products';
import Image from 'next/image';
import React from 'react';
import { Lens } from '@/lib/Lenis';
import UseHover from '@/hooks/UseHover';
import { useImage } from '@/hooks/CustomImg';
import Thumbnail from './Thumbnail';

const ProductDProp = (props: { item: ProductsProp }) => {
  const { hovering, onMouseEnter, onMouseLeave } = UseHover();
  const { changeImage, currentImage } = useImage(
    Array.isArray(props.item.image) ? props.item.image[0] : props.item.image
  );
  const {item} = props;
  const discountedPrice = item.discount > 0 ? item.price - (item.price * item.discount) / 100 : item.price;
  return (
    <div>
      {Array.isArray(props.item.image) && props.item.image.length > 0 && (
        <div className="flex gap-2">
          <div className="flex flex-col gap-y-2">
            {/* Thumbnail */}
            {props.item.image.map((img, index) => (
              <Thumbnail
                key={index}
                src={img}
                alt={props.item.name}
                onHover={() => changeImage(img)}
              />
            ))}
          </div>
          <div
            className="relative z-10"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Lens hovering={hovering}>
              <Image
                src={currentImage}
                alt={props.item.name}
                width={450}
                height={400}
              />
            </Lens>
          </div>
        </div>
      )}
            <h2>{props.item.name}</h2>
            <p>Price: ${discountedPrice}</p>
    </div>
  );
};

export default ProductDProp;
