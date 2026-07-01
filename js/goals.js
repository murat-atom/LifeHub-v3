// =====================================
// LifeHub v3
// goals.js
// =====================================

const Goals = {

    goals: [],

    load() {

        const data =
            localStorage.getItem("lifehub_goals");

        this.goals =
            data ? JSON.parse(data) : [];

    },

    save() {

        localStorage.setItem(
            "lifehub_goals",
            JSON.stringify(this.goals)
        );

    },

    getAll() {

        return this.goals;

    },

    add(title) {

        this.goals.push({

            id: Date.now(),

            title,

            completed: false

        });

        this.save();

    },

    toggle(id) {

        const goal =
            this.goals.find(
                g => g.id === id
            );

        if (!goal) return;

        goal.completed = !goal.completed;

        this.save();

    },

    remove(id) {

        this.goals =
            this.goals.filter(
                g => g.id !== id
            );

        this.save();

    }

};

Goals.load();
