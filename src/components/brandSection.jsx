import React from 'react';

const BrandSection = ({ brandsObject, brandsTitle }) => {
  const brandsToShow = brandsObject.map((brandItemObject) => (
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
};

export default BrandSection;

const BrandItem = ({ fontFamily, fontWeight, brand }) => (
  <a href="#" className="brand-item">
    <h3 className={`brand-item__text ${fontFamily} ${fontWeight}`}>{brand}</h3>
  </a>
);
