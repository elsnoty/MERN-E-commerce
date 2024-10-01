import { ProductsProp } from '@/models/Products';
import Image from 'next/image';
import React, { useState } from 'react';
import { Lens } from '@/lib/Lenis';
import UseHover from '@/hooks/UseHover';
import { useImage } from '@/hooks/CustomImg';
import Thumbnail from './Thumbnail';
import style from './style.module.css';
import ReviewAndDiscription from './ReviewAndDiscription';
import { useDispatch } from 'react-redux';
import { addToCart, saveCartToLocalStorage } from '@/store/CartSlice';
import { useSnackbar } from 'notistack';
import Review from '../../../components/Reviews/Review';
import ReviewByProduct from '../../../components/Reviews/ReviewByProduct';

const ProductDProp = (props: { item: ProductsProp }) => {
  const { hovering, onMouseEnter, onMouseLeave } = UseHover();
  const { enqueueSnackbar } = useSnackbar();
  const { changeImage, currentImage } = useImage(
    Array.isArray(props.item.image) ? props.item.image[0] : props.item.image
  );
  const { item } = props;

  const [selectedSize, setSelectedSize] = useState<string | null>(
    item.size && item.size.length > 0 ? item.size[0] : null
  );

  const dispatch = useDispatch();
  const discountedPrice = item.discount > 0 ? item.price - (item.price * item.discount) / 100 : item.price;

  // handleAdd to cart
  const handleAddToCart = () => {
    if (item.size && item.size.length > 0 && !selectedSize) {
      enqueueSnackbar('Please select a size before adding to the bag.', { variant: 'warning' });
      return;
    }

    // Add the item to the cart, size will be `null` for products without size.
    dispatch(addToCart({
      id: item._id,
      name: item.name,
      price: discountedPrice,
      size: selectedSize || 'default', // Use 'default' if no size option exists
      quantity: 1,
      image: Array.isArray(item.image) ? item.image[0] : item.image,
    }));
    dispatch(saveCartToLocalStorage());
    enqueueSnackbar('Added to Bag', { variant: 'success' });
  };

  return (
    <div>
    <div className="flex flex-col lg:flex-row justify-center gap-5 my-10 px-5">
      {/* Image and Thumbnail section */}
      {Array.isArray(props.item.image) && props.item.image.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto">
            {props.item.image.map((img, index) => (
              <Thumbnail key={index} src={img} alt={props.item.name} onHover={() => changeImage(img)} />
            ))}
          </div>
          <div className="relative z-10" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Lens hovering={hovering}>
              <Image src={currentImage} alt={props.item.name} width={450} height={400} />
            </Lens>
          </div>
        </div>
      )}

      <div className="flex flex-col items-start mt-5 lg:mt-0 lg:ml-5">
        <h2 className="font-semibold text-2xl lg:text-3xl mb-3 max-w-[320px]">{props.item.name}</h2>
        <h3 className="text-lg lg:text-xl text-gray-600 mb-2">{props.item.categories[1]}</h3>
        <div className="my-2 text-lg lg:text-xl">
          <p className="inline-flex mr-3 font-bold">Price: ${discountedPrice}</p>
          {props.item.discount > 0 && <span className="line-through text-red-500">${props.item.price}</span>}
        </div>

        {props.item.size && props.item.size.length > 0 && (
          <div className="my-4">
            <h3 className="font-medium text-lg">Select Size:</h3>
            <div className="flex flex-wrap gap-2">
              {props.item.size.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-16 rounded-md px-3 py-2 text-base font-medium ${
                    selectedSize === size ? 'bg-blue-500 text-white' : style.btnHover
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className="bg-blue-500 text-white rounded-md px-6 py-2 mt-4 hover:bg-blue-600 transition-colors duration-300"
          onClick={handleAddToCart}
        >
          Add to Bag
        </button>
        <ReviewAndDiscription discription={props.item.description} key={props.item._id} />
      <ReviewByProduct params={item._id}/>
      </div>
    </div>
      <Review productId={item._id} />
    </div>
  );
};


export default ProductDProp;
