// =====================================
// LifeHub v3
// navigation.js
// =====================================

const Navigation = {

    init() {

        this.buttons =
    document.querySelectorAll(".nav-button");
        this.screens =
            document.querySelectorAll(".screen");

        this.bind();

    },

    bind() {

        this.buttons.forEach(button => {

            button.onclick = () => {

                const screen =
                    button.dataset.screen;

                this.open(screen);

            };

        });

    },

    open(name) {

        this.screens.forEach(screen => {

            screen.classList.remove("active");
            screen.classList.add("hidden");

        });

        const current =
            document.getElementById(
                "screen-" + name
            );

        if (current) {

            current.classList.remove("hidden");
            current.classList.add("active");

        }

        this.buttons.forEach(button => {

            button.classList.remove("active");

            if (
                button.dataset.screen === name
            ) {

                button.classList.add("active");

            }

        });

if (
    name === "tasks" &&
    typeof Tasks.renderHub === "function"
) {

    Tasks.renderHub();

    Tasks.bindHub();

}
        
    }

};

Navigation.init();
