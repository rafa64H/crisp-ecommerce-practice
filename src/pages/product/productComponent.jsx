import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ProductComponent = ({ clothesData }) => {
  const [selectedImage, setSelectedImage] = useState();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('productId');
  const product = clothesData.find((item) => item.productId === Number(id));
  console.log(product);

  const images = product.otherImages;
  useEffect(() => {
    setSelectedImage(images[0]);
  }, []);

  function handleChangeSelectedImage(image) {
    setSelectedImage(image);
  }

  return (
    <section>
      <section />
      <img src={selectedImage} />

      {images.map((image) => (
        <button
          key={uuidv4()}
          data-square-active={selectedImage === image}
          type="button"
          className="square"
          onClick={(e) => handleChangeSelectedImage(image)}
        />
      ))}
      <section />
    </section>
  );
};

export default ProductComponent;
