// =========================
// LifeHub v3
// Statistics
// =========================

const Stats = {

    get() {

        const total = Tasks.items.length;

        const completed =
            Tasks.items.filter(
                task => task.done
            ).length;

        const active =
            total - completed;

        const percent =
            total === 0
                ? 0
                : Math.round(
                    completed / total * 100
                );

        return {

            total,

            completed,

            active,

            percent

        };

    },

    allCompleted() {

        const stats = this.get();

        return (
            stats.total > 0 &&
            stats.completed === stats.total
        );

    }

};
