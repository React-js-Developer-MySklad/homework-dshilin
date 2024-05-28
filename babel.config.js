const presets = [];
const plugins = [
    [
        "@babel/plugin-transform-react-jsx",
        { runtime: "automatic", importSource: "@tiny-ui" },
    ],
];

module.exports = {
    presets,
    plugins,
};