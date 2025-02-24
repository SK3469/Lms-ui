# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



_important points to be noted from this project.
1.When full screen not appered - if want to use the full screen of any div need to delete app.css in app.jsx otherwise this will apply  default css in app.css.

//about grid in tailwindcss when want full space in any form when space abilable for 4 colum using grid like 'grid grid-cols-4' whith 2 element where want to distribute space like 1st elemt given cols-1 space another to cols-3 then use 'col-span-3' in 2nd element.

//most important thing if u import anything irrelevent from vite cause syntex error and u cant find any solution so check all component and remove irrelevent import from vite immedatlly..

//always hook in line useState then useEffect.. and all userData coming from anywhare ..

//make sure all words should be correct in RTK query otherwise auth user what display for ex. queryfulfilled not queryfullfilled this type of typo error will crash the code.

//use "loadingSpinner" to hide components overlapping... in main.jsx..
 
 //if making sidebar(parent)type page so use sticky div in sidebar also use outlet component is use other page as child like below.

 sidebar.jsx

 <div className="flex">
 <div className="sticky w-[30%]">  //from left side
</div>
<div className="flex-1 p-10"> //flex-1 --take other w-[70%] width this is for childerns pages.
<Outlet/>
</div>

//if want to create any thing from instructor side in e-learning type project need to use "/" in route for create and display what is created by instructor..

// for refecthig data automatically use 'tabTypes:[]' above base query and use in other with name on 'invalidatesTag:[]' while using RTK query.

//Most important thing about destructuring is that if trying to get destructure from backend like ->
const {data1, data2} = data if showing undefind then use = data || {} to avoid undefind error issue.

// In case if want to use any object id when getting full object as a props then use {object._id}.