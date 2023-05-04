import React from 'react';

function BrandSection(brandsObject) {
  const brandsArray = brandsObject.brandsObject;
  const brandsToShow = brandsArray.map((brandItemObject) => (
    <BrandItem
      brand={brandItemObject.brand}
      fontFamily={brandItemObject.fontFamily}
      fontWeight={brandItemObject.fontWeight}
      key={brandItemObject.id}
    />
  ));
  return <section className="brand-section">{brandsToShow}</section>;
}

export default BrandSection;

function BrandItem({ fontFamily, fontWeight, brand }) {
  return (
    <div className="brand-item">
      <h3 className={`brand-item__text ${fontFamily} ${fontWeight}`}>
        {brand}
      </h3>
    </div>
  );
}
