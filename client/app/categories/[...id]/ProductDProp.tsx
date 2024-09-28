import { ProductsProp } from '@/models/Products';
import Image from 'next/image';
import React from 'react';
import { Lens } from '@/lib/Lenis';
import UseHover from '@/hooks/UseHover';
import { useImage } from '@/hooks/CustomImg';
import Thumbnail from './Thumbnail';
import style from './style.module.css'
import ReviewAndDiscription from './ReviewAndDiscription';
import { useDispatch } from 'react-redux';
import { addToCart, saveCartToLocalStorage } from '@/store/CartSlice';
import {useSnackbar } from 'notistack';


const ProductDProp = (props: { item: ProductsProp }) => {
  const { hovering, onMouseEnter, onMouseLeave } = UseHover();
  const { enqueueSnackbar } = useSnackbar();
  const { changeImage, currentImage } = useImage(
    Array.isArray(props.item.image) ? props.item.image[0] : props.item.image
  );
  const {item} = props;
  const discountedPrice = item.discount > 0 ? item.price - (item.price * item.discount) / 100 : item.price;

  const dispatch = useDispatch();

  // handleAdd to cart
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: item._id,
      name: item.name,
      price: discountedPrice,
      quantity: 1,
      image: Array.isArray(item.image) ? item.image[0] : item.image,
    }));
    dispatch(saveCartToLocalStorage());
    enqueueSnackbar('Added to Bag', { variant: 'success' });
  };
  
  return (
    <div className='flex justify-center gap-5 my-10'>
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
      <div className='flex flex-col items-start'>
            <h2 className='font-semibold text-xl mb-3'>{props.item.name}</h2>
            <h3>{props.item.categories[1]}</h3>
            <div>
            <div className='my-2 text-lg'>
                <p className='inline-flex mr-3 font-bold'>Price: ${discountedPrice}</p>
              {
                  props.item.discount > 0 &&
                  <span className='line-through'>${props.item.price}</span>
              }
            </div>
            {props.item.size.length > 0 && (
                <>
              <h3 className='my-2 font-medium'>Select Size:</h3>
            {props.item.size.map((e) => (
              <button key={e} className={`${style.btnHover} mr-2 w-16 rounded-md`}>{e}</button>
            ))}
            </>
            )}
            </div>
            <button className={`${style.btnHover} rounded-md my-3`} onClick={handleAddToCart}>Add to Bag</button>
              <ReviewAndDiscription discription={props.item.description} key={props.item._id}/>
            </div>
    </div>
  );
};

export default ProductDProp;
