const { Plugin } = require("obsidian");

module.exports = class CodeBlockObserverPlugin extends Plugin {
    onload() {
        // наблюдаем за всем workspace
        const workspaceEl = this.app.workspace.containerEl;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (!(node instanceof HTMLElement)) return;

                    let created = false;

                    // ищем код-блоки с нужными классами
                    if (node.classList.contains("HyperMD-codeblock") || 
                        node.classList.contains("HyperMD-codeblock-begin")) {
                        this.onCodeBlockCreated(node);
                        created = true;
                    }

                    if (created) return;

                    // внутри добавленных элементов
                    node.querySelectorAll?.(".HyperMD-codeblock, .HyperMD-codeblock-begin").forEach(el => {
                        this.onCodeBlockCreated(el);
                        created = true;
                    });

                    if (created) return;
                });
            });
        });

        observer.observe(workspaceEl, {
            childList: true,
            subtree: true
        });

        this.cmObserver = observer;
    }

    onunload() {
        this.cmObserver?.disconnect();
    }

    onCodeBlockCreated(el) {
        // момент создания кода в редакторе
        el.classList.add("code-block-processed");
        console.log("Code block created:", el);

        // TODO:
        //  - скрыть апостравы и вывести окошко выбора языка
    }
};