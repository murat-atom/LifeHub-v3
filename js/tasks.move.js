// =====================================
// LifeHub V3
// Move Module
// Для iPhone
// =====================================

Tasks.enterMoveMode = function(taskId){

    this.moveMode = true;

    this.moveTask = taskId;

    document.body.classList.add(
        "matrix-move-active"
    );

    const panel =
        document.getElementById(
            "movePanel"
        );

    if(panel){

        panel.classList.remove(
            "hidden"
        );

    }

    document
        .querySelectorAll(".matrix-card")
        .forEach(card=>{

            card.classList.add(
                "move-target"
            );

        });

    document
        .querySelectorAll(".task-preview")
        .forEach(item=>{

            item.classList.remove(
                "move-selected"
            );

            if(item.dataset.id===taskId){

                item.classList.add(
                    "move-selected"
                );

            }

        });

};

