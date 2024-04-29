# crisp-ecommerce-practice

This is a fake ecommerce page based on this [figma design](https://www.figma.com/community/file/1316811321603986115/crisp-ecommerce-theme?searchSessionId=lvl5nmps-b13x3cmf7h)

I made it to practice react for the first time

##Folder structure:

* crisp-ecommerce-practice/ - It's localized the .html files.
* src/components/utils - There are functions who don't have react components with tags.
* src/components/ui - There are the React components showed in the UI, ./smaller has smaller React components.
* src/data - There are .json data used across the page.
* src/pages - It has the main pages.jsx components, ./page has also components only used in that specific page.
* src/assets - It has the .scss file and images used across the page.
* src/config-firebase - It has the firebase files.

## config files:

### vite.config.js:

It only has the inputs of the .html files in crisp-ecommerce-practice/ to build the page

## Some details about the code:

* headerProduct.jsx has the same code of header.jsx, but the only difference are the props as said in the comment... It is needed to use a state management library like redux or redux toolkit to not have to use such file.
