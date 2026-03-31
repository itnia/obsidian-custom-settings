const { Plugin } = require("obsidian");

module.exports = class MyPlugin extends Plugin {
  async onload() {
    console.log("Plugin loaded");

    // Добавляем кнопку в левое меню
    this.addRibbonIcon("dice", "My plugin", () => {
      new Notice("Hello from plugin!");
    });

    // Добавляем команду
    this.addCommand({
      id: "my-command",
      name: "Say Hello",
      callback: () => {
        new Notice("Hello 👋");
      }
    });
  }

  onunload() {
    console.log("Plugin unloaded");
  }
};