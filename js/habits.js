// =====================================
// LifeHub v3
// habits.js
// =====================================

const Habits = {

    habits: [],

    load() {

        const data =
            localStorage.getItem("lifehub_habits");

        this.habits =
            data ? JSON.parse(data) : [];

    },

    save() {

        localStorage.setItem(
            "lifehub_habits",
            JSON.stringify(this.habits)
        );

    },

    getAll() {

        return this.habits;

    },

    add(title) {

        this.habits.push({

            id: Date.now(),

            title,

            done: false

        });

        this.save();

    },

    toggle(id) {

        const habit =
            this.habits.find(
                h => h.id === id
            );

        if (!habit) return;

        habit.done = !habit.done;

        this.save();

    },

    remove(id) {

        this.habits =
            this.habits.filter(
                h => h.id !== id
            );

        this.save();

    }

};

Habits.load();
