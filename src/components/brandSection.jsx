import React from 'react';

function BrandSection({ brandsObject, brandsTitle }) {
  const brandsArray = brandsObject;
  const brandsToShow = brandsArray.map((brandItemObject) => (
    <BrandItem
      brand={brandItemObject.brand}
      fontFamily={brandItemObject.fontFamily}
      fontWeight={brandItemObject.fontWeight}
      key={brandItemObject.id}
    />
  ));
  return (
    <section className="brand-section">
      <div className="flex-border-title">
        <div className="border-top-left" />
        <h2 className="brand-section__title">{brandsTitle}</h2>
        <div className="border-top-right" />
      </div>

      <div className="grid-brands">{brandsToShow}</div>
    </section>
  );
}

export default BrandSection;

function BrandItem({ fontFamily, fontWeight, brand }) {
  return (
    <a href="#" className="brand-item">
      <h3 className={`brand-item__text ${fontFamily} ${fontWeight}`}>
        {brand}
      </h3>
    </a>
  );
}