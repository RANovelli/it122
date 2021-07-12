let bands = [
    { name : "rolling stones", sing : "mick", guitar1 : "keef", guitar2 : "brian", bass : "bill", drums : "charlie" },
    { name : "beatles", guitar1 : "john", guitar2 : "george", bass : "paul", drums : "ringo" },
    { name : "pretty things", sing : "phil", guitar1 : "dick", bass : "wally", drums : "twink" },
    { name : "the creation", sing : "kenny", guitar1 : "eddie", bass : "bob", drums : "jack" },
    { name : "the who", sing : "roger", guitar1 : "pete", bass : "john", drums : "keith" }
    ];

const getAll = () => {
    return bands;
}

// console.log(getAll());

const getItem = (name) => {
    return bands.find((band) => {
        return band.name === name;
    });
} 

// console.log(getItem("beatles"));

export { getAll, getItem };
