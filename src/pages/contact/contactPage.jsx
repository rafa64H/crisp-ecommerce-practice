import React from 'react';

const ContactPage = () => (
  <section className="contact">
    <section className="about-us">
      <h2 className="about-us__title">About us</h2>

      <p className="about-us__paragraph">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies
        dolor nec condimentum sodales. Aenean a massa felis. Aliquam in
        elementum dui. Duis ac erat massa. Morbi fermentum vulputate eros in
        tincidunt. Pellentesque nec dui sed lectus fringilla tempor quis in
        massa. Duis elementum tellus ac hendrerit rutrum.
      </p>

      <p className="about-us__paragraph">
        Aliquam pulvinar rhoncus sapien pulvinar convallis. Mauris nec nisl sit
        amet ligula tincidunt eleifend ut vitae erat. Pellentesque tincidunt
        felis id massa viverra semper. Aenean cursus, lorem non imperdiet
        posuere, tortor nisi euismod orci, molestie iaculis odio arcu ut mauris.
        Suspendisse sed blandit magna. Maecenas posuere ultrices est, vitae
        scelerisque erat eleifend eget. Suspendisse a risus ornare turpis
        sagittis tristique. Praesent suscipit erat semper lacinia viverra.
      </p>
    </section>

    <section className="contact-adress">
      <h3 className="contact-address__title">ADDRESS:</h3>
      <p className="contact-address_paragraph">
        123 STREET NAME, CITY, ENGLAND
      </p>
      <h3 className="contact-address__title">PHONE:</h3>
      <p className="contact-address_paragraph">(123) 456-7890</p>
      <h3 className="contact-address__title">EMAIL:</h3>
      <p className="contact-address_paragraph">companyemail@crisp.com</p>
      <h3 className="contact-address__title">WORKING DAYS/HOURS:</h3>
      <p className="contact-address_paragraph">MON - SUN / 9:00AM - 8:00PM</p>
    </section>
  </section>
);

export default ContactPage;
