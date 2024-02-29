import "../styles/main.scss";

const helloFunc = () => {
    console.log("Hello from the index.js file :D");
};

helloFunc();

// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
}
