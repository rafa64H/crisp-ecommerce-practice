# crisp-ecommerce-practice

This is a fake ecommerce page based on this [figma design](https://www.figma.com/community/file/1316811321603986115/crisp-ecommerce-theme?searchSessionId=lvl5nmps-b13x3cmf7h)

I made it to practice react for the first time

## Folder structure:

* crisp-ecommerce-practice/ - It's localized the .html files.
* src//utils - There are functions used accross the page.
* src/components/ui - There are the React components showed in the UI, ./ui has smaller React components.
* src/data - There are .json data used across the page.
* src/pages - It has the main pages.jsx components and .createRoot along with the first setUser of the user state of authSlice redux-toolkit.
* src/assets - It has the .scss file and images used across the page.
* src/services - It has folders with files from redux-toolkit and firebase.
* src/servicesfirebase/firebaseFunctions.js - It has the functions which change the firebase firestore, storage or auth.
* src/services/firebase/config-firebase - It has the firebase config files.
* src/services/redux-toolkit/ - It has slices of redux-toolkit and the store.js

## config files:

### vite.config.js:

It only has the inputs of the .html files in crisp-ecommerce-practice/ to build the page.
