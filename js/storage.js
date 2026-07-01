// =========================
// LifeHub V3
// Storage Module
// =========================

const Storage = {

    keys: {
        tasks: "lifehub_v3_tasks",
        habits: "lifehub_v3_habits",
        goals: "lifehub_v3_goals",
        settings: "lifehub_v3_settings"
    },

    load(key, defaultValue = []) {

        try {

            const data = localStorage.getItem(key);

            return data
                ? JSON.parse(data)
                : defaultValue;

        } catch {

            return defaultValue;

        }

    },

    save(key, value) {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    },

    remove(key) {

        localStorage.removeItem(key);

    },

    clear() {

        localStorage.clear();

    }

};
