// =========================
// LifeHub V3
// Tasks Module
// =========================

const Tasks = {

    items: [],

    init() {

        this.items = Storage.load(
            Storage.keys.tasks,
            []
        );

    },

    getAll() {

        return this.items;

    },

    add(text) {

        this.items.push({

            id: crypto.randomUUID(),

            text: text.trim(),

            done: false,

            createdAt: Date.now(),

            priority: "normal"

        });

        this.save();

    },

    toggle(id) {

        const task = this.items.find(
            t => t.id === id
        );

        if (!task) return;

        task.done = !task.done;

        this.save();

    },

    remove(id) {

        this.items = this.items.filter(
            t => t.id !== id
        );

        this.save();

    },

    save() {

        Storage.save(
            Storage.keys.tasks,
            this.items
        );

    }

};
