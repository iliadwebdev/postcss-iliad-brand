/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = ({ colors: customColors } = { colors: {} }) => {
  // Define the custom colors
  const colors = {
    ...customColors,
    "iliad-next": "#F8E71C",
    iliad: "#00ace0",
    atlas: "#374ffb",
  };

  return {
    postcssPlugin: "postcss-iliad-brand",
    Declaration(decl) {
      Object.entries(colors).forEach(([name, hex]) => {
        if (decl.value.trim() === name) {
          decl.value = hex;
        } else {
          const escapedName = name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
          const regex = new RegExp(
            `(^|[^a-zA-Z0-9-])(${escapedName})(?=$|[^a-zA-Z0-9-])`,
            "g"
          );
          decl.value = decl.value.replace(regex, `$1${hex}`);
        }
      });
    },
  };
};

module.exports.postcss = true;
